'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'highlight';
  children: React.ReactNode;
}

const variantStyles = {
  primary: {
    background: 'var(--color-primary)',
    color: '#fff',
  },
  secondary: {
    background: 'var(--color-accent)',
    color: 'var(--color-primary)',
  },
  highlight: {
    background: 'var(--color-highlight)',
    color: '#fff',
  },
};

export default function Button({ variant = 'primary', children, style, ...props }: ButtonProps) {
  return (
    <button
      style={{
        ...variantStyles[variant],
        border: 'none',
        borderRadius: 8,
        padding: '0.9em 2em',
        fontWeight: 600,
        fontSize: '1.1rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        cursor: 'pointer',
        transition: 'background 0.2s, transform 0.15s',
        outline: 'none',
        ...style,
      }}
      onMouseOver={e => (e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)')}
      onMouseOut={e => (e.currentTarget.style.transform = 'none')}
      onFocus={e => (e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-accent)')}
      onBlur={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)')}
      {...props}
    >
      {children}
    </button>
  );
} 