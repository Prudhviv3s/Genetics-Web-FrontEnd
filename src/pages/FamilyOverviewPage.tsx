import React, { useState } from 'react';
import { Plus, User, Calendar, AlertCircle, List, GitBranch, Search, ChevronRight, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { PageContainer } from '../components/PageContainer';
import { API_BASE_URL } from '../config';
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
  side_of_family?: string;
  onDelete: (id: string) => void;
}

function FamilyMemberCard({ id, name, relationship, status, gender, age, side_of_family, onDelete }: FamilyMemberCardProps) {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'affected': return 'text-red-600 bg-red-50 border-red-200';
      case 'carrier': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'unaffected': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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
        className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 ${gender === 'Female' ? 'rounded-full' : ''} border-4 border-gray-800 ${status === 'affected' ? 'bg-red-600' :
            status === 'carrier' ? (gender === 'Male' ? 'bg-blue-400' : 'bg-pink-400') :
              gender === 'Male' ? 'bg-blue-400' : 'bg-pink-400'
            } flex items-center justify-center shadow-sm`}>
            {status === 'carrier' && <div className="w-4 h-4 rounded-full bg-gray-900"></div>}
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-900 text-lg">{name}</div>
            <div className="text-sm text-gray-600">
              {relationship}{side_of_family && side_of_family !== 'None' ? ` - ${side_of_family}` : ''} • {age} years
            </div>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor()} capitalize`}>
            {status}
          </span>
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

export default function FamilyOverviewPage() {
  const navigate = useNavigate();
  const { currentUser, userRole, setUserRole } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [familyMembers, setFamilyMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [patientName, setPatientName] = useState('');

  React.useEffect(() => {
    if (!userRole) {
      setUserRole('patient');
    }

    const fetchFamilyMembers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Fetch User Profile Name
        try {
          const meRes = await fetch(`${API_BASE_URL}/api/me/`, {
            headers: { 'Authorization': `Token ${token}` }
          });
          const meData = await meRes.json();
          if (meData.status && meData.profile?.full_name) {
            setPatientName(meData.profile.full_name);
          }
        } catch (meErr) {
          console.error("Failed to fetch profile name", meErr);
        }

        const res = await fetch(`${API_BASE_URL}/api/patient/family-overview/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        const data = await res.json();
        if (data.status && data.family_members) {
          const mapped = data.family_members.map((m: any) => ({
            id: String(m.id),
            name: m.full_name,
            relationship: m.relationship,
            status: m.health_status?.toLowerCase(),
            gender: m.gender,
            age: m.age,
            side_of_family: m.side_of_family
          }));
          setFamilyMembers(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch family members", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFamilyMembers();
  }, [userRole, setUserRole]);

  const handleDeleteMember = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_BASE_URL}/api/patient/family-members/${id}/delete/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      // Remove locally from state if successful
      setFamilyMembers(familyMembers.filter(member => member.id !== id));
    } catch (err) {
      console.error("Failed to delete member", err);
    }
  };

  const filteredMembers = familyMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.relationship.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTreeView = () => {
    const father = familyMembers.find(m => m.relationship === 'Father');
    const mother = familyMembers.find(m => m.relationship === 'Mother');
    const brother = familyMembers.find(m => m.relationship === 'Brother');
    const sister = familyMembers.find(m => m.relationship === 'Sister');
    const son = familyMembers.find(m => m.relationship === 'Son');

    return (
      <div className="relative p-12 bg-white rounded-xl shadow-sm border border-gray-200 min-h-[700px]">
        <div className="flex flex-col items-center gap-12 relative">
          {/* Generation I - Parents */}
          <div className="mb-2 text-sm font-bold text-gray-500 self-start">Generation I</div>
          <div className="flex gap-32 pt-6 mb-24 relative">
            {father && (
              <div className="text-center relative z-20">
                <div className={`w-20 h-20 border-4 border-gray-900 ${father.status === 'affected' ? 'bg-red-600' : 'bg-blue-400'
                  } mb-3 mx-auto shadow-lg`}></div>
                <div className="text-sm font-bold">{father.name}</div>
                <div className="text-sm text-gray-500">{father.relationship}</div>
                <div className={`text-sm font-medium ${father.status === 'affected' ? 'text-red-600' : 'text-green-600'
                  } capitalize`}>
                  {father.status}
                </div>
              </div>
            )}
            {mother && (
              <div className="text-center relative z-20">
                <div className={`w-20 h-20 rounded-full border-4 border-gray-900 ${mother.status === 'affected' ? 'bg-red-600' : 'bg-pink-400'
                  } mb-3 mx-auto flex items-center justify-center shadow-lg`}>
                  {mother.status === 'carrier' && (
                    <div className="w-5 h-5 rounded-full bg-gray-900"></div>
                  )}
                </div>
                <div className="text-sm font-bold">{mother.name}</div>
                <div className="text-sm text-gray-500">{mother.relationship}</div>
                <div className={`text-sm font-medium ${mother.status === 'carrier' ? 'text-orange-600' : 'text-green-600'
                  } capitalize`}>
                  {mother.status}
                </div>
              </div>
            )}

            {father && mother && (
              <>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900 z-10"></div>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-1 h-24 bg-gray-900 z-10" style={{ top: '40px' }}></div>
              </>
            )}
          </div>

          {/* Generation II - Children */}
          <div className="mb-2 text-sm font-bold text-gray-500 self-start">Generation II</div>
          <div className="flex gap-16 mb-12 relative">
            {brother && (
              <div className="text-center relative z-20">
                <div className={`w-18 h-18 border-4 border-gray-900 ${brother.status === 'affected' ? 'bg-red-600' : 'bg-blue-400'
                  } mb-3 mx-auto shadow-lg`}></div>
                <div className="text-sm font-semibold">{brother.name}</div>
                <div className="text-sm text-gray-500">{brother.relationship}</div>
                <div className="text-sm text-green-600 capitalize">{brother.status}</div>
              </div>
            )}
            {sister && (
              <div className="text-center relative z-20">
                <div className="relative">
                  <div className="absolute -left-16 top-7 flex items-center gap-1 z-30">
                    <div className="w-8 h-1 bg-blue-600"></div>
                    <div className="text-blue-600 text-3xl font-bold leading-none">→</div>
                  </div>
                  <div className={`w-18 h-18 rounded-full border-4 border-gray-900 ${sister.status === 'affected' ? 'bg-red-600' : 'bg-pink-400'
                    } mb-3 mx-auto shadow-lg`}></div>
                </div>
                <div className="text-sm font-bold text-blue-600">You</div>
                <div className="text-sm text-gray-500">Patient</div>
                <div className="text-sm text-green-600 capitalize">{sister.status}</div>
              </div>
            )}
            <div className="text-center relative z-20">
              <div className="w-18 h-18 rounded-full border-4 border-gray-900 bg-pink-400 mb-3 mx-auto shadow-lg"></div>
              <div className="text-sm font-semibold">Sister</div>
              <div className="text-sm text-gray-500">Sibling</div>
              <div className="text-sm text-green-600">Unaffected</div>
            </div>
            {son && (
              <div className="text-center relative z-20">
                <div className={`w-18 h-18 border-4 border-gray-900 ${son.status === 'unknown' ? 'bg-gray-100' : son.status === 'affected' ? 'bg-red-600' : 'bg-blue-400'
                  } mb-3 mx-auto shadow-lg`}></div>
                <div className="text-sm font-semibold">{son.name}</div>
                <div className="text-sm text-gray-500">{son.relationship}</div>
                <div className="text-sm text-gray-600 capitalize">{son.status}</div>
              </div>
            )}

            <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-1 bg-gray-900 z-10" style={{ width: '320px' }}></div>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-1 h-24 bg-gray-900 z-10" style={{ marginLeft: '-160px' }}></div>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-1 h-24 bg-gray-900 z-10" style={{ marginLeft: '-80px' }}></div>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-1 h-24 bg-gray-900 z-10" style={{ marginLeft: '0px' }}></div>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-1 h-24 bg-gray-900 z-10" style={{ marginLeft: '160px' }}></div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <PedigreeLegend compact />
        </div>
      </div>
    );
  };

  return (
    <>
      <Sidebar userRole={userRole} />
      <TopBar title="Family Overview" userName={patientName || currentUser?.name || 'Loading...'} userRole={userRole} />

      <PageContainer>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Family Members</h1>
                <p className="text-gray-600">{familyMembers.length} members added to your family tree</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search family members by name or relationship..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          {/* Family Members List */}
          <div className="space-y-3">
            {filteredMembers.map((member) => (
              <FamilyMemberCard key={member.id} {...member} onDelete={handleDeleteMember} />
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-1">No family members found</p>
              <p className="text-sm text-gray-400">Try adjusting your search</p>
            </div>
          )}
        </div>
      </PageContainer>
    </>
  );
}