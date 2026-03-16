import React, { useEffect, useState, useRef } from 'react';
import { Download, Share2, Printer, FileText, AlertCircle, CheckCircle2, Info, User, Calendar, Activity, TrendingUp, Loader2 } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { useAppContext } from '../context/AppContext';
import { downloadReportPDF } from '../utils/reportUtils';
import { API_BASE_URL } from '../config';

export default function PatientInheritanceReportScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { patientId } = useParams();
  const { userRole } = useAppContext();

  const [loading, setLoading] = useState(true);
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const [error, setError] = useState('');
  const [downloadError, setDownloadError] = useState('');
  const [reportData, setReportData] = useState<any>(null);

  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ... (rest of useEffect remains unchanged)
    const mlState = location.state as { mlPatterns?: any[], extracted?: any, patientId?: string, patientName?: string, patientDisplayId?: string, patientAge?: number | string, patientGender?: string, analysis_id?: number } | null;
    
    // 1. If we are in "Mock" mode (from a fresh upload with no Patient ID), use the state
    if (patientId === 'ML-GENERATED' && mlState && mlState.mlPatterns && mlState.mlPatterns.length > 0) {
      const topPattern = mlState.mlPatterns[0];

      const syntheticReport = {
        patient: {
          full_name: mlState.patientName || mlState.extracted?.PatientName || 'Analysis Subject',
          patient_id: mlState.patientDisplayId || mlState.extracted?.PatientID || 'ML-GENERATED',
          age: mlState.patientAge || mlState.extracted?.PatientAge || 'Unknown',
          gender: mlState.patientGender || mlState.extracted?.PatientGender || 'Unknown',
          analysis_date: new Date().toISOString()
        },
        inheritance: {
          pattern: topPattern.name,
          confidence: Math.round(topPattern.score),
          confidence_label: topPattern.score >= 90 ? 'Very High' : topPattern.score >= 75 ? 'High' : 'Moderate',
          description: `Machine Learning analysis determined a ${topPattern.score}% probability of ${topPattern.name} inheritance based on the uploaded DNA report markers.`
        },
        pedigree_stats: {
          family_members: mlState.extracted?.NumberofFamilyMembers || mlState.extracted?.family_members || '0',
          affected: mlState.extracted?.NumberofAffectedIndividuals || mlState.extracted?.affected || '0',
          generations: mlState.extracted?.NumberofGenerations || mlState.extracted?.generations || '0'
        },
        report: {},
        key_findings: [],
        clinical_recommendations: []
      };

      setReportData(syntheticReport);
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      if (!patientId || patientId === 'ML-GENERATED') return;
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const cleanId = patientId.replace(/[^0-9]/g, '');

        // Fetch Report Data
        const reportRes = await fetch(`${API_BASE_URL}/api/doctor/report/${cleanId}/`, {
          headers: { 'Authorization': `Token ${token}` }
        });
        const rData = await reportRes.json();

        // Fetch Pedigree Data to get accurate counts
        const pedigreeRes = await fetch(`${API_BASE_URL}/api/doctor/patient/${cleanId}/pedigree/`, {
          headers: { 'Authorization': `Token ${token}` }
        });
        const pData = await pedigreeRes.json();

        if (rData.status) {
          const nodes = (pData.status && pData.pedigree?.nodes) ? pData.pedigree.nodes : [];
          
          let familyCount = nodes.length;
          let affectedCount = nodes.filter((n: any) => (n.health_status || '').toLowerCase() === 'affected').length;
          
          // Basic generation calculation
          const g1 = nodes.filter((n: any) => ['Grandfather', 'Grandmother'].includes(n.relationship)).length > 0 ? 1 : 0;
          const g2 = nodes.filter((n: any) => ['Father', 'Mother', 'Uncle', 'Aunt'].includes(n.relationship)).length > 0 ? 1 : 0;
          const g3 = nodes.filter((n: any) => ['Patient', 'Brother', 'Sister', 'Son', 'Daughter'].includes(n.relationship)).length > 0 ? 1 : 0;
          let genCount = g1 + g2 + g3;

          // Normalize the structure to ensure pedigree_stats is present and mapped
          // Priority: Backend fields if they exist, otherwise calculated from pedigree
          const normalizedData = {
            ...rData,
            patient: {
              ...rData.patient,
              age: rData.patient?.age || rData.inheritance?.age || '---',
              gender: rData.patient?.gender || rData.inheritance?.gender || '---',
              analysis_date: rData.patient?.analysis_date || rData.inheritance?.analysis_date || rData.completed_at || rData.analysis_date
            },
            inheritance: {
              ...rData.inheritance,
              confidence_label: getConfidenceLabel(rData.inheritance?.confidence || 0)
            },
            pedigree_stats: {
              family_members: rData.pedigree_stats?.family_members || rData.inheritance?.family_members || familyCount || '0',
              affected: rData.pedigree_stats?.affected || rData.inheritance?.affected || affectedCount || '0',
              generations: rData.pedigree_stats?.generations || rData.inheritance?.generations || genCount || '0'
            },
            key_findings: rData.inheritance?.key_findings || [],
            clinical_recommendations: rData.inheritance?.clinical_recommendations || []
          };
          setReportData(normalizedData);
        } else {
          setError(rData.message || 'Report not found');
        }
      } catch (err) {
        console.error("Failed to fetch report or pedigree:", err);
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [patientId, location.state]);

  const handleDownloadPDF = async () => {
    if (!reportData) return;

    setGeneratingPDF(true);
    setDownloadError('');
    
    // Call backend PDF download utility
    const result = await downloadReportPDF(
      reportData.patient.id.toString(), 
      reportData.analysis_id?.toString()
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

  const inheritanceDescriptions = {
    'Autosomal Dominant': 'Pattern where only one copy of the mutated gene from one parent is sufficient to cause the condition. Affected individuals have a 50% chance of passing the condition to each child.',
    'Autosomal Recessive': 'Pattern requiring two copies of the mutated gene (one from each parent) to manifest the condition. Parents are typically carriers without symptoms.',
    'X-Linked Recessive': 'Pattern where the mutated gene is located on the X chromosome. Primarily affects males, while females are typically carriers.',
    'Y-Linked': 'Pattern where the mutated gene is located on the Y chromosome. Passed exclusively from father to son.',
    'Mitochondrial': 'Pattern where mutations in mitochondrial DNA are inherited maternally. All children of affected mothers will inherit the mutation.'
  };

  if (loading) {
    return (
      <DesktopLayout title="Inheritance Pattern Report" defaultUserRole="doctor">
        <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
          Loading report...
        </div>
      </DesktopLayout>
    );
  }

  if (error || !reportData) {
    return (
      <DesktopLayout title="Inheritance Pattern Report" defaultUserRole="doctor">
        <div className="flex items-center justify-center min-h-[50vh] text-red-500 flex-col gap-4">
          <p>{error || 'Error loading report'}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Retry</button>
        </div>
      </DesktopLayout>
    );
  }

  const { patient, inheritance, pedigree_stats, report } = reportData;

  return (
    <DesktopLayout title="Inheritance Pattern Report" defaultUserRole={userRole ?? undefined}>
      <div className="max-w-5xl mx-auto">
        {/* Printable Area */}
        <div ref={reportRef} className="bg-white p-2 rounded-2xl overflow-hidden mb-8">
          {/* Patient Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User size={40} />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-1">{patient.full_name}</h2>
                <p className="text-blue-100 text-lg">Patient ID: {String(patient.patient_id || '---').replace(/^#/, '').toUpperCase()}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20">
              <div>
                <p className="text-blue-100 text-sm mb-1">Age</p>
                <p className="font-semibold text-xl">{patient.age} years</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-1">Gender</p>
                <p className="font-semibold text-xl">{patient.gender}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-1">Analysis Date</p>
                <p className="font-semibold text-lg">{patient.analysis_date ? new Date(patient.analysis_date).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 text-left">
            {/* Inheritance Pattern Result */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Activity className="text-blue-600" size={28} />
                <h3 className="font-bold text-gray-900 text-xl">Inheritance Pattern</h3>
              </div>
              <div className="bg-blue-50 border-2 border-blue-600 rounded-xl p-5 mb-4">
                <p className="text-2xl font-bold text-blue-900 mb-2">{inheritance.pattern}</p>
                <div className="flex items-center gap-2 mt-3">
                  <TrendingUp size={18} className={getConfidenceColor(inheritance.confidence)} />
                  <span className="text-sm font-semibold text-gray-700">
                    Confidence: <span className={getConfidenceColor(inheritance.confidence)}>{inheritance.confidence}% ({inheritance.confidence_label})</span>
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {inheritance.description || inheritanceDescriptions[inheritance.pattern as keyof typeof inheritanceDescriptions] ||
                    'Pattern analysis is currently in progress. Please check back later for detailed results.'}
                </p>
              </div>
            </div>

            {/* Pedigree Statistics */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Activity className="text-blue-600" size={28} />
                <h3 className="font-bold text-gray-900 text-xl">Pedigree Analysis</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-5 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <p className="text-4xl font-bold text-blue-900 mb-2">{pedigree_stats.family_members}</p>
                  <p className="text-sm text-gray-600 font-medium">Family Members</p>
                </div>
                <div className="text-center p-5 bg-orange-50 rounded-xl border-2 border-orange-200">
                  <p className="text-4xl font-bold text-orange-900 mb-2">{pedigree_stats.affected}</p>
                  <p className="text-sm text-gray-600 font-medium">Affected</p>
                </div>
                <div className="text-center p-5 bg-purple-50 rounded-xl border-2 border-purple-200">
                  <p className="text-4xl font-bold text-purple-900 mb-2">{pedigree_stats.generations}</p>
                  <p className="text-sm text-gray-600 font-medium">Generations</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  Pedigree analysis reveal {pedigree_stats.affected} affected individuals across {pedigree_stats.generations} generations within a family of {pedigree_stats.family_members} members, providing supporting evidence for the {inheritance.pattern.toLowerCase()} classification.
                </p>
              </div>
            </div>
          </div>

          {/* Key Findings & Clinical Recommendations Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 text-left">
            {reportData.key_findings && reportData.key_findings.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="text-green-600" size={24} />
                  <h3 className="font-bold text-gray-900 text-lg">Key Findings</h3>
                </div>
                <ul className="space-y-3">
                  {reportData.key_findings.map((finding: string, i: number) => (
                    <li key={i} className="flex gap-3 text-gray-700 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {reportData.clinical_recommendations && reportData.clinical_recommendations.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="text-purple-600" size={24} />
                  <h3 className="font-bold text-gray-900 text-lg">Recommendations</h3>
                </div>
                <ul className="space-y-3">
                  {reportData.clinical_recommendations.map((rec: string, i: number) => (
                    <li key={i} className="flex gap-3 text-gray-700 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Report Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 text-left">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} className="text-gray-500" />
              <span className="text-sm text-gray-600 font-medium">
                Report Generated: {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              This report is based on automated pedigree analysis and should be reviewed by a qualified genetics professional. Clinical correlation is essential.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-end gap-3 mb-6" data-html2canvas-ignore="true">
          {downloadError && (
            <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm border border-red-100 flex items-center gap-2">
              <AlertCircle size={16} />
              {downloadError}
            </div>
          )}
          <button
            onClick={handleDownloadPDF}
            disabled={generatingPDF}
            className="bg-white border-2 border-gray-300 rounded-xl p-3 flex items-center gap-2 hover:bg-gray-50 hover:border-blue-500 transition-all disabled:opacity-50"
          >
            {generatingPDF ? <Loader2 className="animate-spin text-blue-600" size={20} /> : <Download size={20} className="text-blue-600" />}
            <span className="text-sm font-semibold text-gray-700">{generatingPDF ? 'Generating...' : 'Download Report'}</span>
          </button>
        </div>
      </div>
    </DesktopLayout>
  );
}
