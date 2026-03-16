import React, { useEffect, useState } from 'react';
import { Dna, ChevronRight, User, Activity, Users, AlertCircle, Layers } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { Button } from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { API_BASE_URL } from '../config';

export default function InheritanceDetectionScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { patientId } = useParams();
  const { patients } = useAppContext();

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<any>(null);

  // Try to find context patient, or fallback to mock if ML data injected
  const contextPatient = patients.find(p => p.id === patientId);
  const [patient, setPatient] = useState<any>(contextPatient || null);

  useEffect(() => {
    const mlState = location.state as { 
      mlPatterns?: any[], 
      extracted?: any, 
      patientId?: string, 
      patientName?: string, 
      patientDisplayId?: string,
      patientAge?: number | string,
      patientGender?: string,
      key_findings?: string[],
      clinical_recommendations?: string[],
      analysis_id?: number
    } | null;

    // 1. If we are in "Mock" mode (from a fresh upload with no Patient ID), use the state
    if (patientId === 'ML-GENERATED' && mlState && mlState.mlPatterns && mlState.mlPatterns.length > 0) {
      const topPattern = mlState.mlPatterns[0];
      const extractedName = mlState.patientName || mlState.extracted?.PatientName || 'Analysis Subject';
      const extractedId = mlState.patientDisplayId || mlState.extracted?.PatientID || 'ML-GENERATED';
      const age = mlState.patientAge || mlState.extracted?.PatientAge || 'Unknown';
      const gender = mlState.patientGender || mlState.extracted?.PatientGender || 'Unknown';

      setPatient({
        id: 'ML-GENERATED',
        name: extractedName,
        patient_id: extractedId,
        age: age,
        gender: gender
      });

      setReport({
        inheritance: {
          pattern: topPattern.name,
          confidence: Math.round(topPattern.score),
          description: `Based on the pedigree data for ${extractedName}, ${topPattern.name.toLowerCase()} pattern shows the highest probability. Click on each pattern for detailed analysis and supporting evidence.`,
          mlPatterns: mlState.mlPatterns.map((p: any) => ({
            name: p.name,
            score: Math.round(p.score)
          }))
        }
      });

      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      // If we are at ML-GENERATED but have no state, something is wrong
      if (patientId === 'ML-GENERATED') {
        setLoading(false);
        return;
      }

      const idToFetch = patientId;
      if (!idToFetch) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Clean ID to ensure it's an integer for the API
        const cleanId = idToFetch.toString().replace(/[^0-9]/g, '');

        const res = await fetch(`${API_BASE_URL}/api/doctor/report/${cleanId}/`, {
          headers: { 'Authorization': `Token ${token}` }
        });
        const data = await res.json();

        if (data.status) {
          // Map backend pattern_probabilities to the UI's expected mlPatterns format
          const standardPatterns = ["Autosomal Dominant", "Autosomal Recessive", "X-Linked", "Y-Linked", "Mitochondrial"];
          const probMap = data.inheritance?.pattern_probabilities || {};

          const mlPatterns = standardPatterns.map(name => ({
            name,
            score: Math.round(Number(probMap[name] || 0))
          })).sort((a, b) => b.score - a.score);

          if (data.inheritance) {
            data.inheritance.mlPatterns = mlPatterns;
          }

          setPatient({
            id: data.patient.id.toString(),
            name: data.patient.full_name,
            patient_id: data.patient.patient_id,
            age: data.patient.age,
            gender: data.patient.gender
          });
          
          if (data.pedigree_stats) {
            data.inheritance.pedigree_stats = data.pedigree_stats;
          }
          
          setReport(data);
        }
      } catch (err) {
        console.error("Failed to load inheritance analysis", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [contextPatient, location.state]);

  if (!patient) {
    return (
      <DesktopLayout title="Inheritance Detection" defaultUserRole="doctor">
        <div className="max-w-4xl mx-auto text-center py-20">
          <p className="text-gray-600 mb-4 text-lg">Patient not found</p>
          <Button onClick={() => navigate('/inheritance-detection')}>
            Back to Patient List
          </Button>
        </div>
      </DesktopLayout>
    );
  }

  // Find routing color mapping for the primary backend pattern
  const getColor = (pattern: string) => {
    if (pattern === 'Autosomal Dominant') return 'bg-blue-600';
    if (pattern === 'Autosomal Recessive') return 'bg-orange-600';
    if (pattern === 'X-Linked' || pattern === 'X-Linked Recessive' || pattern === 'X-Linked Dominant') return 'bg-purple-600';
    if (pattern === 'Y-Linked') return 'bg-green-600';
    if (pattern === 'Mitochondrial') return 'bg-red-600';
    return 'bg-gray-600';
  };

  const getRoute = (pattern: string) => {
    if (pattern === 'Autosomal Dominant') return '/autosomal-dominant';
    if (pattern === 'Autosomal Recessive') return '/autosomal-recessive';
    if (pattern === 'X-Linked') return '/x-linked';
    if (pattern === 'Y-Linked') return '/y-linked';
    return '/mitochondrial';
  };

  const primaryPattern = report ? report.inheritance.pattern : 'Unknown';
  const confidence = report ? report.inheritance.confidence : 0;
  const description = report ? report.inheritance.description : '';

  return (
    <DesktopLayout title="Inheritance Detection" defaultUserRole="doctor">
      <div className="max-w-4xl mx-auto">
        {/* Header with Patient Info */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Dna size={32} className="text-blue-600" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Detected Patterns</h2>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-600">Ranked by probability and matching criteria</p>
                  {report?.patient?.analysis_date && (
                    <>
                      <span className="text-gray-300">|</span>
                      <p className="text-gray-500 text-sm">Analyzed: {new Date(report.patient.analysis_date).toLocaleDateString()}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Button onClick={() => navigate('/inheritance-detection')} variant="secondary">
              Back to List
            </Button>
          </div>

          {/* Patient Information Card */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <User size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600">Patient:</div>
                <div className="font-semibold text-gray-900 text-lg">{patient.name}</div>
                <div className="text-sm text-gray-500">ID: {String(patient.patient_id || '').toUpperCase()}</div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading analysis results...</div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {report?.inheritance?.mlPatterns && report.inheritance.mlPatterns.length > 0 ? (
                report.inheritance.mlPatterns.map((pattern: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => navigate(getRoute(pattern.name), { 
                      state: { 
                        ...location.state, 
                        patternScore: pattern.score,
                        patternName: pattern.name
                      } 
                    })}
                    className="w-full bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-600 hover:shadow-md transition-all border-l-4 border-l-blue-600"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 text-left">
                        <h3 className="font-semibold text-gray-900 text-lg mb-3">{pattern.name}</h3>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getColor(pattern.name)}`}
                              style={{ width: `${pattern.score}%` }}
                            ></div>
                          </div>
                          <span className="text-base font-medium text-gray-700 w-16 text-right">{pattern.score}%</span>
                        </div>
                      </div>
                      <ChevronRight size={24} className="text-gray-400 ml-4" />
                    </div>
                  </button>
                ))
              ) : primaryPattern !== 'Unknown' ? (
                <button
                  onClick={() => navigate(getRoute(primaryPattern), { 
                    state: { 
                      ...location.state, 
                      patternScore: confidence,
                      patternName: primaryPattern
                    } 
                  })}
                  className="w-full bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-600 hover:shadow-md transition-all border-l-4 border-l-blue-600"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-gray-900 text-lg mb-3">{primaryPattern}</h3>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getColor(primaryPattern)}`}
                            style={{ width: `${confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-base font-medium text-gray-700 w-16 text-right">{confidence}%</span>
                      </div>
                    </div>
                    <ChevronRight size={24} className="text-gray-400 ml-4" />
                  </div>
                </button>
              ) : (
                <div className="text-center py-10 bg-white border border-gray-200 rounded-xl">
                  <p className="text-gray-500 font-medium">No inheritance pattern confirmed yet.</p>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 text-lg mb-3">Analysis Notes</h3>
              <p className="text-base text-gray-700">
                {description || `Based on the pedigree data for ${patient.name}, ${primaryPattern.toLowerCase()} pattern shows the highest probability. Click on the pattern for detailed analysis and supporting evidence.`}
              </p>
            </div>

            <div className="mt-8">
              <Button
                onClick={() => navigate(`/inheritance-pattern-report/${patient.id}`, { state: location.state })}
                fullWidth
                icon={<Dna size={20} />}
              >
                View Summary Report
              </Button>
            </div>
          </>
        )}
      </div>
    </DesktopLayout>
  );
}