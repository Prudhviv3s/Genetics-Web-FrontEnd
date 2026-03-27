import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shuffle, X } from 'lucide-react';

export default function RandomScreenButton() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const screens = [
    '/landing', '/role-selection', '/login', '/signup', '/forgot-password', '/home',
    '/patient-dashboard', '/patient-profile', '/edit-profile', '/family-overview',
    '/add-family-member', '/pedigree-builder', '/patient-results',
    '/select-relationship', '/select-status', '/pedigree-builder',
    '/edit-family-member/1', '/delete-confirmation/1', '/save-pedigree',
    '/update-pedigree', '/version-history', '/compare-changes', '/submit-pedigree',
    '/doctor-dashboard', '/doctor-patients', '/patient-detail/p1', '/visual-analysis', '/inheritance-detection',
    '/rule-evaluation', '/autosomal-dominant', '/autosomal-recessive', '/x-linked',
    '/y-linked', '/mitochondrial', '/processing', '/prediction-result',
    '/confidence-score', '/doctor-notes', '/generate-report', '/patient-results',
    '/export-report', '/share-report', '/notifications', '/help', '/faq',
    '/language', '/accessibility', '/feedback', '/logout', '/patient-settings', '/doctor-settings'
  ];

  const goToRandomScreen = () => {
    const randomIndex = Math.floor(Math.random() * screens.length);
    const randomScreen = screens[randomIndex];
    navigate(randomScreen);
    setShowMenu(false);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {showMenu && (
          <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-4 w-64 mb-2 animate-slideUp">
            <button
              onClick={goToRandomScreen}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all group"
            >
              <Shuffle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span className="font-semibold">Go to Random Screen</span>
            </button>
          </div>
        )}
        
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 ${
            showMenu
              ? 'bg-red-500 hover:bg-red-600 rotate-90'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-xl'
          }`}
        >
          {showMenu ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <Shuffle className="w-7 h-7 text-white" />
          )}
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.2s ease-out;
        }
      `}</style>
    </>
  );
}