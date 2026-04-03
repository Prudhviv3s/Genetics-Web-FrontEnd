import React, { useState, useEffect } from 'react';
import { Download, Mail, Printer, CheckCircle, Share2, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { Button } from '../components/Button';
import { API_BASE_URL } from '../config';

export default function ExportReportScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [exportMethod, setExportMethod] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [reportInfo, setReportInfo] = useState<any>(null);
  const [error, setError] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const state = location.state as { patientId?: string, analysisId?: string } | null;
  const patientId = state?.patientId;
  const analysisId = state?.analysisId;

  useEffect(() => {
    const fetchInfo = async () => {
      if (!patientId && !analysisId) {
        setError('No patient or analysis ID provided for export.');
        setLoadingInfo(false);
        return;
      }
      try {
        const token = localStorage.getItem('token');
        let url = `${API_BASE_URL}/api/reports/export-info/`;
        const params = new URLSearchParams();
        if (patientId) params.append('patient_id', patientId);
        if (analysisId) params.append('analysis_id', analysisId);
        url += '?' + params.toString();

        const res = await fetch(url, {
          headers: { 'Authorization': `Token ${token}` }
        });
        const data = await res.json();
        if (data.status) {
          setReportInfo(data.report);
        } else {
          setError(data.message || 'Failed to fetch report info');
        }
      } catch (err) {
        setError('Network error getting report config');
      } finally {
        setLoadingInfo(false);
      }
    };
    fetchInfo();
  }, [patientId, analysisId]);

  const handleExport = async (method: string) => {
    setExportMethod(method);
    setIsExporting(true);
    setError('');

    try {
      if (method === 'download' || method === 'print') {
        const token = localStorage.getItem('token');
        let url = `${API_BASE_URL}/api/reports/download/`;
        const params = new URLSearchParams();
        if (patientId) params.append('patient_id', patientId);
        if (analysisId) params.append('analysis_id', analysisId);
        url += '?' + params.toString();

        const res = await fetch(url, {
          headers: { 'Authorization': `Token ${token}` }
        });

        if (!res.ok) {
          try {
            const errData = await res.json();
            throw new Error(errData.message || 'Download failed');
          } catch (e) {
            throw new Error('Failed to download report. HTTP ' + res.status);
          }
        }

        const blob = await res.blob();
        const downloadUrl = window.URL.createObjectURL(blob);

        if (method === 'print') {
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = downloadUrl;
          document.body.appendChild(iframe);
          iframe.onload = () => {
            iframe.contentWindow?.print();
          };
        } else {
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `genetic_report_${patientId || analysisId || 'export'}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);
        }

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (err: any) {
      setError(err.message || 'Export failed');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DesktopLayout title="Export Report">
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200 mb-6 flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-900 text-lg">Error</h4>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}
        {showSuccess && (
          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200 mb-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-900 text-lg">Success!</h4>
                <p className="text-sm text-green-700 mt-1">
                  Report {exportMethod === 'download' ? 'downloaded' : 'sent'} successfully.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 rounded-full p-3">
              <Download className="w-7 h-7 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-xl mb-2">Export Options</h3>
              <p className="text-gray-600">
                Choose how you'd like to receive your genetic analysis report.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Export Methods</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleExport('download')}
                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="bg-blue-100 rounded-full p-4">
                    <Download className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Download to Device</h4>
                    <p className="text-sm text-gray-600">Save PDF to your device</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/share-report')}
                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="bg-blue-100 rounded-full p-4">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Send via Email</h4>
                    <p className="text-sm text-gray-600">Email report to yourself or others</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleExport('print')}
                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="bg-blue-100 rounded-full p-4">
                    <Printer className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Print Report</h4>
                    <p className="text-sm text-gray-600">Print physical copy</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate('/share-report')}
                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="bg-blue-100 rounded-full p-4">
                    <Share2 className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Share Report</h4>
                    <p className="text-sm text-gray-600">Share with healthcare provider</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Report Information</h3>
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 space-y-4 relative min-h-[150px]">
              {loadingInfo ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                </div>
              ) : reportInfo ? (
                <>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Report Type:</span>
                    <span className="text-sm font-semibold text-gray-900">{reportInfo.report_type || 'Full Analysis'}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Format:</span>
                    <span className="text-sm font-semibold text-gray-900">{reportInfo.format || 'PDF'}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600">File Size:</span>
                    <span className="text-sm font-semibold text-gray-900">{reportInfo.file_size || '~2.4 MB'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Generated:</span>
                    <span className="text-sm font-semibold text-gray-900">{reportInfo.generated || 'Today'}</span>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500 py-4">No report configuration found.</div>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className="w-full !py-4 !text-base"
        >
          Cancel
        </Button>
      </div>
    </DesktopLayout>
  );
}
