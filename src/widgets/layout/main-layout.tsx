import { Outlet, useLocation } from "react-router-dom";

import { useLayoutEffect } from "react";
import { Navigation } from "../navigation/ui";
import { Footer } from "../footer/ui";

export default function MainLayout() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [pathname]);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-secondary-900 via-primary-900 to-secondary-900">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
