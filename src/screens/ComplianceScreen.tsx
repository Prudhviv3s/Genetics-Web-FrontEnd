import React, { useState } from 'react';
import { Shield, CheckCircle2, AlertTriangle, FileText, Download, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAppContext } from '../context/AppContext';

interface ComplianceItem {
  id: string;
  title: string;
  category: string;
  status: 'compliant' | 'review-needed' | 'action-required';
  lastReview: string;
  nextReview?: string;
  description: string;
}

export default function ComplianceScreen() {
  const navigate = useNavigate();
  const { userRole } = useAppContext();

  const [complianceItems] = useState<ComplianceItem[]>([
    {
      id: '1',
      title: 'HIPAA Compliance Training',
      category: 'Privacy & Security',
      status: 'compliant',
      lastReview: '2026-01-15',
      nextReview: '2027-01-15',
      description: 'Annual HIPAA privacy and security training completed'
    },
    {
      id: '2',
      title: 'Genetic Counseling Standards',
      category: 'Professional Standards',
      status: 'compliant',
      lastReview: '2026-02-01',
      nextReview: '2027-02-01',
      description: 'NSGC practice guidelines and standards review'
    },
    {
      id: '3',
      title: 'Data Protection Audit',
      category: 'Privacy & Security',
      status: 'review-needed',
      lastReview: '2025-11-10',
      nextReview: '2026-02-10',
      description: 'Quarterly review of data protection measures'
    },
    {
      id: '4',
      title: 'Informed Consent Procedures',
      category: 'Clinical Practice',
      status: 'compliant',
      lastReview: '2026-01-20',
      description: 'Review of informed consent documentation procedures'
    },
    {
      id: '5',
      title: 'CLIA Compliance Review',
      category: 'Laboratory Standards',
      status: 'action-required',
      lastReview: '2025-10-15',
      nextReview: '2026-02-12',
      description: 'Clinical Laboratory Improvement Amendments compliance'
    },
    {
      id: '6',
      title: 'ACMG Guidelines Update',
      category: 'Professional Standards',
      status: 'review-needed',
      lastReview: '2025-12-05',
      description: 'American College of Medical Genetics guidelines review'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle2 size={20} className="text-green-600" />;
      case 'review-needed':
        return <AlertTriangle size={20} className="text-yellow-600" />;
      case 'action-required':
        return <AlertTriangle size={20} className="text-red-600" />;
      default:
        return <Shield size={20} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800';
      case 'review-needed':
        return 'bg-yellow-100 text-yellow-800';
      case 'action-required':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'Compliant';
      case 'review-needed':
        return 'Review Needed';
      case 'action-required':
        return 'Action Required';
      default:
        return status;
    }
  };

  const actionRequiredCount = complianceItems.filter(i => i.status === 'action-required').length;
  const reviewNeededCount = complianceItems.filter(i => i.status === 'review-needed').length;
  const compliantCount = complianceItems.filter(i => i.status === 'compliant').length;

  const categories = Array.from(new Set(complianceItems.map(i => i.category)));

  return (
    <MobileContainer>
      <Header title="Compliance & Standards" showBack onBack={() => navigate(-1)} />

      <div className="p-4 pb-24 space-y-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Regulatory Compliance</h2>
          <p className="text-gray-600 mt-1">
            Track compliance with healthcare and genetic counseling standards
          </p>
        </div>

        {/* Compliance Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={32} />
            <div>
              <h3 className="text-lg font-semibold">Compliance Status</h3>
              <p className="text-blue-100 text-sm">Overview of all requirements</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold">{compliantCount}</p>
              <p className="text-blue-100 text-sm">Compliant</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-200">{reviewNeededCount}</p>
              <p className="text-blue-100 text-sm">Review</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-200">{actionRequiredCount}</p>
              <p className="text-blue-100 text-sm">Action</p>
            </div>
          </div>
        </div>

        {/* Compliance Items by Category */}
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              {category}
            </h3>
            <div className="space-y-3 mb-4">
              {complianceItems
                .filter(item => item.category === category)
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => { }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {getStatusIcon(item.status)}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 flex-1">{item.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ml-2 ${getStatusColor(item.status)}`}>
                            {getStatusLabel(item.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Last Review: {new Date(item.lastReview).toLocaleDateString()}</span>
                          {item.nextReview && (
                            <span>Next: {new Date(item.nextReview).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {item.status !== 'compliant' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className={`w-full mt-3 py-2 px-4 rounded-lg text-sm font-medium transition-all ${item.status === 'action-required'
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-yellow-600 text-white hover:bg-yellow-700'
                          }`}
                      >
                        {item.status === 'action-required' ? 'Take Action' : 'Review Now'}
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}

        {/* Resources */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Compliance Resources
          </h3>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => { }}
              className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-all border-b border-gray-200"
            >
              <FileText size={20} className="text-gray-600" />
              <span className="flex-1 text-left font-medium text-gray-900">
                HIPAA Privacy Rule Guide
              </span>
              <Download size={20} className="text-gray-400" />
            </button>
            <button
              onClick={() => { }}
              className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-all border-b border-gray-200"
            >
              <FileText size={20} className="text-gray-600" />
              <span className="flex-1 text-left font-medium text-gray-900">
                ACMG Practice Guidelines
              </span>
              <ExternalLink size={20} className="text-gray-400" />
            </button>
            <button
              onClick={() => { }}
              className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-all"
            >
              <FileText size={20} className="text-gray-600" />
              <span className="flex-1 text-left font-medium text-gray-900">
                NSGC Code of Ethics
              </span>
              <ExternalLink size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <Shield className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Stay Compliant</h4>
              <p className="text-sm text-blue-800">
                Regular compliance reviews ensure adherence to HIPAA, CLIA, and professional genetic counseling standards. Automatic reminders keep you on track.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation userRole={userRole ?? undefined} />
    </MobileContainer>
  );
}
