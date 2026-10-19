import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { CUSTOMER, SERVICES, TRIP_TYPES, CAR_TYPES, waLink } from '../config.js';
import { validPhone, normalizePhone } from '../utils.js';

const DISTANCES = Array.from({ length: 13 }, (_, i) => 10 + i * 5);
const label = (list, v) => (list.find(([k]) => k === v) || [])[1] || v;
const EMPTY = { name: '', phone: '', service: '', tripType: '', carType: '', pickup: '', drop: '', distance: '', when: '', duration: '', workDays: '', hours: '', comments: '' };

const Field = ({ id, l, children, hint, err }) => <div className="field"><label htmlFor={id}>{l}</label>{children}{hint && <span className="hint">{hint}</span>}{err[id] && <span className="err" role="alert">{err[id]}</span>}</div>;

export default function Booking() {
  const [params] = useSearchParams();
  const qs = params.get('service');
  const known = SERVICES.find((s) => s.id === (qs || '').toLowerCase());
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({}); const [url, setUrl] = useState('');
  useEffect(() => { document.title = 'Book a Driver – ScanDriver'; }, []);
  useEffect(() => { if (known) setF((p) => ({ ...p, service: known.id, tripType: known.tripType || p.tripType })); }, [known?.id]);
  const set = (k) => (e) => { setUrl(''); setF({ ...f, [k]: e.target.value }); };
  const t = f.tripType;
  const show = useMemo(() => ({
    drop: ['one-way', 'round-trip', 'outstation'].includes(t), distance: ['one-way', 'round-trip', 'outstation'].includes(t),
    monthly: t === 'monthly', duration: ['hourly', 'weekly', 'corporate', 'event'].includes(f.service),
  }), [t, f.service]);

  const submit = (e) => {
    e.preventDefault(); const er = {};
    if (!f.name.trim()) er.name = 'Please enter your name.';
    if (!validPhone(f.phone)) er.phone = 'Enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
    if (!f.service) er.service = 'Please choose a service.';
    if (!f.tripType) er.tripType = 'Please choose a trip type.';
    if (!f.carType) er.carType = 'Please choose your car type.';
    if (!f.pickup.trim()) er.pickup = 'Please enter the pickup location.';
    if (show.drop && !f.drop.trim()) er.drop = 'Please enter the drop location.';
    if (!f.when) er.when = 'Please choose a date and time.';
    setErr(er);
    if (Object.keys(er).length) { setTimeout(() => document.querySelector('[aria-invalid="true"]')?.focus(), 0); return; }
    const when = new Date(f.when).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    const lines = ['Hello ScanDriver, I would like to enquire about booking a driver.',
      `Service: ${SERVICES.find((s) => s.id === f.service).title}`, `Trip type: ${label(TRIP_TYPES, f.tripType)}`,
      `Name: ${f.name.trim()}`, `WhatsApp: ${normalizePhone(f.phone)}`, `My car: ${label(CAR_TYPES, f.carType)}`,
      `Pickup: ${f.pickup.trim()}`, show.drop && f.drop.trim() && `Drop: ${f.drop.trim()}`,
      show.distance && f.distance && `Estimated distance: ${f.distance} km`, `Date & time: ${when}`,
      show.duration && f.duration.trim() && `Duration / schedule: ${f.duration.trim()}`,
      show.monthly && f.workDays.trim() && `Working days: ${f.workDays.trim()}`, show.monthly && f.hours.trim() && `Hours per day: ${f.hours.trim()}`,
      f.comments.trim() && `Comments: ${f.comments.trim()}`].filter(Boolean);
    const link = waLink(CUSTOMER.wa, lines.join('\n')); setUrl(link); window.open(link, '_blank', 'noopener');
  };
  const inv = (k) => ({ id: k, 'aria-invalid': !!err[k], value: f[k], onChange: set(k) });

  return (<section className="wrap page booking">
    <p className="eyebrow">Book a driver</p><h1>Share your driver requirement</h1>
    <p className="lead">Fill in the details and we’ll prepare a WhatsApp message for the ScanDriver team. Your booking is only arranged once the team confirms it with you.</p>
    {qs && !known && <p className="status" role="status">We didn’t recognise “{qs}”, so no service was preselected. Please choose one below.</p>}
    <div className="bgrid">
      <form className="card form" onSubmit={submit} noValidate>
        <Field err={err} id="name" l="Your name"><input {...inv('name')} autoComplete="name" /></Field>
        <Field err={err} id="phone" l="WhatsApp number"><input {...inv('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile number" /></Field>
        <fieldset className="field tiles"><legend>Service</legend><div className="tg">{SERVICES.map((x) => <label key={x.id} className={f.service === x.id ? 'tile on' : 'tile'}><input type="radio" name="service" value={x.id} checked={f.service === x.id} onChange={() => { setUrl(''); setF({ ...f, service: x.id, tripType: x.tripType || f.tripType }); }} /><x.icon size={18} />{x.title}</label>)}</div>{err.service && <span className="err" role="alert">{err.service}</span>}</fieldset>
        <Field err={err} id="tripType" l="Trip type"><select {...inv('tripType')}><option value="">Select trip type</option>{TRIP_TYPES.map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></Field>
        <Field err={err} id="carType" l="Your car type" hint="The driver drives your vehicle; ScanDriver does not supply cars."><select {...inv('carType')}><option value="">Select car type</option>{CAR_TYPES.map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></Field>
        <Field err={err} id="pickup" l="Pickup location"><input {...inv('pickup')} autoComplete="street-address" /></Field>
        {show.drop && <Field err={err} id="drop" l="Drop location"><input {...inv('drop')} /></Field>}
        {show.distance && <Field err={err} id="distance" l="Estimated distance (optional)"><select {...inv('distance')}><option value="">Select distance</option>{DISTANCES.map((d) => <option key={d} value={d}>{d} km</option>)}</select></Field>}
        <Field err={err} id="when" l={t === 'monthly' ? 'Start date & time' : 'Date & time'}><input {...inv('when')} type="datetime-local" /></Field>
        {show.duration && <Field err={err} id="duration" l="Duration / schedule (optional)"><input {...inv('duration')} placeholder="e.g. 4 hours, 3 days" /></Field>}
        {show.monthly && <><Field err={err} id="workDays" l="Working days (optional)"><input {...inv('workDays')} placeholder="e.g. Monday–Saturday" /></Field>
          <Field err={err} id="hours" l="Hours per day (optional)"><input {...inv('hours')} placeholder="e.g. 9" /></Field></>}
        <Field err={err} id="comments" l="Additional comments (optional)"><textarea {...inv('comments')} rows="3" /></Field>
        <button className="btn btn-wa" type="submit"><MessageCircle size={18} /> Continue in WhatsApp</button>
        <p className="note">This opens WhatsApp with your enquiry prefilled. Press send there to contact the team. We do not store your details on this website.</p>
        {url && <p className="status" role="status">Your enquiry is ready. Continue in WhatsApp to contact the ScanDriver team. If it didn’t open, <a href={url} target="_blank" rel="noopener noreferrer">tap here</a>.</p>}
      </form>
      <aside className="card terms" aria-label="Pricing and key terms">
        <h2>Pricing & extra charges</h2>
        <ul><li><strong>₹8 per km</strong> extra if actual distance exceeds your booked KM limit.</li>
          <li>Waiting: <strong>₹40 every half hour</strong> (after a 15-minute start delay exception).</li>
          <li>Driver return charges are already included in the package.</li>
          <li><strong>₹200 night travel allowance</strong> between 10:00 PM and 6:00 AM.</li></ul>
        <h2>Key pointers</h2>
        <ul><li>Pay at the end of the trip — no advance needed.</li><li>No need to provide food or travel expenses to the driver.</li><li>Drivers are experienced and background verified.</li></ul>
        <p className="note">Please review our <a href="/terms-and-conditions">Terms</a> and <a href="/cancellation-and-refund-policy">Cancellation policy</a> before confirming.</p>
      </aside>
    </div></section>);
}
