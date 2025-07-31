'use client';

import React, { useState } from 'react';
import Button from './components/Button';
import ServiceCard from './components/ServiceCard';
import Testimonial from './components/Testimonial';
import Footer from './components/Footer';
import Link from 'next/link';

const services = [
  { title: 'Resume Builder Platform', icon: '/images/resu.png', href: '/resume-builder' },
  { title: 'Digital Certificate Issuer', icon: '/images/digital-signature.png', href: '/digital-certificate-issuer' },
  { title: 'Workshops, Webinars & Bootcamps', icon: '/images/meeting.png', href: '/workshops-webinars-bootcamps' },
  { title: 'CRM for Colleges & EdTechs', icon: '/images/crm.png' },
  { title: 'Marketing & Branding Suite', icon: '/images/channel.png', href: '/marketing-branding-suite' },
  { title: 'Lead Generation Services', icon: '/images/lead-generation.png' },
  { title: 'Custom Software & White-Labeled Portals', icon: '/images/customer-care.png', href: '/white-labeled-course-platform' },
  { title: 'White-Labeled Content for Tech & Non-Tech', icon: '/images/video.png' },
];

const testimonials = [
  { quote: 'Our student engagement grew by 40% after integrating their backend solutions!', author: 'EdTech Platform CEO' },
  { quote: 'Seamless, white-labeled delivery let us focus on our learners, not the tech.', author: 'College Director' },
  { quote: 'Their CRM and marketing suite powered our admissions growth!', author: 'EdTech Marketing Lead' },
];

function buttonLinkStyle(variant: 'primary' | 'highlight') {
  return {
    ...(variant === 'primary'
      ? { background: 'var(--color-primary)', color: '#fff' }
      : { background: 'var(--color-highlight)', color: '#fff' }),
    border: 'none',
    borderRadius: 8,
    padding: '0.9em 2em',
    fontWeight: 600,
    fontSize: '1.1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    cursor: 'pointer',
    transition: 'background 0.2s, transform 0.15s',
    outline: 'none',
    display: 'inline-block',
    textDecoration: 'none',
    margin: 0,
  };
}

export default function HomePage() {
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [consultationForm, setConsultationForm] = useState({ name: '', email: '', company: '', message: '' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', company: '', message: '' });
  const [consultationSuccess, setConsultationSuccess] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultationSuccess(true);
    setTimeout(() => {
      setShowConsultationModal(false);
      setConsultationSuccess(false);
      setConsultationForm({ name: '', email: '', company: '', message: '' });
    }, 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setShowContactModal(false);
      setContactSuccess(false);
      setContactForm({ name: '', email: '', company: '', message: '' });
    }, 2000);
  };

  return (
    <main>
      {/* Hero Section */}
      <section style={{ background: 'var(--color-accent-light)', padding: '5rem 0 3rem 0', textAlign: 'center', animation: 'fadeIn 1s' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>You Focus on Learners. We’ll Handle the Rest.</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: 600, margin: '0 auto 2rem auto' }}>
          End-to-end backend solutions for EdTech companies and colleges — from tech to training, we power your growth from behind the scenes.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={() => setShowConsultationModal(true)} style={buttonLinkStyle('highlight')}>Book a Demo</button>
          <a href="#services" style={buttonLinkStyle('primary')}>Explore Services</a>
        </div>
      </section>

      {/* Core Services Preview */}
      <section id="services" style={{ background: '#fff', animation: 'fadeIn 1.2s' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Our Core Services</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', maxWidth: 1100, margin: '0 auto' }}>
          {services.map((service) => (
            service.href ? (
              <Link key={service.title} href={service.href} style={{ textDecoration: 'none' }}>
                <ServiceCard icon={service.icon} title={service.title} />
              </Link>
            ) : (
              <ServiceCard key={service.title} icon={service.icon} title={service.title} />
            )
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ background: 'var(--color-accent)', color: 'var(--color-primary)', animation: 'fadeIn 1.4s' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Why Choose Us?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ flex: '1 1 220px', background: '#fff', borderRadius: 12, padding: '1.5rem', minWidth: 220, boxShadow: '0 2px 8px rgba(61,77,64,0.04)' }}>
            <h4 style={{ margin: '0 0 0.5em 0' }}>Specialization</h4>
            <p style={{ margin: 0 }}>Deep expertise in EdTech backend solutions, tailored for your needs.</p>
          </div>
          <div style={{ flex: '1 1 220px', background: '#fff', borderRadius: 12, padding: '1.5rem', minWidth: 220, boxShadow: '0 2px 8px rgba(61,77,64,0.04)' }}>
            <h4 style={{ margin: '0 0 0.5em 0' }}>White-Labeled Delivery</h4>
            <p style={{ margin: 0 }}>Your brand, our technology. Seamless, invisible integration for your clients.</p>
          </div>
          <div style={{ flex: '1 1 220px', background: '#fff', borderRadius: 12, padding: '1.5rem', minWidth: 220, boxShadow: '0 2px 8px rgba(61,77,64,0.04)' }}>
            <h4 style={{ margin: '0 0 0.5em 0' }}>Operational Efficiency</h4>
            <p style={{ margin: 0 }}>We handle the backend, so you can focus on what matters most: student success.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ background: '#fff', animation: 'fadeIn 1.6s' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Success Stories</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', maxWidth: 900, margin: '0 auto' }}>
          {testimonials.map((t, i) => (
            <Testimonial key={i} quote={t.quote} author={t.author} />
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta-demo" style={{ background: 'var(--color-accent)', textAlign: 'center', animation: 'fadeIn 1.8s' }}>
        <h2 style={{ marginBottom: '1rem' }}>Ready to Power Up Your EdTech or College Platform?</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button onClick={() => setShowConsultationModal(true)} style={buttonLinkStyle('highlight')}>Schedule Your Free Consultation</button>
          <button onClick={() => setShowContactModal(true)} style={buttonLinkStyle('primary')}>Contact Our Team</button>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Consultation Modal */}
      {showConsultationModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
              Schedule Your Free Consultation
            </h3>
            {consultationSuccess ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <p style={{ color: '#059669', fontWeight: '600' }}>Thank you! We'll contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleConsultationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#374151' }}>Name</label>
                  <input
                    type="text"
                    required
                    value={consultationForm.name}
                    onChange={(e) => setConsultationForm({...consultationForm, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#374151' }}>Email</label>
                  <input
                    type="email"
                    required
                    value={consultationForm.email}
                    onChange={(e) => setConsultationForm({...consultationForm, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#374151' }}>Company</label>
                  <input
                    type="text"
                    required
                    value={consultationForm.company}
                    onChange={(e) => setConsultationForm({...consultationForm, company: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#374151' }}>Message</label>
                  <textarea
                    required
                    rows={4}
                    value={consultationForm.message}
                    onChange={(e) => setConsultationForm({...consultationForm, message: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                    placeholder="Tell us about your needs..."
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      background: 'var(--color-highlight)',
                      color: 'white',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConsultationModal(false)}
                    style={{
                      flex: 1,
                      background: '#d1d5db',
                      color: '#374151',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
              Contact Our Team
            </h3>
            {contactSuccess ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <p style={{ color: '#059669', fontWeight: '600' }}>Thank you! We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#374151' }}>Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#374151' }}>Email</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#374151' }}>Company</label>
                  <input
                    type="text"
                    required
                    value={contactForm.company}
                    onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#374151' }}>Message</label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      resize: 'vertical'
                    }}
                    placeholder="How can we help you?"
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      background: 'var(--color-primary)',
                      color: 'white',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    style={{
                      flex: 1,
                      background: '#d1d5db',
                      color: '#374151',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </main>
  );
}
