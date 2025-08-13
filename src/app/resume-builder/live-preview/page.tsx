'use client';

import React, { useEffect, useState, useRef } from 'react';

// typings
declare global {
  interface Window {
    html2pdf?: any;
  }
}

type Education = {
  school: string;
  degree: string;
  start: string;
  end: string;
  description: string;
};

type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  description: string;
};

type Project = {
  title: string;
  description: string;
};

type ResumeForm = {
  name: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: string[];
};

const templates = [
  {
    name: 'Modern',
    previewClass: 'bg-white text-gray-900',
    accent: 'text-blue-600',
  },
  {
    name: 'Minimalist',
    previewClass: 'bg-gray-50 text-gray-800',
    accent: 'text-gray-700',
  },
  {
    name: 'Creative',
    previewClass: 'bg-gradient-to-br from-blue-50 to-pink-50 text-gray-900',
    accent: 'text-pink-600',
  },
];

const exampleData: ResumeForm = {
  name: 'John Doe',
  education: [
    { school: 'ABC University', degree: 'B.Tech in Computer Science', start: '2018', end: '2022', description: 'Graduated with Honors' },
  ],
  experience: [
    { company: 'Tech Solutions', role: 'Frontend Developer', start: '2022', end: '2023', description: 'Worked on modern web apps with React and Next.js.' },
  ],
  projects: [
    { title: 'Portfolio Website', description: 'Built a personal portfolio using Next.js and Tailwind CSS.' },
  ],
  skills: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript'],
};

type SectionProps = {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  color: string;
};

function Section({ title, children, open, onToggle, color }: SectionProps) {
  return (
    <div className="mb-5 rounded-2xl shadow-lg bg-white/90 border border-gray-200 transition-transform duration-300 hover:scale-[1.01]">
      <button
        className={`w-full flex justify-between items-center px-6 py-4 font-bold text-lg text-left focus:outline-none rounded-t-2xl ${color} transition-colors duration-300`}
        onClick={onToggle}
        type="button"
        style={{ letterSpacing: 1 }}
      >
        {title}
        <span className="text-2xl font-bold">{open ? '−' : '+'}</span>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        {open && <div className="px-6 pb-6 pt-2 animate-fadeIn">{children}</div>}
      </div>
    </div>
  );
}

type ListSection = 'education' | 'experience' | 'projects';
type OpenSection = '' | ListSection | 'skills';

type HistoryItem = { data: ResumeForm; ts: number };

export default function LiveResumePreview() {
  const [form, setForm] = useState<ResumeForm>(exampleData);
  const [openSection, setOpenSection] = useState<OpenSection>('education');
  const [templateIdx, setTemplateIdx] = useState(0);
  const [fontSize, setFontSize] = useState('text-base');
  const [fontFamily, setFontFamily] = useState('font-sans');
  const [lineSpacing, setLineSpacing] = useState('leading-normal');
  const [pdfReady, setPdfReady] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  // Section handlers
  const handleChange = (section: ListSection, idx: number, field: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => i === idx ? { ...item, [field]: value } : item),
    }));
  };
  const handleSkillChange = (idx: number, value: string) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.map((s, i) => i === idx ? value : s),
    }));
  };
  const addEntry = (section: ListSection) => {
    const empty = section === 'education'
      ? { school: '', degree: '', start: '', end: '', description: '' }
      : section === 'experience'
      ? { company: '', role: '', start: '', end: '', description: '' }
      : section === 'projects'
      ? { title: '', description: '' }
      : '';
    setForm(prev => ({ ...prev, [section]: [...prev[section], empty] }));
  };
  const removeEntry = (section: ListSection, idx: number) => {
    setForm(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== idx) }));
  };
  const addSkill = () => setForm(prev => ({ ...prev, skills: [...prev.skills, ''] }));
  const removeSkill = (idx: number) => setForm(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));

  // Add handler for name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm(prev => ({ ...prev, name: e.target.value }));

  // Reset/Clear
  const resetExample = () => setForm(exampleData);
  const clearAll = () => setForm({ name: '', education: [], experience: [], projects: [], skills: [] });

  // Version history state
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for uploaded resume data first
      const uploadedData = localStorage.getItem('uploaded-resume-data');
      console.log('Checking for uploaded data:', uploadedData); // Debug log
      if (uploadedData) {
        const parsedData = JSON.parse(uploadedData);
        console.log('Loading uploaded data:', parsedData); // Debug log
        setForm(parsedData);
        // Clear the uploaded data after loading it
        localStorage.removeItem('uploaded-resume-data');
      } else {
        // Load saved data if no uploaded data
        const saved = localStorage.getItem('resume-autosave');
        if (saved) setForm(JSON.parse(saved));
      }
      const hist = localStorage.getItem('resume-history');
      if (hist) setHistory(JSON.parse(hist));
    }
  }, []);

  // Auto-save and versioning on form change (debounced)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      localStorage.setItem('resume-autosave', JSON.stringify(form));
      // Save version history
      const hist: HistoryItem[] = JSON.parse(localStorage.getItem('resume-history') || '[]');
      hist.unshift({ data: form, ts: Date.now() });
      // Keep only last 10 versions
      localStorage.setItem('resume-history', JSON.stringify(hist.slice(0, 10)));
      setHistory(hist.slice(0, 10));
    }, 600);
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [form]);

  // Restore version
  const restoreVersion = (version: HistoryItem) => {
    setForm(version.data);
    setShowHistory(false);
  };

  // Inject html2pdf.js CDN script on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.html2pdf) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.async = true;
      script.onload = () => setPdfReady(true);
      document.body.appendChild(script);
    } else if (typeof window !== 'undefined' && window.html2pdf) {
      setPdfReady(true);
    }
  }, []);

  // Export as PDF using window.html2pdf
  const exportPDF = () => {
    if (typeof window !== 'undefined' && window.html2pdf) {
      const element = document.getElementById('resume-preview');
      if (element) {
        setPdfLoading(true);
        window.html2pdf().from(element).set({
          margin: 0.5,
          filename: (form.name || 'resume') + '.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        }).save().then(() => setPdfLoading(false));
      } else {
        alert('Resume preview element not found');
      }
    } else {
      alert('html2pdf.js not loaded');
    }
  };
  // Export as DOCX (placeholder)
  const exportDOCX = () => {
    alert('Export to DOCX feature coming soon!');
  };

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-blue-100 via-pink-50 to-purple-100 flex flex-col md:flex-row">
      {/* Left: Guided Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-700 tracking-wide drop-shadow">Edit Your Resume</h2>
        
        {/* Debug Info - Remove in production */}
        <div className="mb-4 p-3 bg-yellow-100 rounded-lg text-xs">
          <p><strong>Debug - Current Form Data:</strong></p>
          <p>Name: {form.name || 'Empty'}</p>
          <p>Education: {form.education.length} items</p>
          <p>Experience: {form.experience.length} items</p>
          <p>Projects: {form.projects.length} items</p>
          <p>Skills: {form.skills.length} items</p>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-blue-700">Student Name</label>
          <input className="input" placeholder="Enter student name" value={form.name} onChange={handleNameChange} />
        </div>
        <div className="flex gap-3 mb-8">
          <button className="btn transition-transform hover:scale-105" onClick={resetExample}>Reset to Example</button>
          <button className="btn bg-red-500 hover:bg-red-600 transition-transform hover:scale-105" onClick={clearAll}>Clear All</button>
        </div>
        <Section title="Education" color="bg-blue-100 text-blue-700" open={openSection === 'education'} onToggle={() => setOpenSection(openSection === 'education' ? '' : 'education')}>
          {form.education.map((edu, idx) => (
            <div key={idx} className="mb-4 space-y-2 border-b pb-2">
              <input className="input" placeholder="School" value={edu.school} onChange={e => handleChange('education', idx, 'school', e.target.value)} />
              <input className="input" placeholder="Degree" value={edu.degree} onChange={e => handleChange('education', idx, 'degree', e.target.value)} />
              <div className="flex gap-2">
                <input className="input" placeholder="Start" value={edu.start} onChange={e => handleChange('education', idx, 'start', e.target.value)} />
                <input className="input" placeholder="End" value={edu.end} onChange={e => handleChange('education', idx, 'end', e.target.value)} />
              </div>
              <textarea className="input" placeholder="Description" value={edu.description} onChange={e => handleChange('education', idx, 'description', e.target.value)} />
              <button className="text-xs text-red-500 mt-1 hover:underline" onClick={() => removeEntry('education', idx)}>Remove</button>
            </div>
          ))}
          <button className="btn transition-transform hover:scale-105" onClick={() => addEntry('education')}>+ Add Education</button>
        </Section>
        <Section title="Experience" color="bg-purple-100 text-purple-700" open={openSection === 'experience'} onToggle={() => setOpenSection(openSection === 'experience' ? '' : 'experience')}>
          {form.experience.map((exp, idx) => (
            <div key={idx} className="mb-4 space-y-2 border-b pb-2">
              <input className="input" placeholder="Company" value={exp.company} onChange={e => handleChange('experience', idx, 'company', e.target.value)} />
              <input className="input" placeholder="Role" value={exp.role} onChange={e => handleChange('experience', idx, 'role', e.target.value)} />
              <div className="flex gap-2">
                <input className="input" placeholder="Start" value={exp.start} onChange={e => handleChange('experience', idx, 'start', e.target.value)} />
                <input className="input" placeholder="End" value={exp.end} onChange={e => handleChange('experience', idx, 'end', e.target.value)} />
              </div>
              <textarea className="input" placeholder="Description" value={exp.description} onChange={e => handleChange('experience', idx, 'description', e.target.value)} />
              <button className="text-xs text-red-500 mt-1 hover:underline" onClick={() => removeEntry('experience', idx)}>Remove</button>
            </div>
          ))}
          <button className="btn transition-transform hover:scale-105" onClick={() => addEntry('experience')}>+ Add Experience</button>
        </Section>
        <Section title="Projects" color="bg-pink-100 text-pink-700" open={openSection === 'projects'} onToggle={() => setOpenSection(openSection === 'projects' ? '' : 'projects')}>
          {form.projects.map((proj, idx) => (
            <div key={idx} className="mb-4 space-y-2 border-b pb-2">
              <input className="input" placeholder="Title" value={proj.title} onChange={e => handleChange('projects', idx, 'title', e.target.value)} />
              <textarea className="input" placeholder="Description" value={proj.description} onChange={e => handleChange('projects', idx, 'description', e.target.value)} />
              <button className="text-xs text-red-500 mt-1 hover:underline" onClick={() => removeEntry('projects', idx)}>Remove</button>
            </div>
          ))}
          <button className="btn transition-transform hover:scale-105" onClick={() => addEntry('projects')}>+ Add Project</button>
        </Section>
        <Section title="Skills" color="bg-green-100 text-green-700" open={openSection === 'skills'} onToggle={() => setOpenSection(openSection === 'skills' ? '' : 'skills')}>
          <div className="flex flex-wrap gap-2 mb-2">
            {form.skills.map((skill, idx) => (
              <span key={idx} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                <input className="bg-transparent border-none focus:outline-none w-20" value={skill} onChange={e => handleSkillChange(idx, e.target.value)} />
                <button className="ml-1 text-xs text-red-500 hover:scale-125 transition-transform" onClick={() => removeSkill(idx)}>&times;</button>
              </span>
            ))}
          </div>
          <button className="btn transition-transform hover:scale-105" onClick={addSkill}>+ Add Skill</button>
        </Section>
        {/* Formatting options */}
        <div className="mt-8 mb-4">
          <label className="block font-semibold mb-2 text-blue-700">Formatting Options</label>
          <div className="flex gap-4 mb-2">
            <select className="input w-32" value={fontSize} onChange={e => setFontSize(e.target.value)}>
              <option value="text-base">Normal</option>
              <option value="text-lg">Large</option>
              <option value="text-sm">Small</option>
            </select>
            <select className="input w-40" value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
              <option value="font-sans">Sans</option>
              <option value="font-serif">Serif</option>
              <option value="font-mono">Mono</option>
            </select>
            <select className="input w-40" value={lineSpacing} onChange={e => setLineSpacing(e.target.value)}>
              <option value="leading-normal">Normal Spacing</option>
              <option value="leading-relaxed">Relaxed</option>
              <option value="leading-tight">Tight</option>
            </select>
          </div>
        </div>
        {/* Template switcher */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-blue-700">Template Style</label>
          <div className="flex gap-2">
            {templates.map((tpl, idx) => (
              <button
                key={tpl.name}
                className={`px-4 py-2 rounded border shadow-sm ${templateIdx === idx ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'} font-semibold transition-transform hover:scale-105`}
                onClick={() => setTemplateIdx(idx)}
              >
                {tpl.name}
              </button>
            ))}
          </div>
        </div>
        {/* Export buttons */}
        <div className="flex gap-4 mt-4">
          <button
            className="btn transition-transform hover:scale-105 flex items-center justify-center"
            onClick={exportPDF}
            disabled={!pdfReady || pdfLoading}
          >
            {pdfLoading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
            ) : null}
            Export as PDF
          </button>
          <button className="btn transition-transform hover:scale-105" onClick={exportDOCX}>Export as DOCX</button>
          <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow px-4 py-2 hover:from-blue-600 hover:to-blue-800 transition-all" onClick={() => setShowHistory(true)}>Version History</button>
        </div>
      </div>
      {/* Right: Live Preview */}
      <div className="w-full md:w-1/2 p-6 md:p-10 border-l border-gray-200 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-extrabold mb-6 text-blue-700 tracking-wide drop-shadow">Live Resume Preview</h2>
        <div id="resume-preview" className={`resume-preview max-w-2xl mx-auto p-8 rounded-2xl shadow-2xl print:shadow-none print:bg-white ${templates[templateIdx].previewClass} ${fontSize} ${fontFamily} ${lineSpacing} transition-all duration-500`}>
          <h1 className={`text-3xl font-extrabold mb-2 ${templates[templateIdx].accent}`}>{form.name || 'Your Name'}</h1>
          <h2 className="text-xl font-semibold mb-4">{form.education[0]?.degree || 'Your Profession'}</h2>
          <div className="mb-4">
            <h3 className="font-bold text-lg mb-1">Education</h3>
            {form.education.map((edu, idx) => (
              <div key={idx} className="mb-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{edu.school}</span>
                  <span>{edu.start} - {edu.end}</span>
                </div>
                <div className="italic text-gray-600">{edu.degree}</div>
                <div className="text-gray-700">{edu.description}</div>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="font-bold text-lg mb-1">Experience</h3>
            {form.experience.map((exp, idx) => (
              <div key={idx} className="mb-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{exp.company}</span>
                  <span>{exp.start} - {exp.end}</span>
                </div>
                <div className="italic text-gray-600">{exp.role}</div>
                <div className="text-gray-700">{exp.description}</div>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="font-bold text-lg mb-1">Projects</h3>
            {form.projects.map((proj, idx) => (
              <div key={idx} className="mb-2">
                <div className="font-semibold">{proj.title}</div>
                <div className="text-gray-700">{proj.description}</div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {form.skills.map((skill, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Version History Modal */}
      {showHistory && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full border-2 border-blue-200">
            <h3 className="text-2xl font-extrabold mb-6 text-blue-700 tracking-wide drop-shadow">Version History</h3>
            <ul className="max-h-80 overflow-y-auto mb-6 divide-y divide-blue-100">
              {history.length === 0 && <li className="text-blue-400 text-center py-4">No versions yet.</li>}
              {history.map((v, i) => (
                <li key={i} className="flex justify-between items-center py-3">
                  <span className="text-blue-700 font-semibold">{new Date(v.ts).toLocaleString()}</span>
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold shadow hover:from-blue-600 hover:to-blue-800 transition-all ml-4" onClick={() => restoreVersion(v)}>Restore</button>
                </li>
              ))}
            </ul>
            <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow hover:from-pink-600 hover:to-purple-700 transition-all mt-2" onClick={() => setShowHistory(false)}>Close</button>
          </div>
        </div>
      )}
      <style jsx>{`
        .input {
          @apply w-full border border-gray-300 rounded px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white shadow-sm font-medium transition-all duration-200;
        }
        .btn {
          @apply mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md;
        }
        .resume-preview {
          min-height: 600px;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
