import React, { useState } from 'react';
import { ClipboardList, Search, Filter, Plus, FileText, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAppContext } from '../context/AppContext';

interface CaseNote {
  id: string;
  patientName: string;
  title: string;
  date: string;
  category: 'consultation' | 'analysis' | 'follow-up' | 'other';
  preview: string;
}

export default function CaseNotesScreen() {
  const navigate = useNavigate();
  const { userRole } = useAppContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [caseNotes] = useState<CaseNote[]>([
    {
      id: '1',
      patientName: 'Sarah Johnson',
      title: 'Initial Genetic Consultation',
      date: '2026-02-08',
      category: 'consultation',
      preview: 'Patient presented with family history of breast cancer. Discussed BRCA1/2 testing options...'
    },
    {
      id: '2',
      patientName: 'Michael Chen',
      title: 'Pedigree Analysis Results',
      date: '2026-02-07',
      category: 'analysis',
      preview: 'Analysis suggests autosomal dominant inheritance pattern. Confidence score: 87%...'
    },
    {
      id: '3',
      patientName: 'Emily Rodriguez',
      title: 'Follow-up - Test Results Discussion',
      date: '2026-02-06',
      category: 'follow-up',
      preview: 'Reviewed genetic test results with patient. Negative for known pathogenic variants...'
    },
    {
      id: '4',
      patientName: 'David Wilson',
      title: 'Carrier Screening Consultation',
      date: '2026-02-05',
      category: 'consultation',
      preview: 'Pre-pregnancy carrier screening discussion. Couple informed about available panels...'
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'consultation':
        return 'bg-blue-100 text-blue-800';
      case 'analysis':
        return 'bg-purple-100 text-purple-800';
      case 'follow-up':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotes = caseNotes.filter(note =>
    note.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileContainer>
      <Header title="Case Notes" showBack onBack={() => navigate(-1)} />

      <div className="p-4 pb-24 space-y-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Clinical Documentation</h2>
          <p className="text-gray-600 mt-1">
            Access and manage your case notes and documentation
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search case notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => { }}
            className="flex-1 bg-blue-600 text-white rounded-xl p-3 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
          >
            <Plus size={18} />
            <span className="font-medium">New Note</span>
          </button>
          <button
            onClick={() => { }}
            className="bg-white border border-gray-300 rounded-xl p-3 flex items-center justify-center hover:bg-gray-50 transition-all"
          >
            <Filter size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Case Notes List */}
        <div className="space-y-3">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer"
                onClick={() => { }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText size={16} className="text-gray-400" />
                      <h4 className="font-semibold text-gray-900">{note.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{note.patientName}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(note.category)}`}>
                    {note.category.charAt(0).toUpperCase() + note.category.slice(1)}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                  {note.preview}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={14} />
                  <span>{new Date(note.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <ClipboardList size={48} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No case notes found</p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <ClipboardList className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Documentation Best Practices</h4>
              <p className="text-sm text-blue-800">
                All case notes are encrypted and HIPAA-compliant. Include relevant genetic findings, counseling provided, and follow-up plans.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation userRole={userRole ?? undefined} />
    </MobileContainer>
  );
}
