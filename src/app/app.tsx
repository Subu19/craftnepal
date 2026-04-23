import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/config/queryClient";
import { SocketProvider } from "../shared/providers/socket-provider";
import { AuthProvider } from "../shared/providers/auth-provider";
import { TooltipProvider } from "../shared/ui";
import "./styles/index.css";

import MainLayout from "../widgets/layout/main-layout";
import { CmsLayout } from "../widgets/layout/cms-layout";
import Home from "../pages/home/home";
import Guides from "../pages/guides/guides";
import Leaderboard from "../pages/leaderboard/leaderboard";
import Stats from "../pages/stats/stats";
import Feed from "../pages/feed/feed";
import Gallery from "../pages/gallery/gallery";
import { GalleryManager } from "../features/cms-gallery/ui/gallery-manager";
import { GuideManager } from "../features/cms-guide/ui/guide-manager";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          <TooltipProvider>
            <Router>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/guides" element={<Guides />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/stats" element={<Stats />} />
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/gallery" element={<Gallery />} />
                </Route>
                <Route path="/admin" element={<CmsLayout />}>
                  <Route index element={<Navigate to="gallery" replace />} />
                  <Route path="gallery" element={<GalleryManager />} />
                  <Route path="guides" element={<GuideManager />} />
                </Route>
              </Routes>
            </Router>
          </TooltipProvider>
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
