import React from 'react';
import { Activity, TrendingUp, Calendar, Download, Share2, Printer, User, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { useAppContext } from '../context/AppContext';
import { downloadReportPDF } from '../utils/reportUtils';
import { API_BASE_URL } from '../config';

export default function PatientInheritanceResultsScreen() {
  const navigate = useNavigate();
  const { userRole, currentUser } = useAppContext();

  const [loading, setLoading] = React.useState(true);
  const [patientData, setPatientData] = React.useState<any>(null);

  const reportRef = React.useRef<HTMLDivElement>(null);
  const [generatingPDF, setGeneratingPDF] = React.useState(false);
  const [downloadError, setDownloadError] = React.useState('');

  const handleDownloadPDF = async () => {
    if (!patientData) return;
    setGeneratingPDF(true);
    setDownloadError('');
    
    // Call backend PDF download utility
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

  React.useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Fetch User Profile
        let profileName = currentUser?.name || 'Patient';
        let patientId = 'Unknown';
        let age = 0;
        let gender = 'Unknown';

        const meRes = await fetch(`${API_BASE_URL}/api/me/`, {
          headers: { 'Authorization': `Token ${token}` }
        });
        const meData = await meRes.json();
        if (meData.status && meData.profile) {
          const p = meData.profile;
          profileName = p.full_name || profileName;
          // Robust ID resolver
          patientId = p.patient_id || p.patientId || p.pt_id || (p.id ? `PT${String(p.id).padStart(4, '0')}` : 'Unknown');
          age = p.age || age;
          gender = p.gender || gender;
        }

        // Fetch Latest Analysis
        const analysisRes = await fetch(`${API_BASE_URL}/api/dna/latest-analysis/`, {
          headers: { 'Authorization': `Token ${token}` }
        });
        const analysisData = await analysisRes.json();

        if (analysisData.status && analysisData.analysis) {
          const a = analysisData.analysis;
          setPatientData({
            name: profileName,
            age: age,
            gender: gender,
            id: patientId,
            analysisDate: a.analysis_date?.split('T')[0] || a.completed_at?.split('T')[0] || 'Unknown Date',
            inheritancePattern: a.inheritance_pattern || 'Pending',
            confidence: Math.round(a.confidence || 0),
            confidenceLabel: a.confidence >= 90 ? 'Very High' : a.confidence >= 75 ? 'High' : a.confidence >= 60 ? 'Moderate' : 'Low',
            patternDescription: a.description || 'Analysis in progress or no description available.',
            familyMembers: a.family_members || 0,
            affectedMembers: a.affected || 0,
            generations: a.generations || 0
          });
        }
      } catch (err) {
        console.error("Failed to fetch patient inheritance results", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [currentUser?.name]);

  if (loading) {
    return (
      <DesktopLayout title="Inheritance Pattern Report" defaultUserRole="patient">
        <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
          Loading inheritance results...
        </div>
      </DesktopLayout>
    );
  }

  if (!patientData) {
    return (
      <DesktopLayout title="Inheritance Pattern Report" defaultUserRole="patient">
        <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
          No analysis results available yet. Please complete a family pedigree and submit it for analysis.
        </div>
      </DesktopLayout>
    );
  }

  return (
    <DesktopLayout title="Inheritance Pattern Report" defaultUserRole="patient">
      <div className="bg-[#f9fafb] min-h-screen -m-6 p-6">
        <div className="max-w-[848px] mx-auto">
          <div ref={reportRef} className="pb-4 bg-[#f9fafb]">
            {/* Patient Info Header Card */}
          <div className="bg-gradient-to-r from-[#155dfc] to-[#1447e6] rounded-2xl p-8 mb-6">
            {/* Patient Name and ID */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="text-white" size={40} strokeWidth={3.33} />
              </div>
              <div className="flex-1">
                <h2 className="text-[30px] font-bold leading-9 text-white mb-1">{patientData.name}</h2>
                <p className="text-[18px] text-[#dbeafe] leading-7">Patient ID: {String(patientData.id).replace(/^#/, '').toUpperCase()}</p>
              </div>
            </div>

            {/* Patient Details - Age, Gender, Analysis Date */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20">
              <div>
                <p className="text-[14px] text-[#dbeafe] leading-5 mb-1">Age</p>
                <p className="text-[20px] font-semibold leading-7 text-white">{patientData.age} years</p>
              </div>
              <div>
                <p className="text-[14px] text-[#dbeafe] leading-5 mb-1">Gender</p>
                <p className="text-[20px] font-semibold leading-7 text-white">{patientData.gender}</p>
              </div>
              <div>
                <p className="text-[14px] text-[#dbeafe] leading-5 mb-1">Analysis Date</p>
                <p className="text-[18px] font-semibold leading-7 text-white">{patientData.analysisDate}</p>
              </div>
            </div>
          </div>

          {/* Two Column Grid - Inheritance Pattern & Pedigree Analysis */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Left Card - Inheritance Pattern */}
            <div className="bg-white rounded-[14px] border border-[#e5e7eb] shadow-sm p-6">
              {/* Section Header */}
              <div className="flex items-center gap-2 mb-5">
                <Activity className="text-[#155dfc]" size={28} strokeWidth={2.33} />
                <h3 className="text-[20px] font-bold leading-7 text-[#101828]">Inheritance Pattern</h3>
              </div>

              {/* Pattern Result Box */}
              <div className="bg-[#eff6ff] border-[1.6px] border-[#155dfc] rounded-[14px] p-5 mb-5">
                <p className="text-[24px] font-bold leading-8 text-[#1c398e] mb-3">
                  {patientData.inheritancePattern}
                </p>
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-[#00a63e]" strokeWidth={1.5} />
                  <p className="text-[14px] font-semibold leading-5 text-[#364153]">
                    Confidence: <span className="text-[#00a63e]">{patientData.confidence}% ({patientData.confidenceLabel})</span>
                  </p>
                </div>
              </div>

              {/* Description Box */}
              <div className="bg-[#f9fafb] rounded-[10px] p-4">
                <p className="text-[14px] leading-[22.75px] text-[#364153]">
                  {patientData.patternDescription}
                </p>
              </div>
            </div>

            {/* Right Card - Pedigree Analysis */}
            <div className="bg-white rounded-[14px] border border-[#e5e7eb] shadow-sm p-6">
              {/* Section Header */}
              <div className="flex items-center gap-2 mb-5">
                <Activity className="text-[#155dfc]" size={28} strokeWidth={2.33} />
                <h3 className="text-[20px] font-bold leading-7 text-[#101828]">Pedigree Analysis</h3>
              </div>

              {/* Three Stats Boxes */}
              <div className="grid grid-cols-3 gap-4">
                {/* Family Members */}
                <div className="bg-[#eff6ff] border-[1.6px] border-[#bedbff] rounded-[14px] p-5 text-center">
                  <p className="text-[36px] font-bold leading-10 text-[#1c398e] mb-2">
                    {patientData.familyMembers}
                  </p>
                  <p className="text-[14px] font-medium leading-5 text-[#4a5565]">
                    Family Members
                  </p>
                </div>

                {/* Affected */}
                <div className="bg-[#fff7ed] border-[1.6px] border-[#ffd6a8] rounded-[14px] p-5 text-center">
                  <p className="text-[36px] font-bold leading-10 text-[#7e2a0c] mb-2">
                    {patientData.affectedMembers}
                  </p>
                  <p className="text-[14px] font-medium leading-5 text-[#4a5565]">
                    Affected
                  </p>
                </div>

                {/* Generations */}
                <div className="bg-[#faf5ff] border-[1.6px] border-[#e9d4ff] rounded-[14px] p-5 text-center">
                  <p className="text-[36px] font-bold leading-10 text-[#59168b] mb-2">
                    {patientData.generations}
                  </p>
                  <p className="text-[14px] font-medium leading-5 text-[#4a5565]">
                    Generations
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Report Information Box */}
          <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[14px] p-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} className="text-[#6a7282]" strokeWidth={1.5} />
              <p className="text-[14px] font-medium leading-5 text-[#4a5565]">
                Report Generated: {patientData.analysisDate}
              </p>
            </div>
            <p className="text-[14px] leading-5 text-[#6a7282]">
              This report is based on automated pedigree analysis and should be reviewed by a qualified genetics professional. Clinical correlation is essential.
            </p>
          </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-col items-center gap-3 mt-4 mb-8" data-html2canvas-ignore="true">
            {downloadError && (
              <div className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-sm border border-red-100 flex items-center gap-2 mb-2">
                <AlertCircle size={16} />
                {downloadError}
              </div>
            )}
            <button
              onClick={handleDownloadPDF}
              disabled={generatingPDF}
              className="w-full bg-white border-2 border-gray-300 rounded-xl p-4 flex items-center justify-center gap-3 hover:border-blue-600 hover:bg-blue-50 transition-all disabled:opacity-50 shadow-sm"
            >
              {generatingPDF ? <Loader2 size={24} className="animate-spin text-blue-600" /> : <Download size={24} className="text-blue-600" />}
              <span className="font-bold text-gray-700 text-lg">{generatingPDF ? 'Generating...' : 'Download Report'}</span>
            </button>
          </div>

        </div>
      </div>
    </DesktopLayout>
  );
}
