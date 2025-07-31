import React from 'react';
import Link from 'next/link';
import DomainSamplesTabs from './components/DomainSamplesTabs';
import PricingTable from './components/PricingTable';

export default function ResumeBuilderLanding() {
  return (
    <>
      {/* Remove the navigation bar entirely */}
      {/* Main Content */}
      <main style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', color: '#222' }}>
      {/* Hero Section */}
      <section style={{ padding: '5rem 0 3rem 0', textAlign: 'center', background: 'linear-gradient(120deg, #e0e7ff 0%, #f0fdfa 100%)' }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1.2rem', letterSpacing: -1 }}>Land More Interviews With A Job-Winning Resume</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: 600, margin: '0 auto 2.5rem auto', color: '#444' }}>
          Create a professional resume in minutes and get it matched with your dream job.
        </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
            <Link href="#builder" style={{ background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)', color: '#fff', borderRadius: 8, padding: '1em 2.2em', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(99,102,241,0.08)' }}>Create Your Resume</Link>
          </div>
        {/* Visual of resume templates preview (images only, no boxes) */}
        <div style={{ margin: '3rem auto 0 auto', maxWidth: 900, display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src="/resume image/Resume_Template_1.png" alt="Resume Template 1" style={{ width: 220, height: 320, objectFit: 'cover', marginBottom: 8 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src="/resume image/modern_resume_template_word_free.jpg" alt="Modern Resume Template" style={{ width: 220, height: 320, objectFit: 'cover', marginBottom: 8 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src="/resume image/combined.jpg" alt="Combined Resume Template" style={{ width: 220, height: 320, objectFit: 'cover', marginBottom: 8 }} />
          </div>
        </div>
        {/* Resume stats (highlighted and eye-catching) */}
        <div style={{ margin: '2.5rem auto 0 auto', display: 'flex', justifyContent: 'center', gap: '2.5rem' }}>
          <span style={{
            fontWeight: 800,
            fontSize: '1.5rem',
            color: '#fff',
            background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
            borderRadius: 12,
            padding: '0.7em 1.6em',
            boxShadow: '0 2px 12px rgba(99,102,241,0.10)',
            letterSpacing: 1,
            animation: 'popHighlight 1.2s cubic-bezier(.68,-0.55,.27,1.55)'
          }}>
            Over 100K resumes created
          </span>
          <span style={{
            fontWeight: 800,
            fontSize: '1.5rem',
            color: '#fff',
            background: 'linear-gradient(90deg, #06b6d4 0%, #6366f1 100%)',
            borderRadius: 12,
            padding: '0.7em 1.6em',
            boxShadow: '0 2px 12px rgba(6,182,212,0.10)',
            letterSpacing: 1,
            animation: 'popHighlight 1.2s cubic-bezier(.68,-0.55,.27,1.55) 0.2s'
          }}>
            95% ATS-Optimized
          </span>
        </div>
        <style>{`
          @keyframes popHighlight {
            0% { transform: scale(0.8); opacity: 0; }
            60% { transform: scale(1.08); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </section>

      {/* Testimonial slider/partner logos (updated with user images) */}
      <section style={{ background: '#fff', padding: '2.5rem 0', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.5rem' }}>Trusted by Colleges & EdTech Brands</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <img src="/resume image/education_center_2.jpg" alt="Education Center 2" style={{ height: 96, opacity: 0.7 }} />
          <img src="/resume image/education_center.jpg" alt="Education Center" style={{ height: 96, opacity: 0.7 }} />
          <img src="/resume image/Photo_1669304099604.jpg" alt="College Brand 1" style={{ height: 96, opacity: 0.7 }} />
          <img src="/resume image/vector-education-logo_779267-2083.avif" alt="Education Vector Logo" style={{ height: 96, opacity: 0.7 }} />
        </div>
      </section>

      {/* Resume Builder Page */}
      <section id="build-resume" style={{ background: 'linear-gradient(120deg, #f0fdfa 0%, #e0e7ff 100%)', padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '1.2rem' }}>Build Your Resume</h2>
        <div style={{ margin: '0 auto', maxWidth: 900, display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <Link href="/resume-builder/live-preview" style={{ width: 320, height: 220, background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(99,102,241,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#6366f1', fontSize: '1.1rem', textDecoration: 'none', cursor: 'pointer' }}>
            Live Resume Preview
          </Link>
        </div>
      </section>



      {/* ATS Resume Checker */}
      <section id="ats-checker" style={{ background: 'linear-gradient(120deg, #e0e7ff 0%, #f0fdfa 100%)', padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '1.2rem' }}>ATS Resume Checker</h2>
        <p style={{ maxWidth: 600, margin: '0 auto 2rem auto', color: '#444' }}>
          Upload your resume to get an ATS compliance score and actionable suggestions.
        </p>
        <Link href="/ats-checker" style={{ margin: '0 auto', maxWidth: 600, background: '#fff', borderRadius: 12, padding: '2rem', boxShadow: '0 4px 24px rgba(99,102,241,0.10)', color: '#6366f1', fontWeight: 600, textDecoration: 'none', display: 'block', cursor: 'pointer', transition: 'transform 0.2s' }}>
          🎯 Check Your ATS Score
        </Link>
      </section>

      {/* JD Matching Tool */}
      <section id="jd-matching" style={{ background: '#fff', padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '1.2rem' }}>JD Matching Tool</h2>
        <p style={{ maxWidth: 600, margin: '0 auto 2rem auto', color: '#444' }}>
          Upload a job description and get a matching score for your resume, with tips to improve your match rate.
        </p>
        <Link href="/jd-matching" style={{ margin: '0 auto', maxWidth: 600, background: '#fff', borderRadius: 12, padding: '2rem', boxShadow: '0 4px 24px rgba(6,182,212,0.10)', color: '#06b6d4', fontWeight: 600, textDecoration: 'none', display: 'block', cursor: 'pointer', transition: 'transform 0.2s' }}>
          🔍 Match Your Resume to Job Description
        </Link>
      </section>

      {/* Resume Guidelines & Samples */}
      <section id="guidelines-samples" style={{ background: 'linear-gradient(120deg, #f0fdfa 0%, #e0e7ff 100%)', padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '1.2rem' }}>Resume Guidelines & Samples</h2>
        <p style={{ maxWidth: 600, margin: '0 auto 2rem auto', color: '#444' }}>
          Explore best practices, domain-specific examples, and step-by-step tutorials.
        </p>
        <div style={{ margin: '0 auto', maxWidth: 1000, display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          {/* Interactive Library of Best Practices */}
          <div style={{ flex: '1 1 300px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(99,102,241,0.10)', padding: '2rem', minWidth: 280 }}>
            <h3 style={{ color: '#6366f1', fontWeight: 700, fontSize: '1.15rem', marginBottom: 12 }}>Best Practices Library</h3>
            <ul style={{ textAlign: 'left', color: '#444', fontSize: '1rem', lineHeight: 1.7 }}>
              <li>✔️ Use clear, professional formatting</li>
              <li>✔️ Tailor your resume for each job application</li>
              <li>✔️ Highlight measurable achievements</li>
              <li>✔️ Use action verbs and concise language</li>
              <li>✔️ Keep it to 1-2 pages</li>
              <li>✔️ Avoid spelling/grammar mistakes</li>
              <li>✔️ Include relevant keywords for ATS</li>
            </ul>
          </div>

          {/* Domain-Specific Examples - Interactive Tabs */}
          <DomainSamplesTabs />

          {/* Real-World Sample Resumes */}
          <div style={{ flex: '1 1 100%', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(16,185,129,0.10)', padding: '2rem', minWidth: 280 }}>
            <h3 style={{ color: '#10b981', fontWeight: 700, fontSize: '1.15rem', marginBottom: 18 }}>Real-World Sample Resumes</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
              {/* Software Engineer Resume */}
              <div style={{ flex: '1 1 210px', minWidth: 210, maxWidth: 260, background: '#f8fafc', borderRadius: 12, boxShadow: '0 2px 8px rgba(99,102,241,0.06)', padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '2.1rem', marginBottom: 8 }}>📄</span>
                <div style={{ fontWeight: 700, color: '#6366f1', fontSize: '1.08rem', marginBottom: 6 }}>Software Engineer Resume</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href="/images/software-engineer-resume-sample.png" target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', textDecoration: 'underline', fontWeight: 600 }}>View</a>
                  <a href="/images/software-engineer-resume-sample.png" download style={{ color: '#10b981', fontWeight: 600, textDecoration: 'underline' }}>Download</a>
                </div>
              </div>
              {/* Product Manager Resume */}
              <div style={{ flex: '1 1 210px', minWidth: 210, maxWidth: 260, background: '#f8fafc', borderRadius: 12, boxShadow: '0 2px 8px rgba(99,102,241,0.06)', padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '2.1rem', marginBottom: 8 }}>📄</span>
                <div style={{ fontWeight: 700, color: '#06b6d4', fontSize: '1.08rem', marginBottom: 6 }}>Product Manager Resume</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href="/images/product_manager_resume.webp" target="_blank" rel="noopener noreferrer" style={{ color: '#06b6d4', textDecoration: 'underline', fontWeight: 600 }}>View</a>
                  <a href="/images/product_manager_resume.webp" download style={{ color: '#10b981', fontWeight: 600, textDecoration: 'underline' }}>Download</a>
                </div>
              </div>
              {/* Data Analyst Resume */}
              <div style={{ flex: '1 1 210px', minWidth: 210, maxWidth: 260, background: '#f8fafc', borderRadius: 12, boxShadow: '0 2px 8px rgba(99,102,241,0.06)', padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '2.1rem', marginBottom: 8 }}>📄</span>
                <div style={{ fontWeight: 700, color: '#10b981', fontSize: '1.08rem', marginBottom: 6 }}>Data Analyst Resume</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href="/images/data-analyst-resume-example.png" target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'underline', fontWeight: 600 }}>View</a>
                  <a href="/images/data-analyst-resume-example.png" download style={{ color: '#10b981', fontWeight: 600, textDecoration: 'underline' }}>Download</a>
                </div>
              </div>
              {/* Marketing Resume */}
              <div style={{ flex: '1 1 210px', minWidth: 210, maxWidth: 260, background: '#f8fafc', borderRadius: 12, boxShadow: '0 2px 8px rgba(99,102,241,0.06)', padding: '1.2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '2.1rem', marginBottom: 8 }}>📄</span>
                <div style={{ fontWeight: 700, color: '#f59e42', fontSize: '1.08rem', marginBottom: 6 }}>Marketing Resume</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href="/images/marketing-resume.webp" target="_blank" rel="noopener noreferrer" style={{ color: '#f59e42', textDecoration: 'underline', fontWeight: 600 }}>View</a>
                  <a href="/images/marketing-resume.webp" download style={{ color: '#10b981', fontWeight: 600, textDecoration: 'underline' }}>Download</a>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Tutorials */}
          <div style={{ flex: '1 1 300px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(244,63,94,0.10)', padding: '2rem', minWidth: 280 }}>
            <h3 style={{ color: '#f43f5e', fontWeight: 700, fontSize: '1.15rem', marginBottom: 20 }}>Step-by-Step Resume Tutorial</h3>
            <ol style={{ textAlign: 'left', color: '#444', fontSize: '1rem', lineHeight: 1.7, paddingLeft: 0, listStyle: 'none' }}>
              <li style={{ marginBottom: 16 }}>
                <span style={{ fontWeight: 700, color: '#6366f1' }}>1. Choose the right format</span><br/>
                <span style={{ fontSize: '0.97em' }}>Select a format (chronological, functional, or hybrid) that best fits your experience and the job you want.</span>
              </li>
              <li style={{ marginBottom: 16 }}>
                <span style={{ fontWeight: 700, color: '#06b6d4' }}>2. Add your contact info</span><br/>
                <span style={{ fontSize: '0.97em' }}>Include your name, phone, email, LinkedIn, and (optionally) your city or portfolio link.</span>
              </li>
              <li style={{ marginBottom: 16 }}>
                <span style={{ fontWeight: 700, color: '#10b981' }}>3. Write a compelling summary</span><br/>
                <span style={{ fontSize: '0.97em' }}>Start with a short summary that highlights your strengths and career goals.</span>
              </li>
              <li style={{ marginBottom: 16 }}>
                <span style={{ fontWeight: 700, color: '#f59e42' }}>4. List experience and education</span><br/>
                <span style={{ fontSize: '0.97em' }}>Add your work experience (most recent first), education, and key achievements for each.</span>
              </li>
              <li style={{ marginBottom: 16 }}>
                <span style={{ fontWeight: 700, color: '#f43f5e' }}>5. Highlight skills</span><br/>
                <span style={{ fontSize: '0.97em' }}>Showcase your technical, soft, and domain-specific skills relevant to the job.</span>
              </li>
              <li style={{ marginBottom: 0 }}>
                <span style={{ fontWeight: 700, color: '#6366f1' }}>6. Proofread and export</span><br/>
                <span style={{ fontSize: '0.97em' }}>Check for errors, ask for feedback, and export your resume as PDF or DOCX.</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Pricing Page */}
      <section id="pricing" style={{ background: '#fff', padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '1.2rem' }}>Pricing</h2>
        <p style={{ maxWidth: 600, margin: '0 auto 2rem auto', color: '#444' }}>
          Choose the plan that fits you best. Toggle between monthly and yearly pricing.
        </p>
        <PricingTable />
      </section>

      {/* For Colleges & EdTech */}
      <section id="colleges-edtech" style={{ background: 'linear-gradient(120deg, #f0fdfa 0%, #e0e7ff 100%)', padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '1.2rem' }}>For Colleges & EdTech</h2>
        <div style={{ margin: '0 auto', maxWidth: 1000, display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center', alignItems: 'flex-start' }}>
          {/* Benefits List */}
          <div style={{ flex: '1 1 350px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(99,102,241,0.10)', padding: '2.5rem 2rem', minWidth: 320, textAlign: 'left' }}>
            <h3 style={{ color: '#6366f1', fontWeight: 700, fontSize: '1.15rem', marginBottom: 18 }}>Why Partner With Us?</h3>
            <ul style={{ color: '#444', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 0 }}>
              <li><b>White-label portal:</b> Your branding, your domain</li>
              <li><b>Admin dashboard:</b> Track student progress & engagement</li>
              <li><b>Student analytics:</b> Resume stats, ATS scores, usage</li>
              <li><b>Bulk access:</b> Easy onboarding for all students</li>
              <li><b>LMS/API integration:</b> Connect with your existing systems</li>
              <li><b>Custom content:</b> Add your own templates & resources</li>
              <li><b>Dedicated support:</b> Priority onboarding & training</li>
            </ul>
          </div>
          {/* Schedule a Demo Form */}
          <div style={{ flex: '1 1 350px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(6,182,212,0.10)', padding: '2.5rem 2rem', minWidth: 320, textAlign: 'left' }}>
            <h3 style={{ color: '#06b6d4', fontWeight: 700, fontSize: '1.15rem', marginBottom: 18 }}>Schedule a Demo</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input type="text" placeholder="Your Name" required style={{ padding: '0.9em 1em', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '1rem' }} />
              <input type="email" placeholder="Your Email" required style={{ padding: '0.9em 1em', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '1rem' }} />
              <input type="text" placeholder="College/Organization" required style={{ padding: '0.9em 1em', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '1rem' }} />
              <input type="text" placeholder="Role/Title" style={{ padding: '0.9em 1em', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '1rem' }} />
              <textarea placeholder="Message or requirements (optional)" rows={3} style={{ padding: '0.9em 1em', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '1rem', resize: 'vertical' }} />
              <button type="submit" style={{ background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '1em 2em', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', marginTop: 8 }}>Request Demo</button>
            </form>
            <div style={{ color: '#888', fontSize: '0.98em', marginTop: 12 }}>We’ll get in touch within 1 business day.</div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" style={{ background: '#fff', padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '1.2rem' }}>Blog</h2>
        <p style={{ maxWidth: 600, margin: '0 auto 2rem auto', color: '#444' }}>
          Explore our latest articles on resume writing, career growth, and hiring trends.
        </p>
        <div style={{ margin: '0 auto', maxWidth: 900 }}>
          <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '2rem', justifyContent: 'center', marginBottom: '2rem', overflowX: 'auto' }}>
            <div style={{ flex: '1 1 220px', background: '#f1f5f9', borderRadius: 16, boxShadow: '0 4px 24px rgba(99,102,241,0.10)', padding: '2.5rem 1.5rem', minWidth: 220, textAlign: 'left' }}>
              <h4 style={{ color: '#6366f1', fontWeight: 700, fontSize: '1.1rem', marginBottom: 10 }}>Resume Tips</h4>
              <ul style={{ color: '#444', fontSize: '1rem', lineHeight: 1.7, marginBottom: 0 }}>
                <li>How to write a job-winning resume</li>
                <li>Formatting for ATS</li>
                <li>Choosing the right template</li>
              </ul>
            </div>
            <div style={{ flex: '1 1 220px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(6,182,212,0.10)', padding: '2.5rem 1.5rem', minWidth: 220, textAlign: 'left' }}>
              <h4 style={{ color: '#06b6d4', fontWeight: 700, fontSize: '1.1rem', marginBottom: 10 }}>Career Advice</h4>
              <ul style={{ color: '#444', fontSize: '1rem', lineHeight: 1.7, marginBottom: 0 }}>
                <li>How to ace your next interview</li>
                <li>Networking for job seekers</li>
                <li>Building a personal brand</li>
              </ul>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '2rem', justifyContent: 'center', overflowX: 'auto' }}>
            <div style={{ flex: '1 1 220px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(16,185,129,0.10)', padding: '2.5rem 1.5rem', minWidth: 220, textAlign: 'left' }}>
              <h4 style={{ color: '#10b981', fontWeight: 700, fontSize: '1.1rem', marginBottom: 10 }}>Common Resume Mistakes</h4>
              <ul style={{ color: '#444', fontSize: '1rem', lineHeight: 1.7, marginBottom: 0 }}>
                <li>Typos and grammar errors</li>
                <li>Too much or too little detail</li>
                <li>Ignoring keywords</li>
              </ul>
            </div>
            <div style={{ flex: '1 1 220px', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(245,158,66,0.10)', padding: '2.5rem 1.5rem', minWidth: 220, textAlign: 'left' }}>
              <h4 style={{ color: '#f59e42', fontWeight: 700, fontSize: '1.1rem', marginBottom: 10 }}>Industry Hiring Trends</h4>
              <ul style={{ color: '#444', fontSize: '1rem', lineHeight: 1.7, marginBottom: 0 }}>
                <li>Top skills in demand</li>
                <li>Remote work & hybrid jobs</li>
                <li>What recruiters look for</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Newsletter Subscription */}
        <div style={{ margin: '3rem auto 0 auto', maxWidth: 500, background: '#f1f5f9', borderRadius: 12, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 8px rgba(99,102,241,0.08)' }}>
          <h4 style={{ color: '#6366f1', fontWeight: 700, fontSize: '1.15rem', marginBottom: 12 }}>Subscribe to our Newsletter</h4>
          <form style={{ display: 'flex', width: '100%', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <input type="email" placeholder="Your email address" required style={{ flex: 1, minWidth: 180, padding: '0.9em 1em', borderRadius: 8, border: '1px solid #d1d5db', fontSize: '1rem' }} />
            <button type="submit" style={{ background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '0.9em 2em', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer' }}>Subscribe</button>
          </form>
          <div style={{ color: '#888', fontSize: '0.98em', marginTop: 10 }}>Get the latest tips and updates in your inbox.</div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            #blog > div[style*='display: flex'] {
              flex-wrap: wrap !important;
              gap: 1.5rem !important;
            }
          }
        `}</style>
      </section>

      {/* Contact Page */}
      <section id="contact" style={{ background: 'linear-gradient(120deg, #e0e7ff 0%, #f0fdfa 100%)', padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 800, fontSize: '2.2rem', marginBottom: '2.2rem', letterSpacing: -1, color: '#222' }}>Contact Us</h2>
        <div style={{ margin: '0 auto', maxWidth: 1000, display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'center', alignItems: 'stretch' }}>
          {/* Inquiry Form */}
          <div style={{ flex: '1 1 380px', background: '#fff', borderRadius: 20, boxShadow: '0 8px 32px rgba(99,102,241,0.10)', padding: '2.8rem 2.2rem', minWidth: 320, textAlign: 'left', minHeight: 440, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', border: '1px solid #f1f5f9' }}>
            <h3 style={{ color: '#6366f1', fontWeight: 700, fontSize: '1.25rem', marginBottom: 22, letterSpacing: -0.5 }}>Inquiry Form</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
              <label style={{ fontWeight: 600, color: '#374151', marginBottom: 4, fontSize: '1rem' }}>I am a...</label>
              <select required style={{ padding: '1em 1.1em', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: '1.05rem', background: '#f8fafc', marginBottom: 2, fontWeight: 500 }}>
                <option value="">Select</option>
                <option value="student">Student</option>
                <option value="institution">Institution</option>
              </select>
              <label style={{ fontWeight: 600, color: '#374151', marginBottom: 4, fontSize: '1rem' }}>Your Name</label>
              <input type="text" placeholder="Enter your name" required style={{ padding: '1em 1.1em', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: '1.05rem', background: '#f8fafc', fontWeight: 500 }} />
              <label style={{ fontWeight: 600, color: '#374151', marginBottom: 4, fontSize: '1rem' }}>Your Email</label>
              <input type="email" placeholder="Enter your email" required style={{ padding: '1em 1.1em', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: '1.05rem', background: '#f8fafc', fontWeight: 500 }} />
              <label style={{ fontWeight: 600, color: '#374151', marginBottom: 4, fontSize: '1rem' }}>Subject</label>
              <input type="text" placeholder="Subject (optional)" style={{ padding: '1em 1.1em', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: '1.05rem', background: '#f8fafc', fontWeight: 500 }} />
              <label style={{ fontWeight: 600, color: '#374151', marginBottom: 4, fontSize: '1rem' }}>Message</label>
              <textarea placeholder="Message" rows={3} style={{ padding: '1em 1.1em', borderRadius: 10, border: '1.5px solid #e5e7eb', fontSize: '1.05rem', background: '#f8fafc', fontWeight: 500, resize: 'vertical' }} />
              <button type="submit" style={{ background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)', color: '#fff', border: 'none', borderRadius: 10, padding: '1.1em 2em', fontWeight: 800, fontSize: '1.15rem', cursor: 'pointer', marginTop: 10, boxShadow: '0 2px 8px rgba(99,102,241,0.08)', letterSpacing: 0.5 }}>Send Inquiry</button>
            </form>
            <div style={{ color: '#888', fontSize: '1em', marginTop: 16, fontWeight: 500 }}>We’ll get in touch within 1 business day.</div>
          </div>
          {/* Contact Details & Social */}
          <div style={{ flex: '1 1 320px', background: '#fff', borderRadius: 20, boxShadow: '0 8px 32px rgba(6,182,212,0.10)', padding: '2.8rem 2.2rem', minWidth: 280, textAlign: 'left', minHeight: 440, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: 32, border: '1px solid #f1f5f9' }}>
            <div>
              <h3 style={{ color: '#06b6d4', fontWeight: 700, fontSize: '1.25rem', marginBottom: 14, letterSpacing: -0.5 }}>Email & Support</h3>
              <div style={{ color: '#444', fontSize: '1.08rem', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.3rem', color: '#6366f1', display: 'inline-block', verticalAlign: 'middle' }}>✉️</span>
                <b>Email:</b> <a href="mailto:support@resumepro.com" style={{ color: '#6366f1', textDecoration: 'underline', fontWeight: 600 }}>support@resumepro.com</a>
              </div>
              <div style={{ color: '#444', fontSize: '1.08rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.3rem', color: '#06b6d4', display: 'inline-block', verticalAlign: 'middle' }}>🕑</span>
                <b>Support:</b> Mon-Fri, 9am-6pm IST
              </div>
            </div>
            <div>
              <h3 style={{ color: '#06b6d4', fontWeight: 700, fontSize: '1.25rem', marginBottom: 14, letterSpacing: -0.5 }}>Connect With Us</h3>
              <div style={{ display: 'flex', gap: 22, alignItems: 'center', fontSize: '2rem' }}>
                <a href="#" title="LinkedIn" style={{ color: '#6366f1', transition: 'color 0.2s' }}><span style={{ fontSize: '2rem' }}>🔗</span></a>
                <a href="#" title="Twitter" style={{ color: '#06b6d4', transition: 'color 0.2s' }}><span style={{ fontSize: '2rem' }}>🐦</span></a>
                <a href="#" title="Facebook" style={{ color: '#3b82f6', transition: 'color 0.2s' }}><span style={{ fontSize: '2rem' }}>📘</span></a>
                <a href="#" title="Instagram" style={{ color: '#f43f5e', transition: 'color 0.2s' }}><span style={{ fontSize: '2rem' }}>📸</span></a>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            #contact > div[style*='display: flex'] {
              flex-wrap: wrap !important;
              gap: 1.5rem !important;
            }
            #contact > div > div {
              min-width: 100% !important;
              max-width: 100% !important;
            }
          }
        `}</style>
      </section>
    </main>
    </>
  );
} 