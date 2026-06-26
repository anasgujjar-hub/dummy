import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Trash2, HelpCircle, ShieldAlert } from 'lucide-react';
import { ContactInquiry } from '../types';

interface ContactViewProps {
  inquiries: ContactInquiry[];
  onAddInquiry: (inquiry: ContactInquiry) => void;
  onClearInquiries: () => void;
}

export default function ContactView({
  inquiries,
  onAddInquiry,
  onClearInquiries
}: ContactViewProps) {
  // Contact Form Fields
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [latestTicket, setLatestTicket] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !emailAddress || !subject || !message) {
      setErrorMsg('Please fill out all the required field markers.');
      return;
    }
    setErrorMsg('');

    const newInquiry: ContactInquiry = {
      id: 'MR-TKT-' + Math.floor(10000 + Math.random() * 90000),
      fullName,
      email: emailAddress,
      phone: phoneNumber,
      subject,
      message,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Received'
    };

    onAddInquiry(newInquiry);
    setLatestTicket(newInquiry.id);
    setFormSubmitted(true);

    // Reset Form
    setFullName('');
    setEmailAddress('');
    setPhoneNumber('');
    setSubject('');
    setMessage('');

    // Highlight message
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  const businessHours = [
    { days: 'Monday - Friday', time: '8:00 AM - 6:00 PM' },
    { days: 'Saturday', time: '9:00 AM - 3:00 PM' },
    { days: 'Sunday', time: 'Closed', inactive: true }
  ];

  return (
    <div className="w-full" id="contact-us-view-wrapper">
      
      {/* Page Title */}
      <section className="bg-milk-900 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-butter-300 font-bold">Connect With Us</span>
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight">Ready to Source Welfare-Certified Milk?</h1>
          <p className="text-sm font-light text-milk-100 max-w-xl mx-auto leading-relaxed">
            Contact Milk Rush for bulk milk supply, partnerships, and dairy solutions.
          </p>
        </div>
      </section>

      {/* Main Coordinate cards + form grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left column: coords and coordinates list */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-butter-600 font-bold block">HQ Coordinates</span>
              <h2 className="font-display font-extrabold text-2xl text-milk-900 tracking-tight leading-none">Get In Touch</h2>
              <p className="text-xs text-milk-500 font-light mt-1 pl-0.5">We respond to standard inquiries within 12 business hours.</p>
            </div>

            {/* Direct Cards Stack */}
            <div className="space-y-4">
              {/* Address card */}
              <div className="flex gap-4 p-5 rounded-2xl bg-dairy-cream border border-milk-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-white border border-milk-100 text-milk-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-butter-500" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-milk-400">Main Office & Production</h4>
                  <p className="text-xs sm:text-sm text-milk-900 font-medium mt-1">214 Green Meadow Road</p>
                  <p className="text-xs text-milk-600 font-light">Brookvale, CA 90210</p>
                </div>
              </div>

              {/* Phone card */}
              <div className="flex gap-4 p-5 rounded-2xl bg-dairy-cream border border-milk-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-white border border-milk-100 text-milk-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-butter-500" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-milk-400 font-bold">Phone Hotline</h4>
                  <p className="text-xs sm:text-sm text-milk-900 font-medium mt-1 font-mono">+1 (555) 248-7613</p>
                  <p className="text-xs text-milk-500 font-light">Toll-free customer support line</p>
                </div>
              </div>

              {/* Email card */}
              <div className="flex gap-4 p-5 rounded-2xl bg-dairy-cream border border-milk-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-white border border-milk-100 text-milk-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-butter-500" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-milk-400 font-bold">Email Dispatch</h4>
                  <p className="text-xs sm:text-sm text-milk-900 font-semibold mt-1 font-mono text-milk-800 underline">hello@milkrise.com</p>
                  <p className="text-[10px] text-milk-500 font-light mt-0.5">Wholesale: orders@milkrise.com</p>
                </div>
              </div>
            </div>

            {/* Business hours Box */}
            <div className="p-6 rounded-3xl bg-milk-900 text-white shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-milk-800 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-butter-300 animate-pulse" />
                <h4 className="font-display font-bold text-sm uppercase tracking-wider">Business Gate Hours</h4>
              </div>
              
              <div className="space-y-2.5 font-mono text-xs">
                {businessHours.map((bh, idx) => (
                  <div key={idx} className="flex justify-between items-center text-milk-100">
                    <span className="font-light">{bh.days}</span>
                    <span className={`font-semibold ${bh.inactive ? 'text-milk-400 italic' : 'text-white'}`}>{bh.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right column: submission Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[2rem] border border-milk-100 shadow-sm space-y-6">
            <div className="space-y-1 pb-4 border-b border-milk-50">
              <h3 className="font-display font-black text-xl text-milk-900">Send an Inquiry Message</h3>
              <p className="text-xs text-milk-500 font-light">We protect and secure your contact data on local farming databases.</p>
            </div>

            {/* Active alert of inquiry success */}
            <AnimatePresence>
              {formSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex gap-3 text-xs"
                >
                  <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600 animate-bounce" />
                  <div>
                    <strong>Message Submitted!</strong> Your ticket has been recorded with identifier status reference: <strong>{latestTicket}</strong>. Thank you for testing the milk ledger!
                  </div>
                </motion.div>
              )}
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 rounded-xl bg-rose-50 text-rose-800 border border-rose-100 flex gap-3 text-xs"
                >
                  <ShieldAlert className="w-5 h-5 shrink-0 text-rose-600" />
                  <div>
                    <strong>Required fields missing:</strong> {errorMsg}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-milk-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Grandparents Sterling"
                    className="w-full px-3.5 py-2.5 text-xs text-milk-800 placeholder-milk-300 border border-milk-200 bg-white rounded-xl focus:outline-none focus:border-milk-500 focus:ring-1 focus:ring-milk-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-milk-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="family@dairy.com"
                    className="w-full px-3.5 py-2.5 text-xs text-milk-800 placeholder-milk-300 border border-milk-200 bg-white rounded-xl focus:outline-none focus:border-milk-500 focus:ring-1 focus:ring-milk-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-milk-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 text-xs text-milk-800 placeholder-milk-300 border border-milk-200 bg-white rounded-xl focus:outline-none focus:border-milk-500 focus:ring-1 focus:ring-milk-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-milk-700 mb-1">
                    Inquiry Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Wholesale order / Pasteurizer specs / Retailer"
                    className="w-full px-3.5 py-2.5 text-xs text-milk-800 placeholder-milk-300 border border-milk-200 bg-white rounded-xl focus:outline-none focus:border-milk-500 focus:ring-1 focus:ring-milk-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-milk-700 mb-1">
                  Message Body *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our dairy handlers support you? Leave detailed requests..."
                  className="w-full px-3.5 py-2.5 text-xs text-milk-800 placeholder-milk-300 border border-milk-200 bg-white rounded-xl focus:outline-none focus:border-milk-500 focus:ring-1 focus:ring-milk-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-milk-800 hover:bg-milk-900 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow shadow-milk-800/20 flex items-center justify-center gap-2 group-hover:scale-[1.01]"
              >
                <Send className="w-3.5 h-3.5 shrink-0" />
                Submit Verification Inquiry
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 2. Interactive SVG styled Vector Map Section */}
      <section className="bg-dairy-cream border-y border-milk-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 text-center space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-butter-600 font-bold block">Visit MilkRise</span>
            <h3 className="font-display font-bold text-2xl text-milk-900">Find us at our main office and production center, where quality dairy begins.</h3>
            <p className="text-xs text-milk-500 font-sans max-w-lg mx-auto leading-relaxed">
              Experience the lush green clover acres of our cooperative pastures at Brookvale Ridge CA. Tap nodes to discover coordinates.
            </p>
          </div>

          {/* Majestic Custom hand-crafted Vector Interactive Map Card */}
          <div className="rounded-[2.5rem] border border-milk-100 bg-white shadow-sm overflow-hidden p-6 md:p-8 relative">
            
            {/* Map Canvas Visual container */}
            <div className="aspect-[2/1] bg-milk-50/20 border border-milk-100 rounded-[2rem] relative overflow-hidden flex items-center justify-center">
              
              {/* Background abstract layout of farm pastures */}
              <svg className="absolute inset-0 w-full h-full text-emerald-500/10 pointer-events-none fill-current select-none">
                {/* Grass patches */}
                <path d="M50 80 Q150 20, 250 80 T450 80 T650 80 T850 80 Z" />
                <path d="M100 280 Q350 180, 500 280 T800 280 Z" className="text-emerald-500/5" />
                
                {/* Roads */}
                <line x1="0" y1="120" x2="1600" y2="120" stroke="rgba(18, 62, 50, 0.08)" strokeWidth="12" />
                <line x1="450" y1="0" x2="450" y2="600" stroke="rgba(18, 62, 50, 0.08)" strokeWidth="8" />
                
                {/* Pastures */}
                <circle cx="200" cy="220" r="100" className="text-emerald-500/5 hover:text-emerald-500/10 transition-colors" />
                <circle cx="850" cy="190" r="140" className="text-emerald-500/5 hover:text-emerald-500/10 transition-colors" />
                <circle cx="1100" cy="280" r="90" className="text-emerald-500/5 hover:text-emerald-500/10 transition-colors" />
              </svg>

              {/* Tickers */}
              <div className="absolute top-4 left-4 flex gap-1.5 p-2 rounded-xl bg-white border border-milk-150 text-[10px] font-mono shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse my-auto" />
                <span>Brookvale Ridge Active Sector GPS</span>
              </div>

              {/* Interactive Node: Brookvale HQ Pin */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-1 text-center"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <div 
                  onClick={() => alert('📍 MilkRise Co-op HQ verified: 214 Green Meadow road. Touch support if you get lost!')}
                  className="w-10 h-10 rounded-2xl bg-milk-850 text-white flex items-center justify-center shadow-lg shadow-milk-900/40 border border-milk-700 cursor-pointer hover:bg-milk-900 hover:scale-105 transition-all"
                >
                  <MapPin className="w-5 h-5 text-butter-300" />
                </div>
                <div className="p-2.5 rounded-2xl bg-white/95 border border-milk-100 shadow-md text-[10px] max-w-[170px]">
                  <h5 className="font-display font-extrabold text-[#123e32]">MilkRise HQ & Farm</h5>
                  <p className="text-milk-500 font-light mt-0.5 leading-tight">214 Green Meadow Road, CA</p>
                </div>
              </motion.div>

              {/* Complementary decorative nodes on pasture (e.g. Pastures, Milking Barns) */}
              <div className="absolute top-[30%] left-[25%] p-2 rounded-xl bg-white/80 border border-milk-50 font-mono text-[9px] text-milk-600 flex gap-1.5 items-center">
                <span>🍀 Active Grazing Pasture A</span>
              </div>

              <div className="absolute bottom-[20%] right-[20%] p-2 rounded-xl bg-white/80 border border-milk-50 font-mono text-[9px] text-milk-600 flex gap-1.5 items-center">
                <span>🍼 Clean Milking Parlor B</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Inquiry submission log list (Displays submitted tickets in this session) */}
      <AnimatePresence>
        {inquiries.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 py-12 space-y-4">
            <div className="flex justify-between items-center border-b border-milk-100 pb-3">
              <div>
                <h4 className="font-display font-semibold text-sm text-milk-900 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-butter-500" />
                  Your Active Device Inquiry Tickets ({inquiries.length})
                </h4>
                <p className="text-[10px] text-milk-500">Submitted in this browser session. Logs dry-flush on page refresh.</p>
              </div>
              <button
                onClick={onClearInquiries}
                className="text-[10px] font-mono font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Flush Tickets
              </button>
            </div>

            <div className="space-y-3">
              {inquiries.map((tkt) => (
                <div 
                  key={tkt.id}
                  className="p-4 rounded-2xl bg-white border border-dashed border-milk-200 shadow-sm flex flex-col sm:flex-row justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-milk-800">{tkt.id}</span>
                      <span className="text-[10px] text-milk-400 font-mono">({tkt.date})</span>
                    </div>
                    <p className="text-milk-900 font-semibold">{tkt.subject}</p>
                    <p className="text-milk-600 font-light italic bg-milk-50/50 p-2.5 rounded-lg border border-milk-100">{tkt.message}</p>
                    <p className="text-[10px] text-milk-400 font-mono">From: <strong>{tkt.fullName}</strong> • {tkt.email} {tkt.phone && `• ${tkt.phone}`}</p>
                  </div>
                  <div className="self-start sm:self-center">
                    <span className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold font-semibold uppercase text-[9px] border border-emerald-100">
                      ● Active Received
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </AnimatePresence>

    </div>
  );
}
