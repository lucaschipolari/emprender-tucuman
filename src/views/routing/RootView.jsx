import { Outlet } from "react-router-dom";

const RootView = () => {
  return (
    <>
      <main className="container-fluid marginHeader flex-grow-1 p-0">
        <Outlet />
      </main>
    </>
  );
};

export default RootView;
