import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';

export default function FAQScreen() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create a pedigree?',
          a: 'To create a pedigree, go to the Family Overview screen and click \"Add Family Member\". Enter the details for each family member and their relationships.',
        },
        {
          q: 'What information do I need to provide?',
          a: 'You need to provide basic information like names, relationships, and health status. Medical conditions and genetic information are optional but helpful for analysis.',
        },
      ],
    },
    {
      category: 'Analysis & Results',
      questions: [
        {
          q: 'How long does analysis take?',
          a: 'Automated analysis typically completes within a few minutes. Doctor review may take 1-3 business days depending on availability.',
        },
        {
          q: 'What do the confidence scores mean?',
          a: 'Confidence scores indicate how likely each inheritance pattern is based on your pedigree data. Higher scores mean stronger evidence for that pattern.',
        },
        {
          q: 'Can I get a second opinion?',
          a: 'Yes, you can share your report with multiple healthcare providers through the Share Report feature.',
        },
      ],
    },
    {
      category: 'Privacy & Security',
      questions: [
        {
          q: 'Is my data secure?',
          a: 'Yes, all data is encrypted and stored securely. We comply with healthcare privacy regulations and never share your information without consent.',
        },
        {
          q: 'Who can see my genetic information?',
          a: 'Only you and healthcare providers you explicitly grant access to can view your genetic information.',
        },
      ],
    },
    {
      category: 'Technical Support',
      questions: [
        {
          q: 'The app is not working properly',
          a: 'Try refreshing the page or clearing your browser cache. If the problem persists, contact our support team.',
        },
        {
          q: 'How do I update my information?',
          a: 'Go to Settings > My Profile to update your personal information, or Family Overview to update family member details.',
        },
      ],
    },
  ];

  const allQuestions = faqs.flatMap((category, categoryIndex) =>
    category.questions.map((q, qIndex) => ({
      ...q,
      category: category.category,
      globalIndex: categoryIndex * 100 + qIndex,
    }))
  );

  const filteredQuestions = allQuestions.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DesktopLayout title="FAQ">
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 rounded-full p-3">
              <HelpCircle className="w-7 h-7 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Frequently Asked Questions</h3>
              <p className="text-base text-gray-700">
                Find answers to common questions about using the app
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="space-y-6">
          {searchQuery ? (
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-4">
                Search Results ({filteredQuestions.length})
              </h3>
              <div className="space-y-3">
                {filteredQuestions.map((item) => (
                  <div
                    key={item.globalIndex}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === item.globalIndex ? null : item.globalIndex)}
                      className="w-full p-5 text-left flex items-start justify-between hover:bg-gray-50 transition-all"
                    >
                      <div className="flex-1">
                        <span className="text-xs text-blue-600 font-medium">{item.category}</span>
                        <h4 className="font-medium text-gray-900 mt-1">{item.q}</h4>
                      </div>
                      {openIndex === item.globalIndex ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3" />
                      )}
                    </button>
                    {openIndex === item.globalIndex && (
                      <div className="px-5 pb-5 text-gray-700 border-t border-gray-200 pt-4">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="font-semibold text-gray-900 text-lg mb-4">{category.category}</h3>
                <div className="space-y-3">
                  {category.questions.map((item, qIndex) => {
                    const globalIndex = categoryIndex * 100 + qIndex;
                    return (
                      <div
                        key={qIndex}
                        className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                          className="w-full p-5 text-left flex items-start justify-between hover:bg-gray-50 transition-all"
                        >
                          <h4 className="font-medium text-gray-900 flex-1">{item.q}</h4>
                          {openIndex === globalIndex ? (
                            <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3" />
                          )}
                        </button>
                        {openIndex === globalIndex && (
                          <div className="px-5 pb-5 text-gray-700 border-t border-gray-200 pt-4">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Still have questions?</h3>
          <p className="text-gray-700 mb-4">
            If you couldn't find the answer you're looking for, our support team is here to help.
          </p>
          <button
            onClick={() => navigate('/feedback')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all"
          >
            Contact Support
          </button>
        </div>
      </div>
    </DesktopLayout>
  );
}
