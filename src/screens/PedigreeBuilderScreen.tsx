import React, { useState, useEffect } from 'react';
import { Plus, Loader2, GitBranch } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { API_BASE_URL } from '../config';
import { FormalPedigreeChart, PedigreeNodeDef } from '../components/FormalPedigreeChart';

export default function PedigreeBuilderScreen() {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<PedigreeNodeDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPedigree = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

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
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to load mobile pedigree", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPedigree();
  }, []);

  return (
    <MobileContainer>
      <Header title="Pedigree Builder" />
      
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <div className="flex-1 overflow-auto bg-white p-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p>Loading pedigree...</p>
            </div>
          ) : error || nodes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <GitBranch size={48} className="text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Build Your Pedigree</h3>
              <p className="text-gray-500 mb-8">Add your family members to see your genetic inheritance chart.</p>
              <Button onClick={() => navigate('/add-family-member')} fullWidth>
                + Add Family Member
              </Button>
            </div>
          ) : (
            <div className="py-4">
              <FormalPedigreeChart nodes={nodes} />
              
              <div className="mt-8 flex flex-col gap-4">
                <Button onClick={() => navigate('/add-family-member')} variant="outline" fullWidth>
                  <Plus size={18} className="mr-2" />
                  Add Another Member
                </Button>
                <Button onClick={() => navigate('/save-pedigree')} fullWidth>
                  Save & Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MobileContainer>
  );
}

