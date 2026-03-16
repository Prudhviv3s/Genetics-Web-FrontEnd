import React, { useState } from 'react';
import { BookOpen, Award, Clock, Calendar, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAppContext } from '../context/AppContext';

interface Course {
  id: string;
  title: string;
  provider: string;
  credits: number;
  duration: string;
  status: 'completed' | 'in-progress' | 'available';
  completedDate?: string;
  category: string;
}

export default function ContinuingEducationScreen() {
  const navigate = useNavigate();
  const { userRole } = useAppContext();

  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'Advanced Pedigree Analysis Techniques',
      provider: 'American College of Medical Genetics',
      credits: 5,
      duration: '4 hours',
      status: 'completed',
      completedDate: '2026-01-15',
      category: 'Clinical Genetics'
    },
    {
      id: '2',
      title: 'Genomic Medicine: Clinical Applications',
      provider: 'National Society of Genetic Counselors',
      credits: 8,
      duration: '6 hours',
      status: 'in-progress',
      category: 'Genomic Medicine'
    },
    {
      id: '3',
      title: 'Ethical Considerations in Genetic Testing',
      provider: 'American Board of Medical Genetics',
      credits: 3,
      duration: '2.5 hours',
      status: 'available',
      category: 'Ethics & Law'
    },
    {
      id: '4',
      title: 'Cancer Genetics Update 2026',
      provider: 'American Society of Clinical Oncology',
      credits: 6,
      duration: '5 hours',
      status: 'available',
      category: 'Subspecialty'
    }
  ]);

  const totalCredits = courses
    .filter(c => c.status === 'completed')
    .reduce((sum, c) => sum + c.credits, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'available':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MobileContainer>
      <Header title="Continuing Education" showBack onBack={() => navigate(-1)} />

      <div className="p-4 pb-24 space-y-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Professional Development</h2>
          <p className="text-gray-600 mt-1">
            Track your CME credits and continuing education
          </p>
        </div>

        {/* Credits Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Award size={32} />
            <div>
              <h3 className="text-lg font-semibold">CME Credits Earned</h3>
              <p className="text-blue-100 text-sm">Current Year (2026)</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">{totalCredits}</span>
            <span className="text-blue-100">/ 50 required credits</span>
          </div>
          <div className="mt-3 bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${(totalCredits / 50) * 100}%` }}
            />
          </div>
        </div>

        {/* Courses by Status */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            In Progress
          </h3>
          <div className="space-y-3 mb-4">
            {courses.filter(c => c.status === 'in-progress').map((course) => (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer"
                onClick={() => { }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{course.title}</h4>
                    <p className="text-sm text-gray-600">{course.provider}</p>
                  </div>
                  <ExternalLink size={18} className="text-gray-400 flex-shrink-0 ml-2" />
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-700 mb-2">
                  <div className="flex items-center gap-1">
                    <Award size={16} className="text-blue-600" />
                    <span>{course.credits} Credits</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-gray-400" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-xs text-gray-600">{course.category}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(course.status)}`}>
                    In Progress
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Available Courses
          </h3>
          <div className="space-y-3 mb-4">
            {courses.filter(c => c.status === 'available').map((course) => (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer"
                onClick={() => { }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{course.title}</h4>
                    <p className="text-sm text-gray-600">{course.provider}</p>
                  </div>
                  <ExternalLink size={18} className="text-gray-400 flex-shrink-0 ml-2" />
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-700 mb-2">
                  <div className="flex items-center gap-1">
                    <Award size={16} className="text-blue-600" />
                    <span>{course.credits} Credits</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} className="text-gray-400" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <span className="text-xs text-gray-600">{course.category}</span>
                  <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all">
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Completed
          </h3>
          <div className="space-y-3">
            {courses.filter(c => c.status === 'completed').map((course) => (
              <div
                key={course.id}
                className="bg-white border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{course.title}</h4>
                    <p className="text-sm text-gray-600">{course.provider}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(course.status)}`}>
                    Completed
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <Award size={16} className="text-green-600" />
                    <span>{course.credits} Credits</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{course.completedDate && new Date(course.completedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <BookOpen className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">CME Requirements</h4>
              <p className="text-sm text-blue-800">
                Maintain board certification with 50 CME credits annually. Credits are automatically tracked and reported.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation userRole={userRole ?? undefined} />
    </MobileContainer>
  );
}
