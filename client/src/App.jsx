import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Layout from "./pages/Layout";
import HomeLayout from "./pages/HomeLayout";
import Project from "./pages/Project";
import CreateProject from "./pages/CreateProject";
import Tasks from "./pages/Tasks";

import {
  loader as projectLoader,
  loadProjectDetails,
  loadTasks,
} from "./utils/loaders/project";
import { projectActions, taskActions } from "./utils/actions/projectactions";

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
            id: "project",
            loader: ({ params }) => loadProjectDetails(params.projectId),
            action: projectActions,
            children: [
              {
                path: "",
                index: true,
                element: <Tasks />,
                id: "tasks",
                loader: loadTasks,
                action: taskActions,
              },
            ],
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
