import React, { useRef, useState, useEffect } from 'react';
import { Upload, Camera, FileText, CheckCircle2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { useAppContext } from '../context/AppContext';
import { API_BASE_URL } from '../config';

export default function DNAReportAnalysisScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { 
    patientId: contextPatientId, 
    patientName: contextPatientName, 
    patientDisplayId: contextPatientDisplayId,
    patientAge: contextPatientAge,
    patientGender: contextPatientGender
  } = (location.state as any) || {};

  const [uploading, setUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const handleUploadClick = () => {
    setError('');
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        setError('Please upload a valid PDF file for Machine Learning analysis.');
        return;
      }

      setSelectedFile(file);
      setError('');
      setUploading(true);

      // Immediately perform formal upload for tracking (api_dnareportupload table)
      try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('file', file);
        if (contextPatientId && contextPatientId !== 'ML-GENERATED') {
          formData.append('patient_id', contextPatientId);
        }

        const uploadRes = await fetch(`${API_BASE_URL}/api/dna/upload/`, {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`
          },
          body: formData
        });

        const uploadData = await uploadRes.json();
        if (uploadData.status) {
          setIsUploaded(true);
        } else {
          setError(uploadData.message || 'Tracking upload failed.');
        }
      } catch (uploadErr) {
        console.error("Tracking upload error:", uploadErr);
        setError("Network error recording upload to backend.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleRunPatternDetection = async () => {
    if (!isUploaded || !selectedFile) {
      setError("Please upload a PDF DNA report first.");
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('file', selectedFile);
      if (contextPatientId && contextPatientId !== 'ML-GENERATED') {
        formData.append('patient_id', contextPatientId);
      }

      // 1. Run Machine Learning Prediction (High-Precision Analysis)
      const res = await fetch(`${API_BASE_URL}/api/predict-pdf/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`
        },
        body: formData
      });

      const data = await res.json();

      if (data.status) {
        // 2. Trigger Backend Persistence (DnaAnalysisResult & Analysis tables)
        let persistenceData = null;
        try {
          if (contextPatientId && contextPatientId !== 'ML-GENERATED') {
            const saveRes = await fetch(`${API_BASE_URL}/api/dna/run-detection/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
              },
              body: JSON.stringify({
                patient_id: parseInt(contextPatientId)
              })
            });
            const sData = await saveRes.json();
            if (sData.status) {
              persistenceData = sData.result;
            }
          }
        } catch (saveErr) {
          console.warn("Backend persistence failed, but continuing to display results:", saveErr);
        }

        // Pass the raw patterns and patient context to the results screen
        // Use the actual patient ID instead of ML-GENERATED to ensure the next page loads from DB
        const targetId = contextPatientId && contextPatientId !== 'ML-GENERATED' ? contextPatientId : 'ML-GENERATED';
        
        navigate(`/inheritance-detection/${targetId}`, { 
          state: { 
            mlPatterns: data.patterns, 
            extracted: data.extracted,
            patientId: contextPatientId,
            patientName: contextPatientName,
            patientDisplayId: contextPatientDisplayId,
            patientAge: contextPatientAge,
            patientGender: contextPatientGender,
            analysis_id: persistenceData?.id,
            key_findings: persistenceData?.key_findings || [],
            clinical_recommendations: persistenceData?.clinical_recommendations || []
          } 
        });
      } else {
        setError(data.error || data.message || 'Pattern detection failed.');
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Network error starting ML analysis.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <DesktopLayout title="DNA Report" defaultUserRole="doctor">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-6 rounded-full">
              <FileText size={48} className="text-blue-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">DNA Report</h2>
          <p className="text-gray-600 text-lg">
            Upload your DNA report to automatically detect inheritance patterns
          </p>
        </div>

        {/* Error Boundary */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {/* Action Cards */}
        <div className="flex justify-center mb-8">
          {/* Upload Report Card */}
          <button
            onClick={handleUploadClick}
            disabled={uploading || isUploaded}
            className={`w-full max-w-md border-2 border-dashed rounded-2xl p-10 transition-all group ${isUploaded ? 'bg-green-50 border-green-400'
              : 'bg-white border-blue-300 hover:border-blue-500 hover:bg-blue-50'
              }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-6 rounded-full mb-6 transition-colors ${isUploaded ? 'bg-green-100' : 'bg-blue-100 group-hover:bg-blue-200'}`}>
                {isUploaded ? <CheckCircle2 size={40} className="text-green-600" /> : <Upload size={40} className="text-blue-600" />}
              </div>
              <h3 className="font-semibold text-gray-900 text-xl mb-2">
                {uploading ? 'Uploading...' : isUploaded ? 'Report Uploaded' : 'Upload Report'}
              </h3>
              <p className="text-gray-600">{isUploaded ? 'Ready for analysis' : 'PDF'}</p>
            </div>
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Info Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-gray-700 leading-relaxed">
            <strong className="font-semibold">Note:</strong> Your DNA report will be analyzed securely.
            Supported format is PDF. The system will automatically extract relevant
            genetic markers and pedigree information to assist with inheritance pattern detection.
          </p>
        </div>

        {/* Run Pattern Detection Button */}
        <div className="mt-8">
          <button
            onClick={handleRunPatternDetection}
            disabled={!isUploaded || processing}
            className={`w-full text-white rounded-xl p-5 font-semibold text-lg transition-all shadow-lg ${!isUploaded || processing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
              }`}
          >
            {processing ? 'Processing Genetic Markers...' : 'Run Pattern Detection'}
          </button>
        </div>

        {/* Supported Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-blue-600 text-2xl mb-2">🔒</div>
            <h4 className="font-semibold text-gray-900 mb-1">Secure</h4>
            <p className="text-sm text-gray-600">End-to-end encrypted processing</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-blue-600 text-2xl mb-2">⚡</div>
            <h4 className="font-semibold text-gray-900 mb-1">Fast</h4>
            <p className="text-sm text-gray-600">Results in seconds</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
            <div className="text-blue-600 text-2xl mb-2">🎯</div>
            <h4 className="font-semibold text-gray-900 mb-1">Accurate</h4>
            <p className="text-sm text-gray-600">Matches mobile app DB backend</p>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}
