import { useEffect } from 'react';
import { EMAIL, CUSTOMER } from '../config.js';

function Doc({ title, draft, children }) {
  useEffect(() => { document.title = `${title} – ScanDriver`; }, [title]);
  return (<section className="wrap page legal"><h1>{title}</h1>
    {draft && <p className="status" role="note"><strong>Draft – pending business review.</strong> The original page could not be retrieved in full. This text only restates what appears in the published Terms & Conditions and must be reviewed and approved by ScanDriver before it is relied on.</p>}
    {children}<p className="muted">Questions: <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · WhatsApp {CUSTOMER.display}</p></section>);
}
export const Terms = () => (<Doc title="Terms & Conditions"><p className="muted">Last updated: May 2026. Applicable to all users of ScanDriver services in Delhi NCR.</p>
  <h2>1. Acceptance of Terms</h2><p>By contacting ScanDriver via WhatsApp, phone, or website, or by using any driver service provided by us, you agree to these Terms & Conditions in full. If you do not agree, please discontinue use immediately.</p>
  <h2>2. Nature of Service</h2><p>ScanDriver is a driver aggregation and placement platform. We connect verified drivers with customers requiring on-demand driving services. ScanDriver is not a transport company and does not own vehicles.</p>
  <h2>3. Driver Verification</h2><p>All drivers on our platform undergo multi-layer verification including Aadhaar card, driving licence, criminal background check, and a minimum of two personal references.</p>
  <h2>4. Payments & Cancellations</h2><p>All payments are to be made directly to ScanDriver or as directed by our team. Cancellation within 2 hours of the confirmed booking time may attract a cancellation fee of up to ₹200.</p>
  <h2>5. Liability & Limitation</h2><p>ScanDriver’s liability in any dispute is strictly limited to the service fee paid for that specific booking. We are not liable for damage to the customer’s vehicle or accidents caused by the driver.</p>
  <h2>6. Customer Obligations</h2><p>Customers must ensure their vehicle is in roadworthy condition with valid documents (RC, insurance, PUC), and treat the assigned driver with respect and dignity.</p>
  <h2>7. Privacy & Data</h2><p>Customer and driver information shared with ScanDriver is used solely for service delivery and communication purposes. We do not sell or share personal data with third parties.</p>
  <h2>8. Governing Law & Disputes</h2><p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Delhi, India.</p></Doc>);
export const Privacy = () => (<Doc title="Privacy Policy" draft>
  <p>Customer and driver information shared with ScanDriver is used solely for service delivery and communication purposes. ScanDriver does not sell or share personal data with third parties (Terms & Conditions, section 7).</p>
  <p>On this website, booking and enquiry forms do not send data to a server: they prepare a WhatsApp message that you choose to send. The website does not store your form details.</p>
  <p>For privacy questions or grievances, write to <a href="mailto:grievance@scandriver.in">grievance@scandriver.in</a>.</p></Doc>);
export const Cancellation = () => (<Doc title="Cancellation & Refund Policy" draft>
  <p>Cancellation within 2 hours of the confirmed booking time may attract a cancellation fee of up to ₹200 (Terms & Conditions, section 4).</p>
  <p>Payment is made at the end of the trip, as stated on the booking page. Any refund terms beyond this have not been confirmed and are left for the business to provide.</p></Doc>);
