import React from 'react';
import { Edit2, Trash2, User, Circle } from 'lucide-react';
import { useNavigate } from 'react-router';

interface FamilyMemberCardProps {
  id: string;
  name: string;
  relationship: string;
  status: 'affected' | 'unaffected' | 'carrier' | 'unknown';
  gender?: string;
  age?: number;
}

export const FamilyMemberCard = ({
  id,
  name,
  relationship,
  status,
  gender,
  age,
}: FamilyMemberCardProps) => {
  const navigate = useNavigate();

  const statusColors = {
    affected: 'bg-red-100 text-red-700 border-red-300',
    unaffected: 'bg-green-100 text-green-700 border-green-300',
    carrier: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    unknown: 'bg-gray-100 text-gray-700 border-gray-300',
  };

  const statusDots = {
    affected: 'bg-red-500',
    unaffected: 'bg-green-500',
    carrier: 'bg-yellow-500',
    unknown: 'bg-gray-400',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <User size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{relationship}</p>
            {age && gender && (
              <p className="text-xs text-gray-500 mt-1">
                {age} years • {gender}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <Circle size={8} className={statusDots[status]} fill="currentColor" />
              <span className="text-xs font-medium capitalize">{status}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/edit-family-member/${id}`)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => navigate(`/delete-confirmation/${id}`)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};