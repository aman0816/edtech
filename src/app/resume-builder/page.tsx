import ResumeBuilderLanding from '../resume-builder';
import Link from 'next/link';

export default function ResumeBuilderPage() {
  return (
    <>
      <ResumeBuilderLanding />
      <div className="w-full flex justify-center mt-8 mb-12">
        <Link href="/resume-builder/builder" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg shadow hover:bg-blue-700 transition">
          Start Building Your Resume
        </Link>
      </div>
    </>
  );
} 