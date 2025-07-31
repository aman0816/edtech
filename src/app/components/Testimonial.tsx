'use client';

import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
}

export default function Testimonial({ quote, author }: TestimonialProps) {
  return (
    <div style={{
      flex: '1 1 260px',
      background: 'var(--color-accent-light)',
      borderRadius: 12,
      padding: '1.5rem',
      minWidth: 260,
      boxShadow: '0 2px 8px rgba(61,77,64,0.04)',
      fontStyle: 'italic',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <p style={{ margin: 0 }}>{`"${quote}"`}</p>
      <span style={{ display: 'block', marginTop: 12, fontWeight: 600, fontStyle: 'normal' }}>— {author}</span>
    </div>
  );
} 