import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home";
import { Stats } from "../pages/stats";
import { Feed } from "../pages/feed";
import { Guide } from "../pages/guide";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home>root</Home>,
    // errorElement: <div>error page</div>,
  },
  {
    path: "/stats",
    element: <Stats>root</Stats>,
  },
  {
    path: "/feed",
    element: <Feed>root</Feed>,
  },
  {
    path: "/guide",
    element: <Guide>root</Guide>,
  },
  {},
]);

const Path = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default Path;
