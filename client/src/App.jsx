import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Layout from "./pages/Layout";
import HomeLayout from "./pages/HomeLayout";
import Project from "./pages/Project";
import CreateProject from "./pages/CreateProject";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import {
  loader as projectLoader,
  loadProjectDetails,
} from "./utils/loaders/project";
import { projectActions } from "./utils/actions/projectactions";
import { authActions, logout } from "./utils/actions/authactions";

import ProtectedRoute from "./components/ProtectedRoute";
import { isAuthenticated } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    id: "root",
    loader: isAuthenticated,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomeLayout />
          </ProtectedRoute>
        ),
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
      // {
      //   path: "/login",
      //   element: <Login />,
      // },
      {
        path: "/signup",
        element: <Signup />,
        action: authActions,
      },
      {
        path: "/login",
        element: <Login />,
        action: authActions,
      },
      {
        path: "logout",
        action: logout,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
