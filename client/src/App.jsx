import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Layout from "./pages/Layout";
import HomeLayout from "./pages/HomeLayout";
import Project from "./pages/Project";
import {
  loader as projectLoader,
  loadProjectDetails,
} from "./utils/loaders/project";

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
            path: "project/:projectId",
            element: <Project />,
            loader: ({ params }) => loadProjectDetails(params.projectId),
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
