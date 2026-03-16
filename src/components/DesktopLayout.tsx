import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { PageContainer } from './PageContainer';

interface DesktopLayoutProps {
  children: React.ReactNode;
  title: string;
  showSearch?: boolean;
  defaultUserRole?: 'patient' | 'doctor';
}

export function DesktopLayout({ children, title, showSearch = false, defaultUserRole = 'patient' }: DesktopLayoutProps) {
  const { currentUser, userRole, setUserRole } = useAppContext();

  React.useEffect(() => {
    if (!userRole && defaultUserRole) {
      setUserRole(defaultUserRole);
    }
  }, [userRole, defaultUserRole, setUserRole]);

  const userName = currentUser?.full_name || currentUser?.name || (userRole === 'doctor' ? 'Doctor' : 'User');

  return (
    <>
      <Sidebar userRole={userRole} />
      <TopBar title={title} showSearch={showSearch} userName={userName} userRole={userRole} />
      <PageContainer>
        {children}
      </PageContainer>
    </>
  );
}
