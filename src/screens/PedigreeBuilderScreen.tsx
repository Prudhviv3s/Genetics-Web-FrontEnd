import React, { useState } from 'react';
import { Plus, ZoomIn, ZoomOut, Save, Download, Users } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { PedigreeLegend } from '../components/PedigreeChart';

export default function PedigreeBuilderScreen() {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(0.85);

  return (
    <MobileContainer>
      <Header title="Pedigree Builder" />
      
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
              className="p-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={() => setZoom(Math.min(2, zoom + 0.1))}
              className="p-2 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <ZoomIn size={18} />
            </button>
            <span className="px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm">
              {Math.round(zoom * 100)}%
            </span>
          </div>
          <button
            onClick={() => navigate('/save-pedigree')}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-white p-4">
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
            <div className="relative min-h-[800px] w-full flex flex-col items-center py-8">
              
              {/* Generation I - Grandparents */}
              <div className="mb-2 text-xs font-bold text-gray-500 self-start ml-4">Generation I</div>
              <div className="flex justify-center gap-24 mb-20 relative" style={{ width: '100%' }}>
                {/* Grandfather */}
                <div className="text-center relative z-20">
                  <div className="w-14 h-14 border-4 border-gray-900 bg-red-600 shadow-lg"></div>
                  <div className="text-[10px] font-semibold mt-1.5">I-1</div>
                  <div className="text-[9px] text-gray-600">Grandfather</div>
                </div>
                {/* Grandmother */}
                <div className="text-center relative z-20">
                  <div className="w-14 h-14 rounded-full border-4 border-gray-900 bg-pink-400 shadow-lg"></div>
                  <div className="text-[10px] font-semibold mt-1.5">I-2</div>
                  <div className="text-[9px] text-gray-600">Grandmother</div>
                </div>
                
                {/* Marriage line (thick horizontal line between partners) */}
                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-900 z-10"></div>
                
                {/* Descent line (vertical line going down) */}
                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-900 z-10" style={{ top: '28px' }}></div>
              </div>

              {/* Generation II - Parents and Siblings */}
              <div className="mb-2 text-xs font-bold text-gray-500 self-start ml-4">Generation II</div>
              <div className="flex justify-center gap-16 mb-20 relative" style={{ width: '100%' }}>
                {/* Uncle */}
                <div className="text-center relative z-20">
                  <div className="w-14 h-14 border-4 border-gray-900 bg-blue-400 shadow-lg"></div>
                  <div className="text-[10px] font-semibold mt-1.5">II-1</div>
                  <div className="text-[9px] text-gray-600">Uncle</div>
                </div>
                
                {/* Father (Affected) */}
                <div className="text-center relative z-20">
                  <div className="w-14 h-14 border-4 border-gray-900 bg-red-600 shadow-lg"></div>
                  <div className="text-[10px] font-semibold mt-1.5">II-2</div>
                  <div className="text-[9px] text-gray-600">Father</div>
                </div>
                
                {/* Mother */}
                <div className="text-center relative z-20">
                  <div className="w-14 h-14 rounded-full border-4 border-gray-900 bg-pink-400 shadow-lg"></div>
                  <div className="text-[10px] font-semibold mt-1.5">II-3</div>
                  <div className="text-[9px] text-gray-600">Mother</div>
                </div>
                
                {/* Aunt */}
                <div className="text-center relative z-20">
                  <div className="w-14 h-14 rounded-full border-4 border-gray-900 bg-pink-400 shadow-lg"></div>
                  <div className="text-[10px] font-semibold mt-1.5">II-4</div>
                  <div className="text-[9px] text-gray-600">Aunt</div>
                </div>
                
                {/* Sibship line from Gen I (horizontal line connecting all siblings) */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-1 bg-gray-900 z-10" style={{ width: '280px' }}></div>
                
                {/* Vertical descent lines to each sibling */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-900 z-10" style={{ marginLeft: '-140px' }}></div>
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-900 z-10" style={{ marginLeft: '-76px' }}></div>
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-900 z-10" style={{ marginLeft: '12px' }}></div>
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-900 z-10" style={{ marginLeft: '140px' }}></div>
                
                {/* Marriage line for Father and Mother */}
                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-900 z-10" style={{ marginLeft: '-32px' }}></div>
                
                {/* Descent line from Father-Mother marriage */}
                <div className="absolute top-7 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-900 z-10" style={{ marginLeft: '-32px', top: '28px' }}></div>
              </div>

              {/* Generation III - Proband and Siblings */}
              <div className="mb-2 text-xs font-bold text-gray-500 self-start ml-4">Generation III</div>
              <div className="flex justify-center gap-14 mb-16 relative" style={{ width: '100%' }}>
                {/* Sister 1 */}
                <div className="text-center relative z-20">
                  <div className="w-14 h-14 rounded-full border-4 border-gray-900 bg-pink-400 shadow-lg"></div>
                  <div className="text-[10px] font-semibold mt-1.5">III-1</div>
                  <div className="text-[9px] text-gray-600">Sister</div>
                </div>
                
                {/* Proband (Affected) */}
                <div className="text-center relative z-20">
                  <div className="absolute -left-12 top-5 flex items-center gap-1 z-30">
                    <div className="w-6 h-1 bg-blue-600"></div>
                    <div className="text-blue-600 text-2xl font-bold leading-none">→</div>
                  </div>
                  <div className="w-14 h-14 border-4 border-gray-900 bg-red-600 shadow-lg"></div>
                  <div className="text-[10px] font-bold text-blue-600 mt-1.5">III-2</div>
                  <div className="text-[9px] text-blue-600 font-semibold">Proband</div>
                  <div className="text-[9px] text-red-600">Affected</div>
                </div>
                
                {/* Brother (Carrier) */}
                <div className="text-center relative z-20">
                  <div className="w-14 h-14 border-4 border-gray-900 bg-blue-400 shadow-lg flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-gray-900"></div>
                  </div>
                  <div className="text-[10px] font-semibold mt-1.5">III-3</div>
                  <div className="text-[9px] text-gray-600">Brother</div>
                  <div className="text-[9px] text-orange-600">Carrier</div>
                </div>
                
                {/* Sister 2 */}
                <div className="text-center relative z-20">
                  <div className="w-14 h-14 rounded-full border-4 border-gray-900 bg-pink-400 shadow-lg"></div>
                  <div className="text-[10px] font-semibold mt-1.5">III-4</div>
                  <div className="text-[9px] text-gray-600">Sister</div>
                </div>
                
                {/* Sibship line from Gen II parents (horizontal line connecting all siblings) */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-1 bg-gray-900 z-10" style={{ width: '224px' }}></div>
                
                {/* Vertical descent lines to each sibling */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-900 z-10" style={{ marginLeft: '-112px' }}></div>
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-900 z-10" style={{ marginLeft: '-56px' }}></div>
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-900 z-10" style={{ marginLeft: '0px' }}></div>
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-900 z-10" style={{ marginLeft: '112px' }}></div>
              </div>

              {/* Info box */}
              <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-lg p-4 max-w-md">
                <div className="flex items-start gap-3">
                  <Users className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">Family Pedigree</h3>
                    <p className="text-xs text-gray-700">
                      This chart shows three generations of your family with clear relationship lines. 
                      Horizontal lines connect partners, vertical lines show parent-child relationships.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/add-family-member')}
                className="mt-8 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-colors"
              >
                <Plus size={18} />
                Add Family Member
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <PedigreeLegend compact />
          
          <div className="flex gap-2 mt-4">
            <Button onClick={() => navigate('/save-pedigree')} fullWidth size="sm">
              Save Pedigree
            </Button>
            <button 
              onClick={() => navigate('/version-history')}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
            >
              <Download size={16} />
            </button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
