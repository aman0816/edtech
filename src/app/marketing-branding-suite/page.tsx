'use client';

import React, { useState } from 'react';

export default function MarketingBrandingSuite() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [consultationForm, setConsultationForm] = useState({ name: '', email: '', company: '', message: '' });
  const [proposalForm, setProposalForm] = useState({ name: '', email: '', company: '', goals: '', budget: '' });
  const [campaignForm, setCampaignForm] = useState({ name: '', email: '', company: '', campaignType: '', timeline: '', targetAudience: '' });
  const [consultationSuccess, setConsultationSuccess] = useState(false);
  const [proposalSuccess, setProposalSuccess] = useState(false);
  const [campaignSuccess, setCampaignSuccess] = useState(false);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationSuccess(true);
    setTimeout(() => {
      setShowConsultationModal(false);
      setConsultationSuccess(false);
      setConsultationForm({ name: '', email: '', company: '', message: '' });
    }, 2000);
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProposalSuccess(true);
    setTimeout(() => {
      setShowProposalModal(false);
      setProposalSuccess(false);
      setProposalForm({ name: '', email: '', company: '', goals: '', budget: '' });
    }, 2000);
  };

  const handleCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCampaignSuccess(true);
    setTimeout(() => {
      setShowCampaignModal(false);
      setCampaignSuccess(false);
      setCampaignForm({ name: '', email: '', company: '', campaignType: '', timeline: '', targetAudience: '' });
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex flex-col items-center justify-start py-0 px-4 font-sans" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
      {/* Hero Section */}
      <section className="w-full relative flex flex-col items-center justify-center pt-16 pb-20 mb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/30 via-white/60 to-indigo-100/60"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-900 mb-6 tracking-tight fade-in-up">
            Marketing Suite for EdTechs, Colleges & Training Providers
          </h1>
          <p className="text-xl md:text-2xl text-indigo-700 mb-8 font-medium fade-in-up delay-200">
            We Create Awareness. We Nurture Leads. You Deliver the Impact.
          </p>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto fade-in-up delay-300">
            Your learners are out there—searching, scrolling, and comparing. We help you reach them with the right message, at the right time, on the right platform.
          </p>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto fade-in-up delay-400">
            From building visibility to earning trust, we become your marketing engine—fueling brand recognition, student engagement, and conversion pipelines. You focus on delivering world-class education—we'll make sure the right students are listening.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="w-full max-w-6xl mx-auto py-10 px-4 space-y-20">
        {/* Our Core Services Section */}
        <div className="space-y-12 fade-in-up">
          <h2 className="text-3xl font-bold text-indigo-900 mb-8 text-center tracking-tight">Our Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* WhatsApp Marketing */}
            <div className="bg-white/90 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 fade-in-up">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">WhatsApp Marketing as a Service</h3>
              <p className="text-gray-700 mb-6">Engage directly with prospects and learners on the most responsive platform—WhatsApp.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Broadcast course updates & promotions</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Send event and webinar reminders</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Run automated drip campaigns</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Collect feedback and queries instantly</li>
              </ul>
            </div>

            {/* Email Marketing */}
            <div className="bg-white/90 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 fade-in-up delay-100">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Email Marketing as a Service</h3>
              <p className="text-gray-700 mb-6">Deliver personalized, timely, and strategic emails that educate, nurture, and convert.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Lead nurturing sequences & onboarding workflows</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Launch campaigns for courses, workshops & events</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Monthly newsletters and learning series</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Advanced segmentation & conversion analytics</li>
              </ul>
            </div>

            {/* Influencer Marketing */}
            <div className="bg-white/90 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 fade-in-up delay-200">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Influencer Marketing as a Service</h3>
              <p className="text-gray-700 mb-6">Collaborate with credible voices—student creators, educators, and niche influencers—to amplify your brand presence.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Influencer discovery & campaign planning</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Story-driven content creation</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Cross-platform execution (Instagram, YouTube, LinkedIn)</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Performance reporting & ROI tracking</li>
              </ul>
            </div>

            {/* Social Media Management */}
            <div className="bg-white/90 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 fade-in-up delay-300">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Social Media Management as a Service</h3>
              <p className="text-gray-700 mb-6">Stay visible, consistent, and engaging with content crafted to educate and convert.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Platform strategy & calendar planning</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Posts, reels, carousels & stories</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Community moderation & comment management</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Student-focused messaging across all channels</li>
              </ul>
            </div>

            {/* Graphic Design & Video Production */}
            <div className="bg-white/90 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 fade-in-up delay-400">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Graphic Design & Video Production</h3>
              <p className="text-gray-700 mb-6">Tell your story visually—through stunning creatives, landing pages, and videos that drive engagement.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Custom campaign creatives & course promos</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Sales decks, brochures, and ad banners</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Testimonial videos, explainers & social media reels</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Landing page design & development for campaign launches</li>
              </ul>
            </div>

            {/* Paid Ads */}
            <div className="bg-white/90 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 fade-in-up delay-500">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Paid Ads (Meta, Google, LinkedIn)</h3>
              <p className="text-gray-700 mb-6">Launch performance-based ad campaigns that attract the right audience and convert them into learners.</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Full-funnel ad setup (awareness to conversion)</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Hyper-targeted student segmentation</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Budget optimization & creative testing</li>
                <li className="flex items-center gap-2 text-sm text-gray-600"><span className="text-green-500">●</span>Click-through & enrollment tracking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="space-y-12 fade-in-up">
          <h2 className="text-3xl font-bold text-indigo-900 mb-8 text-center tracking-tight">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4 fade-in-up">
              <span className="text-2xl text-green-500 mt-1">🎓</span>
              <div>
                <h4 className="font-semibold text-indigo-900 text-lg mb-2">Education-Centric Approach</h4>
                <p className="text-gray-700">We specialize in the student journey—understanding what engages, what converts, and what builds trust.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 fade-in-up delay-100">
              <span className="text-2xl text-green-500 mt-1">🤝</span>
              <div>
                <h4 className="font-semibold text-indigo-900 text-lg mb-2">Hands-Free Execution</h4>
                <p className="text-gray-700">From ideation to implementation, we manage everything. No need to hire or train internal marketing teams.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 fade-in-up delay-200">
              <span className="text-2xl text-green-500 mt-1">🏷️</span>
              <div>
                <h4 className="font-semibold text-indigo-900 text-lg mb-2">White-Labeled Delivery</h4>
                <p className="text-gray-700">Every message, post, or campaign we create carries your branding—not ours.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 fade-in-up delay-300">
              <span className="text-2xl text-green-500 mt-1">📈</span>
              <div>
                <h4 className="font-semibold text-indigo-900 text-lg mb-2">Scalable & Measurable</h4>
                <p className="text-gray-700">Launch a one-time webinar or a year-long funnel—our systems adapt to your scale and track every metric.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Who We Work With Section */}
        <div className="space-y-8 fade-in-up">
          <h2 className="text-3xl font-bold text-indigo-900 mb-8 text-center tracking-tight">Who We Work With</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/90 rounded-xl p-8 shadow-lg fade-in-up">
              <div className="text-3xl mb-4">🚀</div>
              <h4 className="font-semibold text-indigo-900 text-lg mb-3">EdTech Startups & Platforms</h4>
              <p className="text-gray-700">Looking to scale fast without in-house marketing teams</p>
            </div>
            <div className="bg-white/90 rounded-xl p-8 shadow-lg fade-in-up delay-100">
              <div className="text-3xl mb-4">🏫</div>
              <h4 className="font-semibold text-indigo-900 text-lg mb-3">Colleges & Universities</h4>
              <p className="text-gray-700">Aiming to promote online/offline programs or special events</p>
            </div>
            <div className="bg-white/90 rounded-xl p-8 shadow-lg fade-in-up delay-200">
              <div className="text-3xl mb-4">🎯</div>
              <h4 className="font-semibold text-indigo-900 text-lg mb-3">Coaching & Training Institutes</h4>
              <p className="text-gray-700">Running lead generation for bootcamps, webinars, and certifications</p>
            </div>
            <div className="bg-white/90 rounded-xl p-8 shadow-lg fade-in-up delay-300">
              <div className="text-3xl mb-4">🤝</div>
              <h4 className="font-semibold text-indigo-900 text-lg mb-3">CSR & Skilling Initiatives</h4>
              <p className="text-gray-700">Driving awareness and registrations across diverse learner segments</p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="space-y-8 fade-in-up">
          <h2 className="text-3xl font-bold text-indigo-900 mb-8 text-center tracking-tight">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center fade-in-up">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h4 className="font-semibold text-indigo-900 text-lg mb-3">You share your goals</h4>
              <p className="text-gray-700">Course promotion, lead nurturing, event engagement, etc.</p>
            </div>
            <div className="text-center fade-in-up delay-100">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h4 className="font-semibold text-indigo-900 text-lg mb-3">We plan, build, and run multi-channel campaigns</h4>
              <p className="text-gray-700">Across WhatsApp, email, social, ads & more</p>
            </div>
            <div className="text-center fade-in-up delay-200">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h4 className="font-semibold text-indigo-900 text-lg mb-3">You receive performance reports, insights, and real results</h4>
              <p className="text-gray-700">While we work behind the scenes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-4xl mx-auto py-16 px-4 text-center fade-in-up">
        <h2 className="text-3xl font-bold text-indigo-900 mb-8">Let's Build Your Brand, Together</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button
            className="bg-gradient-to-r from-indigo-600 to-blue-400 hover:from-indigo-700 hover:to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-200 animate-bounceOnce"
            onClick={() => setShowConsultationModal(true)}
          >
            Book a Free Consultation
          </button>
          <button
            className="bg-gradient-to-r from-blue-400 to-indigo-600 hover:from-blue-500 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-200 animate-bounceOnce"
            onClick={() => setShowProposalModal(true)}
          >
            Request a Tailored Marketing Proposal
          </button>
          <button
            className="bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-200 animate-bounceOnce"
            onClick={() => setShowCampaignModal(true)}
          >
            Launch Your First Campaign in 48 Hours
          </button>
        </div>
        <div className="mt-8 text-center fade-in-up delay-300">
          <p className="text-xl text-indigo-700 font-medium mb-2">You build the learning experience.</p>
          <p className="text-lg text-gray-700">We make sure the right students find it.</p>
        </div>
      </section>

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-indigo-900 mb-6">Book a Free Consultation</h3>
            {consultationSuccess ? (
              <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <p className="text-green-600 font-semibold">Thank you! We'll contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={consultationForm.name}
                    onChange={(e) => setConsultationForm({...consultationForm, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={consultationForm.email}
                    onChange={(e) => setConsultationForm({...consultationForm, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={consultationForm.company}
                    onChange={(e) => setConsultationForm({...consultationForm, company: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={consultationForm.message}
                    onChange={(e) => setConsultationForm({...consultationForm, message: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Tell us about your marketing needs..."
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConsultationModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Proposal Modal */}
      {showProposalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-indigo-900 mb-6">Request a Tailored Marketing Proposal</h3>
            {proposalSuccess ? (
              <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <p className="text-green-600 font-semibold">Thank you! We'll send you a tailored proposal soon.</p>
              </div>
            ) : (
              <form onSubmit={handleProposalSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={proposalForm.name}
                    onChange={(e) => setProposalForm({...proposalForm, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={proposalForm.email}
                    onChange={(e) => setProposalForm({...proposalForm, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={proposalForm.company}
                    onChange={(e) => setProposalForm({...proposalForm, company: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marketing Goals</label>
                  <textarea
                    required
                    rows={3}
                    value={proposalForm.goals}
                    onChange={(e) => setProposalForm({...proposalForm, goals: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Describe your marketing goals and objectives..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                  <select
                    required
                    value={proposalForm.budget}
                    onChange={(e) => setProposalForm({...proposalForm, budget: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select budget range</option>
                    <option value="Under ₹50K">Under ₹50K</option>
                    <option value="₹50K - ₹1L">₹50K - ₹1L</option>
                    <option value="₹1L - ₹5L">₹1L - ₹5L</option>
                    <option value="₹5L - ₹10L">₹5L - ₹10L</option>
                    <option value="Above ₹10L">Above ₹10L</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowProposalModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Campaign Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-indigo-900 mb-6">Launch Your First Campaign in 48 Hours</h3>
            {campaignSuccess ? (
              <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <p className="text-green-600 font-semibold">Thank you! We'll launch your campaign within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleCampaignSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={campaignForm.name}
                    onChange={(e) => setCampaignForm({...campaignForm, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={campaignForm.email}
                    onChange={(e) => setCampaignForm({...campaignForm, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={campaignForm.company}
                    onChange={(e) => setCampaignForm({...campaignForm, company: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
                  <select
                    required
                    value={campaignForm.campaignType}
                    onChange={(e) => setCampaignForm({...campaignForm, campaignType: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select campaign type</option>
                    <option value="Course Promotion">Course Promotion</option>
                    <option value="Lead Generation">Lead Generation</option>
                    <option value="Event Marketing">Event Marketing</option>
                    <option value="Brand Awareness">Brand Awareness</option>
                    <option value="Student Engagement">Student Engagement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timeline</label>
                  <select
                    required
                    value={campaignForm.timeline}
                    onChange={(e) => setCampaignForm({...campaignForm, timeline: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select timeline</option>
                    <option value="1 week">1 week</option>
                    <option value="2 weeks">2 weeks</option>
                    <option value="1 month">1 month</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                  <input
                    type="text"
                    required
                    value={campaignForm.targetAudience}
                    onChange={(e) => setCampaignForm({...campaignForm, targetAudience: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., College students, Working professionals..."
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Launch Campaign
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCampaignModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .fade-in-up.delay-100 {
          animation-delay: 0.1s;
        }
        .fade-in-up.delay-200 {
          animation-delay: 0.2s;
        }
        .fade-in-up.delay-300 {
          animation-delay: 0.3s;
        }
        .fade-in-up.delay-400 {
          animation-delay: 0.4s;
        }
        .fade-in-up.delay-500 {
          animation-delay: 0.5s;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-bounceOnce {
          animation: bounceOnce 0.6s ease-out;
        }
        @keyframes bounceOnce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </main>
  );
} 