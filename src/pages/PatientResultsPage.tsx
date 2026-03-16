import React, { useState } from 'react';
import { FileText, Download, Eye, Clock, Award, Search, Filter, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { API_BASE_URL } from '../config';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { PageContainer } from '../components/PageContainer';

export default function PatientResultsPage() {
  const navigate = useNavigate();
  const { currentUser, userRole, setUserRole } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (!userRole) {
      setUserRole('patient');
    }

    // Fetch patient results
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/patient/my-results/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        const data = await res.json();
        if (data.status && data.results) {
          const mappedResults = data.results.map((r: any) => ({
            id: r.id,
            date: r.analysis_date || r.created_at.split('T')[0],
            doctor: r.doctor_name || 'System Generated',
            status: r.status,
            pattern: r.primary_pattern || 'Unknown',
            confidence: r.primary_percent || r.confidence || 0,
            specialty: 'Medical Geneticist',
            summary: r.status === 'Completed'
              ? `Analysis indicates potential ${r.primary_pattern} inheritance pattern`
              : 'Analysis in progress - awaiting final review'
          }));
          setResults(mappedResults);
        }
      } catch (err) {
        console.error("Failed to load results", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [userRole, setUserRole]);

  const filteredResults = results.filter(result => {
    const matchesSearch = result.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.pattern.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || result.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (score > 0) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score > 0) return 'bg-orange-500';
    return 'bg-gray-300';
  };

  return (
    <>
      <Sidebar userRole={userRole} />
      <TopBar title="My Results" userName={currentUser?.name || 'Sarah Johnson'} userRole={userRole} />

      <PageContainer>
        <div className="max-w-6xl mx-auto">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-6 shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white/20 rounded-full p-3">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Analysis Results</h1>
                    <p className="text-blue-100">Genetic pedigree analysis reports</p>
                  </div>
                </div>
                <p className="text-blue-100 mt-2">
                  View and download your genetic analysis reports. All reports are reviewed by certified genetic professionals.
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{results.filter(r => r.status === 'Completed').length}</div>
                <div className="text-blue-100">Completed</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by doctor or inheritance pattern..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus('completed')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === 'completed' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                    }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === 'pending' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                    }`}
                >
                  Pending
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => result.status === 'Completed' && navigate('/inheritance-analysis')}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{result.pattern}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${result.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                          {result.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{result.summary}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          {new Date(result.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div>•</div>
                        <div>{result.doctor}</div>
                        <div>•</div>
                        <div>{result.specialty}</div>
                      </div>
                    </div>
                    {result.status === 'Completed' && (
                      <div className="text-right ml-4">
                        <div className={`px-4 py-2 rounded-lg border ${getConfidenceColor(result.confidence)}`}>
                          <div className="text-xs font-medium mb-1">Confidence Score</div>
                          <div className="text-2xl font-bold">{result.confidence}%</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {result.status === 'Completed' && (
                    <>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Analysis Confidence</span>
                          <span className="text-sm font-semibold text-gray-900">{result.confidence}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(result.confidence)}`}
                            style={{ width: `${result.confidence}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/inheritance-analysis');
                          }}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all flex items-center justify-center gap-2"
                        >
                          <Eye size={18} />
                          View Details
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/export-report');
                          }}
                          className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 font-medium transition-all flex items-center gap-2"
                        >
                          <Download size={18} />
                          Download
                        </button>
                      </div>
                    </>
                  )}

                  {result.status === 'Pending' && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <Clock size={18} />
                        <span className="text-sm font-medium">Analysis in progress - You'll be notified when complete</span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter</p>
              </div>
            )}
          </div>

          {filteredResults.length > 0 && (
            <div className="mt-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <TrendingUp className="text-blue-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Understanding Your Results</h3>
                  <p className="text-sm text-gray-700">
                    Each analysis provides a confidence score based on the completeness of your family pedigree and the strength of the observed inheritance pattern. Higher scores indicate more conclusive findings. For questions about your results, please consult with your genetic counselor.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </PageContainer>
    </>
  );
}
