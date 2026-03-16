import React, { useState } from 'react';
import { FileText, Download, Eye, Clock, Award, Search, Filter, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { downloadReportPDF } from '../utils/reportUtils';

export default function PatientResultsScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const results = [
    {
      id: 1,
      date: '2026-01-20',
      doctor: 'Dr. Sarah Johnson',
      status: 'Completed',
      pattern: 'Autosomal Dominant',
      confidence: 85,
      specialty: 'Genetic Counselor'
    },
    {
      id: 2,
      date: '2026-01-10',
      doctor: 'Dr. Michael Chen',
      status: 'Completed',
      pattern: 'X-Linked',
      confidence: 72,
      specialty: 'Clinical Geneticist'
    },
  ];

  const filteredResults = results.filter(result => {
    const matchesSearch = result.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.pattern.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || result.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const handleDownload = async (resultId: number) => {
    setDownloadingId(resultId);
    setError(null);
    const result = await downloadReportPDF(undefined, resultId.toString());
    if (!result.success) {
      setError(result.message || 'Failed to download report');
      setTimeout(() => setError(null), 5000);
    }
    setDownloadingId(null);
  };

  return (
    <MobileContainer>
      <Header
        title="My Results"
        showBack
        onBack={() => navigate('/home')}
      />

      <div className="p-4 space-y-4">
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm border border-red-100 animate-pulse">
            {error}
          </div>
        )}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-full p-2">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Analysis Results</h3>
              <p className="text-sm text-gray-600">
                View and download your genetic analysis reports. All reports are reviewed by certified genetic professionals.
              </p>
            </div>
          </div>
        </div>

        {results.length > 0 && (
          <>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor or pattern..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <div className="flex gap-2 overflow-x-auto">
                {['all', 'completed', 'pending'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setFilterStatus(filter as typeof filterStatus)}
                    className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                      filterStatus === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="space-y-3">
          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <div key={result.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">{result.pattern}</h4>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Clock className="w-4 h-4" />
                        <span>{result.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Analyzed by <span className="font-medium text-gray-900">{result.doctor}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{result.specialty}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      {result.status}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Confidence Score</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getConfidenceColor(result.confidence)}`}>
                        {result.confidence}%
                      </span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${getProgressColor(result.confidence)}`}
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => navigate('/prediction-result')}
                      className="flex-1 text-sm"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleDownload(result.id)}
                      disabled={downloadingId === result.id}
                      className="flex-1 text-sm"
                    >
                      {downloadingId === result.id ? (
                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4 mr-1" />
                      )}
                      {downloadingId === result.id ? 'Downloading...' : 'Download'}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : results.length > 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-1">No results found</p>
              <p className="text-sm text-gray-400">
                Try adjusting your search or filter
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">No Results Yet</h3>
              <p className="text-sm text-gray-600 mb-4 max-w-xs mx-auto">
                Your analysis results will appear here once your pedigree has been reviewed by a healthcare professional.
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/submit-pedigree')}
                className="mx-auto"
              >
                Submit Pedigree for Analysis
              </Button>
            </div>
          )}
        </div>

        {results.length > 0 && (
          <Button
            variant="secondary"
            onClick={() => navigate('/home')}
            className="w-full"
          >
            Back to Dashboard
          </Button>
        )}
      </div>
    </MobileContainer>
  );
}