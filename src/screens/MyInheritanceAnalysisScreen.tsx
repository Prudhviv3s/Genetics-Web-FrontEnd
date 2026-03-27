import React, { useState, useRef, useEffect } from 'react';
import { Activity, TrendingUp, Users, AlertCircle, CheckCircle2, Info, FileText, Download, Share2, Printer, Calendar, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { useAppContext } from '../context/AppContext';
import { downloadReportPDF } from '../utils/reportUtils';
import { API_BASE_URL } from '../config';

export default function MyInheritanceAnalysisScreen() {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();

  const reportRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const [patientData, setPatientData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch Profile to get numeric ID
        const profileRes = await fetch(`${API_BASE_URL}/api/me/`, {
          headers: { 'Authorization': `Token ${token}` }
        });
        const profileData = await profileRes.json();
        
        // Fetch Latest Analysis
        const analysisRes = await fetch(`${API_BASE_URL}/api/dna/latest-analysis/`, {
          headers: { 'Authorization': `Token ${token}` }
        });
        const analysisData = await analysisRes.json();

        if (profileData.status && analysisData.status && analysisData.analysis) {
          const profile = profileData.profile;
          const analysis = analysisData.analysis;
          
          setPatientData({
            name: profile.full_name,
            age: profile.age || 0,
            gender: profile.gender || 'Unknown',
            id: profile.id, // Use numeric database ID
            displayId: profile.patient_id || (profile.id ? `PT${String(profile.id).padStart(4, '0')}` : 'Unknown'), // For display purposes
            analysisDate: analysis.analysis_date || analysis.completed_at || new Date().toISOString(),
            inheritancePattern: analysis.inheritance_pattern || 'Pending',
            confidence: Math.round(analysis.confidence || 0),
            affectedGene: analysis.key_findings?.[0]?.gene || 'N/A',
            condition: analysis.key_findings?.[0]?.condition || 'Analysis in progress',
            familyMembers: analysis.family_members || 0,
            affectedMembers: analysis.affected || 0,
            generations: analysis.generations || 0,
            analysisId: analysis.id
          });
        }
      } catch (err) {
        console.error("Failed to fetch personal analysis data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDownloadPDF = async () => {
    if (!patientData) return;
    setGeneratingPDF(true);
    setDownloadError('');
    
    // Call backend PDF download utility using numeric ID
    const result = await downloadReportPDF(
      patientData.id.toString(), 
      patientData.analysisId?.toString()
    );

    if (!result.success) {
      setDownloadError(result.message || 'Failed to download report. Please try again.');
      setTimeout(() => setDownloadError(''), 5000);
    }
    setGeneratingPDF(false);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-blue-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 90) return 'Very High';
    if (confidence >= 75) return 'High';
    if (confidence >= 60) return 'Moderate';
    return 'Low';
  };

  const getConfidenceBgColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-50 border-green-600';
    if (confidence >= 75) return 'bg-blue-50 border-blue-600';
    if (confidence >= 60) return 'bg-yellow-50 border-yellow-600';
    return 'bg-red-50 border-red-600';
  };

  const inheritanceDescriptions: { [key: string]: string } = {
    'Autosomal Dominant': 'Pattern where only one copy of the mutated gene from one parent is sufficient to cause the condition. Affected individuals have a 50% chance of passing the condition to each child.',
    'Autosomal Recessive': 'Pattern requiring two copies of the mutated gene (one from each parent) to manifest the condition. Parents are typically carriers without symptoms.',
    'X-Linked Recessive': 'Pattern where the mutated gene is located on the X chromosome. Primarily affects males, while females are typically carriers.',
    'Y-Linked': 'Pattern where the mutated gene is located on the Y chromosome. Passed exclusively from father to son.',
    'Mitochondrial': 'Pattern where mutations in mitochondrial DNA are inherited maternally. All children of affected mothers will inherit the mutation.'
  };

  if (loading) {
    return (
      <DesktopLayout title="My Inheritance Analysis" defaultUserRole="patient">
        <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin mr-3" />
          Loading your analysis...
        </div>
      </DesktopLayout>
    );
  }

  if (!patientData) {
    return (
      <DesktopLayout title="My Inheritance Analysis" defaultUserRole="patient">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
          <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-xl font-medium">No inheritance analysis found</p>
          <p className="mt-2 text-gray-400">Complete your pedigree analysis to view results here.</p>
          <button 
            onClick={() => navigate('/pedigree-builder')}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Pedigree Builder
          </button>
        </div>
      </DesktopLayout>
    );
  }

  return (
    <DesktopLayout title="My Inheritance Analysis" defaultUserRole="patient">
      <div className="max-w-5xl mx-auto">
        <div ref={reportRef} className="bg-white p-2 rounded-xl mb-6">
          {/* Header Section */}
          <div className="mb-8 p-4">
            <h2 className="text-3xl font-bold text-gray-900">Your Inheritance Analysis</h2>
            <p className="text-gray-600 mt-2 text-lg">
              Detailed analysis of your genetic inheritance pattern
            </p>
          </div>

          {/* Patient Info Card */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-6 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Users size={40} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{patientData.name}</h3>
                <p className="text-blue-100">Patient ID: {String(patientData.displayId || '---').replace(/^#/, '').toUpperCase()}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20">
              <div>
                <p className="text-blue-100 text-sm mb-1">Age</p>
                <p className="font-semibold text-lg">{patientData.age} years</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-1">Gender</p>
                <p className="font-semibold text-lg">{patientData.gender}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-1">Analysis Date</p>
                <p className="font-semibold text-lg">{new Date(patientData.analysisDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Main Content - Left Column (2/3) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Inheritance Pattern Result */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <Activity className="text-blue-600" size={28} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl">Inheritance Pattern</h3>
                </div>
                <div className={`${getConfidenceBgColor(patientData.confidence)} border-2 rounded-xl p-6 mb-5`}>
                  <p className="text-2xl font-bold text-gray-900 mb-3">{patientData.inheritancePattern}</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={20} className={getConfidenceColor(patientData.confidence)} />
                    <span className="text-sm font-semibold text-gray-700">
                      Confidence: <span className={getConfidenceColor(patientData.confidence)}>{patientData.confidence}% ({getConfidenceLabel(patientData.confidence)})</span>
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-5">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {inheritanceDescriptions[patientData.inheritancePattern] || 
                     'Pattern analysis is currently in progress. Please check back later for detailed results.'}
                  </p>
                </div>
              </div>

              {/* Clinical Information */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-purple-100 rounded-lg p-2">
                    <FileText className="text-purple-600" size={28} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl">Clinical Information</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Info size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Condition</p>
                      <p className="font-semibold text-gray-900 text-lg">{patientData.condition}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Activity size={20} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Affected Gene</p>
                      <p className="font-semibold text-gray-900 text-lg">{patientData.affectedGene}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Findings */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-green-100 rounded-lg p-2">
                    <CheckCircle2 className="text-green-600" size={28} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl">Key Findings</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">Pedigree pattern consistent with {patientData.inheritancePattern.toLowerCase()} inheritance</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">Multiple generations showing characteristic transmission pattern</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">Risk assessment completed for family members</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">Genetic counseling recommendations provided</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar (1/3) */}
            <div className="space-y-6">
              {/* Pedigree Statistics */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <Activity className="text-blue-600" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">Pedigree Stats</h3>
                </div>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-900">{patientData.familyMembers}</p>
                    <p className="text-sm text-gray-600 mt-1">Family Members</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-3xl font-bold text-orange-900">{patientData.affectedMembers}</p>
                    <p className="text-sm text-gray-600 mt-1">Affected</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-3xl font-bold text-purple-900">{patientData.generations}</p>
                    <p className="text-sm text-gray-600 mt-1">Generations</p>
                  </div>
                </div>
              </div>

              {/* Report Info */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={18} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Report Generated</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {new Date(patientData.analysisDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  This report is based on automated pedigree analysis and should be reviewed by a qualified genetics professional. Clinical correlation is essential.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 max-w-lg mx-auto" data-html2canvas-ignore="true">
          {downloadError && (
            <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm border border-red-100 flex items-center justify-center gap-2">
              <AlertCircle size={16} />
              {downloadError}
            </div>
          )}
          <button
            onClick={handleDownloadPDF}
            disabled={generatingPDF}
            className="w-full bg-white border-2 border-gray-200 rounded-xl p-5 font-semibold flex items-center justify-center gap-3 hover:border-blue-600 hover:bg-blue-50 transition-all disabled:opacity-50 shadow-sm"
          >
            {generatingPDF ? <Loader2 size={24} className="animate-spin text-blue-600" /> : <Download size={24} className="text-blue-600" />}
            <span className="text-gray-700 text-lg">{generatingPDF ? 'Generating...' : 'Download Report'}</span>
          </button>
          
          <div className="flex gap-4">
            <button
            onClick={() => navigate('/my-pedigree-chart')}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-5 font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg text-lg"
            >
              View Pedigree Chart
            </button>
            <button
              onClick={() => navigate('/home')}
              className="px-8 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}
