import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer, FloatingWhatsApp } from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Booking from './pages/Booking.jsx';
import { Terms, Privacy, Cancellation } from './pages/Legal.jsx';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) { setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 0); }
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
export default function App() {
  return (<>
    <a className="skip" href="#main">Skip to content</a>
    <ScrollManager /><Header />
    <main id="main"><Routes>
      <Route path="/" element={<Home />} /><Route path="/booking" element={<Booking />} />
      <Route path="/terms-and-conditions" element={<Terms />} />
      <Route path="/privacy-policy" element={<Privacy />} />
      <Route path="/cancellation-and-refund-policy" element={<Cancellation />} />
      <Route path="*" element={<section className="wrap page"><h1>Page not found</h1><p>Try the <a href="/">homepage</a> or <a href="/booking">booking page</a>.</p></section>} />
    </Routes></main>
    <Footer /><FloatingWhatsApp />
  </>);
}
