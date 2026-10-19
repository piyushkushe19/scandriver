import { useState, useEffect, useRef } from 'react';
import Reveal from '../components/Reveal.jsx';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Mail, ShieldCheck, ContactRound, FileCheck, Users, ArrowRight, Send, ScanLine } from 'lucide-react';
import { CUSTOMER, DRIVER, EMAIL, GRIEVANCE, SERVICES, TESTIMONIALS, waLink } from '../config.js';
import { validPhone } from '../utils.js';

const Eyebrow = ({ children }) => <p className="eyebrow">{children}</p>;

function RouteArt() {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 900px)').matches) return;
    let raf; const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { if (ref.current) ref.current.style.transform = `translateY(${Math.min(window.scrollY, 600) * 0.08}px)`; }); };
    window.addEventListener('scroll', on, { passive: true }); return () => window.removeEventListener('scroll', on);
  }, []);
  return (<div className="art" ref={ref} role="img" aria-label="Illustration of a journey from pickup to destination with a driver">
    <svg viewBox="0 0 420 300" aria-hidden="true"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stopColor="#20C9B7"/><stop offset="1" stopColor="#3478F6"/></linearGradient></defs>
      <g stroke="rgba(255,255,255,.08)" strokeWidth="1">{Array.from({ length: 9 }, (_, i) => <path key={i} d={`M0 ${i * 36}H420`} />)}{Array.from({ length: 12 }, (_, i) => <path key={'v' + i} d={`M${i * 38} 0V300`} />)}</g>
      <path className="dash" d="M60 230C130 230 120 120 210 130S320 70 360 60" fill="none" stroke="url(#g)" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 10"/>
      <circle cx="60" cy="230" r="9" fill="#20C9B7"/><circle cx="360" cy="60" r="9" fill="#101A2C" stroke="#3478F6" strokeWidth="3"/>
      <circle className="pulse" cx="60" cy="230" r="9" fill="none" stroke="#20C9B7"/></svg>
    <div className="art-tag a1">Pickup</div><div className="art-tag a2">Destination</div>
    <p className="art-cap"><ScanLine size={16} /> Illustrative journey · Driver arranged by the ScanDriver team</p>
  </div>);
}

function Hero() {
  return (<section className="hero"><div className="wrap hero-in">
    <div><Eyebrow>Serving Delhi NCR</Eyebrow>
      <h1>Your Driver, <em>One Scan Away.</em></h1>
      <p className="lead">Professional, verified drivers for everyday journeys, business travel, airport transfers and outstation trips. Share your requirement on WhatsApp — no app needed.</p>
      <div className="cta-row">
        <Link className="btn btn-primary" to="/booking">Book a Driver</Link>
        <a className="btn btn-ghost" href="#services">Explore Services</a>
      </div>
      <div className="picks" role="group" aria-label="Quick booking options">{SERVICES.map((x) => <Link key={x.id} to={`/booking?service=${x.id}`}><x.icon size={15} /> {x.title.replace(' Driver', '').replace(' Transfer', '').replace(' & Wedding', '')}</Link>)}</div>
      <a className="wa-inline" href={waLink(CUSTOMER.wa, 'Hello ScanDriver, I would like to book a driver.')} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Or message us on WhatsApp</a>
    </div>
    <div><RouteArt /><ul className="chips" aria-label="Highlights">
      <li><ContactRound size={18} /> Aadhaar and licence verified</li>
      <li><ShieldCheck size={18} /> Background and reference checks</li>
      <li><MessageCircle size={18} /> WhatsApp-first, no app required</li>
      <li><Users size={18} /> Delhi NCR coverage</li>
    </ul></div>
  </div></section>);
}

function Services() {
  return (<section id="services" className="sec"><div className="wrap">
    <Eyebrow>What we offer</Eyebrow><h2>Driver services for every need</h2>
    <p className="muted sub">Pick a service and we will preselect it on the booking form. Pricing terms are shown on the booking page.</p>
    <div className="grid g3">{SERVICES.map(({ id, title, icon: Icon, desc, cta }) => (
      <Link key={id} to={`/booking?service=${id}`} className="card svc"><Icon className="ic" /><h3>{title}</h3><p>{desc}</p><span className="more">{cta} <ArrowRight size={16} /></span></Link>))}
    </div></div></section>);
}

function Pricing() {
  const rows = [['₹8 / km', 'Extra charge per additional kilometre beyond your booked KM limit'], ['₹40 / 30 min', 'Waiting charge for every half hour'], ['₹200', 'Night travel allowance (10:00 PM – 6:00 AM)'], ['Pay at trip end', 'Payment is made at the end of the trip']];
  return (<section id="pricing" className="sec"><div className="wrap two">
    <div><Eyebrow>Pricing & terms</Eyebrow><h2>Clear terms before you book</h2>
      <p className="muted">Package pricing depends on your requirement, so please enquire for a quote. The extra charges below apply as stated on our booking page.</p>
      <p className="note">Read the <Link to="/terms-and-conditions">Terms</Link> and <Link to="/cancellation-and-refund-policy">Cancellation policy</Link>.</p><Link className="btn btn-primary" to="/booking">Start your booking</Link></div>
    <dl className="rates">{rows.map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl>
  </div></section>);
}

function How() {
  const steps = [['Share your requirement', 'Choose a service and share your date, time and pickup details through the booking form or WhatsApp.'],
    ['Connect with the team', 'The ScanDriver team reviews your request and coordinates a driver according to availability.'],
    ['Confirm the arrangement', 'Follow the team’s instructions to finalise the booking. Payment is at the end of the trip.']];
  return (<section id="how-it-works" className="sec alt"><div className="wrap">
    <Eyebrow>Simple process</Eyebrow><h2>How booking works</h2>
    <ol className="grid g3 steps">{steps.map(([t, d], i) => <li key={t} className="card"><span className="num">{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
    <p className="note">Submitting the form opens WhatsApp with your enquiry prefilled. Your booking is only arranged once the team confirms it with you.</p>
  </div></section>);
}

function Safety() {
  const items = [[ContactRound, 'Identity check', 'Driver Aadhaar details are verified before onboarding.'], [FileCheck, 'Licence verification', 'Driving licences are checked as part of onboarding.'],
    [ShieldCheck, 'Background screening', 'A background check is carried out before drivers join the network.'], [Users, 'Reference checks', 'A minimum of two references are verified.']];
  return (<section id="safety" className="sec"><div className="wrap">
    <Eyebrow>Safety & verification</Eyebrow><h2>We verify drivers before they join</h2>
    <p className="muted sub">Every driver goes through a multi-step verification process. Verification reduces risk but cannot remove it entirely, so please share trip details with someone you trust and contact us if anything feels wrong.</p>
    <div className="grid g4">{items.map(([Icon, t, d]) => <div key={t} className="card"><Icon className="ic" /><h3>{t}</h3><p>{d}</p></div>)}</div>
  </div></section>);
}

function About() {
  const v = [['S', 'Safety', 'Multi-layer driver verification is our priority.'], ['C', 'Care', 'Respect and empathy for both drivers and customers.'], ['A', 'Accountability', 'Owning our service quality and being transparent.'], ['N', 'Never Settle', 'Always improving our network and booking experience.']];
  return (<section id="about" className="sec alt"><div className="wrap">
    <Eyebrow>About ScanDriver</Eyebrow><h2>A simpler way to hire a trusted driver</h2>
    <div className="two"><p>Hiring a trustworthy driver is often slow and complicated. ScanDriver connects individuals, families and businesses with verified, experienced drivers through a WhatsApp-first process — without extra apps, lengthy paperwork or endless calls.</p>
      <p><strong>Mission:</strong> to build a trusted driver platform that delivers safe, verified services while creating flexible earning opportunities for professional drivers.<br /><br /><strong>Vision:</strong> to make professional driving services accessible to every household and business through trust, transparency and convenience.</p></div>
    <div className="grid g4">{v.map(([l, t, d]) => <div key={l} className="card"><span className="num">{l}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
  </div></section>);
}

function Testimonials() {
  return (<section className="sec"><div className="wrap">
    <Eyebrow>Customer stories</Eyebrow><h2>What customers have said</h2>
    <div className="grid g3">{TESTIMONIALS.map((t) => <figure key={t.n} className="card quote"><blockquote>“{t.q}”</blockquote><figcaption><strong>{t.n}</strong><br /><span className="muted">{t.l}</span></figcaption></figure>)}</div>
    <p className="note">Testimonials as published on scandriver.in.</p>
  </div></section>);
}

function Corporate() {
  const [f, setF] = useState({ name: '', phone: '', company: '', msg: '' });
  const [err, setErr] = useState({}); const [ready, setReady] = useState('');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault(); const er = {};
    if (!f.name.trim()) er.name = 'Please enter your name.';
    if (!validPhone(f.phone)) er.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (!f.msg.trim()) er.msg = 'Please describe your requirement.';
    setErr(er); if (Object.keys(er).length) return;
    const text = ['Hello ScanDriver, I would like to discuss driver requirements.', `Name: ${f.name.trim()}`, `Phone: ${f.phone.trim()}`, f.company.trim() && `Company: ${f.company.trim()}`, `Requirement: ${f.msg.trim()}`].filter(Boolean).join('\n');
    const url = waLink(CUSTOMER.wa, text); setReady(url); window.open(url, '_blank', 'noopener');
  };
  return (<section id="enquiry" className="sec alt"><div className="wrap two">
    <div><Eyebrow>Corporate & custom requirements</Eyebrow><h2>Discuss your requirements</h2>
      <p className="muted">For businesses, executive travel, events or long-term needs, share your requirement and the ScanDriver team will get back to you with details and a customised quote.</p></div>
    <form className="card form" onSubmit={submit} noValidate aria-label="Enquiry form">
      {[['name', 'Full name', 'text'], ['phone', 'Phone / WhatsApp number', 'tel'], ['company', 'Company (optional)', 'text']].map(([k, l, t]) => (
        <div className="field" key={k}><label htmlFor={`c-${k}`}>{l}</label><input id={`c-${k}`} type={t} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} aria-describedby={err[k] ? `c-${k}-e` : undefined} />{err[k] && <span id={`c-${k}-e`} className="err" role="alert">{err[k]}</span>}</div>))}
      <div className="field"><label htmlFor="c-msg">Your requirement</label><textarea id="c-msg" rows="4" value={f.msg} onChange={set('msg')} aria-invalid={!!err.msg} />{err.msg && <span className="err" role="alert">{err.msg}</span>}</div>
      <button className="btn btn-wa" type="submit"><Send size={18} /> Continue in WhatsApp</button>
      <p className="note">This opens WhatsApp with your message prefilled. Nothing is sent until you press send there.</p>
      {ready && <p className="status" role="status">Your enquiry is ready. If WhatsApp did not open, <a href={ready} target="_blank" rel="noopener noreferrer">continue here</a>.</p>}
    </form></div></section>);
}

function Drivers() {
  const url = waLink(DRIVER.wa, 'Hi ScanDriver! I want to join as a driver.');
  return (<section id="join-driver" className="sec"><div className="wrap"><div className="card driver">
    <div><Eyebrow>For professional drivers</Eyebrow><h2>Are you a professional driver? Join ScanDriver.</h2>
      <p className="muted">ScanDriver connects experienced drivers with customers across Delhi NCR, with flexible working arrangements. This is separate from customer bookings — driver applications go to our driver team.</p></div>
    <div><a className="btn btn-primary" href={url} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Apply as a Driver</a>
      <p className="muted small">Driver WhatsApp: <a href={`tel:${DRIVER.tel}`}>{DRIVER.display}</a></p></div>
  </div></div></section>);
}

const FAQS = [['Does ScanDriver provide a car?', 'No. ScanDriver provides drivers, not vehicles. Your driver drives your own car.'],
  ['Do I need to download an app?', 'No. You share your requirement through the booking form or WhatsApp and the ScanDriver team follows up.'],
  ['How are drivers verified?', 'Drivers go through Aadhaar and driving licence verification, a background check and a minimum of two references. Verification reduces risk but cannot remove it entirely.'],
  ['When do I pay?', 'Payment is made at the end of the trip. Extra kilometres, waiting time and night allowance are charged as listed in the pricing section.'],
  ['What if I need to cancel?', 'Cancelling within 2 hours of the confirmed booking time may attract a fee of up to ₹200. See the cancellation policy for details.']];
function FAQ() {
  return (<section id="faq" className="sec"><div className="wrap narrow"><Eyebrow>FAQ</Eyebrow><h2>Questions, answered</h2>
    {FAQS.map(([q, a]) => <details key={q} className="faq"><summary>{q}</summary><p>{a}</p></details>)}</div></section>);
}

function Closing() {
  return (<section id="closing" className="sec"><div className="wrap center"><h2>Your driver is one message away.</h2>
    <p className="lead">Tell us what you need and the ScanDriver team will take it from there.</p>
    <div className="cta-row"><Link className="btn btn-primary" to="/booking">Book a Driver</Link>
      <a className="btn btn-wa" href={waLink(CUSTOMER.wa, 'Hello ScanDriver, I would like to book a driver.')} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> WhatsApp us</a></div></div></section>);
}

function Contact() {
  return (<section id="contact" className="sec alt"><div className="wrap">
    <Eyebrow>Contact</Eyebrow><h2>Ready to book your driver?</h2>
    <div className="grid g3">
      <div className="card"><h3>Customers</h3><p><a href={`tel:${CUSTOMER.tel}`}><Phone size={16} /> {CUSTOMER.display}</a></p><a className="btn btn-wa sm" href={waLink(CUSTOMER.wa, 'Hello ScanDriver, I would like to book a driver.')} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp us</a></div>
      <div className="card"><h3>Drivers</h3><p><a href={`tel:${DRIVER.tel}`}><Phone size={16} /> {DRIVER.display}</a></p><a className="btn btn-ghost sm" href={waLink(DRIVER.wa, 'Hi ScanDriver! I want to join as a driver.')} target="_blank" rel="noopener noreferrer">Apply on WhatsApp</a></div>
      <div className="card"><h3>Email</h3><p><a href={`mailto:${EMAIL}`}><Mail size={16} /> {EMAIL}</a></p><p className="muted small">Grievances: <a href={`mailto:${GRIEVANCE}`}>{GRIEVANCE}</a></p></div>
    </div></div></section>);
}

export default function Home() {
  return <><Hero />{[Services, How, Pricing, Safety, About, Testimonials, FAQ, Corporate, Drivers, Contact, Closing].map((C) => <Reveal key={C.name}><C /></Reveal>)}</>;
}
