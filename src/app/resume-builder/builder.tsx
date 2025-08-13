import React, { useState } from 'react';

// Dummy data for initial load
interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
  description: string;
}

interface Experience {
  company: string;
  role: string;
  start: string;
  end: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
}

interface ResumeForm {
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: string[];
}

const initialData: ResumeForm = {
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
};

function Section({ title, children, open, onToggle }: SectionProps) {
  return (
    <div className="mb-4 border rounded-lg bg-white shadow-sm">
      <button
        className="w-full flex justify-between items-center px-4 py-3 font-semibold text-lg text-left focus:outline-none"
        onClick={onToggle}
        type="button"
      >
        {title}
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

type ListSection = 'education' | 'experience' | 'projects';
type OpenSection = '' | ListSection | 'skills';

export default function ResumeBuilder() {
  const [form, setForm] = useState<ResumeForm>(initialData);
  const [openSection, setOpenSection] = useState<OpenSection>('education');

  // Handlers for each section
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
  const addSkill = () => setForm(prev => ({ ...prev, skills: [...prev.skills, ''] }));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left: Guided Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">Resume Builder</h2>
        <Section title="Education" open={openSection === 'education'} onToggle={() => setOpenSection(openSection === 'education' ? '' : 'education')}>
          {form.education.map((edu, idx) => (
            <div key={idx} className="mb-4 space-y-2">
              <input className="input" placeholder="School" value={edu.school} onChange={e => handleChange('education', idx, 'school', e.target.value)} />
              <input className="input" placeholder="Degree" value={edu.degree} onChange={e => handleChange('education', idx, 'degree', e.target.value)} />
              <div className="flex gap-2">
                <input className="input" placeholder="Start" value={edu.start} onChange={e => handleChange('education', idx, 'start', e.target.value)} />
                <input className="input" placeholder="End" value={edu.end} onChange={e => handleChange('education', idx, 'end', e.target.value)} />
              </div>
              <textarea className="input" placeholder="Description" value={edu.description} onChange={e => handleChange('education', idx, 'description', e.target.value)} />
            </div>
          ))}
          <button className="btn" onClick={() => addEntry('education')}>+ Add Education</button>
        </Section>
        <Section title="Experience" open={openSection === 'experience'} onToggle={() => setOpenSection(openSection === 'experience' ? '' : 'experience')}>
          {form.experience.map((exp, idx) => (
            <div key={idx} className="mb-4 space-y-2">
              <input className="input" placeholder="Company" value={exp.company} onChange={e => handleChange('experience', idx, 'company', e.target.value)} />
              <input className="input" placeholder="Role" value={exp.role} onChange={e => handleChange('experience', idx, 'role', e.target.value)} />
              <div className="flex gap-2">
                <input className="input" placeholder="Start" value={exp.start} onChange={e => handleChange('experience', idx, 'start', e.target.value)} />
                <input className="input" placeholder="End" value={exp.end} onChange={e => handleChange('experience', idx, 'end', e.target.value)} />
              </div>
              <textarea className="input" placeholder="Description" value={exp.description} onChange={e => handleChange('experience', idx, 'description', e.target.value)} />
            </div>
          ))}
          <button className="btn" onClick={() => addEntry('experience')}>+ Add Experience</button>
        </Section>
        <Section title="Projects" open={openSection === 'projects'} onToggle={() => setOpenSection(openSection === 'projects' ? '' : 'projects')}>
          {form.projects.map((proj, idx) => (
            <div key={idx} className="mb-4 space-y-2">
              <input className="input" placeholder="Title" value={proj.title} onChange={e => handleChange('projects', idx, 'title', e.target.value)} />
              <textarea className="input" placeholder="Description" value={proj.description} onChange={e => handleChange('projects', idx, 'description', e.target.value)} />
            </div>
          ))}
          <button className="btn" onClick={() => addEntry('projects')}>+ Add Project</button>
        </Section>
        <Section title="Skills" open={openSection === 'skills'} onToggle={() => setOpenSection(openSection === 'skills' ? '' : 'skills')}>
          {form.skills.map((skill, idx) => (
            <div key={idx} className="mb-2">
              <input className="input" placeholder="Skill" value={skill} onChange={e => handleSkillChange(idx, e.target.value)} />
            </div>
          ))}
          <button className="btn" onClick={addSkill}>+ Add Skill</button>
        </Section>
      </div>
      {/* Right: Live Preview */}
      <div className="w-full md:w-1/2 p-6 md:p-10 bg-white border-l border-gray-200">
        <h2 className="text-2xl font-bold mb-6">Live Resume Preview</h2>
        <div className="resume-preview max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow print:shadow-none print:bg-white">
          <h1 className="text-3xl font-bold mb-2">{form.education[0]?.school || 'Your Name'}</h1>
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
      <style jsx>{`
        .input {
          @apply w-full border border-gray-300 rounded px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-200;
        }
        .btn {
          @apply mt-2 px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition;
        }
        .resume-preview {
          min-height: 600px;
        }
      `}</style>
    </div>
  );
} 
