import React from 'react';
import { BookOpen, Dna, Users, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { BottomNavigation } from '../components/BottomNavigation';
import { useAppContext } from '../context/AppContext';

export default function EducationalContentScreen() {
  const navigate = useNavigate();
  const { userRole } = useAppContext();

  const educationalTopics = [
    {
      id: 1,
      title: 'Understanding Genetics',
      description: 'Basic concepts of genetics and heredity',
      icon: Dna,
      color: 'blue',
      lessons: 12,
    },
    {
      id: 2,
      title: 'Pedigree Charts',
      description: 'How to read and interpret family trees',
      icon: Users,
      color: 'purple',
      lessons: 8,
    },
    {
      id: 3,
      title: 'Inheritance Patterns',
      description: 'Learn about different inheritance patterns',
      icon: BookOpen,
      color: 'green',
      lessons: 15,
    },
    {
      id: 4,
      title: 'Genetic Terminology',
      description: 'Essential terms and definitions',
      icon: FileText,
      color: 'orange',
      lessons: 10,
    },
  ];

  return (
    <MobileContainer>
      <Header title="Educational Content" showBack onBack={() => navigate(-1)} />

      <div className="p-6 pb-24">
      </div>

      <BottomNavigation userRole={userRole ?? undefined} />
    </MobileContainer>
  );
}