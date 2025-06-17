import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";

const RootView = () => {
 const location = useLocation();

 const hideNavbarPages = ['/admin', '/login', '/register'];
 const shouldShowNavbar = !hideNavbarPages.includes(location.pathname);

 return (
   <>
     {shouldShowNavbar && <Navbar />}
     <main className="container-fluid marginHeader flex-grow-1 p-0">
       <Outlet />
     </main>
     <Footer />
   </>
 );
};

export default RootView;