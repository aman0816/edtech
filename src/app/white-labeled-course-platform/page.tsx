'use client';

import React, { useState } from 'react';

export default function WhiteLabeledCoursePlatform() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', email: '', company: '' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [demoSuccess, setDemoSuccess] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoForm.name || !demoForm.email || !demoForm.company) return;
    setDemoSuccess(true);
    setTimeout(() => {
      setShowDemoModal(false);
      setDemoSuccess(false);
      setDemoForm({ name: '', email: '', company: '' });
    }, 1800);
  };
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSuccess(true);
    setTimeout(() => {
      setShowContactModal(false);
      setContactSuccess(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex flex-col items-center justify-start py-0 px-4 font-sans" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
      {/* Hero Section */}
      <section className="w-full relative flex flex-col items-center justify-center pt-16 pb-20 mb-10 overflow-hidden" style={{ background: '#E4E9E1' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #E4E9E1 0%, #A3C9A8 100%)', opacity: 0.7 }}></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight" style={{ color: '#3D4D40' }}>
            Power Your EdTech Brand with Our White-Labeled Course Platform
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-medium" style={{ color: 'rgba(61,77,64,1)' }}>
            No Development, No Delay, No Lakhs Spent
          </p>
          <p className="text-lg mb-8 max-w-3xl mx-auto" style={{ color: '#3D4D40' }}>
            Are you an existing EdTech company tired of burning cash and time building your own courses and LMS? Or a new player wanting to launch FAST with a premium experience under your OWN BRAND? Stop wasting lakhs on course creation, LMS development, and content structuring. Let us do it for you — so you can scale, teach, and earn faster.
          </p>
        </div>
      </section>

      {/* After the hero section, create a single, visually rich section: */}
      <section className="w-full max-w-4xl mx-auto py-10 px-4 space-y-16">
        {/* Stats Row - EdTech Platform Specific */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0 text-center">
          <div className="flex-1 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-indigo-600 mb-1 flex items-center justify-center gap-2"><span>📚</span>20+</div>
            <div className="text-gray-600 text-base md:text-lg">Premium Courses</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-indigo-600 mb-1 flex items-center justify-center gap-2"><span>⚡</span>72hr</div>
            <div className="text-gray-600 text-base md:text-lg">Platform Setup</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-indigo-600 mb-1 flex items-center justify-center gap-2"><span>🏷️</span>100%</div>
            <div className="text-gray-600 text-base md:text-lg">White-Labeled</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-indigo-600 mb-1 flex items-center justify-center gap-2"><span>💸</span>₹5–20L</div>
            <div className="text-gray-600 text-base md:text-lg">Why Spend ₹5–₹20 Lakhs or More?</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4 fade-in-up">
              <span className="text-3xl text-green-500 mt-1">🔒</span>
              <div>
                <span className="font-semibold text-indigo-900 text-lg">100% White-Labeled Learning Platform</span>
                <p className="text-gray-700">Your brand, your domain. Everything your students see — from login to certificate — carries your institution’s name and logo.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 fade-in-up delay-100">
              <span className="text-3xl text-blue-500 mt-1">📦</span>
              <div>
                <span className="font-semibold text-indigo-900 text-lg">20+ Preloaded Premium Courses</span>
                <p className="text-gray-700">Instant access to expertly crafted, ready-to-deploy courses — with notes, quizzes, and assessments. You teach under your brand. We handle the backend.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 fade-in-up delay-200">
              <span className="text-3xl text-yellow-500 mt-1">🚀</span>
              <div>
                <span className="font-semibold text-indigo-900 text-lg">End-to-End Platform Ready in 72 Hours</span>
                <p className="text-gray-700">No developers. No IT headaches. We do the full setup — from branding to platform configuration — and hand you the keys in just 3 days.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4 fade-in-up">
              <span className="text-3xl text-purple-500 mt-1">📈</span>
              <div>
                <span className="font-semibold text-indigo-900 text-lg">Run Campaigns, Track Students</span>
                <p className="text-gray-700">Full control to manage enrollments, monitor progress, run campaigns, and engage users — all on your branded dashboard.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 fade-in-up delay-100">
              <span className="text-3xl text-pink-500 mt-1">🌟</span>
              <div>
                <span className="font-semibold text-indigo-900 text-lg">Perfect for EXISTING EdTechs & New Players</span>
                <p className="text-gray-700">Expand your portfolio, launch new programs, and grow faster — all while keeping your brand front and center.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 fade-in-up delay-200">
              <span className="text-3xl text-orange-500 mt-1">💸</span>
              <div>
                <span className="font-semibold text-indigo-900 text-lg">Why Spend ₹5–₹20 Lakhs or More?</span>
                <p className="text-gray-700 mb-3">Building your own LMS and content library can drain your resources — development, content teams, UI/UX, integrations, and time. Instead, you can:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-base"><span className="text-indigo-600 text-lg">•</span>Go live in 3 days</li>
                  <li className="flex items-center gap-2 text-base"><span className="text-indigo-600 text-lg">•</span>Save lakhs</li>
                  <li className="flex items-center gap-2 text-base"><span className="text-indigo-600 text-lg">•</span>Offer high-quality, market-ready courses</li>
                  <li className="flex items-center gap-2 text-base"><span className="text-indigo-600 text-lg">•</span>Operate under your full brand identity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Highlights */}
        <div className="flex flex-col md:flex-row gap-8 mt-12 items-center justify-center">
          <div className="flex-1 flex flex-col items-center fade-in-up">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-200 to-indigo-100 rounded-lg mb-4 flex items-center justify-center text-5xl">📊</div>
            <div className="font-semibold text-indigo-900 mb-2">Student Dashboard</div>
            <div className="text-gray-600 text-sm text-center">Track progress, view courses, and manage learning — all under your brand.</div>
          </div>
          <div className="flex-1 flex flex-col items-center fade-in-up delay-100">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-200 to-indigo-100 rounded-lg mb-4 flex items-center justify-center text-5xl">📚</div>
            <div className="font-semibold text-indigo-900 mb-2">Course Page</div>
            <div className="text-gray-600 text-sm text-center">Engage with premium content, quizzes, and assessments — fully white-labeled.</div>
          </div>
        </div>

        {/* Why Spend Section (as a highlight) */}
        {/* This section is now moved into the Features Grid */}

        {/* Who Is This Built For */}
        <section className="mt-12 fade-in-up px-2 md:px-0">
          <div className="max-w-2xl mx-auto rounded-xl" style={{ background: '#E4E9E1' }}>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center pt-8" style={{ color: '#3D4D40' }}>
              Who Is This Built For?
            </h2>
            <ul className="flex flex-col gap-4 pb-8 px-6 md:px-12">
              <li className="flex items-start gap-3 text-base md:text-lg" style={{ color: '#3D4D40' }}>
                <span className="mt-0.5" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#A3C9A8"/>
                    <path d="M6.5 10.5L9 13L14 8" stroke="#3D4D40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="font-medium">EdTech platforms seeking rapid, scalable growth without tech headaches</span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg" style={{ color: '#3D4D40' }}>
                <span className="mt-0.5" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#A3C9A8"/>
                    <path d="M6.5 10.5L9 13L14 8" stroke="#3D4D40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="font-medium">Coaching institutes wanting to digitize and expand their reach</span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg" style={{ color: '#3D4D40' }}>
                <span className="mt-0.5" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#A3C9A8"/>
                    <path d="M6.5 10.5L9 13L14 8" stroke="#3D4D40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="font-medium">Training academies aiming to deliver online learning with ease</span>
              </li>
              <li className="flex items-start gap-3 text-base md:text-lg" style={{ color: '#3D4D40' }}>
                <span className="mt-0.5" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#A3C9A8"/>
                    <path d="M6.5 10.5L9 13L14 8" stroke="#3D4D40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="font-medium">New EdTech startups ready to launch fast and make an impact</span>
              </li>
            </ul>
          </div>
        </section>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-4xl mx-auto mb-10 animate-fadeIn text-center">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#3D4D40' }}>Ready to Launch or Expand?</h2>
        <p className="mb-6" style={{ color: '#3D4D40' }}>Whether you’re entering the market or looking to add more power to your existing EdTech brand, we give you the courses, the platform, and the speed — so you can focus on what you do best: educate and grow.</p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            className="bg-[#D4A373] hover:bg-[#b97d3a] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-200 animate-bounceOnce"
            onClick={() => setShowDemoModal(true)}
          >
            Book a Free Demo
          </button>
          <button
            className="bg-[#3D4D40] hover:bg-[#2a362a] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-200 animate-bounceOnce"
            onClick={() => setShowContactModal(true)}
          >
            Talk to Our Team
          </button>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fadeIn">
            <button className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700" onClick={() => setShowDemoModal(false)}>&times;</button>
            <h3 className="text-xl font-bold text-blue-800 mb-4">Book a Free Demo</h3>
            {demoSuccess ? (
              <div className="text-green-600 font-semibold text-center py-8">Thank you! We&apos;ll contact you soon.</div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={demoForm.name}
                  onChange={e => setDemoForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={demoForm.email}
                  onChange={e => setDemoForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
                <input
                  type="text"
                  placeholder="Company / Institution"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={demoForm.company}
                  onChange={e => setDemoForm(f => ({ ...f, company: e.target.value }))}
                  required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition">Submit</button>
              </form>
            )}
          </div>
        </div>
      )}
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fadeIn">
            <button className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700" onClick={() => setShowContactModal(false)}>&times;</button>
            <h3 className="text-xl font-bold text-blue-800 mb-4">Talk to Our Team</h3>
            {contactSuccess ? (
              <div className="text-green-600 font-semibold text-center py-8">Thank you! We&apos;ll be in touch soon.</div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={contactForm.name}
                  onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={contactForm.email}
                  onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
                <textarea
                  placeholder="How can we help you?"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows={4}
                  value={contactForm.message}
                  onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                  required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition">Send Message</button>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        .animate-gradientMove {
          animation: gradientMove 8s ease-in-out infinite alternate;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradientText {
          background-size: 200% 200%;
          animation: gradientText 3s ease-in-out infinite alternate;
        }
        @keyframes gradientText {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-bounceOnce {
          animation: bounceOnce 1.2s cubic-bezier(.28,.84,.42,1) 1;
        }
        @keyframes bounceOnce {
          0% { transform: translateY(0); }
          30% { transform: translateY(-18px); }
          60% { transform: translateY(0); }
          100% { transform: translateY(0); }
        }
        .fade-in-up {
          opacity: 0;
          transform: translateY(24px);
          animation: fadeInUp 0.8s forwards;
        }
        .fade-in-up.delay-100 { animation-delay: 0.1s; }
        .fade-in-up.delay-200 { animation-delay: 0.2s; }
        .fade-in-up.delay-300 { animation-delay: 0.3s; }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </main>
  );
} 
