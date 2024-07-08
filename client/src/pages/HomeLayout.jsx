import { Outlet, useLoaderData } from "react-router-dom";
import SideBar from "../components/SideBar";

const HomeLayout = () => {
  const projects = useLoaderData();

  return (
    <>
      <SideBar projects={projects} />
      <main className="ml-3 flex-grow p-3 bg-white shadow-md rounded-md">
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
