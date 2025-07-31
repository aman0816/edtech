'use client';

import React, { useState } from 'react';

export default function WorkshopsWebinarsBootcamps() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [consultationForm, setConsultationForm] = useState({ name: '', email: '', company: '', message: '' });
  const [proposalForm, setProposalForm] = useState({ name: '', email: '', company: '', requirements: '', budget: '' });
  const [trainingForm, setTrainingForm] = useState({ name: '', email: '', company: '', topic: '', duration: '', audience: '' });
  const [consultationSuccess, setConsultationSuccess] = useState(false);
  const [proposalSuccess, setProposalSuccess] = useState(false);
  const [trainingSuccess, setTrainingSuccess] = useState(false);

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
      setProposalForm({ name: '', email: '', company: '', requirements: '', budget: '' });
    }, 2000);
  };

  const handleTrainingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrainingSuccess(true);
    setTimeout(() => {
      setShowTrainingModal(false);
      setTrainingSuccess(false);
      setTrainingForm({ name: '', email: '', company: '', topic: '', duration: '', audience: '' });
    }, 2000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-0 px-4 font-sans" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif', background: '#FAF9EE' }}>
      {/* Hero Section */}
      <section className="w-full relative flex flex-col items-center justify-center pt-16 pb-20 mb-10 overflow-hidden" style={{ background: '#FAF9EE' }}>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-left md:text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight leading-tight md:leading-tight" style={{ color: '#3D4D40', letterSpacing: '.01em' }}>
            Training, Bootcamps & Webinars as a Service
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-semibold md:font-bold md:mb-10" style={{ color: '#4F564F', letterSpacing: '.01em' }}>
            From 1-Hour Webinars to Year-Long Programs — Fully Delivered Under Your Brand
          </p>
          <p className="text-lg mb-6 max-w-3xl mx-auto" style={{ color: '#4F564F' }}>
            We help EdTech platforms, colleges, and institutions deliver expert-led training programs—customized to your audience, powered by our diverse network of mentors, and fully managed by us.
          </p>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#4F564F' }}>
            Whether you need a quick 1-hour session or a full-year curriculum rollout, just tell us the <span className="font-bold" style={{ color: '#3D4D40' }}>domain, duration, and target audience</span>—we'll handle the rest.
          </p>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="w-full py-14 px-2 md:px-0" style={{ background: '#F7F7F7' }}>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center drop-shadow-lg" style={{ color: '#3D4D40' }}>What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="text-4xl text-green-500 mb-4">🎓</div>
            <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#3D4D40' }}>Live Trainings</h3>
            <p className="text-center" style={{ color: '#4F564F' }}>Interactive sessions delivered by domain experts—ideal for upskilling, onboarding, or curriculum enrichment.</p>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="text-4xl text-green-500 mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#3D4D40' }}>Bootcamps</h3>
            <p className="text-center" style={{ color: '#4F564F' }}>Deep-dive, project-based learning programs designed to deliver tangible outcomes, skill mastery, and learner transformation.</p>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="text-4xl text-green-500 mb-4">📺</div>
            <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#3D4D40' }}>Webinars</h3>
            <p className="text-center" style={{ color: '#4F564F' }}>Crisp, high-value sessions ideal for engaging large groups on trending or specialized topics.</p>
          </div>
        </div>
      </section>

      {/* Why Partner With Us Section */}
      <section className="w-full py-14 px-2 md:px-0" style={{ background: '#F7F7F7' }}>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center drop-shadow-lg" style={{ color: '#3D4D40' }}>Why Partner With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="rounded-2xl shadow-lg p-8 flex items-start gap-4" style={{ background: 'white' }}>
            <span className="text-4xl text-green-500 mt-1">⏱️</span>
            <div>
              <h4 className="font-semibold text-lg mb-2" style={{ color: '#3D4D40' }}>Flexible Session Formats</h4>
              <p style={{ color: '#4F564F' }}>From 1-hour sessions to 12-month programs, we support a wide range of durations to match your learning goals.</p>
            </div>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex items-start gap-4" style={{ background: 'white' }}>
            <span className="text-4xl text-green-500 mt-1">👥</span>
            <div>
              <h4 className="font-semibold text-lg mb-2" style={{ color: '#3D4D40' }}>Diverse Mentor Pool</h4>
              <p style={{ color: '#4F564F' }}>Access top-tier professionals, instructors, and industry veterans across domains like AI, Data Science, Design, Marketing, Cybersecurity, Cloud, EdTech, and more.</p>
            </div>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex items-start gap-4" style={{ background: 'white' }}>
            <span className="text-4xl text-green-500 mt-1">🎯</span>
            <div>
              <h4 className="font-semibold text-lg mb-2" style={{ color: '#3D4D40' }}>You Decide, We Execute</h4>
              <p style={{ color: '#4F564F' }}>Share the topic and desired duration—we manage mentor onboarding, curriculum development, delivery, assessments, and learner support.</p>
            </div>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex items-start gap-4" style={{ background: 'white' }}>
            <span className="text-4xl text-green-500 mt-1">🏷️</span>
            <div>
              <h4 className="font-semibold text-lg mb-2" style={{ color: '#3D4D40' }}>Fully White-Labeled</h4>
              <p style={{ color: '#4F564F' }}>Your brand, your platform, your learners—we operate invisibly in the background to deliver premium learning under your name.</p>
            </div>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex items-start gap-4" style={{ background: 'white' }}>
            <span className="text-4xl text-green-500 mt-1">📊</span>
            <div>
              <h4 className="font-semibold text-lg mb-2" style={{ color: '#3D4D40' }}>Comprehensive Coverage</h4>
              <p style={{ color: '#4F564F' }}>We handle everything: content, projects, certificates, session logistics, attendance, feedback, analytics, and more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Complete Service Includes Section */}
      <section className="w-full py-14 px-2 md:px-0" style={{ background: '#F7F7F7' }}>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center drop-shadow-lg" style={{ color: '#3D4D40' }}>Our Complete Service Includes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="text-4xl text-green-500 mb-3">👨‍🏫</div>
            <p className="font-medium text-center" style={{ color: '#3D4D40' }}>Mentor sourcing & training</p>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="text-4xl text-green-500 mb-3">📚</div>
            <p className="font-medium text-center" style={{ color: '#3D4D40' }}>Curriculum and content development</p>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="text-4xl text-green-500 mb-3">🎨</div>
            <p className="font-medium text-center" style={{ color: '#3D4D40' }}>Branded learning materials</p>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="text-4xl text-green-500 mb-3">🎥</div>
            <p className="font-medium text-center" style={{ color: '#3D4D40' }}>Live session delivery (virtual or in-person)</p>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="text-4xl text-green-500 mb-3">📝</div>
            <p className="font-medium text-center" style={{ color: '#3D4D40' }}>Assignments, projects, and feedback</p>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="text-4xl text-green-500 mb-3">💬</div>
            <p className="font-medium text-center" style={{ color: '#3D4D40' }}>Learner communication & engagement</p>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="text-4xl text-green-500 mb-3">📈</div>
            <p className="font-medium text-center" style={{ color: '#3D4D40' }}>Post-session analytics and reports</p>
          </div>
        </div>
      </section>

      {/* Who Is This For Section */}
      <section className="w-full py-14 px-2 md:px-0" style={{ background: '#F7F7F7' }}>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center drop-shadow-lg" style={{ color: '#3D4D40' }}>Who Is This For?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="text-4xl text-green-500 mb-4">🎓</div>
            <h4 className="font-semibold text-lg mb-3 text-center" style={{ color: '#3D4D40' }}>EdTech Platforms</h4>
            <p className="text-center" style={{ color: '#4F564F' }}>Expanding live offerings without in-house operational load</p>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="text-4xl text-green-500 mb-4">🏫</div>
            <h4 className="font-semibold text-lg mb-3 text-center" style={{ color: '#3D4D40' }}>Universities & Colleges</h4>
            <p className="text-center" style={{ color: '#4F564F' }}>Enriching curriculum with industry-led instruction</p>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="text-4xl text-green-500 mb-4">🏢</div>
            <h4 className="font-semibold text-lg mb-3 text-center" style={{ color: '#3D4D40' }}>Corporates & L&D Teams</h4>
            <p className="text-center" style={{ color: '#4F564F' }}>Delivering branded internal or external skilling</p>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="text-4xl text-green-500 mb-4">🤝</div>
            <h4 className="font-semibold text-lg mb-3 text-center" style={{ color: '#3D4D40' }}>CSR & Skill Development Programs</h4>
            <p className="text-center" style={{ color: '#4F564F' }}>Looking to launch scalable learning interventions</p>
          </div>
        </div>
      </section>

      {/* Launch Your Program Section */}
      <section className="w-full py-14 px-2 md:px-0" style={{ background: '#FAF9EE' }}>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center drop-shadow-lg" style={{ color: '#3D4D40' }}>Launch Your Program in 3 Easy Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="w-16 h-16 bg-[#3D4D40] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
            <h4 className="font-semibold text-lg mb-3 text-center" style={{ color: '#3D4D40' }}>Tell us your topic, audience, and preferred duration</h4>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="w-16 h-16 bg-[#3D4D40] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
            <h4 className="font-semibold text-lg mb-3 text-center" style={{ color: '#3D4D40' }}>We plan and execute your training from start to finish</h4>
          </div>
          <div className="rounded-2xl shadow-lg p-8 flex flex-col items-center" style={{ background: 'white' }}>
            <div className="w-16 h-16 bg-[#3D4D40] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
            <h4 className="font-semibold text-lg mb-3 text-center" style={{ color: '#3D4D40' }}>You deliver a branded, high-impact learning experience—stress-free</h4>
          </div>
        </div>
        <div className="text-center mt-12 fade-in-up delay-300">
          <p className="text-xl font-medium mb-4" style={{ color: '#3D4D40' }}>Focus on learner growth. We'll handle the backend.</p>
          <p className="text-lg" style={{ color: '#4F564F' }}>Deliver quality education—without building everything from scratch.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-4xl mx-auto py-16 px-4 text-center fade-in-up" style={{ background: '#FAF9EE' }}>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center drop-shadow-lg" style={{ color: '#3D4D40' }}>Ready to Get Started?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button
            className="bg-gradient-to-r from-indigo-600 to-blue-400 hover:from-indigo-700 hover:to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-200 animate-bounceOnce"
            onClick={() => setShowConsultationModal(true)}
          >
            Book a Free Consultation
          </button>
          <button
            className="bg-gradient-to-r from-indigo-600 to-blue-400 hover:from-indigo-700 hover:to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-200 animate-bounceOnce"
            onClick={() => setShowProposalModal(true)}
          >
            Request a Custom Proposal
          </button>
          <button
            className="bg-gradient-to-r from-indigo-600 to-blue-400 hover:from-indigo-700 hover:to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-200 animate-bounceOnce"
            onClick={() => setShowTrainingModal(true)}
          >
            Start Your First White-Labeled Training Session
          </button>
        </div>
      </section>

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#3D4D40' }}>Book a Free Consultation</h3>
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
                    placeholder="Tell us about your training needs..."
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
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#3D4D40' }}>Request a Custom Proposal</h3>
            {proposalSuccess ? (
              <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <p className="text-green-600 font-semibold">Thank you! We'll send you a custom proposal soon.</p>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                  <textarea
                    required
                    rows={3}
                    value={proposalForm.requirements}
                    onChange={(e) => setProposalForm({...proposalForm, requirements: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Describe your training requirements..."
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

      {/* Training Session Modal */}
      {showTrainingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6" style={{ color: '#3D4D40' }}>Start Your First White-Labeled Training Session</h3>
            {trainingSuccess ? (
              <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <p className="text-green-600 font-semibold">Thank you! We'll get your training session started soon.</p>
              </div>
            ) : (
              <form onSubmit={handleTrainingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={trainingForm.name}
                    onChange={(e) => setTrainingForm({...trainingForm, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={trainingForm.email}
                    onChange={(e) => setTrainingForm({...trainingForm, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={trainingForm.company}
                    onChange={(e) => setTrainingForm({...trainingForm, company: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Training Topic</label>
                  <input
                    type="text"
                    required
                    value={trainingForm.topic}
                    onChange={(e) => setTrainingForm({...trainingForm, topic: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., Data Science, AI, Marketing..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <select
                    required
                    value={trainingForm.duration}
                    onChange={(e) => setTrainingForm({...trainingForm, duration: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select duration</option>
                    <option value="1-2 hours">1-2 hours</option>
                    <option value="Half day">Half day</option>
                    <option value="Full day">Full day</option>
                    <option value="1 week">1 week</option>
                    <option value="1 month">1 month</option>
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="1 year">1 year</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                  <input
                    type="text"
                    required
                    value={trainingForm.audience}
                    onChange={(e) => setTrainingForm({...trainingForm, audience: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="e.g., Students, Professionals, Beginners..."
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Start Training
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTrainingModal(false)}
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
        .fade-in-up.delay-600 {
          animation-delay: 0.6s;
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