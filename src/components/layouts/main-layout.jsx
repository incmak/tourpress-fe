import { Outlet } from 'react-router-dom';
import { AppSidebar } from '../app-sidebar';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';

export function MainLayout() {
  return (
    <SidebarProvider>
      <SidebarTrigger />
      <AppSidebar />
      <div>
        <Outlet />
      </div>
    </SidebarProvider>
  );
}
