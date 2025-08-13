'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Add at the top, after imports
type AdditionalData = {
  projectType?: string;
  duration?: number;
  grade?: string;
  skills?: string[];
  score?: number;
  [key: string]: unknown;
};

// Explicit type for issued credentials to avoid union-narrowing of additionalData
type IssuedCredential = {
  id: number;
  recipientEmail: string;
  recipientName: string;
  schemaId: number;
  schemaName: string;
  issuedDate: string;
  status: 'Delivered' | 'Accepted' | 'Revoked' | 'Error';
  additionalData: AdditionalData;
};

interface Department {
  id: number;
  name: string;
  description: string;
  manager: string;
  roles: string[];
  members: number[]; // user IDs
}

interface CertificateTemplate {
  id: number;
  name: string;
  certificateName: string;
  course: string;
  design: string;
  status: string;
  includeStudentName: boolean;
  includeCertificateId: boolean;
  certificateIdPrefix: string;
  description?: string;
}

interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  body: string;
  type: string;
  status: string;
}

export default function DigitalCertificateIssuer() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeSubSection, setActiveSubSection] = useState('overview');
  
  // Certificate template state
  const [showCertificateTemplateForm, setShowCertificateTemplateForm] = useState(false);
  const [showEditCertificateTemplateForm, setShowEditCertificateTemplateForm] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState<number | null>(null);
  const [previewingTemplate, setPreviewingTemplate] = useState<CertificateTemplate | null>(null);
  const [certificateTemplateForm, setCertificateTemplateForm] = useState({
    name: '',
    certificateName: '',
    course: '',
    description: '',
    design: 'default',
    status: 'Active',
    includeStudentName: true,
    includeCertificateId: true,
    certificateIdPrefix: 'CERT'
  });
  const [certificateTemplates, setCertificateTemplates] = useState<CertificateTemplate[]>([
    {
      id: 1,
      name: 'Default Certificate',
      certificateName: 'Software Development Course',
      course: 'Software Development Course',
      design: 'default',
      status: 'Active',
      includeStudentName: true,
      includeCertificateId: true,
      certificateIdPrefix: 'CERT'
    },
    {
      id: 2,
      name: 'Professional',
      certificateName: 'Professional Certification',
      course: 'Professional Certification',
      design: 'professional',
      status: 'Inactive',
      includeStudentName: true,
      includeCertificateId: true,
      certificateIdPrefix: 'PROF'
    },
    {
      id: 3,
      name: 'Academic',
      certificateName: 'Academic Achievement',
      course: 'Academic Achievement',
      design: 'academic',
      status: 'Inactive',
      includeStudentName: true,
      includeCertificateId: true,
      certificateIdPrefix: 'ACAD'
    }
  ]);

  // Email Template States
  const [showEmailTemplateForm, setShowEmailTemplateForm] = useState(false);
  const [showEditEmailTemplateForm, setShowEditEmailTemplateForm] = useState(false);
  const [showEmailPreviewModal, setShowEmailPreviewModal] = useState(false);
  const [editingEmailTemplateId, setEditingEmailTemplateId] = useState<number | null>(null);
  const [previewingEmailTemplate, setPreviewingEmailTemplate] = useState<EmailTemplate | null>(null);
  
  // Help & Docs States
  const [activeHelpSection, setActiveHelpSection] = useState<string>('guides');
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [showGuideModal, setShowGuideModal] = useState(false);
  
  // Organization States
  const [activeOrgSection, setActiveOrgSection] = useState<string>('profile');
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingDepartmentId, setEditingDepartmentId] = useState<number | null>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  
  const [organizationForm, setOrganizationForm] = useState({
    name: 'YHills Edutech Private Limited',
    logo: null as File | null,
    logoPreview: null as string | null
  });
  
  const [departmentForm, setDepartmentForm] = useState({
    name: '',
    description: '',
    manager: '',
    roles: [] as string[],
    members: [] as number[], // user IDs
  });
  
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'issuer',
    department: ''
  });
  
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 1,
      name: 'IT Department',
      description: 'Information Technology and Development',
      manager: 'John Smith',
      roles: [] as string[],
      members: [] as number[]
    },
    {
      id: 2,
      name: 'HR Department',
      description: 'Human Resources and Administration',
      manager: 'Lisa Chen',
      roles: [] as string[],
      members: [] as number[]
    },
    {
      id: 3,
      name: 'Training Department',
      description: 'Employee Training and Development',
      manager: 'Mike Wilson',
      roles: [] as string[],
      members: [] as number[]
    }
  ]);
  
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@yhills.com',
      role: 'issuer',
      department: 'IT Department',
      status: 'active'
    },
    {
      id: 2,
      name: 'Lisa Chen',
      email: 'lisa.chen@yhills.com',
      role: 'verifier',
      department: 'HR Department',
      status: 'active'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@yhills.com',
      role: 'observer',
      department: 'Training Department',
      status: 'active'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@yhills.com',
      role: 'issuer',
      department: 'IT Department',
      status: 'inactive'
    }
  ]);
  
  const [emailTemplateForm, setEmailTemplateForm] = useState({
    name: '',
    subject: '',
    body: '',
    type: 'credential_issuance',
    status: 'Active'
  });
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([
    {
      id: 1,
      name: 'Default Credential Email',
      subject: 'Your Certificate is Ready!',
      body: 'Dear {{recipient_name}},\n\nCongratulations! Your certificate for {{course_name}} has been issued successfully.\n\nCertificate ID: {{certificate_id}}\nIssued Date: {{issued_date}}\n\nYou can download your certificate from the link below:\n{{download_link}}\n\nBest regards,\n{{organization_name}}',
      type: 'credential_issuance',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Professional Welcome Email',
      subject: 'Welcome to Our Certification Program',
      body: 'Hello {{recipient_name}},\n\nWelcome to our professional certification program! Your certificate for {{course_name}} has been successfully generated.\n\nCertificate Details:\n- Certificate ID: {{certificate_id}}\n- Issue Date: {{issued_date}}\n- Status: Active\n\nDownload your certificate: {{download_link}}\n\nThank you for choosing us!\n{{organization_name}}',
      type: 'credential_issuance',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Academic Achievement Email',
      subject: 'Academic Achievement Certificate Issued',
      body: 'Dear {{recipient_name}},\n\nWe are pleased to inform you that your academic achievement certificate for {{course_name}} has been officially issued.\n\nCertificate Information:\n• Certificate ID: {{certificate_id}}\n• Date of Issue: {{issued_date}}\n• Achievement Level: {{achievement_level}}\n\nAccess your certificate: {{download_link}}\n\nCongratulations on your achievement!\n{{organization_name}}',
      type: 'credential_issuance',
      status: 'Inactive'
    }
  ]);

  // Load certificate templates from localStorage on component mount
  useEffect(() => {
    const savedTemplates = localStorage.getItem('dice-certificate-templates');
    if (savedTemplates) {
      try {
        const parsedTemplates = JSON.parse(savedTemplates);
        setCertificateTemplates(parsedTemplates);
      } catch (error) {
        console.error('Error loading certificate templates from localStorage:', error);
      }
    }
  }, []);

  // Save certificate templates to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dice-certificate-templates', JSON.stringify(certificateTemplates));
  }, [certificateTemplates]);

  // Load email templates from localStorage on component mount
  useEffect(() => {
    const savedEmailTemplates = localStorage.getItem('dice-email-templates');
    if (savedEmailTemplates) {
      try {
        const parsedEmailTemplates = JSON.parse(savedEmailTemplates);
        setEmailTemplates(parsedEmailTemplates);
      } catch (error) {
        console.error('Error loading email templates from localStorage:', error);
      }
    }
  }, []);

  // Save email templates to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dice-email-templates', JSON.stringify(emailTemplates));
  }, [emailTemplates]);

  // Load email templates from localStorage on component mount
  useEffect(() => {
    const savedEmailTemplates = localStorage.getItem('dice-email-templates');
    if (savedEmailTemplates) {
      try {
        const parsedEmailTemplates = JSON.parse(savedEmailTemplates);
        setEmailTemplates(parsedEmailTemplates);
      } catch (error) {
        console.error('Error loading email templates from localStorage:', error);
      }
    }
  }, []);

  // Save email templates to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dice-email-templates', JSON.stringify(emailTemplates));
  }, [emailTemplates]);
  
  // Schema creation state
  const [showSchemaForm, setShowSchemaForm] = useState(false);
  const [schemaForm, setSchemaForm] = useState({
    name: '',
    version: '',
    description: '',
    enableIssuance: true
  });
  const [attributes, setAttributes] = useState([
    { id: 1, name: '', type: 'String', description: '' }
  ]);
  const [schemas, setSchemas] = useState([
    {
      id: 1,
      name: 'Software Development Certification',
      version: '1.2',
      description: 'Certification for software development skills',
      attributes: [
        { name: 'Name', type: 'String', description: 'Full name of the recipient' },
        { name: 'Email', type: 'Email', description: 'Contact email address' },
        { name: 'Skills', type: 'String', description: 'Technical skills acquired' },
        { name: 'Completion Date', type: 'Date', description: 'When certification was completed' },
        { name: 'Score', type: 'Number', description: 'Final assessment score' }
      ],
      enableIssuance: true,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Project Management Certificate',
      version: '1.0',
      description: 'Certification for project management skills',
      attributes: [
        { name: 'Name', type: 'String', description: 'Full name of the recipient' },
        { name: 'Email', type: 'Email', description: 'Contact email address' },
        { name: 'Project Type', type: 'String', description: 'Type of project managed' },
        { name: 'Duration', type: 'Number', description: 'Project duration in months' },
        { name: 'Grade', type: 'String', description: 'Final grade achieved' }
      ],
      enableIssuance: true,
      status: 'Active'
    }
  ]);

  // Load schemas from localStorage on component mount
  useEffect(() => {
    const savedSchemas = localStorage.getItem('dice-schemas');
    if (savedSchemas) {
      try {
        const parsedSchemas = JSON.parse(savedSchemas);
        if (Array.isArray(parsedSchemas) && parsedSchemas.length > 0) {
          setSchemas(parsedSchemas);
        } else {
          // Try to restore from backup
          const backup = localStorage.getItem('dice-schemas-backup');
          if (backup) {
            const parsedBackup = JSON.parse(backup);
            if (Array.isArray(parsedBackup) && parsedBackup.length > 0) {
              setSchemas(parsedBackup);
              console.warn('Restored schemas from backup.');
            }
          } else {
            console.warn('Warning: dice-schemas in localStorage is empty or invalid, and no backup found. Keeping current schemas.');
          }
        }
      } catch (error) {
        console.error('Error loading schemas from localStorage:', error);
      }
    } else {
      // Try to restore from backup if no schemas at all
      const backup = localStorage.getItem('dice-schemas-backup');
      if (backup) {
        const parsedBackup = JSON.parse(backup);
        if (Array.isArray(parsedBackup) && parsedBackup.length > 0) {
          setSchemas(parsedBackup);
          console.warn('Restored schemas from backup.');
        }
      }
    }
  }, []);

  // Save schemas to localStorage whenever schemas change
  useEffect(() => {
    localStorage.setItem('dice-schemas', JSON.stringify(schemas));
    if (Array.isArray(schemas) && schemas.length > 0) {
      localStorage.setItem('dice-schemas-backup', JSON.stringify(schemas));
    }
  }, [schemas]);

  // Credential issuance state
  const [issuedCredentials, setIssuedCredentials] = useState<IssuedCredential[]>([
    {
      id: 1,
      recipientEmail: 'john.doe@example.com',
      recipientName: 'John Doe',
      schemaId: 1,
      schemaName: 'Software Development Certification',
      issuedDate: '2024-01-15',
      status: 'Accepted', // Delivered, Accepted, Revoked
      additionalData: { skills: ['JavaScript', 'React'], score: 95 }
    },
    {
      id: 2,
      recipientEmail: 'jane.smith@example.com',
      recipientName: 'Jane Smith',
      schemaId: 2,
      schemaName: 'Project Management Certificate',
      issuedDate: '2024-01-14',
      status: 'Delivered',
      additionalData: { projectType: 'Web Development', duration: 6, grade: 'A' }
    }
  ]);

  // Load issued credentials from localStorage on component mount
  useEffect(() => {
    const savedCredentials = localStorage.getItem('dice-issued-credentials');
    if (savedCredentials) {
      try {
        const parsedCredentials = JSON.parse(savedCredentials);
        setIssuedCredentials(parsedCredentials);
      } catch (error) {
        console.error('Error loading issued credentials from localStorage:', error);
      }
    }
  }, []);

  // Save issued credentials to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dice-issued-credentials', JSON.stringify(issuedCredentials));
  }, [issuedCredentials]);

  const [issueForm, setIssueForm] = useState({
    schemaId: '',
    recipientEmail: '',
    recipientName: '',
    additionalData: ''
  });

  // Schema form handlers
  const handleSchemaFormChange = (field: string, value: string | boolean) => {
    setSchemaForm(prev => ({ ...prev, [field]: value }));
  };

  const addAttribute = () => {
    const newId = Math.max(...attributes.map(attr => attr.id), 0) + 1;
    setAttributes(prev => [...prev, { id: newId, name: '', type: 'String', description: '' }]);
  };

  const removeAttribute = (id: number) => {
    if (attributes.length > 1) {
      setAttributes(prev => prev.filter(attr => attr.id !== id));
    }
  };

  const updateAttribute = (id: number, field: string, value: string) => {
    setAttributes(prev => prev.map(attr => 
      attr.id === id ? { ...attr, [field]: value } : attr
    ));
  };

  const handleCreateSchema = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!schemaForm.name || !schemaForm.version) {
      alert('Please fill in all required fields');
      return;
    }

    const validAttributes = attributes.filter(attr => attr.name.trim() !== '');
    if (validAttributes.length === 0) {
      alert('Please add at least one attribute');
      return;
    }

    const newSchema = {
      id: Math.max(...schemas.map(s => s.id), 0) + 1,
      name: schemaForm.name,
      version: schemaForm.version,
      description: schemaForm.description,
      attributes: validAttributes.map(attr => ({
        name: attr.name,
        type: attr.type,
        description: attr.description
      })),
      enableIssuance: schemaForm.enableIssuance,
      status: 'Active'
    };

    setSchemas(prev => [...prev, newSchema]);
    
    // Reset form
    setSchemaForm({
      name: '',
      version: '',
      description: '',
      enableIssuance: true
    });
    setAttributes([{ id: 1, name: '', type: 'String', description: '' }]);
    setShowSchemaForm(false);
    
    alert('Schema created successfully!');
  };

  const toggleSchemaIssuance = (schemaId: number) => {
    setSchemas(prev => prev.map(schema => 
      schema.id === schemaId 
        ? { ...schema, enableIssuance: !schema.enableIssuance }
        : schema
    ));
  };

  const deleteSchema = (schemaId: number) => {
    if (confirm('Are you sure you want to delete this schema?')) {
      setSchemas(prev => prev.filter(schema => schema.id !== schemaId));
    }
  };

  // Credential issuance handlers
  const handleIssueFormChange = (field: string, value: string) => {
    setIssueForm(prev => ({ ...prev, [field]: value }));
  };

  const handleIssueCredential = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!issueForm.schemaId || !issueForm.recipientEmail || !issueForm.recipientName) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedSchema = schemas.find(s => s.id === parseInt(issueForm.schemaId));
    if (!selectedSchema) {
      alert('Please select a valid schema');
      return;
    }

    if (!selectedSchema.enableIssuance) {
      alert('This schema has issuance disabled');
      return;
    }

    let parsedAdditionalData: AdditionalData = {};
    if (issueForm.additionalData) {
      try {
        parsedAdditionalData = JSON.parse(issueForm.additionalData);
        if (parsedAdditionalData.duration !== undefined) {
          parsedAdditionalData.duration = Number(parsedAdditionalData.duration);
        }
      } catch {
        alert('Invalid JSON format for additional data');
        return;
      }
    }

    const newCredential: IssuedCredential = {
      id: Math.max(...issuedCredentials.map(c => c.id), 0) + 1,
      recipientEmail: issueForm.recipientEmail,
      recipientName: issueForm.recipientName,
      schemaId: parseInt(issueForm.schemaId),
      schemaName: selectedSchema.name,
      issuedDate: new Date().toISOString().split('T')[0],
      status: 'Delivered',
      additionalData: {
        projectType: parsedAdditionalData.projectType ?? "",
        duration: parsedAdditionalData.duration ?? 0,
        grade: parsedAdditionalData.grade ?? "",
        skills: parsedAdditionalData.skills ?? [],
        score: parsedAdditionalData.score ?? 0
      }
    };

    setIssuedCredentials(prev => [...prev, newCredential]);
    
    // Reset form
    setIssueForm({
      schemaId: '',
      recipientEmail: '',
      recipientName: '',
      additionalData: ''
    });
    
    alert('Credential issued successfully!');
  };

  const revokeCredential = (credentialId: number) => {
    if (confirm('Are you sure you want to revoke this credential?')) {
      setIssuedCredentials(prev => prev.map(cred => 
        cred.id === credentialId ? { ...cred, status: 'Revoked' } : cred
      ));
    }
  };

  const updateCredentialStatus = (credentialId: number, newStatus: IssuedCredential['status']) => {
    setIssuedCredentials(prev => prev.map(cred => 
      cred.id === credentialId ? { ...cred, status: newStatus } : cred
    ));
  };

  const handleMarkAccepted = (id: number) => {
    setIssuedCredentials(prev =>
      prev.map(cred =>
        cred.id === id ? { ...cred, status: 'Accepted' } : cred
      )
    );
  };

  const handleRevoke = (id: number) => {
    if (confirm('Are you sure you want to revoke this credential?')) {
      setIssuedCredentials(prev =>
        prev.map(cred =>
          cred.id === id ? { ...cred, status: 'Revoked' } : cred
        )
      );
    }
  };

  // Certificate template handlers
  const handleCertificateTemplateFormChange = (field: string, value: string | boolean) => {
    setCertificateTemplateForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateCertificateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certificateTemplateForm.name.trim() || !certificateTemplateForm.certificateName.trim() || !certificateTemplateForm.course.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const newTemplate = {
      id: Math.max(...certificateTemplates.map(t => t.id), 0) + 1,
      name: certificateTemplateForm.name,
      certificateName: certificateTemplateForm.certificateName,
      course: certificateTemplateForm.course,
      design: certificateTemplateForm.design,
      status: certificateTemplateForm.status,
      includeStudentName: certificateTemplateForm.includeStudentName,
      includeCertificateId: certificateTemplateForm.includeCertificateId,
      certificateIdPrefix: certificateTemplateForm.certificateIdPrefix
    };

    setCertificateTemplates(prev => [...prev, newTemplate]);
    
    // Reset form
    setCertificateTemplateForm({
      name: '',
      certificateName: '',
      course: '',
      description: '',
      design: 'default',
      status: 'Active',
      includeStudentName: true,
      includeCertificateId: true,
      certificateIdPrefix: 'CERT'
    });
    
    setShowCertificateTemplateForm(false);
  };

  const toggleCertificateTemplateStatus = (templateId: number) => {
    setCertificateTemplates(prev => prev.map(template => 
      template.id === templateId 
        ? { ...template, status: template.status === 'Active' ? 'Inactive' : 'Active' }
        : template
    ));
  };

  const deleteCertificateTemplate = (templateId: number) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setCertificateTemplates(prev => prev.filter(template => template.id !== templateId));
    }
  };

  // Edit certificate template
  const handleEditCertificateTemplate = (templateId: number) => {
    const template = certificateTemplates.find(t => t.id === templateId);
    if (template) {
      setCertificateTemplateForm({
        name: template.name,
        certificateName: template.certificateName || '',
        course: template.course || '',
        description: template.description || '',
        design: template.design,
        status: template.status,
        includeStudentName: template.includeStudentName ?? true,
        includeCertificateId: template.includeCertificateId ?? true,
        certificateIdPrefix: template.certificateIdPrefix || 'CERT'
      });
      setEditingTemplateId(templateId);
      setShowEditCertificateTemplateForm(true);
    }
  };

  // Update certificate template
  const handleUpdateCertificateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!certificateTemplateForm.name.trim() || !certificateTemplateForm.certificateName.trim() || !certificateTemplateForm.course.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingTemplateId) {
      setCertificateTemplates(prev => prev.map(template => 
        template.id === editingTemplateId 
          ? { ...template, ...certificateTemplateForm }
          : template
      ));
      
      // Reset form
      setCertificateTemplateForm({
        name: '',
        certificateName: '',
        course: '',
        design: 'default',
        status: 'Active',
        includeStudentName: true,
        includeCertificateId: true,
        certificateIdPrefix: 'CERT'
      });
      
      setEditingTemplateId(null);
      setShowEditCertificateTemplateForm(false);
    }
  };

  // Preview certificate template
  const handlePreviewCertificateTemplate = (templateId: number) => {
    const template = certificateTemplates.find(t => t.id === templateId);
    if (template) {
      setPreviewingTemplate(template);
      setShowPreviewModal(true);
    }
  };

  // Generate unique certificate ID
  const generateCertificateId = (template: CertificateTemplate) => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const prefix = template.certificateIdPrefix || 'CERT';
    return `${prefix}-${year}-${randomNum}`;
  };

  // Download certificate template
  const handleDownloadCertificate = (templateId: number) => {
    const template = certificateTemplates.find(t => t.id === templateId);
    if (template) {
      // Generate unique certificate ID
      const certificateId = generateCertificateId(template);
      
      // Create certificate HTML content
      const certificateHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${template.name} - Certificate</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .certificate {
              width: 800px;
              height: 600px;
              margin: 0 auto;
              background: white;
              border: 3px solid #333;
              border-radius: 10px;
              padding: 40px;
              text-align: center;
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }
            .header {
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .title {
              font-size: 36px;
              font-weight: bold;
              color: #333;
              margin-bottom: 10px;
            }
            .subtitle {
              font-size: 18px;
              color: #666;
            }
            .content {
              margin: 40px 0;
            }
            .recipient {
              font-size: 28px;
              font-weight: bold;
              color: #2563eb;
              margin: 20px 0;
            }
            .course {
              font-size: 24px;
              font-weight: bold;
              color: #333;
              margin: 20px 0;
            }
            .details {
              margin: 30px 0;
              font-size: 16px;
              color: #666;
            }
            .issue-date {
              margin: 15px 0;
              font-size: 16px;
              color: #666;
            }
            .certificate-id {
              font-weight: bold;
              color: #2563eb;
              margin: 10px 0;
            }
            .footer {
              border-top: 2px solid #333;
              padding-top: 20px;
              margin-top: 30px;
              font-size: 14px;
              color: #666;
            }
            .template-info {
              font-size: 12px;
              color: #999;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="header">
              <div class="title">Certificate of Completion</div>
            </div>
            
                        <div class="content">
              <div class="subtitle">This is to certify that</div>
              ${template.includeStudentName ? '<div class="recipient">aman</div>' : ''}
              <div class="subtitle">has successfully completed</div>
              <div class="course">${template.course || template.certificateName || template.name}</div>
              <div class="subtitle">with distinction</div>
            </div>
            
            <div class="details">
              <div class="issue-date">Issued on: ${new Date().toLocaleDateString()}</div>
              ${template.includeCertificateId ? `<div class="certificate-id">Certificate ID: ${certificateId}</div>` : ''}
            </div>
            
            <div class="footer">
              <div>This certificate is issued by YHills Edutech Private Limited</div>
              <div class="template-info">
                Template: ${template.name} | Design: ${template.design} | Status: ${template.status}
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      // Create blob and download
      const blob = new Blob([certificateHTML], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${template.name.replace(/\s+/g, '_')}_Certificate.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

  // Email Template Handlers
  const handleEmailTemplateFormChange = (field: string, value: string) => {
    setEmailTemplateForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateEmailTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailTemplateForm.name.trim() || !emailTemplateForm.subject.trim() || !emailTemplateForm.body.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    const newEmailTemplate = {
      id: Math.max(...emailTemplates.map(t => t.id), 0) + 1,
      name: emailTemplateForm.name,
      subject: emailTemplateForm.subject,
      body: emailTemplateForm.body,
      type: emailTemplateForm.type,
      status: emailTemplateForm.status
    };
    setEmailTemplates(prev => [...prev, newEmailTemplate]);
    setEmailTemplateForm({ name: '', subject: '', body: '', type: 'credential_issuance', status: 'Active' });
    setShowEmailTemplateForm(false);
  };

  const handleEditEmailTemplate = (templateId: number) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setEmailTemplateForm({
        name: template.name,
        subject: template.subject,
        body: template.body,
        type: template.type,
        status: template.status
      });
      setEditingEmailTemplateId(templateId);
      setShowEditEmailTemplateForm(true);
    }
  };

  const handleUpdateEmailTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailTemplateForm.name.trim() || !emailTemplateForm.subject.trim() || !emailTemplateForm.body.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    if (editingEmailTemplateId) {
      setEmailTemplates(prev => prev.map(template =>
        template.id === editingEmailTemplateId
          ? { ...template, ...emailTemplateForm }
          : template
      ));
      setEmailTemplateForm({ name: '', subject: '', body: '', type: 'credential_issuance', status: 'Active' });
      setEditingEmailTemplateId(null);
      setShowEditEmailTemplateForm(false);
    }
  };

  const handlePreviewEmailTemplate = (templateId: number) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setPreviewingEmailTemplate(template);
      setShowEmailPreviewModal(true);
    }
  };

  const toggleEmailTemplateStatus = (templateId: number) => {
    setEmailTemplates(prev => prev.map(template =>
      template.id === templateId
        ? { ...template, status: template.status === 'Active' ? 'Inactive' : 'Active' }
        : template
    ));
  };

  const deleteEmailTemplate = (templateId: number) => {
    if (window.confirm('Are you sure you want to delete this email template?')) {
      setEmailTemplates(prev => prev.filter(template => template.id !== templateId));
    }
  };

  const handleDownloadEmailTemplate = (templateId: number) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      const emailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${template.name} - Email Template</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
            .email { width: 600px; margin: 0 auto; background: white; border: 1px solid #ddd; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header { border-bottom: 2px solid #2563eb; padding-bottom: 15px; margin-bottom: 20px; }
            .subject { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 10px; }
            .content { line-height: 1.6; color: #333; }
            .footer { border-top: 1px solid #ddd; padding-top: 15px; margin-top: 20px; font-size: 12px; color: #666; }
            .template-info { font-size: 10px; color: #999; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="email">
            <div class="header">
              <div class="subject">${template.subject}</div>
            </div>
            <div class="content">
              ${template.body.replace(/\n/g, '<br>')}
            </div>
            <div className="footer">
              <div>This email template is created by YHills Edutech Private Limited</div>
              <div className="template-info">
                Template: ${template.name} | Type: ${template.type} | Status: ${template.status}
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
      const blob = new Blob([emailHTML], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${template.name.replace(/\s+/g, '_')}_Email_Template.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

  // Help & Docs Data
  const helpGuides = {
    'getting-started': {
      title: 'Getting Started',
      description: 'Learn how to set up your organization and issue your first credential.',
      content: `
        <h2>Getting Started with DICE ID Console</h2>
        
        <h3>1. Organization Setup</h3>
        <p>Start by configuring your organization profile:</p>
        <ul>
          <li>Update your organization logo and branding</li>
          <li>Set up contact information for certificate issuance</li>
          <li>Configure departments and user roles</li>
        </ul>
        
        <h3>2. Create Your First Schema</h3>
        <p>Define the structure of your credentials:</p>
        <ul>
          <li>Go to Credentials → Schemas</li>
          <li>Click "Create New Schema"</li>
          <li>Define attributes like name, course, score, etc.</li>
          <li>Enable certificate issuance for the schema</li>
        </ul>
        
        <h3>3. Design Templates</h3>
        <p>Create branded certificate and email templates:</p>
        <ul>
          <li>Navigate to Templates → Certificate Template</li>
          <li>Design your certificate layout</li>
          <li>Create email templates for notifications</li>
        </ul>
        
        <h3>4. Issue Your First Credential</h3>
        <p>Start issuing credentials to recipients:</p>
        <ul>
          <li>Go to Credentials → Issue Credential</li>
          <li>Select your schema</li>
          <li>Enter recipient details</li>
          <li>Add any additional data</li>
          <li>Click "Issue Credential"</li>
        </ul>
        
        <h3>Next Steps</h3>
        <p>Once you've issued your first credential, explore:</p>
        <ul>
          <li>Batch issuance for multiple recipients</li>
          <li>Template customization</li>
          <li>API integration for automation</li>
        </ul>
      `
    },
    'schema-design': {
      title: 'Schema Design',
      description: 'Best practices for designing credential schemas and attributes.',
      content: `
        <h2>Schema Design Best Practices</h2>
        
        <h3>Understanding Schemas</h3>
        <p>A schema defines the structure and attributes of your credentials. Think of it as a template that specifies what information each credential will contain.</p>
        
        <h3>Core Schema Components</h3>
        <ul>
          <li><strong>Schema Name:</strong> A clear, descriptive name for your credential type</li>
          <li><strong>Version:</strong> Track schema changes with version numbers</li>
          <li><strong>Description:</strong> Explain the purpose and use case</li>
          <li><strong>Attributes:</strong> The data fields your credential will contain</li>
        </ul>
        
        <h3>Attribute Types</h3>
        <ul>
          <li><strong>Text:</strong> For names, titles, descriptions</li>
          <li><strong>Number:</strong> For scores, grades, durations</li>
          <li><strong>Date:</strong> For issue dates, expiry dates</li>
          <li><strong>Boolean:</strong> For yes/no flags</li>
        </ul>
        
        <h3>Best Practices</h3>
        <ul>
          <li>Use clear, descriptive attribute names</li>
          <li>Include required fields for essential information</li>
          <li>Plan for future expansion</li>
          <li>Consider data validation requirements</li>
          <li>Document your schema design decisions</li>
        </ul>
        
        <h3>Example Schema: Course Completion</h3>
        <pre>
Schema Name: Course Completion Certificate
Version: 1.0
Description: Certifies completion of educational courses

Attributes:
- student_name (text, required)
- course_name (text, required)
- completion_date (date, required)
- final_score (number, optional)
- instructor_name (text, optional)
- course_duration (number, optional)
        </pre>
      `
    },
    'template-customization': {
      title: 'Template Customization',
      description: 'How to create and customize certificate and email templates.',
      content: `
        <h2>Template Customization Guide</h2>
        
        <h3>Certificate Templates</h3>
        <p>Certificate templates define the visual design and layout of your digital certificates.</p>
        
        <h4>Design Elements</h4>
        <ul>
          <li><strong>Header:</strong> Organization branding and certificate title</li>
          <li><strong>Recipient Section:</strong> Name and achievement details</li>
          <li><strong>Content Area:</strong> Course information and completion details</li>
          <li><strong>Footer:</strong> Issue date, certificate ID, and signatures</li>
        </ul>
        
        <h4>Design Types</h4>
        <ul>
          <li><strong>Default:</strong> Clean, professional design</li>
          <li><strong>Professional:</strong> Corporate-style layout</li>
          <li><strong>Academic:</strong> Traditional educational certificates</li>
          <li><strong>Modern:</strong> Contemporary, minimalist design</li>
          <li><strong>Classic:</strong> Traditional, formal appearance</li>
        </ul>
        
        <h3>Email Templates</h3>
        <p>Email templates control the communication sent to credential recipients.</p>
        
        <h4>Template Variables</h4>
        <p>Use these variables to personalize your emails:</p>
        <ul>
          <li><code>{recipient_name}</code> - Recipient's full name</li>
          <li><code>{course_name}</code> - Course or program name</li>
          <li><code>{certificate_id}</code> - Unique certificate identifier</li>
          <li><code>{issued_date}</code> - Date of issuance</li>
          <li><code>{download_link}</code> - Link to download certificate</li>
          <li><code>{organization_name}</code> - Your organization name</li>
        </ul>
        
        <h4>Email Types</h4>
        <ul>
          <li><strong>Credential Issuance:</strong> Sent when a credential is issued</li>
          <li><strong>Welcome:</strong> Welcome emails for new recipients</li>
          <li><strong>Reminder:</strong> Follow-up emails for pending actions</li>
          <li><strong>Notification:</strong> General notifications and updates</li>
        </ul>
        
        <h3>Best Practices</h3>
        <ul>
          <li>Keep designs clean and professional</li>
          <li>Ensure readability and accessibility</li>
          <li>Include your organization branding</li>
          <li>Test templates before deployment</li>
          <li>Use consistent styling across templates</li>
        </ul>
      `
    },
    'batch-operations': {
      title: 'Batch Operations',
      description: 'Guide to bulk credential issuance and management.',
      content: `
        <h2>Batch Operations Guide</h2>
        
        <h3>Overview</h3>
        <p>Batch operations allow you to issue multiple credentials simultaneously, making it efficient to handle large numbers of recipients.</p>
        
        <h3>CSV File Format</h3>
        <p>Prepare your data in CSV format with the following columns:</p>
        <ul>
          <li><strong>email:</strong> Recipient's email address</li>
          <li><strong>name:</strong> Recipient's full name</li>
          <li><strong>schema_id:</strong> ID of the schema to use</li>
          <li><strong>additional_data:</strong> JSON string with extra attributes</li>
        </ul>
        
        <h3>Example CSV</h3>
        <pre>
email,name,schema_id,additional_data
john.doe@example.com,John Doe,1,"{""course_name"":""Web Development"",""score"":95}"
jane.smith@example.com,Jane Smith,1,"{""course_name"":""Data Science"",""score"":88}"
        </pre>
        
        <h3>Batch Processing Options</h3>
        <ul>
          <li><strong>Auto-issue credentials:</strong> Automatically issue credentials for all valid entries</li>
          <li><strong>Auto-send invitations:</strong> Automatically send email invitations to recipients</li>
          <li><strong>Validation:</strong> Validate data before processing</li>
          <li><strong>Error handling:</strong> Handle and report any processing errors</li>
        </ul>
        
        <h3>Processing Steps</h3>
        <ol>
          <li>Upload your CSV file</li>
          <li>Review the data preview</li>
          <li>Select processing options</li>
          <li>Start the batch process</li>
          <li>Monitor progress and results</li>
          <li>Review any errors or warnings</li>
        </ol>
        
        <h3>Best Practices</h3>
        <ul>
          <li>Validate your CSV data before uploading</li>
          <li>Use consistent data formats</li>
          <li>Test with a small batch first</li>
          <li>Keep backup of your original data</li>
          <li>Monitor the process for any issues</li>
        </ul>
      `
    }
  };

  // Help & Docs Handlers
  const handleOpenGuide = (guideId: string) => {
    setSelectedGuide(guideId);
    setShowGuideModal(true);
  };

  const handleCloseGuide = () => {
    setShowGuideModal(false);
    setSelectedGuide(null);
  };

  // Organization Handlers
  const handleOrganizationFormChange = (field: string, value: string | File | null) => {
    if (field === 'logo' && value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setOrganizationForm(prev => ({
          ...prev,
          logo: value,
          logoPreview: dataUrl
        }));
        localStorage.setItem('organization-logo-preview', dataUrl);
      };
      reader.readAsDataURL(value);
    } else {
      setOrganizationForm(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleUpdateOrganization = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logoPreview to localStorage for persistence
    if (organizationForm.logoPreview) {
      localStorage.setItem('organization-logo-preview', organizationForm.logoPreview);
    }
    // No required fields to validate except name (which is locked) and logo (optional)
    // Simulate API call to update organization
    console.log('Updating organization profile:', organizationForm);
    // Show success message
    alert('Organization profile updated successfully! Your changes have been saved.');
    // In a real application, you would make an API call here
    // Example:
    //   await updateOrganizationProfile(organizationForm);
    //   alert('Organization profile updated successfully!');
    // } catch (error) {
    //   alert('Failed to update organization profile. Please try again.');
    // }
  };

  const handleDepartmentFormChange = (field: string, value: string) => {
    setDepartmentForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!departmentForm.name.trim() || !departmentForm.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    const newDepartment = {
      id: Math.max(...departments.map(d => d.id), 0) + 1,
      name: departmentForm.name,
      description: departmentForm.description,
      manager: departmentForm.manager,
      roles: departmentForm.roles,
      members: departmentForm.members,
    };
    setDepartments(prev => [...prev, newDepartment]);
    setDepartmentForm({ name: '', description: '', manager: '', roles: [], members: [] });
    setShowDepartmentForm(false);
  };

  const handleEditDepartment = (departmentId: number) => {
    const department = departments.find(d => d.id === departmentId);
    if (department) {
      setDepartmentForm({
        name: department.name,
        description: department.description,
        manager: department.manager,
        roles: department.roles,
        members: department.members,
      });
      setEditingDepartmentId(departmentId);
      setShowDepartmentForm(true);
    }
  };

  const handleUpdateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!departmentForm.name.trim() || !departmentForm.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    if (editingDepartmentId) {
      setDepartments(prev => prev.map(dept =>
        dept.id === editingDepartmentId
          ? { ...dept, ...departmentForm }
          : dept
      ));
      setDepartmentForm({ name: '', description: '', manager: '', roles: [], members: [] });
      setEditingDepartmentId(null);
      setShowDepartmentForm(false);
    }
  };

  const handleDeleteDepartment = (departmentId: number) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(prev => prev.filter(dept => dept.id !== departmentId));
    }
  };

  const handleUserFormChange = (field: string, value: string) => {
    setUserForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name.trim() || !userForm.email.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    const newUser = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      name: userForm.name,
      email: userForm.email,
      role: userForm.role,
      department: userForm.department,
      status: 'active'
    };
    setUsers(prev => [...prev, newUser]);
    setUserForm({ name: '', email: '', role: 'issuer', department: '' });
    setShowUserForm(false);
  };

  const handleEditUser = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUserForm({
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      });
      setEditingUserId(userId);
      setShowUserForm(true);
    }
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name.trim() || !userForm.email.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    if (editingUserId) {
      setUsers(prev => prev.map(user =>
        user.id === editingUserId
          ? { ...user, ...userForm }
          : user
      ));
      setUserForm({ name: '', email: '', role: 'issuer', department: '' });
      setEditingUserId(null);
      setShowUserForm(false);
    }
  };

  const handleDeleteUser = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleToggleUserStatus = (userId: number) => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  // Add state for active credentials tab and search query
  const [activeCredentialsTab, setActiveCredentialsTab] = useState<'all' | 'offered' | 'revoked' | 'errors'>('all');
  const [credentialsSearch, setCredentialsSearch] = useState('');
  const [credentialsLoading, setCredentialsLoading] = useState(false); // Set to true if you fetch from API

  // Helper to filter credentials by tab and search
  const filteredCredentials = issuedCredentials.filter(cred => {
    // Tab filter
    if (activeCredentialsTab === 'offered' && cred.status === 'Revoked') return false;
    if (activeCredentialsTab === 'revoked' && cred.status !== 'Revoked') return false;
    if (activeCredentialsTab === 'errors' && cred.status !== 'Error') return false;
    // Search filter
    const q = credentialsSearch.toLowerCase();
    return (
      cred.recipientName.toLowerCase().includes(q) ||
      cred.recipientEmail.toLowerCase().includes(q) ||
      (cred.schemaName && cred.schemaName.toLowerCase().includes(q))
    );
  });

  // Add state for modals
  const [showIssueExistingModal, setShowIssueExistingModal] = useState(false);
  const [showIssueNewModal, setShowIssueNewModal] = useState(false);
  const [issueExistingForm, setIssueExistingForm] = useState({ userId: '', schemaId: '', additionalData: '' });
  const [issueNewForm, setIssueNewForm] = useState({ name: '', email: '', schemaId: '', additionalData: '' });

  // Handler for issuing to existing
  const handleIssueToExisting = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.id.toString() === issueExistingForm.userId);
    const schema = schemas.find(s => s.id.toString() === issueExistingForm.schemaId);
    if (!user || !schema) return alert('Please select user and schema');
    setIssuedCredentials(prev => [
      ...prev,
      {
        id: Math.max(...issuedCredentials.map(c => c.id), 0) + 1,
        recipientEmail: user.email,
        recipientName: user.name,
        schemaId: schema.id,
        schemaName: schema.name,
        issuedDate: new Date().toISOString().slice(0, 10),
        status: 'Delivered',
        additionalData: issueExistingForm.additionalData
          ? { projectType: '', duration: 0, grade: '', skills: [], score: 0, note: issueExistingForm.additionalData }
          : { projectType: '', duration: 0, grade: '', skills: [], score: 0 }
      }
    ]);
    setShowIssueExistingModal(false);
    setIssueExistingForm({ userId: '', schemaId: '', additionalData: '' });
  };
  // Handler for issuing to new
  const handleIssueToNew = (e: React.FormEvent) => {
    e.preventDefault();
    const schema = schemas.find(s => s.id.toString() === issueNewForm.schemaId);
    if (!schema) return alert('Please select schema');
    setIssuedCredentials(prev => [
      ...prev,
      {
        id: Math.max(...issuedCredentials.map(c => c.id), 0) + 1,
        recipientEmail: issueNewForm.email,
        recipientName: issueNewForm.name,
        schemaId: schema.id,
        schemaName: schema.name,
        issuedDate: new Date().toISOString().slice(0, 10),
        status: 'Delivered',
        additionalData: issueNewForm.additionalData
          ? { projectType: '', duration: 0, grade: '', skills: [], score: 0, note: issueNewForm.additionalData }
          : { projectType: '', duration: 0, grade: '', skills: [], score: 0 }
      }
    ]);
    setShowIssueNewModal(false);
    setIssueNewForm({ name: '', email: '', schemaId: '', additionalData: '' });
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header with Time Period Filter and Email Reports */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
            <select className="p-2 border border-gray-300 rounded-md bg-white">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last 90 Days</option>
              <option>Custom Range</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">From 31 May 2025 to 30 Jun 2025</p>
          </div>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-6">
            Email Reports
          </button>
        </div>
        
        {/* Help Section */}
        <div className="bg-gray-50 p-4 rounded-lg max-w-xs">
          <h4 className="font-medium text-gray-800 mb-2">Not sure where to Begin?</h4>
          <p className="text-sm text-gray-600 mb-3">Click here to go through our extensive documentation for quick tips and FAQs</p>
          <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm" onClick={() => setActiveSection('help')}>
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-2 text-xs">→</span>
            View Documentation
          </button>
        </div>
      </div>

      {/* Organization Users & Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Organization Users & Departments</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-800">1</p>
              <p className="text-sm text-gray-600">Organization Users</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-gray-800">1</p>
              <p className="text-sm text-gray-600">Departments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Credentials Metrics - Only Credentials Offered and Revoked as per requirements */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Credentials</h3>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-800">{schemas.length}</p>
            <p className="text-sm text-green-600">Active Schemas</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">{issuedCredentials.filter(c => c.status !== 'Revoked' && c.status !== 'Error').length}</p>
            <p className="text-sm text-gray-600">Credentials Offered</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">{issuedCredentials.filter(c => c.status === 'Accepted').length}</p>
            <p className="text-sm text-gray-600">Credentials Accepted</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">{issuedCredentials.filter(c => c.status === 'Revoked').length}</p>
            <p className="text-sm text-gray-600">Credentials Revoked</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrganization = () => (
    <div className="space-y-6">
      {/* Removed breadcrumb: <div className="text-sm text-gray-600 mb-4">DICE ID Console / Organization</div> */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Organization Management</h3>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveOrgSection('profile')}
            className={`px-4 py-2 font-medium ${
              activeOrgSection === 'profile'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🏢 Organization Profile
          </button>
          <button
            onClick={() => setActiveOrgSection('departments')}
            className={`px-4 py-2 font-medium ${
              activeOrgSection === 'departments'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🏢 Departments
          </button>
          <button
            onClick={() => setActiveOrgSection('users')}
            className={`px-4 py-2 font-medium ${
              activeOrgSection === 'users'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            👥 Users
          </button>
        </div>

        {/* Organization Profile Section */}
        {activeOrgSection === 'profile' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center space-x-6">
              {organizationForm.logoPreview && (
                <img
                  src={organizationForm.logoPreview}
                  alt="Organization Logo"
                  className="w-20 h-20 object-contain border border-gray-300 rounded-lg bg-white shadow"
                />
              )}
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Organization Profile</h4>
                <p className="text-blue-700">
                  Manage your organization name and branding.
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateOrganization} className="space-y-6">
              {/* Organization Name - Locked */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={organizationForm.name}
                  disabled 
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                />
                <p className="text-sm text-gray-500 mt-1 flex items-center">
                  <span className="text-red-500 mr-1">🔒</span>
                  Organization name cannot be changed after registration
                </p>
              </div>

              {/* Organization Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Logo
                </label>
                <div className="space-y-3">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleOrganizationFormChange('logo', e.target.files?.[0] || null)}
                    className="w-full p-3 border border-gray-300 rounded-md" 
                  />
                  {organizationForm.logoPreview && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 mb-2">Logo Preview:</p>
                      <img 
                        src={organizationForm.logoPreview} 
                        alt="Logo Preview" 
                        className="w-32 h-32 object-contain border border-gray-300 rounded-lg"
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-500">
                    Upload your organization logo (PNG, JPG, SVG). Recommended size: 200x200px
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button 
                  type="button" 
                  onClick={() => {
                    // Reset form to original values
                    setOrganizationForm({
                      name: 'YHills Edutech Private Limited',
                      logo: null,
                      logoPreview: null
                    });
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Reset
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Departments Section */}
        {activeOrgSection === 'departments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xl font-semibold text-gray-800">Departments</h4>
                <p className="text-gray-600">Create internal teams with defined roles and responsibilities</p>
              </div>
              <button 
                onClick={() => setShowDepartmentForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                + Add Department
              </button>
            </div>

            {/* Create/Edit Department Form */}
            {showDepartmentForm && (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">
                  {editingDepartmentId ? 'Edit Department' : 'Create New Department'}
                </h5>
                <form onSubmit={editingDepartmentId ? handleUpdateDepartment : handleCreateDepartment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department Name *</label>
                    <input
                      type="text"
                      value={departmentForm.name}
                      onChange={(e) => handleDepartmentFormChange('name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter department name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      value={departmentForm.description}
                      onChange={(e) => handleDepartmentFormChange('description', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={3}
                      placeholder="Describe the department's purpose and responsibilities"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department Manager</label>
                    <input
                      type="text"
                      value={departmentForm.manager}
                      onChange={(e) => handleDepartmentFormChange('manager', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter manager name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Roles *</label>
                    <select
                      multiple
                      value={departmentForm.roles}
                      onChange={e => setDepartmentForm(form => ({
                        ...form,
                        roles: Array.from(e.target.selectedOptions, option => option.value)
                      }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      <option value="issuer">Issuer</option>
                      <option value="verifier">Verifier</option>
                      <option value="observer">Observer</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple roles.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Members</label>
                    <select
                      multiple
                      value={departmentForm.members.map(String)}
                      onChange={e => setDepartmentForm(form => ({
                        ...form,
                        members: Array.from(e.target.selectedOptions, option => Number(option.value))
                      }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple members.</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      {editingDepartmentId ? 'Update Department' : 'Create Department'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDepartmentForm(false);
                        setEditingDepartmentId(null);
                        setDepartmentForm({ name: '', description: '', manager: '', roles: [], members: [] });
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Departments List */}
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Department Name</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Description</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Manager</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Members</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Roles</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((department) => (
                  <tr key={department.id} className="border-t">
                    <td className="px-4 py-2 font-medium text-gray-800">{department.name}</td>
                    <td className="px-4 py-2 text-gray-600">{department.description}</td>
                    <td className="px-4 py-2 text-gray-600">{department.manager || 'Not assigned'}</td>
                    <td className="px-4 py-2 text-gray-600">{department.members ? department.members.length : 0}</td>
                    <td className="px-4 py-2 text-gray-600">{department.roles && department.roles.length > 0 ? department.roles.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(', ') : 'None'}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => handleEditDepartment(department.id)} className="text-blue-600 hover:text-blue-800 text-sm mr-2">Edit</button>
                      <button onClick={() => handleDeleteDepartment(department.id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Users Section */}
        {activeOrgSection === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xl font-semibold text-gray-800">Users</h4>
                <p className="text-gray-600">Add and assign users as Issuers, Verifiers, or Observers</p>
              </div>
              <button 
                onClick={() => setShowUserForm(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                + Add User
              </button>
            </div>

            {/* Create/Edit User Form */}
            {showUserForm && (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">
                  {editingUserId ? 'Edit User' : 'Add New User'}
                </h5>
                <form onSubmit={editingUserId ? handleUpdateUser : handleCreateUser} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={userForm.name}
                        onChange={(e) => handleUserFormChange('name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={userForm.email}
                        onChange={(e) => handleUserFormChange('email', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                      <select
                        value={userForm.role}
                        onChange={(e) => handleUserFormChange('role', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="issuer">Issuer - Can issue credentials</option>
                        <option value="verifier">Verifier - Can verify credentials</option>
                        <option value="observer">Observer - Can view only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select
                        value={userForm.department}
                        onChange={(e) => handleUserFormChange('department', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept.id} value={dept.name}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      {editingUserId ? 'Update User' : 'Add User'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowUserForm(false);
                        setEditingUserId(null);
                        setUserForm({ name: '', email: '', role: 'issuer', department: '' });
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Users List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.role === 'issuer' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'verifier' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.department || 'Not assigned'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditUser(user.id)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={`${
                              user.status === 'active' ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'
                            }`}
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


      </div>
    </div>
  );

  const renderCredentials = () => {
    // Show Overview by default when Credentials section is selected
    if (activeSubSection === 'overview' || activeSubSection === 'overview') {
      return (
        <div className="space-y-6">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-600 mb-4">
            DICE ID Console / Credentials
          </div>
          
          {/* Credentials Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Credentials Overview</h3>
            
            {/* Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center shadow">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl">📄</span>
                </div>
                <p className="text-4xl font-extrabold text-blue-800">{issuedCredentials.filter(c => c.status !== 'Revoked').length}</p>
                <p className="text-base font-medium text-blue-700">Credentials Offered</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center shadow">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl">❌</span>
                </div>
                <p className="text-4xl font-extrabold text-red-800">{issuedCredentials.filter(c => c.status === 'Revoked').length}</p>
                <p className="text-base font-medium text-red-700">Credentials Revoked</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <button
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 flex items-center"
                onClick={() => setShowIssueExistingModal(true)}
              >
                <span className="mr-2">🔑</span>
                Issue Credentials to Existing Customers
              </button>
              <button
                className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 flex items-center"
                onClick={() => setShowIssueNewModal(true)}
              >
                <span className="mr-2">👤+</span>
                Issue Credentials to New Customer
              </button>
            </div>

            {/* Credentials List Section */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">Credentials List</h4>
              
              {/* Filter Tabs */}
              <div className="flex space-x-1 mb-4 border-b border-gray-200">
                <button
                  className={`px-4 py-2 font-medium ${activeCredentialsTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                  onClick={() => setActiveCredentialsTab('all')}
                >
                  All ({issuedCredentials.length})
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeCredentialsTab === 'offered' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                  onClick={() => setActiveCredentialsTab('offered')}
                >
                  Offered ({issuedCredentials.filter(c => c.status !== 'Revoked' && c.status !== 'Error').length})
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeCredentialsTab === 'revoked' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                  onClick={() => setActiveCredentialsTab('revoked')}
                >
                  Revoked ({issuedCredentials.filter(c => c.status === 'Revoked').length})
                </button>
                <button
                  className={`px-4 py-2 font-medium ${activeCredentialsTab === 'errors' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                  onClick={() => setActiveCredentialsTab('errors')}
                >
                  Errors ({issuedCredentials.filter(c => c.status === 'Error').length})
                </button>
              </div>

              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, email, or schema"
                    value={credentialsSearch}
                    onChange={e => setCredentialsSearch(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md"
                  />
                  <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input type="checkbox" className="rounded" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connected Through</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schema</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credential Attributes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {credentialsLoading ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                            <span className="ml-2 text-gray-500">Loading credentials...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredCredentials.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No credentials found.</td>
                      </tr>
                    ) : (
                      filteredCredentials.map((cred) => (
                        <tr key={cred.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input type="checkbox" className="rounded" />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{cred.recipientName}</div>
                            <div className="text-sm text-gray-500">{cred.recipientEmail}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">-</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cred.schemaName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {cred.additionalData && typeof cred.additionalData === 'object'
                              ? Object.entries(cred.additionalData).map(([k, v]) => `${k}: ${v}`).join(', ')
                              : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded text-xs ${
                              cred.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                              cred.status === 'Delivered' ? 'bg-blue-100 text-blue-800' :
                              cred.status === 'Revoked' ? 'bg-red-100 text-red-800' :
                              cred.status === 'Error' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {cred.status}
                            </span>
                            {cred.status === 'Delivered' && (
                              <button
                                className="ml-2 text-xs text-green-700 hover:underline"
                                onClick={() => handleMarkAccepted(cred.id)}
                              >
                                Mark Accepted
                              </button>
                            )}
                            {cred.status !== 'Revoked' && (
                              <button
                                className="ml-2 text-xs text-red-700 hover:underline"
                                onClick={() => handleRevoke(cred.id)}
                              >
                                Revoke
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeSubSection === 'schemas') {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Credential Schemas</h3>
            <button 
              onClick={() => setShowSchemaForm(!showSchemaForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {showSchemaForm ? 'Cancel' : '+ Create Schema'}
            </button>
          </div>
          
          {/* Schema Creation Form */}
          {showSchemaForm && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Create New Schema</h4>
              <form onSubmit={handleCreateSchema} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Schema Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Software Development Certification" 
                      value={schemaForm.name}
                      onChange={(e) => handleSchemaFormChange('name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Version *</label>
                    <input 
                      type="text" 
                      placeholder="e.g., 1.0" 
                      value={schemaForm.version}
                      onChange={(e) => handleSchemaFormChange('version', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md" 
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    placeholder="Describe the purpose and scope of this schema" 
                    rows={3} 
                    value={schemaForm.description}
                    onChange={(e) => handleSchemaFormChange('description', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attributes *</label>
                  <div className="space-y-2">
                    {attributes.map((attribute) => (
                      <div key={attribute.id} className="flex items-center space-x-2">
                        <input 
                          type="text" 
                          placeholder="Attribute name" 
                          value={attribute.name}
                          onChange={(e) => updateAttribute(attribute.id, 'name', e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-md" 
                        />
                        <select 
                          value={attribute.type}
                          onChange={(e) => updateAttribute(attribute.id, 'type', e.target.value)}
                          className="p-2 border border-gray-300 rounded-md"
                        >
                          <option>String</option>
                          <option>Number</option>
                          <option>Date</option>
                          <option>Boolean</option>
                          <option>Email</option>
                        </select>
                        <input 
                          type="text" 
                          placeholder="Description" 
                          value={attribute.description}
                          onChange={(e) => updateAttribute(attribute.id, 'description', e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-md" 
                        />
                        {attributes.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => removeAttribute(attribute.id)}
                            className="text-red-600 hover:text-red-800 px-2 py-1"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button 
                      type="button" 
                      onClick={addAttribute}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Add Attribute
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="enableIssuance" 
                    className="rounded" 
                    checked={schemaForm.enableIssuance}
                    onChange={(e) => handleSchemaFormChange('enableIssuance', e.target.checked)}
                  />
                  <label htmlFor="enableIssuance" className="text-sm font-medium text-gray-700">
                    Enable certificate issuance for this schema
                  </label>
                </div>
                
                <div className="flex space-x-2">
                  <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                    Create Schema
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowSchemaForm(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Existing Schemas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemas.map((schema) => (
              <div key={schema.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">{schema.name}</h4>
                    <p className="text-sm text-gray-600">Version {schema.version}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      schema.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {schema.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm"><strong>Attributes:</strong></p>
                  <ul className="text-sm text-gray-600 ml-4 space-y-1">
                    {schema.attributes.map((attr, index) => (
                      <li key={index}>• {attr.name} ({attr.type}) - {attr.description}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id={`issuance${schema.id}`} 
                      className="rounded" 
                      checked={schema.enableIssuance}
                      onChange={() => toggleSchemaIssuance(schema.id)}
                    />
                    <label htmlFor={`issuance${schema.id}`} className="text-sm text-gray-700">
                      Enable issuance
                    </label>
                  </div>
                  <button 
                    onClick={() => deleteSchema(schema.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeSubSection === 'templates') {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Templates</h3>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                + Certificate Template
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                + Email Template
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                + Schema Template
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg mb-4">Certificate Templates</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Modern Blue Template</span>
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Classic Gold Template</span>
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg mb-4">Email Templates</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Certificate Issuance</span>
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Welcome Email</span>
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg mb-4">Schema Templates</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Basic Certification</span>
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Advanced Skills</span>
                  <button className="text-blue-600 hover:text-blue-800">Edit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeSubSection === 'issue') {
      return (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Manual Credential Issuance</h3>
            <form onSubmit={handleIssueCredential} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Schema</label>
                <select 
                  value={issueForm.schemaId}
                  onChange={(e) => handleIssueFormChange('schemaId', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="">Select a schema</option>
                  {schemas.map(schema => (
                    <option key={schema.id} value={schema.id}>{schema.name} (Version {schema.version})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Email</label>
                <input 
                  type="email" 
                  value={issueForm.recipientEmail}
                  onChange={(e) => handleIssueFormChange('recipientEmail', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Name</label>
                <input 
                  type="text" 
                  value={issueForm.recipientName}
                  onChange={(e) => handleIssueFormChange('recipientName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Data (JSON)</label>
                <textarea 
                  rows={4} 
                  value={issueForm.additionalData}
                  onChange={(e) => handleIssueFormChange('additionalData', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md" 
                  placeholder='{"skills": ["JavaScript", "React"], "score": 95}'
                ></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                Issue Credential
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Batch Credential Issuance</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload CSV File</label>
                <input type="file" accept=".csv" className="w-full p-3 border border-gray-300 rounded-md" />
                <p className="text-sm text-gray-500 mt-1">CSV should contain: email, name, schema_id, additional_data</p>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm">Auto-issue credentials</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm">Auto-send invitations</span>
                </label>
              </div>
              <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
                Process Batch
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (activeSubSection === 'issued') {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Issued Credentials</h3>
            <div className="flex space-x-2">
              <input type="text" placeholder="Search credentials..." className="p-2 border border-gray-300 rounded-md" />
              <select className="p-2 border border-gray-300 rounded-md">
                <option>All Status</option>
                <option>Delivered</option>
                <option>Accepted</option>
                <option>Revoked</option>
              </select>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schema</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {issuedCredentials.map((cred) => (
                  <tr key={cred.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{cred.recipientEmail}</div>
                        <div className="text-sm text-gray-500">{cred.recipientName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cred.schemaName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cred.issuedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs ${
                        cred.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                        cred.status === 'Delivered' ? 'bg-yellow-100 text-yellow-800' :
                        cred.status === 'Revoked' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {cred.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {cred.status !== 'Revoked' && (
                          <button 
                            onClick={() => revokeCredential(cred.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Revoke
                          </button>
                        )}
                        {cred.status === 'Delivered' && (
                          <button 
                            onClick={() => updateCredentialStatus(cred.id, 'Accepted')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Mark Accepted
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderTemplates = () => {
    // Certificate Template Section
    if (activeSubSection === 'certificate-template') {
      return (
        <div className="space-y-6">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-600 mb-4">
            DICE ID Console / Templates / Certificate Template
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Certificate Template</h3>
            
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-semibold text-gray-800 flex items-center">
                🎓 Certificate Templates
              </h4>
              <button 
                onClick={() => setShowCertificateTemplateForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                + Create New Certificate Template
              </button>
            </div>

            {/* Create Certificate Template Form */}
            {showCertificateTemplateForm && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">Create New Certificate Template</h5>
                <form onSubmit={handleCreateCertificateTemplate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Template Name *</label>
                      <input
                        type="text"
                        value={certificateTemplateForm.name}
                        onChange={(e) => handleCertificateTemplateFormChange('name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter template name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        value={certificateTemplateForm.certificateName}
                        onChange={(e) => handleCertificateTemplateFormChange('certificateName', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter certificate name/recipient name"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
                      <input
                        type="text"
                        value={certificateTemplateForm.course}
                        onChange={(e) => handleCertificateTemplateFormChange('course', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter course name (e.g., Software Development Course)"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Design Type</label>
                      <select
                        value={certificateTemplateForm.design}
                        onChange={(e) => handleCertificateTemplateFormChange('design', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="default">Default</option>
                        <option value="professional">Professional</option>
                        <option value="academic">Academic</option>
                        <option value="modern">Modern</option>
                        <option value="classic">Classic</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Certificate Fields Configuration */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h6 className="font-medium text-blue-800 mb-3">Certificate Fields Configuration</h6>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="includeStudentName"
                          checked={certificateTemplateForm.includeStudentName}
                          onChange={(e) => handleCertificateTemplateFormChange('includeStudentName', e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor="includeStudentName" className="text-sm font-medium text-gray-700">
                          Include Student Name Field
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="includeCertificateId"
                          checked={certificateTemplateForm.includeCertificateId}
                          onChange={(e) => handleCertificateTemplateFormChange('includeCertificateId', e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor="includeCertificateId" className="text-sm font-medium text-gray-700">
                          Include Certificate ID Field
                        </label>
                      </div>
                      {certificateTemplateForm.includeCertificateId && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Certificate ID Prefix</label>
                          <input
                            type="text"
                            value={certificateTemplateForm.certificateIdPrefix}
                            onChange={(e) => handleCertificateTemplateFormChange('certificateIdPrefix', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="CERT"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Each certificate will get a unique ID like: {certificateTemplateForm.certificateIdPrefix}-2025-001
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Create Template
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCertificateTemplateForm(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Edit Certificate Template Form */}
            {showEditCertificateTemplateForm && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">Edit Certificate Template</h5>
                <form onSubmit={handleUpdateCertificateTemplate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Template Name *</label>
                      <input
                        type="text"
                        value={certificateTemplateForm.name}
                        onChange={(e) => handleCertificateTemplateFormChange('name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter template name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        value={certificateTemplateForm.certificateName}
                        onChange={(e) => handleCertificateTemplateFormChange('certificateName', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter certificate name/recipient name"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
                      <input
                        type="text"
                        value={certificateTemplateForm.course}
                        onChange={(e) => handleCertificateTemplateFormChange('course', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter course name (e.g., Software Development Course)"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Design Type</label>
                      <select
                        value={certificateTemplateForm.design}
                        onChange={(e) => handleCertificateTemplateFormChange('design', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="default">Default</option>
                        <option value="professional">Professional</option>
                        <option value="academic">Academic</option>
                        <option value="modern">Modern</option>
                        <option value="classic">Classic</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Certificate Fields Configuration */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h6 className="font-medium text-blue-800 mb-3">Certificate Fields Configuration</h6>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="editIncludeStudentName"
                          checked={certificateTemplateForm.includeStudentName}
                          onChange={(e) => handleCertificateTemplateFormChange('includeStudentName', e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor="editIncludeStudentName" className="text-sm font-medium text-gray-700">
                          Include Student Name Field
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="editIncludeCertificateId"
                          checked={certificateTemplateForm.includeCertificateId}
                          onChange={(e) => handleCertificateTemplateFormChange('includeCertificateId', e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor="editIncludeCertificateId" className="text-sm font-medium text-gray-700">
                          Include Certificate ID Field
                        </label>
                      </div>
                      {certificateTemplateForm.includeCertificateId && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Certificate ID Prefix</label>
                          <input
                            type="text"
                            value={certificateTemplateForm.certificateIdPrefix}
                            onChange={(e) => handleCertificateTemplateFormChange('certificateIdPrefix', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="CERT"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Each certificate will get a unique ID like: {certificateTemplateForm.certificateIdPrefix}-2025-001
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Update Template
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditCertificateTemplateForm(false);
                        setEditingTemplateId(null);
                        setCertificateTemplateForm({
                          name: '',
                          certificateName: '',
                          course: '',
                          description: '',
                          design: 'default',
                          status: 'Active',
                          includeStudentName: true,
                          includeCertificateId: true,
                          certificateIdPrefix: 'CERT'
                        });
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificateTemplates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-gray-800">{template.name}</h5>
                    <span className={`text-xs px-2 py-1 rounded ${
                      template.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {template.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  
                  {/* Certificate Fields Info */}
                  <div className="text-xs text-gray-500 mb-3 space-y-1">
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${template.includeStudentName ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                      Student Name: {template.includeStudentName ? 'Included' : 'Not included'}
                    </div>
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${template.includeCertificateId ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                      Certificate ID: {template.includeCertificateId ? `Included (${template.certificateIdPrefix})` : 'Not included'}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditCertificateTemplate(template.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handlePreviewCertificateTemplate(template.id)}
                      className="text-gray-600 hover:text-gray-800 text-sm"
                    >
                      Preview
                    </button>
                    <button 
                      onClick={() => handleDownloadCertificate(template.id)}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Download
                    </button>
                    <button 
                      onClick={() => toggleCertificateTemplateStatus(template.id)}
                      className={`text-sm ${
                        template.status === 'Active' 
                          ? 'text-orange-600 hover:text-orange-800' 
                          : 'text-green-600 hover:text-green-800'
                      }`}
                    >
                      {template.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button 
                      onClick={() => deleteCertificateTemplate(template.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }



    // Email Template Section
    if (activeSubSection === 'email-template') {
      return (
        <div className="space-y-6">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-600 mb-4">
            DICE ID Console / Templates / Email Template
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Email Template</h3>
            
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-xl font-semibold text-gray-800 flex items-center">
                📧 Email Templates
              </h4>
              <button 
                onClick={() => {
                  console.log('Create Email Template button clicked');
                  setShowEmailTemplateForm(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                + Create New Email Template
              </button>
            </div>

            {/* Create Email Template Form */}
            {showEmailTemplateForm && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">Create New Email Template</h5>
                <form onSubmit={handleCreateEmailTemplate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Template Name *</label>
                      <input
                        type="text"
                        value={emailTemplateForm.name}
                        onChange={(e) => handleEmailTemplateFormChange('name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter template name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Type</label>
                      <select
                        value={emailTemplateForm.type}
                        onChange={(e) => handleEmailTemplateFormChange('type', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="credential_issuance">Credential Issuance</option>
                        <option value="welcome">Welcome Email</option>
                        <option value="reminder">Reminder Email</option>
                        <option value="notification">Notification</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Subject *</label>
                    <input
                      type="text"
                      value={emailTemplateForm.subject}
                      onChange={(e) => handleEmailTemplateFormChange('subject', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter email subject"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Body *</label>
                    <textarea
                      value={emailTemplateForm.body}
                      onChange={(e) => handleEmailTemplateFormChange('body', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={8}
                      placeholder="Enter email body content. Use {variable} for dynamic content like {recipient_name}, {course_name}, {certificate_id}, etc."
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Available variables: {'{recipient_name}'}, {'{course_name}'}, {'{certificate_id}'}, {'{issued_date}'}, {'{download_link}'}, {'{organization_name}'}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Create Template
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmailTemplateForm(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Edit Email Template Form */}
            {showEditEmailTemplateForm && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                <h5 className="text-lg font-semibold text-gray-800 mb-4">Edit Email Template</h5>
                <form onSubmit={handleUpdateEmailTemplate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Template Name *</label>
                      <input
                        type="text"
                        value={emailTemplateForm.name}
                        onChange={(e) => handleEmailTemplateFormChange('name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter template name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Type</label>
                      <select
                        value={emailTemplateForm.type}
                        onChange={(e) => handleEmailTemplateFormChange('type', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="credential_issuance">Credential Issuance</option>
                        <option value="welcome">Welcome Email</option>
                        <option value="reminder">Reminder Email</option>
                        <option value="notification">Notification</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Subject *</label>
                    <input
                      type="text"
                      value={emailTemplateForm.subject}
                      onChange={(e) => handleEmailTemplateFormChange('subject', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Enter email subject"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Body *</label>
                    <textarea
                      value={emailTemplateForm.body}
                      onChange={(e) => handleEmailTemplateFormChange('body', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      rows={8}
                      placeholder="Enter email body content"
                      required
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Update Template
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEditEmailTemplateForm(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Email Templates List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emailTemplates.map((template) => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h5 className="font-semibold text-gray-800">{template.name}</h5>
                    <span className={`px-2 py-1 rounded text-xs ${
                      template.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {template.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                  <p className="text-xs text-gray-500 mb-3">Type: {template.type.replace('_', ' ')}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <button 
                      onClick={() => handleEditEmailTemplate(template.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handlePreviewEmailTemplate(template.id)}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Preview
                    </button>
                    <button 
                      onClick={() => toggleEmailTemplateStatus(template.id)}
                      className={`text-sm ${template.status === 'Active' ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'}`}
                    >
                      {template.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button 
                      onClick={() => handleDownloadEmailTemplate(template.id)}
                      className="text-purple-600 hover:text-purple-800 text-sm"
                    >
                      Download
                    </button>
                    <button 
                      onClick={() => deleteEmailTemplate(template.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Default Templates view (when no subsection is selected)
    return (
      <div className="space-y-6">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-600 mb-4">
          DICE ID Console / Templates
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Templates</h3>
          <p className="text-gray-600 mb-6">Select a template type from the sidebar to manage your templates.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button 
              className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg hover:border-blue-300 transition-all duration-200 bg-white hover:bg-blue-50 w-full"
              onClick={() => {
                console.log('Certificate Template clicked');
                setActiveSubSection('certificate-template');
              }}
            >
              <div className="text-4xl mb-4">🎓</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Certificate Templates</h4>
              <p className="text-gray-600 mb-3">Manage your certificate design templates</p>
              <div className="text-blue-600 text-sm font-medium">Click to view →</div>
            </button>
            
            <button 
              className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg hover:border-blue-300 transition-all duration-200 bg-white hover:bg-blue-50 w-full"
              onClick={() => {
                console.log('Email Template clicked');
                setActiveSubSection('email-template');
              }}
            >
              <div className="text-4xl mb-4">📧</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Email Templates</h4>
              <p className="text-gray-600 mb-3">Manage your email communication templates</p>
              <div className="text-blue-600 text-sm font-medium">Click to view →</div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Add sidebarOpen state
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // On mount, load logoPreview from localStorage if present
  useEffect(() => {
    const savedLogoPreview = localStorage.getItem('organization-logo-preview');
    if (savedLogoPreview) {
      setOrganizationForm(prev => ({ ...prev, logoPreview: savedLogoPreview }));
    }
  }, []);

  // Load departments from localStorage on mount
  useEffect(() => {
    const savedDepartments = localStorage.getItem('departments');
    if (savedDepartments) {
      try {
        const parsed = JSON.parse(savedDepartments);
        if (Array.isArray(parsed)) setDepartments(parsed);
      } catch {}
    }
  }, []);
  // Save departments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(departments));
  }, [departments]);

  const renderHelp = () => (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-600 mb-4">
        DICE ID Console / Help / Docs
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Help & Documentation</h3>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveHelpSection('guides')}
            className={`px-4 py-2 font-medium ${
              activeHelpSection === 'guides'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📚 Developer Guides
          </button>
          <button
            onClick={() => setActiveHelpSection('tutorials')}
            className={`px-4 py-2 font-medium ${
              activeHelpSection === 'tutorials'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            🎥 Video Tutorials
          </button>
        </div>

        {/* Developer Guides Section */}
        {activeHelpSection === 'guides' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helpGuides && Object.entries(helpGuides).length > 0 ? (
              Object.entries(helpGuides).map(([id, guide]) => (
                <div key={id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-lg text-gray-800">{guide.title}</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Guide</span>
                  </div>
                  <p className="text-gray-600 mb-3">{guide.description}</p>
                  <button 
                    onClick={() => handleOpenGuide(id)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read Guide →
                  </button>
                </div>
              ))
            ) : (
              <div className="text-gray-500 col-span-2">No developer guides available.</div>
            )}
          </div>
        )}

        {/* Video Tutorials Section */}
        {activeHelpSection === 'tutorials' && (
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-lg text-purple-800 mb-2">Video Tutorials</h4>
              <p className="text-purple-700">
                Watch step-by-step video tutorials to learn how to use the DICE ID Console effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                  <span className="text-gray-500">🎥 Video Placeholder</span>
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">Getting Started</h5>
                <p className="text-gray-600 text-sm mb-2">5 min • Beginner</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Watch Now →</button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                  <span className="text-gray-500">🎥 Video Placeholder</span>
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">Schema Design</h5>
                <p className="text-gray-600 text-sm mb-2">8 min • Intermediate</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Watch Now →</button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                  <span className="text-gray-500">🎥 Video Placeholder</span>
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">Template Customization</h5>
                <p className="text-gray-600 text-sm mb-2">12 min • Advanced</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Watch Now →</button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                  <span className="text-gray-500">🎥 Video Placeholder</span>
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">Batch Operations</h5>
                <p className="text-gray-600 text-sm mb-2">10 min • Intermediate</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Watch Now →</button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                  <span className="text-gray-500">🎥 Video Placeholder</span>
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">API Integration</h5>
                <p className="text-gray-600 text-sm mb-2">15 min • Advanced</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Watch Now →</button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                  <span className="text-gray-500">🎥 Video Placeholder</span>
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">Troubleshooting</h5>
                <p className="text-gray-600 text-sm mb-2">6 min • All Levels</p>
                <button className="text-blue-600 hover:text-blue-800 text-sm">Watch Now →</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-4">
                {!sidebarOpen && (
                  <button
                    className="text-blue-600 hover:text-blue-800 mr-4"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open Menu"
                  >
                    ☰ Open Menu
                  </button>
                )}
                <Link href="/" className="text-xl font-bold text-gray-900">
                  ← Back to Home
                </Link>
                {/* Removed branding and org admin info */}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Keep notification/profile icons if needed */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <span className="text-lg">🔔</span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
              </button>
              <button className="text-gray-600 hover:text-gray-900">👤</button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-screen bg-gray-50">
        {/* Sidebar - Dark Blue like DICE ID Console */}
        {sidebarOpen && (
          <div className="w-64 bg-blue-900 text-white">
            <div className="p-4">
              <button
                className="w-full text-left px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 rounded-md mb-4"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close Menu"
              >
                ✕ Close Menu
              </button>
              
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'dashboard' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'
                  }`}
                >
                  📊 Dashboard
                </button>
                
                <div className="mt-4">
                  <button
                    onClick={() => setActiveSection('credentials')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                      activeSection === 'credentials' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'
                    }`}
                  >
                    <span>🎓 Credentials</span>
                    <span className="text-xs">▼</span>
                  </button>
                  {activeSection === 'credentials' && (
                    <div className="ml-4 mt-2 space-y-1">
                      <button
                        onClick={() => setActiveSubSection('overview')}
                        className={`w-full text-left px-3 py-1 rounded text-xs ${
                          activeSubSection === 'overview' ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-700'
                        }`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setActiveSubSection('schemas')}
                        className={`w-full text-left px-3 py-1 rounded text-xs ${
                          activeSubSection === 'schemas' ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-700'
                        }`}
                      >
                        Schemas
                      </button>

                      <button
                        onClick={() => setActiveSubSection('issue')}
                        className={`w-full text-left px-3 py-1 rounded text-xs ${
                          activeSubSection === 'issue' ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-700'
                        }`}
                      >
                        Batch Issuance
                      </button>
                      <button
                        onClick={() => setActiveSubSection('issued')}
                        className={`w-full text-left px-3 py-1 rounded text-xs ${
                          activeSubSection === 'issued' ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-700'
                        }`}
                      >
                        Issued Credentials
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <button
                    onClick={() => setActiveSection('templates')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium flex items-center justify-between ${
                      activeSection === 'templates' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'
                    }`}
                  >
                    <span>🎨 Templates</span>
                    <span className="text-xs">▼</span>
                  </button>
                  {activeSection === 'templates' && (
                    <div className="ml-4 mt-2 space-y-1">
                      <button
                        onClick={() => setActiveSubSection('certificate-template')}
                        className={`w-full text-left px-3 py-1 rounded text-xs ${
                          activeSubSection === 'certificate-template' ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-700'
                        }`}
                      >
                        Certificate Template
                      </button>
                      <button
                        onClick={() => setActiveSubSection('email-template')}
                        className={`w-full text-left px-3 py-1 rounded text-xs ${
                          activeSubSection === 'email-template' ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-700'
                        }`}
                      >
                        Email Template
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <button
                    onClick={() => setActiveSection('organization')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                      activeSection === 'organization' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'
                    }`}
                  >
                    🏢 Organization
                  </button>
                </div>
                
                <button
                  onClick={() => setActiveSection('help')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === 'help' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-800'
                  }`}
                >
                  ❓ Help / Docs
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'organization' && renderOrganization()}
          {activeSection === 'credentials' && renderCredentials()}
          {activeSection === 'templates' && renderTemplates()}
          {activeSection === 'help' && renderHelp()}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && previewingTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  setPreviewingTemplate(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            {/* Certificate-like design */}
            <div className="flex justify-center">
              <div
                className="relative bg-gradient-to-br from-yellow-100 to-blue-50 border-8 border-yellow-400 rounded-2xl shadow-2xl p-0 w-full max-w-xl"
                style={{ fontFamily: 'serif', backgroundImage: 'repeating-linear-gradient(135deg, #f9fafb 0px, #f9fafb 20px, #f3f4f6 20px, #f3f4f6 40px)' }}
              >
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl border-4 border-blue-300" style={{ zIndex: 1 }}></div>
                <div className="relative z-10 px-10 py-8 flex flex-col items-center">
                  <div className="mb-2 text-yellow-700 tracking-widest text-lg font-semibold uppercase">Certificate of Completion</div>
                  <div className="mb-4 text-3xl font-extrabold text-gray-800 font-serif" style={{ letterSpacing: '1px' }}>
                    {previewingTemplate.name}
                  </div>
                  <div className="mb-2 text-gray-700 text-lg italic">This is to certify that</div>
                  {previewingTemplate.includeStudentName && (
                    <div className="mb-2 text-2xl font-bold text-blue-700 font-serif">aman</div>
                  )}
                  <div className="mb-2 text-gray-700 text-lg">has successfully completed</div>
                  <div className="mb-2 text-xl font-semibold text-gray-800">{previewingTemplate.course || previewingTemplate.certificateName || previewingTemplate.name}</div>
                  <div className="mb-2 text-gray-700 text-lg">with distinction</div>
                  <div className="my-4 flex flex-col items-center">
                    <div className="text-gray-600 text-base">Issued on: {new Date().toLocaleDateString()}</div>
                    {previewingTemplate.includeCertificateId && (
                      <div className="text-blue-700 text-base font-semibold">Certificate ID: {generateCertificateId(previewingTemplate)}</div>
                    )}
                  </div>
                  <div className="flex justify-between w-full mt-8">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-10 border-b-2 border-gray-400 mb-1"></div>
                      <div className="text-xs text-gray-500">Signature</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-yellow-200 border-2 border-yellow-400 rounded-full flex items-center justify-center text-yellow-700 text-2xl font-bold shadow-inner">★</div>
                      <div className="text-xs text-gray-500 mt-1">Official Seal</div>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col items-center">
                    <div className="text-xs text-gray-500">Design Type: {previewingTemplate.design}</div>
                    <div className="text-xs text-gray-500">Status: {previewingTemplate.status}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  setPreviewingTemplate(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Preview Modal */}
      {showEmailPreviewModal && previewingEmailTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  setShowEmailPreviewModal(false);
                  setPreviewingEmailTemplate(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            {/* Certificate-like email template design */}
            <div className="flex justify-center">
              <div
                className="relative bg-gradient-to-br from-yellow-100 to-blue-50 border-8 border-yellow-400 rounded-2xl shadow-2xl p-0 w-full max-w-xl"
                style={{ fontFamily: 'serif', backgroundImage: 'repeating-linear-gradient(135deg, #f9fafb 0px, #f9fafb 20px, #f3f4f6 20px, #f3f4f6 40px)' }}
              >
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl border-4 border-blue-300" style={{ zIndex: 1 }}></div>
                <div className="relative z-10 px-10 py-8 flex flex-col items-center">
                  {/* Removed: <div className="mb-2 text-yellow-700 tracking-widest text-lg font-semibold uppercase">Email Template Preview</div> */}
                  <div className="mb-4 text-3xl font-extrabold text-gray-800 font-serif text-center" style={{ letterSpacing: '1px' }}>
                    {previewingEmailTemplate.name}
                  </div>
                  <div className="mb-2 text-gray-700 text-lg italic">Type: {previewingEmailTemplate.type.replace('_', ' ')}</div>
                  <div className="w-full bg-white border-2 border-gray-300 rounded-lg p-6 my-4">
                    <div className="border-b border-gray-200 pb-3 mb-4">
                      <h5 className="text-lg font-semibold text-gray-800 mb-1">Subject:</h5>
                      <p className="text-gray-700 text-base font-serif">{previewingEmailTemplate.subject}</p>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold text-gray-800 mb-2">Body:</h5>
                      <div className="bg-gray-50 p-4 rounded border text-gray-700 whitespace-pre-line font-serif text-base text-left">
                        {previewingEmailTemplate.body}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-8">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-10 border-b-2 border-gray-400 mb-1"></div>
                      <div className="text-xs text-gray-500">Signature</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-yellow-200 border-2 border-yellow-400 rounded-full flex items-center justify-center text-yellow-700 text-2xl font-bold shadow-inner">✉️</div>
                      <div className="text-xs text-gray-500 mt-1">Official Seal</div>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col items-center">
                    <div className="text-xs text-gray-500">Status: {previewingEmailTemplate.status}</div>
                    <div className="text-xs text-gray-500">Template ID: {previewingEmailTemplate.id}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setShowEmailPreviewModal(false);
                  setPreviewingEmailTemplate(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {showGuideModal && selectedGuide && helpGuides[selectedGuide as keyof typeof helpGuides] && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {helpGuides[selectedGuide as keyof typeof helpGuides].title}
              </h3>
              <button
                onClick={handleCloseGuide}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="prose max-w-none">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: helpGuides[selectedGuide as keyof typeof helpGuides].content 
                }} 
              />
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseGuide}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
      {showIssueExistingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h4 className="text-lg font-semibold mb-4">Issue Credential to Existing Customer</h4>
            <form onSubmit={handleIssueToExisting} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">User</label>
                <select
                  value={issueExistingForm.userId}
                  onChange={e => setIssueExistingForm(f => ({ ...f, userId: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select User</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Schema</label>
                <select
                  value={issueExistingForm.schemaId}
                  onChange={e => setIssueExistingForm(f => ({ ...f, schemaId: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Schema</option>
                  {schemas.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Additional Data (optional)</label>
                <input
                  type="text"
                  value={issueExistingForm.additionalData}
                  onChange={e => setIssueExistingForm(f => ({ ...f, additionalData: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g. Note, Score, etc."
                />
              </div>
              <div className="flex space-x-3 justify-end">
                <button type="button" onClick={() => setShowIssueExistingModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Issue Credential</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showIssueNewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h4 className="text-lg font-semibold mb-4">Issue Credential to New Customer</h4>
            <form onSubmit={handleIssueToNew} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={issueNewForm.name}
                  onChange={e => setIssueNewForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Recipient Email</label>
                <input
                  type="email"
                  value={issueNewForm.email}
                  onChange={e => setIssueNewForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Schema</label>
                <select
                  value={issueNewForm.schemaId}
                  onChange={e => setIssueNewForm(f => ({ ...f, schemaId: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Schema</option>
                  {schemas.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Additional Data (optional)</label>
                <input
                  type="text"
                  value={issueNewForm.additionalData}
                  onChange={e => setIssueNewForm(f => ({ ...f, additionalData: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g. Note, Score, etc."
                />
              </div>
              <div className="flex space-x-3 justify-end">
                <button type="button" onClick={() => setShowIssueNewModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Issue Credential</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
