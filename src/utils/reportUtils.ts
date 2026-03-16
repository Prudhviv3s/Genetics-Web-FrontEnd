import { API_BASE_URL } from '../config';

/**
 * Utility to handle PDF report downloads from the backend.
 */
export const downloadReportPDF = async (patientId?: string, analysisId?: string) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

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
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `genetic_report_${patientId || analysisId || 'export'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
    
    return { success: true };
  } catch (error: any) {
    console.error('PDF Download Error:', error);
    return { success: false, message: error.message };
  }
};
