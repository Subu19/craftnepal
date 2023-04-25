import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home";
import { Stats } from "../pages/stats";
import { Feed } from "../pages/feed";
import { Guide } from "../pages/guide";
import { Leaderboard } from "../pages/leaderboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    // errorElement: <div>error page</div>,
  },
  {
    path: "/stats",
    element: <Stats></Stats>,
  },
  {
    path: "/stats/:username",
    element: <Stats></Stats>,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard></Leaderboard>,
  },
  {
    path: "/feed",
    element: <Feed></Feed>,
  },
  {
    path: "/guide",
    element: <Guide></Guide>,
  },
  {},
]);

const Path = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default Path;
