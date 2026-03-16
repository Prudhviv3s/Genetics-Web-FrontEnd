import React, { useState } from 'react';
import { Plus, User, Calendar, AlertCircle, List, GitBranch, Search, ChevronRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { PedigreeLegend } from '../components/PedigreeChart';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

interface FamilyMemberCardProps {
  id: string;
  name: string;
  relationship: string;
  status: 'affected' | 'unaffected' | 'carrier' | 'unknown';
  gender: string;
  age: number;
  onDelete: (id: string) => void;
}

function FamilyMemberCard({ id, name, relationship, status, gender, age, onDelete }: FamilyMemberCardProps) {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const getStatusColor = () => {
    switch(status) {
      case 'affected': return 'text-red-600 bg-red-50';
      case 'carrier': return 'text-orange-600 bg-orange-50';
      case 'unaffected': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onDelete(id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div 
        className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-600 hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-4">
          <div 
            onClick={() => navigate(`/edit-family-member/${id}`)}
            className="flex items-center gap-4 flex-1 cursor-pointer"
          >
            <div className={`w-12 h-12 ${gender === 'Female' ? 'rounded-full' : ''} border-3 border-gray-800 ${
              status === 'affected' ? 'bg-red-600' : 
              status === 'carrier' ? (gender === 'Male' ? 'bg-blue-400' : 'bg-pink-400') :
              gender === 'Male' ? 'bg-blue-400' : 'bg-pink-400'
            } flex items-center justify-center shadow-sm`}>
              {status === 'carrier' && <div className="w-3 h-3 rounded-full bg-gray-900"></div>}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{name}</div>
              <div className="text-sm text-gray-600">{relationship} • {age} years</div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()} capitalize`}>
              {status}
            </span>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          <button
            onClick={handleDelete}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Family Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {name}? This action cannot be undone and will remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function FamilyOverviewScreen() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'list' | 'tree'>('list');
  const [familyMembers, setFamilyMembers] = useState([
    { id: '1', name: 'John Johnson', relationship: 'Father', status: 'affected' as const, gender: 'Male', age: 65 },
    { id: '2', name: 'Mary Johnson', relationship: 'Mother', status: 'carrier' as const, gender: 'Female', age: 63 },
    { id: '3', name: 'Michael Johnson', relationship: 'Brother', status: 'unaffected' as const, gender: 'Male', age: 38 },
    { id: '4', name: 'Emily Davis', relationship: 'Sister', status: 'unaffected' as const, gender: 'Female', age: 32 },
    { id: '5', name: 'David Johnson', relationship: 'Son', status: 'unknown' as const, gender: 'Male', age: 8 },
  ]);

  const handleDeleteMember = (id: string) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };

  const renderTreeView = () => {
    // Find members by their roles safely
    const father = familyMembers.find(m => m.relationship === 'Father');
    const mother = familyMembers.find(m => m.relationship === 'Mother');
    const brother = familyMembers.find(m => m.relationship === 'Brother');
    const sister = familyMembers.find(m => m.relationship === 'Sister');
    const son = familyMembers.find(m => m.relationship === 'Son');

    return (
      <div className="relative p-8 bg-white rounded-xl shadow-sm min-h-[600px]">
        <div className="flex flex-col items-center gap-12 relative">
          {/* Generation I - Parents */}
          <div className="mb-2 text-xs font-bold text-gray-500 self-start">Generation I</div>
          <div className="flex gap-20 pt-6 mb-20 relative">
            {father && (
              <div className="text-center relative z-20">
                {/* Father - Square (Male), Affected */}
                <div className={`w-16 h-16 border-4 border-gray-900 ${
                  father.status === 'affected' ? 'bg-red-600' : 'bg-blue-400'
                } mb-2 mx-auto shadow-lg`}></div>
                <div className="text-xs font-semibold">{father.name}</div>
                <div className="text-xs text-gray-500">{father.relationship}</div>
                <div className={`text-xs font-medium ${
                  father.status === 'affected' ? 'text-red-600' : 'text-green-600'
                } capitalize`}>
                  {father.status}
                </div>
              </div>
            )}
            {mother && (
              <div className="text-center relative z-20">
                {/* Mother - Circle (Female), Carrier */}
                <div className={`w-16 h-16 rounded-full border-4 border-gray-900 ${
                  mother.status === 'affected' ? 'bg-red-600' : 'bg-pink-400'
                } mb-2 mx-auto flex items-center justify-center shadow-lg`}>
                  {mother.status === 'carrier' && (
                    <div className="w-4 h-4 rounded-full bg-gray-900"></div>
                  )}
                </div>
                <div className="text-xs font-semibold">{mother.name}</div>
                <div className="text-xs text-gray-500">{mother.relationship}</div>
                <div className={`text-xs font-medium ${
                  mother.status === 'carrier' ? 'text-orange-600' : 'text-green-600'
                } capitalize`}>
                  {mother.status}
                </div>
              </div>
            )}
            
            {father && mother && (
              <>
                {/* Marriage line (thick horizontal line) */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-900 z-10"></div>
                
                {/* Descent line (vertical line going down) */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-900 z-10" style={{ top: '32px' }}></div>
              </>
            )}
          </div>

          {/* Generation II - Children */}
          <div className="mb-2 text-xs font-bold text-gray-500 self-start">Generation II</div>
          <div className="flex gap-10 mb-12 relative">
            {brother && (
              <div className="text-center relative z-20">
                {/* Brother - Square (Male) */}
                <div className={`w-14 h-14 border-4 border-gray-900 ${
                  brother.status === 'affected' ? 'bg-red-600' : 'bg-blue-400'
                } mb-2 mx-auto shadow-lg`}></div>
                <div className="text-xs font-medium">{brother.name}</div>
                <div className="text-xs text-gray-500">{brother.relationship}</div>
                <div className="text-xs text-green-600 capitalize">{brother.status}</div>
              </div>
            )}
            {sister && (
              <div className="text-center relative z-20">
                {/* You (Patient) - Circle (Female), with arrow */}
                <div className="relative">
                  <div className="absolute -left-12 top-5 flex items-center gap-1 z-30">
                    <div className="w-6 h-1 bg-blue-600"></div>
                    <div className="text-blue-600 text-2xl font-bold leading-none">→</div>
                  </div>
                  <div className={`w-14 h-14 rounded-full border-4 border-gray-900 ${
                    sister.status === 'affected' ? 'bg-red-600' : 'bg-pink-400'
                  } mb-2 mx-auto shadow-lg`}></div>
                </div>
                <div className="text-xs font-bold text-blue-600">You</div>
                <div className="text-xs text-gray-500">Patient</div>
                <div className="text-xs text-green-600 capitalize">{sister.status}</div>
              </div>
            )}
            <div className="text-center relative z-20">
              {/* Sister - Circle (Female) */}
              <div className="w-14 h-14 rounded-full border-4 border-gray-900 bg-pink-400 mb-2 mx-auto shadow-lg"></div>
              <div className="text-xs font-medium">Sister</div>
              <div className="text-xs text-gray-500">Sibling</div>
              <div className="text-xs text-green-600">Unaffected</div>
            </div>
            {son && (
              <div className="text-center relative z-20">
                {/* Son - Square (Male) */}
                <div className={`w-14 h-14 border-4 border-gray-900 ${
                  son.status === 'unknown' ? 'bg-gray-100' : son.status === 'affected' ? 'bg-red-600' : 'bg-blue-400'
                } mb-2 mx-auto shadow-lg`}></div>
                <div className="text-xs font-medium">{son.name}</div>
                <div className="text-xs text-gray-500">{son.relationship}</div>
                <div className="text-xs text-gray-600 capitalize">{son.status}</div>
              </div>
            )}
            
            {/* Sibship line (horizontal line connecting all siblings) */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-1 bg-gray-900 z-10" style={{ width: '220px' }}></div>
            
            {/* Vertical descent lines to each sibling */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-900 z-10" style={{ marginLeft: '-110px' }}></div>
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-900 z-10" style={{ marginLeft: '-50px' }}></div>
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-900 z-10" style={{ marginLeft: '10px' }}></div>
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-900 z-10" style={{ marginLeft: '110px' }}></div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 pt-4 border-t border-gray-200">
          <PedigreeLegend compact />
        </div>
      </div>
    );
  };

  return (
    <MobileContainer>
      <Header title="Family Overview" />
      
      <div className="p-6 pb-24">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Family Members</h2>
            <p className="text-sm text-gray-600">{familyMembers.length} members added</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setViewMode('tree')}
              className={`p-2 rounded-lg ${viewMode === 'tree' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <GitBranch size={20} />
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <>
            <div className="mb-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search family members..."
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-3 mb-4">
              {familyMembers.map((member) => (
                <FamilyMemberCard key={member.id} {...member} onDelete={handleDeleteMember} />
              ))}
            </div>
          </>
        ) : (
          renderTreeView()
        )}

        <div className="fixed bottom-6 left-0 right-0 px-6 max-w-md mx-auto">
          <Button onClick={() => navigate('/add-family-member')} fullWidth icon={<Plus size={20} />}>
            Add Family Member
          </Button>
        </div>
      </div>
    </MobileContainer>
  );
}