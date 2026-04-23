import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home";
import { Stats } from "../pages/stats";
import { Feed } from "../pages/feed";
import { Guide } from "../pages/guide";

import { Leaderboard } from "../pages/leaderboard";
import Map from "../pages/map";
import ErrorComponent from "../pages/Error";
import Gallery from "../pages/Gallery";
import AdminGallery from "../pages/admin/AdminGallery";
import GuideCms from "../pages/guidecms";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <ErrorComponent>error page</ErrorComponent>,
  },
  {
    path: "/stats",
    element: <Stats></Stats>,
    errorElement: <ErrorComponent>error page</ErrorComponent>,
  },
  {
    path: "/stats/:username",
    element: <Stats></Stats>,
    errorElement: <ErrorComponent>error page</ErrorComponent>,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard></Leaderboard>,
    errorElement: <ErrorComponent>error page</ErrorComponent>,
  },
  {
    path: "/feed",
    element: <Feed></Feed>,
    errorElement: <ErrorComponent>error page</ErrorComponent>,
  },
  {
    path: "/guide",
    element: <Guide></Guide>,
    errorElement: <ErrorComponent>error page</ErrorComponent>,
  },
  {
    path: "/map",
    element: <Map></Map>,
    errorElement: <ErrorComponent>error page</ErrorComponent>,
  },
  {
    path: "/gallery",
    element: <Gallery></Gallery>,
    // errorElement: <ErrorComponent>error page</ErrorComponent>,
  },

  {
    path: "/manage-gallery",
    element: <AdminGallery></AdminGallery>,
    // errorElement: <ErrorComponent>error page</ErrorComponent>,
  },
  {
    path: "/guidecms",
    element: <GuideCms></GuideCms>,
    // errorElement: <ErrorComponent>error page</ErrorComponent>,
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
