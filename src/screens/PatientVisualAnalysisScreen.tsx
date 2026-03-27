import React, { useState, useEffect } from 'react';
import { GitBranch, Loader2 } from 'lucide-react';
import { DesktopLayout } from '../components/DesktopLayout';
import { API_BASE_URL } from '../config';
import { FormalPedigreeChart, PedigreeNodeDef } from '../components/FormalPedigreeChart';

export default function PatientVisualAnalysisScreen() {
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(false);
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const [allNodes, setAllNodes]       = useState<PedigreeNodeDef[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Fetch patient's own pedigree
        const res  = await fetch(`${API_BASE_URL}/api/patient/pedigree/`, {
          headers: { Authorization: `Token ${token}` }
        });
        const data = await res.json();

        if (data.status && data.pedigree) {
          // Fetch profile for header info
          const profileRes = await fetch(`${API_BASE_URL}/api/me/`, {
            headers: { Authorization: `Token ${token}` }
          });
          const profileData = await profileRes.json();
          if (profileData.status) {
            setPatientInfo(profileData.profile);
          }

          const mappedNodes: PedigreeNodeDef[] = (data.pedigree.nodes as any[]).map(n => {
            const rawStatus = (n.health_status ?? '').toLowerCase();
            return {
              id:           n.node_id ?? n.id,
              name:         n.full_name ?? '',
              gender:       (n.gender ?? '').toLowerCase() === 'female' ? 'female' : 'male',
              status:       (['affected', 'carrier', 'unaffected'].includes(rawStatus)
                            ? rawStatus : 'unaffected') as PedigreeNodeDef['status'],
              relationship: n.relationship ?? '',
              isProband:    !!(n.is_proband || n.relationship === 'Patient'),
              displayId:    '', // Managed by FormalPedigreeChart
            };
          });

          setAllNodes(mappedNodes);
        } else {
          setError(true);
        }
      } catch (e) {
        console.error('[Patient Pedigree] fetch error:', e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return (
    <DesktopLayout title="My Pedigree Chart" defaultUserRole="patient">
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-lg">Loading your pedigree chart…</p>
      </div>
    </DesktopLayout>
  );

  if (error || !allNodes.length) return (
    <DesktopLayout title="My Pedigree Chart" defaultUserRole="patient">
      <div className="max-w-4xl mx-auto text-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm mt-4">
        <GitBranch size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg mb-6">Pedigree data not available yet</p>
        <p className="text-sm text-gray-400 mb-8">Please ensure you have added your family members in the Pedigree Builder.</p>
      </div>
    </DesktopLayout>
  );

  return (
    <DesktopLayout title="My Pedigree Chart" defaultUserRole="patient">
      <FormalPedigreeChart 
        nodes={allNodes} 
        patientName={patientInfo?.full_name} 
        patientDisplayId={patientInfo?.patient_id || (patientInfo?.id ? `PT${String(patientInfo.id).padStart(4, '0')}` : '---')}
      />
    </DesktopLayout>
  );
}
