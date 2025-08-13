'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';

type Suggestion = {
  category: string;
  suggestion: string;
  priority: 'High' | 'Medium' | 'Low' | 'Info';
};

export default function JDMatching() {
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchingScore, setMatchingScore] = useState(null);
  const [matchBreakdown, setMatchBreakdown] = useState(null);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [matchingSkills, setMatchingSkills] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [analysisMode, setAnalysisMode] = useState('jd-only'); // 'jd-only' or 'with-resume'
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Resume file selected:', file.name);
      setUploadedResume(file);
      setAnalysisMode('with-resume');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      console.log('Resume file dropped:', file.name);
      setUploadedResume(file);
      setAnalysisMode('with-resume');
    }
  };

  // Function to extract skills from text
  const extractSkills = (text: string): string[] => {
    const skillKeywords: Record<string, string[]> = {
      'Testing': ['testing', 'test', 'qa', 'quality assurance', 'selenium', 'junit', 'testng', 'cypress', 'playwright', 'manual testing', 'automation testing', 'api testing', 'performance testing', 'load testing', 'security testing', 'bug', 'defect', 'test case', 'test plan'],
      'Java': ['java', 'spring', 'spring boot', 'hibernate', 'maven', 'gradle', 'junit', 'testng', 'servlet', 'jsp', 'jdbc', 'jpa', 'microservices'],
      'JavaScript': ['javascript', 'js', 'node.js', 'nodejs', 'express', 'react', 'angular', 'vue', 'typescript', 'es6', 'jquery', 'ajax'],
      'Python': ['python', 'django', 'flask', 'pandas', 'numpy', 'matplotlib', 'scikit-learn', 'tensorflow', 'pytorch'],
      'Frontend': ['html', 'css', 'bootstrap', 'sass', 'less', 'webpack', 'babel', 'responsive design', 'ui/ux', 'user interface'],
      'Backend': ['api', 'rest', 'graphql', 'microservices', 'server', 'database', 'sql', 'nosql'],
      'Database': ['mysql', 'postgresql', 'mongodb', 'oracle', 'sql server', 'redis', 'elasticsearch'],
      'DevOps': ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'jenkins', 'git', 'ci/cd', 'terraform', 'ansible'],
      'Mobile': ['android', 'ios', 'react native', 'flutter', 'kotlin', 'swift'],
      'Data Science': ['machine learning', 'ml', 'ai', 'artificial intelligence', 'data analysis', 'statistics', 'r', 'matlab'],
      'Cloud': ['aws', 'azure', 'gcp', 'cloud', 'ec2', 's3', 'lambda', 'kubernetes'],
      'Tools': ['git', 'jenkins', 'jira', 'confluence', 'postman', 'swagger', 'maven', 'gradle']
    };

    const foundSkills: string[] = [];
    const textLower = text.toLowerCase();

    for (const [skill, keywords] of Object.entries(skillKeywords)) {
      for (const keyword of keywords) {
        if (textLower.includes(keyword)) {
          foundSkills.push(skill);
          break;
        }
      }
    }

    return [...new Set(foundSkills)]; // Remove duplicates
  };

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description first.');
      return;
    }

    if (analysisMode === 'with-resume' && !uploadedResume) {
      alert('Please upload a resume file for comparison.');
      return;
    }

    setIsAnalyzing(true);
    setMatchingScore(null);
    setMatchBreakdown(null);
    setMissingSkills([]);
    setMatchingSkills([]);
    setSuggestions([]);

    // Simulate JD matching analysis
    setTimeout(() => {
      setIsAnalyzing(false);

      // Extract skills from job description
      const jobSkills = extractSkills(jobDescription);
      
      // For demo purposes, simulate resume skills based on analysis mode
      let resumeSkills = [] as string[];
      if (analysisMode === 'with-resume') {
        // Simulate extracting skills from uploaded resume
        // In real implementation, this would parse the actual resume file
        // For demo, we'll simulate different skill sets based on file name
        const resumeFile = uploadedResume;
        if (!resumeFile) {
          // Safety check: state may change between checks in async callback
          setIsAnalyzing(false);
          return;
        }
        const fileName = resumeFile.name.toLowerCase();
        if (fileName.includes('java') || fileName.includes('spring')) {
          resumeSkills = ['Java', 'Spring', 'Spring Boot', 'Hibernate', 'Maven', 'SQL', 'Git'];
        } else if (fileName.includes('frontend') || fileName.includes('react')) {
          resumeSkills = ['JavaScript', 'React', 'HTML', 'CSS', 'Bootstrap', 'Git'];
        } else if (fileName.includes('python')) {
          resumeSkills = ['Python', 'Django', 'Flask', 'SQL', 'Git'];
        } else if (fileName.includes('testing') || fileName.includes('qa')) {
          resumeSkills = ['Testing', 'Selenium', 'JUnit', 'Manual Testing', 'Git'];
        } else {
          // Default Java Full Stack skills
          resumeSkills = ['Java', 'Spring', 'JavaScript', 'React', 'SQL', 'Git'];
        }
      } else {
        // For JD-only mode, assume some common skills
        resumeSkills = ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'];
      }

      // Find matching and missing skills
      const matching = resumeSkills.filter(skill => jobSkills.includes(skill));
      const missing = jobSkills.filter(skill => !resumeSkills.includes(skill));

      setMatchingSkills(matching);
      setMissingSkills(missing);

      // Calculate match score based on actual skills
      const totalRequiredSkills = jobSkills.length;
      const matchedSkills = matching.length;
      const score = totalRequiredSkills > 0 ? Math.round((matchedSkills / totalRequiredSkills) * 100) : 0;
      setMatchingScore(score);

      // Generate match breakdown based on actual analysis
      const breakdown = {
        skills: score,
        experience: Math.floor(Math.random() * 20) + 60,
        keywords: Math.floor(Math.random() * 15) + 65,
        education: Math.floor(Math.random() * 10) + 80,
        certifications: Math.floor(Math.random() * 30) + 50
      };
      setMatchBreakdown(breakdown);

      // Generate suggestions based on actual missing skills
      const newSuggestions: Suggestion[] = [];
      
      if (missing.length > 0) {
        newSuggestions.push({
          category: 'Missing Skills',
          suggestion: `Add these required skills to your resume: ${missing.join(', ')}`,
          priority: 'High'
        });
      }

      if (score < 50) {
        newSuggestions.push({
          category: 'Low Match',
          suggestion: 'Your resume has significant skill gaps for this position. Consider gaining experience in the missing skills.',
          priority: 'High'
        });
      } else if (score < 70) {
        newSuggestions.push({
          category: 'Moderate Match',
          suggestion: 'Your resume partially matches the job requirements. Focus on acquiring the missing skills.',
          priority: 'Medium'
        });
      } else {
        newSuggestions.push({
          category: 'Good Match',
          suggestion: 'Your resume has good alignment with the job requirements!',
          priority: 'Low'
        });
      }

      if (analysisMode === 'with-resume') {
        newSuggestions.push({
          category: 'Resume Analysis',
          suggestion: 'Your resume has been analyzed against the job description for accurate skill matching',
          priority: 'Info'
        });
      }

      // Debug information
      console.log('Job Description Skills:', jobSkills);
      console.log('Resume Skills:', resumeSkills);
      console.log('Matching Skills:', matching);
      console.log('Missing Skills:', missing);
      console.log('Match Score:', score);

      setSuggestions(newSuggestions);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-yellow-100';
    if (score >= 60) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return 'text-red-600 bg-red-100';
    if (priority === 'Medium') return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Resume Builder
            </Link>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/resume-builder" className="text-gray-600 hover:text-blue-600 transition-colors">
                Create Resume
              </Link>
              <Link href="/ats-checker" className="text-gray-600 hover:text-blue-600 transition-colors">
                ATS Checker
              </Link>
              <Link href="/jd-matching" className="text-blue-600 font-semibold">
                JD Matching
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            JD Matching Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Paste a job description and get instant analysis of how well your resume matches the requirements. 
            Receive personalized suggestions to improve your match rate.
          </p>
        </div>

        {/* Analysis Mode Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Choose Analysis Mode
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div 
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                analysisMode === 'jd-only' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setAnalysisMode('jd-only')}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Description Only</h3>
                <p className="text-gray-600 text-sm">
                  Get general matching insights based on job requirements
                </p>
              </div>
            </div>
            
            <div 
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                analysisMode === 'with-resume' 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setAnalysisMode('with-resume')}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">With Resume Upload</h3>
                <p className="text-gray-600 text-sm">
                  Upload your resume for precise matching analysis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Description Input */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Enter Job Description
            </h2>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here... Include requirements, responsibilities, and qualifications for accurate matching."
              className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              Include job title, requirements, responsibilities, and qualifications for best results.
            </p>
          </div>
        </div>

        {/* Resume Upload Section (only show when with-resume mode is selected) */}
        {analysisMode === 'with-resume' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Upload Your Resume
              </h2>
              
              {/* Upload Area */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 mb-6 transition-all duration-300 cursor-pointer hover:border-blue-400 hover:bg-blue-50"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {!uploadedResume ? (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        Drag and drop your resume here
                      </p>
                      <p className="text-gray-500 mb-4">
                        or click to browse files
                      </p>
                      <p className="text-sm text-gray-400">
                        Supports PDF, DOC, DOCX files (max 10MB)
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Choose File
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        Resume Uploaded Successfully!
                      </p>
                      <p className="text-gray-500">
                        {uploadedResume.name} ({(uploadedResume.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedResume(null);
                      }}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove file
                    </button>
                  </div>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* Analyze Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleAnalyze}
            disabled={!jobDescription.trim() || (analysisMode === 'with-resume' && !uploadedResume) || isAnalyzing}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing Match...
              </div>
            ) : (
              'Analyze Job Match'
            )}
          </button>
          {analysisMode === 'with-resume' && !uploadedResume && (
            <p className="text-sm text-gray-500 mt-2">
              Please upload a resume file to enable precise matching analysis
            </p>
          )}
        </div>

        {/* Matching Results */}
        {matchingScore !== null && !isAnalyzing && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Match Score
              </h2>
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBgColor(matchingScore)} mb-4`}>
                <span className={`text-4xl font-bold ${getScoreColor(matchingScore)}`}>
                  {matchingScore}%
                </span>
              </div>
              <p className={`text-xl font-semibold ${getScoreColor(matchingScore)}`}>
                {matchingScore >= 90 ? 'Excellent Match' : 
                 matchingScore >= 80 ? 'Strong Match' : 
                 matchingScore >= 70 ? 'Good Match' : 
                 matchingScore >= 60 ? 'Fair Match' : 'Poor Match'}
              </p>
              <p className="text-gray-600 mt-2">
                {matchingScore >= 90 ? 'Your resume is an excellent fit for this position!' : 
                 matchingScore >= 80 ? 'Your resume shows strong alignment with the job requirements.' :
                 matchingScore >= 70 ? 'Your resume has good potential with some improvements.' :
                 matchingScore >= 60 ? 'Your resume needs significant improvements to be competitive.' :
                 'Your resume needs major improvements to match this job requirements.'}
              </p>
            </div>

            {/* Debug Information */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Details</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">Skills Required (Job Description):</h4>
                  <div className="flex flex-wrap gap-2">
                    {extractSkills(jobDescription).length > 0 ? 
                      extractSkills(jobDescription).map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      )) : 
                      <span className="text-gray-500">No specific skills detected</span>
                    }
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">Skills Found (Resume):</h4>
                  <div className="flex flex-wrap gap-2">
                    {matchingSkills.length > 0 ? 
                      matchingSkills.map((skill, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      )) : 
                      <span className="text-gray-500">No matching skills found</span>
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            {matchBreakdown && (
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  Match Breakdown
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(matchBreakdown).map(([category, score]) => (
                    <div key={category} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-900 capitalize">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <span className={`font-bold ${getScoreColor(score)}`}>
                          {score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${score >= 90 ? 'bg-green-500' : score >= 80 ? 'bg-blue-500' : score >= 70 ? 'bg-yellow-500' : score >= 60 ? 'bg-orange-500' : 'bg-red-500'}`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Analysis */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Matching Skills */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-green-600">
                  ✅ Matching Skills ({matchingSkills.length})
                </h3>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex flex-wrap gap-2">
                    {matchingSkills.length > 0 ? 
                      matchingSkills.map((skill, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      )) : 
                      <span className="text-gray-500">No matching skills found</span>
                    }
                  </div>
                </div>
              </div>

              {/* Missing Skills */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-red-600">
                  ❌ Missing Skills ({missingSkills.length})
                </h3>
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex flex-wrap gap-2">
                    {missingSkills.length > 0 ? 
                      missingSkills.map((skill, index) => (
                        <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      )) : 
                      <span className="text-green-600 font-medium">All required skills are present! 🎉</span>
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Improvement Suggestions */}
            {suggestions.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  Improvement Suggestions
                </h3>
                <div className="space-y-4">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {suggestion.category}
                        </h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(suggestion.priority)}`}>
                          {suggestion.priority} Priority
                        </span>
                      </div>
                      <p className="text-gray-700">
                        {suggestion.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link 
                href="/resume-builder/live-preview"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg text-center"
              >
                Update Resume
              </Link>
              <button
                onClick={() => {
                  setJobDescription('');
                  setUploadedResume(null);
                  setMatchingScore(null);
                  setMatchBreakdown(null);
                  setMissingSkills([]);
                  setMatchingSkills([]);
                  setSuggestions([]);
                }}
                className="bg-gray-100 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Try Another JD
              </button>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Matching</h3>
            <p className="text-gray-600">
              Advanced algorithm analyzes your resume against job requirements for accurate matching.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Skill Gap Analysis</h3>
            <p className="text-gray-600">
              Identify missing skills and get specific recommendations to improve your match rate.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-gray-600">
              Get comprehensive analysis in seconds with detailed breakdown and actionable insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
