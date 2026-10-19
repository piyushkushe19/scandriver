import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { CUSTOMER, GRIEVANCE, INSTAGRAM, FACEBOOK, SERVICES, waLink } from '../config.js';

export const Logo = () => <Link to="/" className="logo" aria-label="ScanDriver home">Scan<span>Driver</span></Link>;
const NAV = [['Services', '/#services'], ['How It Works', '/#how-it-works'], ['Safety', '/#safety'], ['About', '/#about'], ['Contact', '/#contact']];

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = open ? 'hidden' : '';
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  }, [open]);
  return (<header className="header"><div className="wrap bar">
    <Logo />
    <nav className="nav-d" aria-label="Main">{NAV.map(([t, h]) => <Link key={t} to={h}>{t}</Link>)}</nav>
    <div className="bar-actions">
      <Link className="link-driver" to="/#join-driver">Drive with ScanDriver</Link>
      <Link className="btn btn-primary sm" to="/booking">Book a Driver</Link>
      <button className="icon-btn menu-btn" aria-expanded={open} aria-controls="mnav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div></div>
    {open && <nav id="mnav" className="nav-m" aria-label="Mobile">
      {NAV.map(([t, h]) => <Link key={t} to={h} onClick={() => setOpen(false)}>{t}</Link>)}
      <Link to="/#join-driver" onClick={() => setOpen(false)}>Drive with ScanDriver</Link>
      <Link className="btn btn-primary" to="/booking" onClick={() => setOpen(false)}>Book a Driver</Link>
    </nav>}
  </header>);
}

export function Footer() {
  return (<footer className="footer"><div className="wrap fgrid">
    <div><Logo /><p className="muted">A driver aggregation and placement service for Delhi NCR. ScanDriver does not own vehicles.</p>
      <div className="social"><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="ScanDriver on Instagram"><Instagram /></a><a href={FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="ScanDriver on Facebook"><Facebook /></a></div></div>
    <div><h3>Services</h3>{SERVICES.map((s) => <Link key={s.id} to={`/booking?service=${s.id}`}>{s.title}</Link>)}</div>
    <div><h3>Company</h3><Link to="/#about">About Us</Link><Link to="/#how-it-works">How It Works</Link><Link to="/#safety">Safety & Verification</Link><Link to="/#join-driver">Join as a Driver</Link><Link to="/#contact">Contact</Link></div>
    <div><h3>Legal</h3><Link to="/terms-and-conditions">Terms & Conditions</Link><Link to="/privacy-policy">Privacy Policy</Link><Link to="/cancellation-and-refund-policy">Cancellation & Refund</Link>
      <a href={`mailto:${GRIEVANCE}`}>{GRIEVANCE}</a></div>
  </div><div className="wrap copy">© 2026 Scan Driver Private Limited · Delhi NCR, India</div></footer>);
}

export function FloatingWhatsApp() {
  return <a className="fab" href={waLink(CUSTOMER.wa, 'Hello ScanDriver, I would like to book a driver.')} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} /><span>WhatsApp</span></a>;
}
