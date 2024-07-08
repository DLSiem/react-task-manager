import { Outlet } from "react-router-dom";
import Header from "./../components/Header";
import Footer from "./../components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex p-2 bg-gray-100 max-w-screen-lg mx-auto w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
