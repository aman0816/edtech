'use client';

import React from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
  href?: string;
}

export default function ServiceCard({ icon, title, href }: ServiceCardProps) {
  const isResumeIcon = icon === '/images/resume.png';
  const content = (
    <>
      {isResumeIcon ? (
        <div style={{
          background: 'linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)',
          borderRadius: '50%',
          width: 72,
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(59,130,246,0.12)',
          marginBottom: 18,
          border: '3px solid #fff',
        }}>
          <img src={icon} alt={title} width={44} height={44} style={{ opacity: 0.95, filter: 'drop-shadow(0 2px 6px rgba(59,130,246,0.10))' }} />
        </div>
      ) : (
        <img src={icon} alt={title} width={48} height={48} style={{ marginBottom: 18, opacity: 0.8 }} />
      )}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0, color: 'var(--color-primary)', textAlign: 'center' }}>{title}</h3>
    </>
  );
  if (href) {
    return (
      <button style={{ all: 'unset', cursor: 'pointer', width: '100%' }} tabIndex={0} aria-label={title}>
        {content}
      </button>
    );
  }
  return (
    <div
      style={{
        padding: '2rem 1.2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'transform 0.2s',
        minHeight: 180,
        cursor: 'pointer',
      }}
      onMouseOver={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px) scale(1.04)';
      }}
      onMouseOut={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'none';
      }}
    >
      {content}
    </div>
  );
} 