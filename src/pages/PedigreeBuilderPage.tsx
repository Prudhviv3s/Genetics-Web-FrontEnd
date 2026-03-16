import React, { useState } from 'react';
import { Undo, Redo, ZoomIn, ZoomOut, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { API_BASE_URL } from '../config';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { PageContainer } from '../components/PageContainer';
import { PedigreeChart, PedigreeLegend } from '../components/PedigreeChart';

export default function PedigreeBuilderPage() {
  const navigate = useNavigate();
  const { currentUser, userRole, setUserRole } = useAppContext();
  const [zoom, setZoom] = useState(100);
  const [showLegend, setShowLegend] = useState(true);
  const [generations, setGenerations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (!userRole) {
      setUserRole('patient');
    }

    const fetchPedigree = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/patient/pedigree/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        const data = await res.json();

        if (data.status && data.pedigree) {
          const { nodes, links } = data.pedigree;

          const gen1People = nodes.filter((n: any) => ['Father', 'Mother', 'Uncle', 'Aunt', 'Grandfather', 'Grandmother'].includes(n.relationship));
          const gen2People = nodes.filter((n: any) => ['Patient', 'Brother', 'Sister'].includes(n.relationship));
          const gen3People = nodes.filter((n: any) => ['Son', 'Daughter'].includes(n.relationship));

          const mapPerson = (n: any) => ({
            id: n.node_id,
            name: n.full_name,
            gender: n.gender?.toLowerCase() === 'female' ? 'female' : 'male',
            status: (n.health_status || 'unaffected').toLowerCase(),
            isProband: n.is_proband
          });

          const couplesGen1 = [];
          const father = gen1People.find((p: any) => p.relationship === 'Father');
          const mother = gen1People.find((p: any) => p.relationship === 'Mother');
          if (father && mother) {
            couplesGen1.push({
              partner1: father.node_id,
              partner2: mother.node_id,
              children: gen2People.map((p: any) => p.node_id)
            });
          }

          const newGenerations = [];
          if (gen1People.length > 0) newGenerations.push({ people: gen1People.map(mapPerson), couples: couplesGen1 });
          if (gen2People.length > 0) newGenerations.push({ people: gen2People.map(mapPerson), couples: [] });
          if (gen3People.length > 0) newGenerations.push({ people: gen3People.map(mapPerson), couples: [] });

          setGenerations(newGenerations);
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
          {/* Toolbar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Undo">
                  <Undo size={20} className="text-gray-700" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Redo">
                  <Redo size={20} className="text-gray-700" />
                </button>
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                <button
                  onClick={() => setZoom(Math.max(50, zoom - 10))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut size={20} className="text-gray-700" />
                </button>
                <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 min-w-[4rem] text-center">
                  {zoom}%
                </span>
                <button
                  onClick={() => setZoom(Math.min(200, zoom + 10))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn size={20} className="text-gray-700" />
                </button>
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                <button
                  onClick={() => setShowLegend(!showLegend)}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${showLegend ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'
                    }`}
                >
                  <Eye size={20} />
                  <span className="text-sm font-medium">Legend</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Pedigree Canvas */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 min-h-[700px]">
                <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}>
                  <PedigreeChart generations={generations} />
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Legend */}
              {showLegend && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Symbol Legend</h3>
                  <PedigreeLegend />
                </div>
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
