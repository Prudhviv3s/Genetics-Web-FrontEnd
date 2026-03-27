import React, { useState, useEffect } from 'react';
import { Undo, Redo, ZoomIn, ZoomOut, Eye, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { API_BASE_URL } from '../config';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { PageContainer } from '../components/PageContainer';
import { FormalPedigreeChart, PedigreeNodeDef } from '../components/FormalPedigreeChart';

export default function PedigreeBuilderPage() {
  const navigate = useNavigate();
  const { currentUser, userRole, setUserRole } = useAppContext();
  const [nodes, setNodes] = useState<PedigreeNodeDef[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userRole) {
      setUserRole('patient');
    }

    const fetchPedigree = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/patient/pedigree/`, {
          headers: { 'Authorization': `Token ${token}` }
        });
        const data = await res.json();

        if (data.status && data.pedigree) {
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
              side_of_family: n.side_of_family
            };
          });
          setNodes(mappedNodes);
        }
      } catch (err) {
        console.error("Failed to load pedigree", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPedigree();
  }, [userRole, setUserRole]);

  return (
    <>
      <Sidebar userRole={userRole} />
      <TopBar title="Pedigree Builder" userName={currentUser?.name || 'Sarah Johnson'} userRole={userRole} />

      <PageContainer>
        <div className="max-w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-xl border border-gray-200 shadow-sm">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-500 text-lg font-medium">Loading your family tree...</p>
            </div>
          ) : nodes.length > 0 ? (
            <FormalPedigreeChart 
              nodes={nodes} 
              patientName={currentUser?.name} 
              patientDisplayId={currentUser?.patient_id || (currentUser?.id ? `PT${String(currentUser.id).padStart(4, '0')}` : undefined)}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-20 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Family Members Found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start building your pedigree chart by adding your parents, siblings, and other family members.
              </p>
              <button
                onClick={() => navigate('/add-family-member')}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-blue-100"
              >
                + Add First Member
              </button>
            </div>
          )}
        </div>
      </PageContainer>
    </>
  );
}

