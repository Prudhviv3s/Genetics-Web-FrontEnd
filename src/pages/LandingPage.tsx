import React from 'react';
import { useNavigate } from 'react-router';
import { GitBranch, Users, Activity, Shield, CheckCircle, ArrowRight, BarChart3, Heart } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <GitBranch className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900">Genetics</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/role-selection?action=signin')}
              className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/role-selection?action=signup')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all shadow-md hover:shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield size={16} />
              HIPAA Compliant & Secure
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Advanced Pedigree Analysis & Inheritance Pattern Prediction
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Automated genetic analysis platform designed for healthcare professionals and patients. 
              Build comprehensive family trees and predict inheritance patterns with confidence.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/role-selection?action=signup')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Start Analysis
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => navigate('/educational-content')}
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 font-semibold transition-all"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="text-white" size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Analysis Dashboard</h3>
                  <p className="text-sm text-gray-500">Real-time genetic insights</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Inheritance Pattern</p>
                  <p className="text-xl font-bold text-blue-900">Autosomal Dominant</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 bg-white rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-sm font-semibold text-blue-700">92%</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-gray-600">Family Members</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                    <p className="text-2xl font-bold text-gray-900">3</p>
                    <p className="text-xs text-gray-600">Generations</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                    <p className="text-2xl font-bold text-gray-900">5</p>
                    <p className="text-xs text-gray-600">Affected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Genetic Analysis Platform</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed for both healthcare professionals and patients to manage, analyze, and understand genetic inheritance patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <GitBranch className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Pedigree Builder</h3>
              <p className="text-gray-700">
                Build comprehensive family trees with an intuitive interface. Track multiple generations and genetic traits effortlessly.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Activity className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Pattern Detection</h3>
              <p className="text-gray-700">
                Advanced algorithms analyze inheritance patterns including autosomal, X-linked, Y-linked, and mitochondrial.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Detailed Reports</h3>
              <p className="text-gray-700">
                Generate comprehensive analysis reports with confidence scores, clinical insights, and recommendations.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-User Access</h3>
              <p className="text-gray-700">
                Separate portals for patients and doctors with role-based permissions and data security.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Patient-Friendly Interface</h3>
              <p className="text-gray-700">
                Easy-to-understand reports and educational resources for patients to comprehend their genetic information.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">HIPAA Compliant</h3>
              <p className="text-gray-700">
                Enterprise-grade security ensures your genetic data is protected and privacy regulations are met.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, efficient, and accurate genetic analysis in three steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Build Your Pedigree</h3>
              <p className="text-gray-600">
                Input family members, relationships, and medical history using our intuitive pedigree builder tool.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Automated Analysis</h3>
              <p className="text-gray-600">
                Our AI algorithms analyze patterns and calculate inheritance probabilities with high accuracy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Insights</h3>
              <p className="text-gray-600">
                Receive detailed reports with actionable insights, confidence scores, and clinical recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Genetic Analysis?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of healthcare professionals and patients using Genetics for accurate genetic insights.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/role-selection?action=signup')}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>
            <button
              onClick={() => navigate('/role-selection?action=signin')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 font-semibold transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <GitBranch className="text-white" size={20} />
                </div>
                <span className="text-lg font-bold">Genetics</span>
              </div>
              <p className="text-gray-400 text-sm">
                Advanced pedigree analysis and inheritance pattern prediction platform.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => navigate('/role-selection?action=signup')} className="hover:text-white transition-colors">For Patients</button></li>
                <li><button onClick={() => navigate('/role-selection?action=signup')} className="hover:text-white transition-colors">For Doctors</button></li>
                <li><button onClick={() => navigate('/educational-content')} className="hover:text-white transition-colors">Resources</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => navigate('/help')} className="hover:text-white transition-colors">Help Center</button></li>
                <li><button onClick={() => navigate('/faq')} className="hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={() => navigate('/feedback')} className="hover:text-white transition-colors">Contact Us</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
                <li><button onClick={() => navigate('/compliance')} className="hover:text-white transition-colors">HIPAA Compliance</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 Genetics. All rights reserved. | Not for collecting PII or securing sensitive data in production.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
