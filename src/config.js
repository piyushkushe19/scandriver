import { Clock, CalendarDays, CalendarRange, Route, Briefcase, Plane, PartyPopper } from 'lucide-react';
export const CUSTOMER = { display: '+91 97174 98198', tel: '+919717498198', wa: '919717498198' };
export const DRIVER = { display: '+91 97181 81498', tel: '+919718181498', wa: '919718181498' };
export const EMAIL = 'care@scandriver.in';
export const GRIEVANCE = 'grievance@scandriver.in';
export const INSTAGRAM = 'https://www.instagram.com/scan_driver/';
export const FACEBOOK = 'https://www.facebook.com/profile.php?id=61590935150854';
export const waLink = (number, text) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
export const SERVICES = [
  { id: 'hourly', title: 'Hourly Driver', icon: Clock, desc: 'Errands, appointments and short trips across Delhi NCR.', cta: 'Book an hourly driver', tripType: '' },
  { id: 'monthly', title: 'Monthly Driver', icon: CalendarDays, desc: 'A regular driver for personal, household or commuting needs.', cta: 'Explore monthly hiring', tripType: 'monthly' },
  { id: 'weekly', title: 'Weekly Driver', icon: CalendarRange, desc: 'Flexible driver arrangements when you need help for a week.', cta: 'Book a weekly driver', tripType: '' },
  { id: 'outstation', title: 'Outstation Driver', icon: Route, desc: 'Intercity journeys, weekend getaways and longer-distance travel.', cta: 'Enquire about outstation', tripType: 'outstation' },
  { id: 'corporate', title: 'Corporate Driver', icon: Briefcase, desc: 'Professional drivers for executives and business travel.', cta: 'Request corporate drivers', tripType: '' },
  { id: 'airport', title: 'Airport Transfer', icon: Plane, desc: 'Pickups and drops for Delhi IGI Airport.', cta: 'Arrange an airport driver', tripType: '' },
  { id: 'event', title: 'Event & Wedding Driver', icon: PartyPopper, desc: 'Drivers for weddings, social events and ceremonies across NCR.', cta: 'Enquire about event drivers', tripType: '' },
];
export const TRIP_TYPES = [['one-way', 'One Way'], ['round-trip', 'Round Trip'], ['monthly', 'Monthly'], ['outstation', 'Outstation']];
export const CAR_TYPES = [['hatchback', 'Hatchback (Alto, WagonR, i20)'], ['sedan', 'Sedan (Dzire, Ciaz, Amaze)'], ['suv', 'SUV (Innova, Ertiga, Creta)'], ['luxury', 'Luxury (BMW, Audi, Mercedes)']];
export const TESTIMONIALS = [
  { q: 'Got a driver within 2 hours of messaging on WhatsApp. He was polite, punctual and very professional. Highly recommend ScanDriver for monthly hiring.', n: 'Rahul Sharma', l: 'Sector 50, Gurgaon' },
  { q: "Used ScanDriver for my company's executive travel. The driver was in uniform, arrived early, and drove impeccably. Will continue using for corporate needs.", n: 'Priya Mehta', l: 'Connaught Place, Delhi' },
  { q: "Booked for my daughter's wedding — the driver showed up perfectly on time, was respectful throughout and handled outstation too. Great experience overall.", n: 'Sunita Agarwal', l: 'Noida Sector 18' },
];
