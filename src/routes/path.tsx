import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home";
import { Stats } from "../pages/stats";
import { Feed } from "../pages/feed";
import { Guide } from "../pages/guide";

import Map from "../pages/map";
import ErrorComponent from "../pages/Error";
import Gallery from "../pages/Gallery";
import AdminGallery from "../pages/admin/AdminGallery";
import GuideCms from "../pages/guidecms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/stats",
    element: <Stats></Stats>,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/stats/:username",
    element: <Stats></Stats>,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/feed",
    element: <Feed></Feed>,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/guide",
    element: <Guide></Guide>,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/map",
    element: <Map></Map>,
    errorElement: <ErrorComponent />,
  },
  {
    path: "/gallery",
    element: <Gallery></Gallery>,
  },
  {
    path: "/manage-gallery",
    element: <AdminGallery></AdminGallery>,
  },
  {
    path: "/guidecms",
    element: <GuideCms></GuideCms>,
  },
  {
    path: "*",
    element: <ErrorComponent></ErrorComponent>,
  },
]);

const Path = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default Path;
