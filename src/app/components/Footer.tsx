'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer id="footer" style={{ background: 'var(--color-footer-bg)', color: 'var(--color-footer-text)', padding: '3rem 0 2rem 0', marginTop: 40 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>
        <div>
          <h3 style={{ color: 'var(--color-footer-text)' }}>EdTech Backend Solutions</h3>
          <p style={{ color: 'var(--color-footer-text)', opacity: 0.8 }}>Empowering your growth from behind the scenes.</p>
        </div>
        <div>
          <h4 style={{ color: 'var(--color-footer-text)' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li><a href="#" style={{ color: 'var(--color-footer-text)' }}>Home</a></li>
            <li><a href="#services" style={{ color: 'var(--color-footer-text)' }}>Services</a></li>
            <li><a href="#cta-demo" style={{ color: 'var(--color-footer-text)' }}>Book a Demo</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'var(--color-footer-text)' }}>Contact</h4>
          <p style={{ color: 'var(--color-footer-text)', opacity: 0.8 }}>info@edtechbackend.com<br/>+1 (555) 123-4567</p>
        </div>
        <div>
          <h4 style={{ color: 'var(--color-footer-text)' }}>Newsletter</h4>
          <form style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input type="email" placeholder="Your email" style={{ padding: '0.5em 1em', borderRadius: 6, border: 'none', fontSize: '1rem' }} />
            <button type="submit" style={{ background: 'var(--color-highlight)', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5em 1.2em', fontWeight: 600, cursor: 'pointer' }}>Subscribe</button>
          </form>
          <div style={{ marginTop: 12, display: 'flex', gap: '0.7rem' }}>
            <a href="#" aria-label="LinkedIn" style={{ color: 'var(--color-footer-text)', fontSize: '1.3rem' }}>in</a>
            <a href="#" aria-label="Twitter" style={{ color: 'var(--color-footer-text)', fontSize: '1.3rem' }}>tw</a>
            <a href="#" aria-label="Facebook" style={{ color: 'var(--color-footer-text)', fontSize: '1.3rem' }}>fb</a>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 32, opacity: 0.7, fontSize: '0.95rem' }}>
        &copy; {new Date().getFullYear()} EdTech Backend Solutions. All rights reserved.
      </div>
    </footer>
  );
} 