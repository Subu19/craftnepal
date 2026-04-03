import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreeperLoading from "../components/extra/CreeperLoading";

// Lazy load pages
const Home = lazy(() => import("../pages/home").then(m => ({ default: m.Home })));
const Stats = lazy(() => import("../pages/stats").then(m => ({ default: m.Stats })));
const Feed = lazy(() => import("../pages/feed").then(m => ({ default: m.Feed })));
const Guide = lazy(() => import("../pages/guide").then(m => ({ default: m.Guide })));
const Map = lazy(() => import("../pages/map"));
const ErrorComponent = lazy(() => import("../pages/Error"));
const Gallery = lazy(() => import("../pages/Gallery"));
const AdminGallery = lazy(() => import("../pages/admin/AdminGallery"));
const GuideCms = lazy(() => import("../pages/guidecms"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/stats",
    element: <Stats />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/stats/:username",
    element: <Stats />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/feed",
    element: <Feed />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/guide",
    element: <Guide />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/map",
    element: <Map />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/manage-gallery",
    element: <AdminGallery />,
  },
  {
    path: "/guidecms",
    element: <GuideCms />,
  },
  {
    path: "*",
    element: <ErrorComponent />,
  },
]);

const Path = () => {
  return (
    <Suspense fallback={
      <div className="loadingContainner">
        <CreeperLoading />
      </div>
    }>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Path;

