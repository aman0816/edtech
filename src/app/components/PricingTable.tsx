'use client';
import React, { useState } from 'react';

const plans = [
  {
    name: 'Free',
    color: '#6366f1',
    bg: '#f1f5f9',
    price: { monthly: '$0/mo', yearly: '$0/yr' },
    features: [
      '1 active resume',
      'Basic templates',
      'ATS check: 1/month',
      'JD match: 1/month',
      'Sample access: Limited',
    ],
    cta: 'Get Started',
    ctaStyle: { background: '#6366f1', color: '#fff', border: 'none' },
  },
  {
    name: 'Student',
    color: '#06b6d4',
    bg: '#fff',
    price: { monthly: '$6/mo', yearly: '$60/yr' },
    features: [
      '5 active resumes',
      'All templates',
      'ATS check: 5/month',
      'JD match: 5/month',
      'Sample access: All',
    ],
    cta: 'Get Started',
    ctaStyle: { background: '#06b6d4', color: '#fff', border: 'none' },
  },
  {
    name: 'Pro',
    color: '#10b981',
    bg: '#fff',
    price: { monthly: '$15/mo', yearly: '$150/yr' },
    features: [
      'Unlimited resumes',
      'All templates',
      'ATS check: Unlimited',
      'JD match: Unlimited',
      'Sample access: All',
    ],
    cta: 'Get Started',
    ctaStyle: { background: '#10b981', color: '#fff', border: 'none' },
  },
  {
    name: 'Institution',
    color: '#6366f1',
    bg: '#f1f5f9',
    price: { monthly: 'Custom', yearly: 'Custom' },
    features: [
      'Bulk access for students',
      'Admin dashboard',
      'Analytics & reporting',
      'API & LMS integration',
      'Custom branding',
    ],
    cta: 'Request Institutional Access',
    ctaStyle: { background: '#fff', color: '#6366f1', border: '2px solid #6366f1' },
  },
];

export default function PricingTable() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
        <button
          style={{
            padding: '0.7em 2em',
            borderRadius: 8,
            border: '2px solid #6366f1',
            background: billing === 'monthly' ? '#6366f1' : '#fff',
            color: billing === 'monthly' ? '#fff' : '#6366f1',
            fontWeight: 700,
            fontSize: '1.05rem',
            marginRight: 8,
            cursor: 'pointer',
          }}
          onClick={() => setBilling('monthly')}
        >
          Monthly
        </button>
        <button
          style={{
            padding: '0.7em 2em',
            borderRadius: 8,
            border: '2px solid #6366f1',
            background: billing === 'yearly' ? '#6366f1' : '#fff',
            color: billing === 'yearly' ? '#fff' : '#6366f1',
            fontWeight: 700,
            fontSize: '1.05rem',
            cursor: 'pointer',
          }}
          onClick={() => setBilling('yearly')}
        >
          Yearly
        </button>
      </div>
      <div
        style={{
          margin: '0 auto',
          maxWidth: 1100,
          display: 'flex',
          justifyContent: 'center',
          gap: '2.5rem',
          flexWrap: 'nowrap',
          overflowX: 'auto',
        }}
      >
        {plans.map(plan => (
          <div
            key={plan.name}
            style={{
              width: 250,
              background: plan.bg,
              borderRadius: 16,
              boxShadow: '0 4px 24px rgba(99,102,241,0.10)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '2.5rem 1.5rem',
              fontWeight: 600,
              color: plan.color,
              fontSize: '1.1rem',
              position: 'relative',
              minWidth: 220,
              marginBottom: 16,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: 8 }}>{plan.name}</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 12 }}>{plan.price[billing]}</div>
            <ul style={{ color: '#444', fontWeight: 500, fontSize: '1rem', marginBottom: 18, textAlign: 'left', lineHeight: 1.7 }}>
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <button style={{ ...plan.ctaStyle, borderRadius: 8, padding: '0.9em 2em', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', marginTop: 8 }}>{plan.cta}</button>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) {
          #pricing section > div[style*='display: flex'] {
            flex-wrap: wrap !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </>
  );
} 