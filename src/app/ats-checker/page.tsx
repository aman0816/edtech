'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';

interface ScoreBreakdown {
  formatting: number;
  keywords: number;
  roleRelevance: number;
  contentQuality: number;
  structure: number;
}

interface Suggestion {
  category: string;
  suggestion: string;
  priority: string;
}

export default function ATSChecker() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [scoreBreakdown, setScoreBreakdown] = useState<ScoreBreakdown | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected for ATS analysis:', file.name);
      setUploadedFile(file);
      setIsAnalyzing(true);
      setAtsScore(null);
      setScoreBreakdown(null);
      setSuggestions([]);
      
      // Simulate ATS analysis
      setTimeout(() => {
        setIsAnalyzing(false);
        
        // Generate random ATS score between 60-95
        const score = Math.floor(Math.random() * 36) + 60;
        setAtsScore(score);
        
        // Generate score breakdown
        const breakdown = {
          formatting: Math.floor(Math.random() * 20) + 70,
          keywords: Math.floor(Math.random() * 25) + 65,
          roleRelevance: Math.floor(Math.random() * 20) + 70,
          contentQuality: Math.floor(Math.random() * 20) + 70,
          structure: Math.floor(Math.random() * 20) + 70
        };
        setScoreBreakdown(breakdown);
        
        // Generate suggestions based on score
        const newSuggestions = [];
        if (score < 80) {
          newSuggestions.push({
            category: 'Keywords',
            suggestion: 'Add more industry-specific keywords to improve ATS matching',
            priority: 'High'
          });
        }
        if (breakdown.formatting < 80) {
          newSuggestions.push({
            category: 'Formatting',
            suggestion: 'Use standard fonts (Arial, Calibri) and avoid complex formatting',
            priority: 'Medium'
          });
        }
        if (breakdown.structure < 80) {
          newSuggestions.push({
            category: 'Structure',
            suggestion: 'Organize content with clear headings and bullet points',
            priority: 'Medium'
          });
        }
        if (breakdown.contentQuality < 80) {
          newSuggestions.push({
            category: 'Content',
            suggestion: 'Use action verbs and quantify achievements with numbers',
            priority: 'High'
          });
        }
        
        setSuggestions(newSuggestions);
        console.log('ATS Analysis complete:', { score, breakdown, suggestions: newSuggestions });
      }, 3000);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      console.log('File dropped for ATS analysis:', file.name);
      setUploadedFile(file);
      setIsAnalyzing(true);
      setAtsScore(null);
      setScoreBreakdown(null);
      setSuggestions([]);
      
      setTimeout(() => {
        setIsAnalyzing(false);
        const score = Math.floor(Math.random() * 36) + 60;
        setAtsScore(score);
        
        const breakdown = {
          formatting: Math.floor(Math.random() * 20) + 70,
          keywords: Math.floor(Math.random() * 25) + 65,
          roleRelevance: Math.floor(Math.random() * 20) + 70,
          contentQuality: Math.floor(Math.random() * 20) + 70,
          structure: Math.floor(Math.random() * 20) + 70
        };
        setScoreBreakdown(breakdown);
        
        const newSuggestions = [];
        if (score < 80) {
          newSuggestions.push({
            category: 'Keywords',
            suggestion: 'Add more industry-specific keywords to improve ATS matching',
            priority: 'High'
          });
        }
        if (breakdown.formatting < 80) {
          newSuggestions.push({
            category: 'Formatting',
            suggestion: 'Use standard fonts (Arial, Calibri) and avoid complex formatting',
            priority: 'Medium'
          });
        }
        if (breakdown.structure < 80) {
          newSuggestions.push({
            category: 'Structure',
            suggestion: 'Organize content with clear headings and bullet points',
            priority: 'Medium'
          });
        }
        if (breakdown.contentQuality < 80) {
          newSuggestions.push({
            category: 'Content',
            suggestion: 'Use action verbs and quantify achievements with numbers',
            priority: 'High'
          });
        }
        
        setSuggestions(newSuggestions);
      }, 3000);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'High') return 'text-red-600 bg-red-100';
    if (priority === 'Medium') return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
              <Link href="/ats-checker" className="text-blue-600 font-semibold">
                ATS Checker
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ATS Resume Checker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your resume to get an ATS compliance score and receive personalized suggestions to improve your chances of passing Applicant Tracking Systems.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Upload Your Resume for ATS Analysis
            </h2>
            
            {/* Upload Area */}
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 mb-6 transition-all duration-300 cursor-pointer hover:border-blue-400 hover:bg-blue-50"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              {!uploadedFile ? (
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
                      {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                      setAtsScore(null);
                      setScoreBreakdown(null);
                      setSuggestions([]);
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

            {/* Analysis Progress */}
            {isAnalyzing && (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-gray-600">Analyzing your resume for ATS compatibility...</span>
                </div>
                <p className="text-sm text-gray-500">This may take a few moments</p>
              </div>
            )}
          </div>
        </div>

        {/* ATS Score Results */}
        {atsScore !== null && !isAnalyzing && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your ATS Score
              </h2>
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBgColor(atsScore)} mb-4`}>
                <span className={`text-4xl font-bold ${getScoreColor(atsScore)}`}>
                  {atsScore}
                </span>
              </div>
              <p className={`text-xl font-semibold ${getScoreColor(atsScore)}`}>
                {atsScore >= 90 ? 'Excellent' : atsScore >= 80 ? 'Good' : atsScore >= 70 ? 'Fair' : 'Needs Improvement'}
              </p>
              <p className="text-gray-600 mt-2">
                {atsScore >= 90 ? 'Your resume is highly optimized for ATS systems!' : 
                 atsScore >= 80 ? 'Your resume has good ATS compatibility with room for improvement.' :
                 atsScore >= 70 ? 'Your resume needs some improvements to pass ATS screening.' :
                 'Your resume needs significant improvements to pass ATS screening.'}
              </p>
            </div>

            {/* Score Breakdown */}
            {scoreBreakdown && (
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  Score Breakdown
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(scoreBreakdown).map(([category, score]) => (
                    <div key={category} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-gray-900 capitalize">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <span className={`font-bold ${getScoreColor(score)}`}>
                          {score}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${score >= 90 ? 'bg-green-500' : score >= 80 ? 'bg-blue-500' : score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                Edit Resume
              </Link>
              <button
                onClick={() => {
                  setUploadedFile(null);
                  setAtsScore(null);
                  setScoreBreakdown(null);
                  setSuggestions([]);
                }}
                className="bg-gray-100 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Check Another Resume
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Analysis</h3>
            <p className="text-gray-600">
              Get detailed scores for formatting, keywords, role relevance, and content quality.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Suggestions</h3>
            <p className="text-gray-600">
              Receive personalized recommendations to improve your ATS compatibility score.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Updates</h3>
            <p className="text-gray-600">
              See score changes as you update your resume with our suggestions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
