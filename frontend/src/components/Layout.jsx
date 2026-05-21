import { Outlet } from "react-router-dom";
import Navbar from './nvabar/Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet /> {/* Child routes render here */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;