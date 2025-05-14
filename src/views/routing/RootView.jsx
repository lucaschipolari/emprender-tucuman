import { Outlet } from "react-router-dom";
import Navbar from "../../components/Common/Navbar";

const RootView = () => {
  return (
    <>
      <Navbar />
      <main className="container-fluid marginHeader flex-grow-1 p-0">
        <Outlet />
      </main>
    </>
  );
};

export default RootView;
