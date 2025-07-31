'use client';
import React, { useState } from 'react';

const samples = [
  { key: 'Tech', label: 'Tech', img: '/images/technical-resume.webp', thumb: 'tech-thumb', highlights: [ 'Projects section with GitHub links', 'Skills: Python, React, Java, SQL', 'Certifications & Open Source' ], color: '#6366f1' },
  { key: 'MBA', label: 'MBA', img: '/images/mba-resume-sample.webp', thumb: 'mba-thumb', highlights: [ 'Case competitions & internships', 'KPIs, leadership roles, consulting', 'Quantified achievements' ], color: '#06b6d4' },
  { key: 'HR', label: 'HR', img: '/images/HR-resume-example.webp', thumb: 'hr-thumb', highlights: [ 'Employee engagement & policy creation', 'ATS systems used', 'Training & compliance' ], color: '#10b981' },
  { key: 'Marketing', label: 'Marketing', img: '/images/marketing-resume.webp', thumb: 'marketing-thumb', highlights: [ 'Campaigns, analytics, digital tools', 'Brand management, content strategy', 'Social media & SEO' ], color: '#f59e42' },
  { key: 'Design', label: 'Design', img: '/images/media-kit-template-design_23-2149844758.avif', thumb: 'design-thumb', highlights: [ 'Portfolio links, UI/UX projects', 'Tools: Figma, Adobe Suite', 'Visual layout & creativity' ], color: '#f43f5e' },
  { key: 'Sales', label: 'Sales', img: '/images/sales-resume-sample.png', thumb: 'sales-thumb', highlights: [ 'Revenue growth, targets achieved', 'CRM tools, lead generation', 'Negotiation & closing skills' ], color: '#6366f1' },
];

export default function DomainSamplesTabs() {
  const [active, setActive] = useState('Tech');
  const activeSample = samples.find(s => s.key === active);
  const imgPath = activeSample ? activeSample.img : '';
  const thumbPath = activeSample ? `/images/${activeSample.thumb}.png` : '';

  return (
    <div style={{ minWidth: 320 }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        {samples.map(tab => (
          <button
            key={tab.key}
            style={{
              background: active === tab.key ? '#e0f2fe' : 'none',
              border: '2px solid #06b6d4',
              color: '#06b6d4',
              borderRadius: 8,
              padding: '0.5em 1.2em',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              marginRight: 4,
              marginBottom: 4
            }}
            onClick={() => setActive(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(6,182,212,0.10)', padding: '2rem', minWidth: 320 }}>
        {activeSample && (
          <>
            {activeSample.thumb && (
              <img src={thumbPath} alt={activeSample.label + ' Resume'} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 12, marginBottom: 12, background: '#f0fdfa' }} onError={e => (e.currentTarget.style.display = 'none')} />
            )}
            <h4 style={{ color: activeSample.color, fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>{activeSample.label} Resume Sample</h4>
            <ul style={{ color: '#444', fontSize: '1rem', textAlign: 'left', margin: '0 auto 12px auto', maxWidth: 350 }}>
              {activeSample.highlights.map((h, i) => (
                <li key={i}>• {h}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
              <a href={imgPath} target="_blank" rel="noopener noreferrer" style={{ color: '#06b6d4', fontWeight: 600, textDecoration: 'underline' }}>View Sample</a>
              <a href={imgPath} download style={{ color: '#10b981', fontWeight: 600, textDecoration: 'underline' }}>Download Sample</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 