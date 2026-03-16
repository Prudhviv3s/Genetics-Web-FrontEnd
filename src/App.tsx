import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { AppProvider } from './context/AppContext';

// Import new pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PatientDashboardPage from './pages/PatientDashboardPage';
import DoctorDashboardPage from './pages/DoctorDashboardPage';
import PatientProfilePage from './pages/PatientProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import FamilyOverviewPage from './pages/FamilyOverviewPage';
import PedigreeBuilderPage from './pages/PedigreeBuilderPage';
import PatientResultsPage from './pages/PatientResultsPage';

// Import all screens
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import HomeDashboard from './screens/HomeDashboard';
import PatientDashboard from './screens/PatientDashboard';
import DoctorHomeDashboard from './screens/DoctorHomeDashboard';
import AddFamilyMemberScreen from './screens/AddFamilyMemberScreen';
import SelectRelationshipScreen from './screens/SelectRelationshipScreen';
import SelectStatusScreen from './screens/SelectStatusScreen';
import MedicalNotesScreen from './screens/MedicalNotesScreen';
import PedigreeBuilderScreen from './screens/PedigreeBuilderScreen';
import DeleteConfirmationScreen from './screens/DeleteConfirmationScreen';
import SavePedigreeScreen from './screens/SavePedigreeScreen';
import UpdatePedigreeScreen from './screens/UpdatePedigreeScreen';
import VersionHistoryScreen from './screens/VersionHistoryScreen';
import CompareChangesScreen from './screens/CompareChangesScreen';
import SubmitPedigreeScreen from './screens/SubmitPedigreeScreen';
import DoctorDashboard from './screens/DoctorDashboard';
import PatientDetailViewScreen from './screens/PatientDetailViewScreen';
import PedigreeAnalysisListScreen from './screens/PedigreeAnalysisListScreen';
import VisualPedigreeAnalysisScreen from './screens/VisualPedigreeAnalysisScreen';
import DNAReportAnalysisScreen from './screens/DNAReportAnalysisScreen';
import InheritanceDetectionScreen from './screens/InheritanceDetectionScreen';
import InheritanceDetectionListScreen from './screens/InheritanceDetectionListScreen';
import PatientInheritanceResultsScreen from './screens/PatientInheritanceResultsScreen';
import RuleBasedEvaluationScreen from './screens/RuleBasedEvaluationScreen';
import AutosomalDominantScreen from './screens/AutosomalDominantScreen';
import AutosomalRecessiveScreen from './screens/AutosomalRecessiveScreen';
import XLinkedScreen from './screens/XLinkedScreen';
import YLinkedScreen from './screens/YLinkedScreen';
import MitochondrialScreen from './screens/MitochondrialScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import PredictionResultScreen from './screens/PredictionResultScreen';
import DoctorNotesScreen from './screens/DoctorNotesScreen';
import GenerateReportScreen from './screens/GenerateReportScreen';
import PatientResultsScreen from './screens/PatientResultsScreen';
import ExportReportScreen from './screens/ExportReportScreen';
import ShareReportScreen from './screens/ShareReportScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import HelpScreen from './screens/HelpScreen';
import FAQScreen from './screens/FAQScreen';
import LanguageScreen from './screens/LanguageScreen';
import AccessibilityScreen from './screens/AccessibilityScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import LogoutScreen from './screens/LogoutScreen';
import EducationalContentScreen from './screens/EducationalContentScreen';
import PatientSettingsScreen from './screens/PatientSettingsScreen';
import DoctorSettingsScreen from './screens/DoctorSettingsScreen';
import InheritanceAnalysisScreen from './screens/InheritanceAnalysisScreen';
import DashboardSelectionScreen from './screens/DashboardSelectionScreen';
import AllScreensDashboard from './screens/AllScreensDashboard';
import MedicalCredentialsScreen from './screens/MedicalCredentialsScreen';
import SpecializationScreen from './screens/SpecializationScreen';
import AnalysisPreferencesScreen from './screens/AnalysisPreferencesScreen';
import ConsultationScheduleScreen from './screens/ConsultationScheduleScreen';
import CaseNotesScreen from './screens/CaseNotesScreen';
import ContinuingEducationScreen from './screens/ContinuingEducationScreen';
import ProfessionalNetworkScreen from './screens/ProfessionalNetworkScreen';
import ComplianceScreen from './screens/ComplianceScreen';
import ReportPatientListScreen from './screens/ReportPatientListScreen';
import PatientInheritanceReportScreen from './screens/PatientInheritanceReportScreen';
import MyInheritanceAnalysisScreen from './screens/MyInheritanceAnalysisScreen';
// Privacy and Security Screen
import PrivacyConsentScreen from './screens/PrivacyConsentScreen';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Navigate to="/landing" replace />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="/role-selection" element={<RoleSelectionScreen />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/reset-password" element={<ResetPasswordScreen />} />
            <Route path="/home" element={<HomeDashboard />} />
            <Route path="/home-dashboard" element={<HomeDashboard />} />
            <Route path="/patient-dashboard" element={<PatientDashboardPage />} />
            <Route path="/doctor-home" element={<DoctorHomeDashboard />} />
            <Route path="/doctor-patients" element={<DoctorDashboardPage />} />
            <Route path="/patient-profile" element={<PatientProfilePage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/family-overview" element={<FamilyOverviewPage />} />
            <Route path="/add-family-member" element={<AddFamilyMemberScreen />} />
            <Route path="/select-relationship" element={<SelectRelationshipScreen />} />
            <Route path="/select-status" element={<SelectStatusScreen />} />
            <Route path="/medical-notes" element={<MedicalNotesScreen />} />
            <Route path="/pedigree-builder" element={<PedigreeBuilderPage />} />
            <Route path="/delete-confirmation/:id" element={<DeleteConfirmationScreen />} />
            <Route path="/save-pedigree" element={<SavePedigreeScreen />} />
            <Route path="/update-pedigree" element={<UpdatePedigreeScreen />} />
            <Route path="/version-history" element={<VersionHistoryScreen />} />
            <Route path="/compare-changes" element={<CompareChangesScreen />} />
            <Route path="/submit-pedigree" element={<SubmitPedigreeScreen />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/patient-detail/:id" element={<PatientDetailViewScreen />} />
            <Route path="/pedigree-analysis-list" element={<PedigreeAnalysisListScreen />} />
            <Route path="/visual-analysis" element={<PedigreeAnalysisListScreen />} />
            <Route path="/visual-analysis/:patientId" element={<VisualPedigreeAnalysisScreen />} />
            <Route path="/dna-report-analysis" element={<DNAReportAnalysisScreen />} />
            <Route path="/inheritance-detection" element={<InheritanceDetectionListScreen />} />
            <Route path="/inheritance-detection/:patientId" element={<InheritanceDetectionScreen />} />
            <Route path="/patient-inheritance-results" element={<PatientInheritanceResultsScreen />} />
            <Route path="/rule-evaluation" element={<RuleBasedEvaluationScreen />} />
            <Route path="/autosomal-dominant" element={<AutosomalDominantScreen />} />
            <Route path="/autosomal-recessive" element={<AutosomalRecessiveScreen />} />
            <Route path="/x-linked" element={<XLinkedScreen />} />
            <Route path="/y-linked" element={<YLinkedScreen />} />
            <Route path="/mitochondrial" element={<MitochondrialScreen />} />
            <Route path="/processing" element={<ProcessingScreen />} />
            <Route path="/prediction-result" element={<PredictionResultScreen />} />
            <Route path="/doctor-notes" element={<DoctorNotesScreen />} />
            <Route path="/generate-report" element={<GenerateReportScreen />} />
            <Route path="/patient-results" element={<PatientResultsPage />} />
            <Route path="/export-report" element={<ExportReportScreen />} />
            <Route path="/share-report" element={<ShareReportScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/help" element={<HelpScreen />} />
            <Route path="/faq" element={<FAQScreen />} />
            <Route path="/language" element={<LanguageScreen />} />
            <Route path="/accessibility" element={<AccessibilityScreen />} />
            <Route path="/feedback" element={<FeedbackScreen />} />
            <Route path="/logout" element={<LogoutScreen />} />
            <Route path="/educational-content" element={<EducationalContentScreen />} />
            <Route path="/patient-settings" element={<PatientSettingsScreen />} />
            <Route path="/doctor-settings" element={<DoctorSettingsScreen />} />
            <Route path="/inheritance-analysis" element={<InheritanceAnalysisScreen />} />
            <Route path="/my-inheritance-analysis" element={<MyInheritanceAnalysisScreen />} />
            <Route path="/dashboard-selection" element={<DashboardSelectionScreen />} />
            <Route path="/all-screens" element={<AllScreensDashboard />} />
            <Route path="/all-screens-dashboard" element={<AllScreensDashboard />} />
            <Route path="/medical-credentials" element={<MedicalCredentialsScreen />} />
            <Route path="/specialization" element={<SpecializationScreen />} />
            <Route path="/analysis-preferences" element={<AnalysisPreferencesScreen />} />
            <Route path="/consultation-schedule" element={<ConsultationScheduleScreen />} />
            <Route path="/case-notes" element={<CaseNotesScreen />} />
            <Route path="/continuing-education" element={<ContinuingEducationScreen />} />
            <Route path="/professional-network" element={<ProfessionalNetworkScreen />} />
            <Route path="/compliance" element={<ComplianceScreen />} />
            <Route path="/report-patients" element={<ReportPatientListScreen />} />
            <Route path="/patient-report/:patientId" element={<PatientInheritanceReportScreen />} />
            <Route path="/inheritance-pattern-report/:patientId" element={<PatientInheritanceReportScreen />} />

            <Route path="/privacy-consent" element={<PrivacyConsentScreen />} />

            {/* Deprecated routes - redirect to new flow */}
            <Route path="/profile-setup" element={<Navigate to="/role-selection" replace />} />
            <Route path="/otp-verification" element={<Navigate to="/role-selection" replace />} />

            {/* Catch-all route for any unmatched paths */}
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}