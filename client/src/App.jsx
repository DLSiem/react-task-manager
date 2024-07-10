import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Layout from "./pages/Layout";
import HomeLayout from "./pages/HomeLayout";
import Project from "./pages/Project";
import CreateProject from "./pages/CreateProject";

import {
  loader as projectLoader,
  loadProjectDetails,
} from "./utils/loaders/project";
import { projectActions } from "./utils/actions/projectactions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        loader: projectLoader,
        children: [
          {
            path: "/",
            index: true,
            element: <Home />,
          },
          {
            path: "create-project",
            element: <CreateProject />,
            action: projectActions,
          },
          {
            path: "project/:projectId",
            element: <Project />,
            loader: ({ params }) => loadProjectDetails(params.projectId),
            action: projectActions,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
