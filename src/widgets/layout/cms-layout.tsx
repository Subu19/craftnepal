import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
} from '../../shared/ui/sidebar';
import { Shield, Image as ImageIcon, BookOpen, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../shared/providers/auth-provider';

export const CmsLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || !user.isAdmin) return null;

  return (
    <div className="dark min-h-screen">
      <SidebarProvider>
        <Sidebar collapsible="icon" className="border-r border-white/10 !bg-black/40 backdrop-blur-xl transition-all duration-300">
          <SidebarHeader className="border-b border-white/5 p-2 flex flex-row items-center justify-between group-data-[collapsible=icon]:justify-center h-16 transition-all">
            <div className="flex items-center gap-3 px-2 group-data-[collapsible=icon]:hidden overflow-hidden">
              <div className="bg-accent-500/20 p-2 rounded-xl text-accent-500 shrink-0">
                <Shield className="h-6 w-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white whitespace-nowrap">CraftCMS</span>
            </div>
            <SidebarTrigger className="hover:bg-white/10 text-white transition-colors shrink-0" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-400 font-medium px-2 py-4 group-data-[collapsible=icon]:hidden">Content Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      size="lg"
                      isActive={location.pathname === '/admin/gallery' || location.pathname === '/admin'}
                      className="rounded-xl data-[active=true]:bg-accent-500/10 data-[active=true]:text-accent-400 hover:bg-white/5 transition-colors"
                      tooltip="Gallery"
                    >
                      <Link to="/admin/gallery" className="flex items-center group-data-[collapsible=icon]:justify-center">
                        <ImageIcon className="h-5 w-5 shrink-0 group-data-[collapsible=icon]:mr-0 mr-3" />
                        <span className="font-medium text-base group-data-[collapsible=icon]:hidden">Gallery</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      asChild 
                      size="lg"
                      isActive={location.pathname === '/admin/guides'}
                      className="rounded-xl data-[active=true]:bg-accent-500/10 data-[active=true]:text-accent-400 hover:bg-white/5 transition-colors"
                      tooltip="Guides"
                    >
                      <Link to="/admin/guides" className="flex items-center group-data-[collapsible=icon]:justify-center">
                        <BookOpen className="h-5 w-5 shrink-0 group-data-[collapsible=icon]:mr-0 mr-3" />
                        <span className="font-medium text-base group-data-[collapsible=icon]:hidden">Guides</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-2 border-t border-white/5">
             <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild size="lg" className="rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors" tooltip="Back to Website">
                    <Link to="/" className="flex items-center group-data-[collapsible=icon]:justify-center">
                      <ArrowLeft className="h-5 w-5 shrink-0 group-data-[collapsible=icon]:mr-0 mr-3" />
                      <span className="font-medium text-base group-data-[collapsible=icon]:hidden">Back to Website</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="bg-transparent">
          <main className="flex-1 overflow-auto p-4 md:p-8 lg:p-12">
            <div className="max-w-[1600px] mx-auto">
              {/* Mobile Header */}
              <div className="md:hidden mb-6 flex items-center gap-4">
                <SidebarTrigger className="hover:bg-white/10 text-white transition-colors" />
                <h1 className="text-xl font-semibold text-white tracking-tight">
                  {location.pathname.includes('gallery') ? 'Gallery Management' : 'Guides Management'}
                </h1>
              </div>
              
              {/* Desktop Header */}
              <div className="hidden md:block mb-8">
                <h1 className="text-4xl font-black text-white tracking-tight">
                  {location.pathname.includes('gallery') ? 'Gallery Management' : 'Guides Management'}
                </h1>
                <p className="text-gray-400 mt-2 text-lg">
                  {location.pathname.includes('gallery') 
                    ? 'Manage your server gallery, screenshots, and visual media.' 
                    : 'Create and edit server guides using our advanced markdown editor.'}
                </p>
              </div>

              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

