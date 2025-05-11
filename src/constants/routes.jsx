import { createBrowserRouter } from "react-router-dom";
import RootView from "../views/routing/RootView";
import HomeView from "../views/HomeView";
import TiendaOnlineView from "../views/TiendaOnlineView.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootView />,
    children: [
      {
        path: "",
        element: <HomeView />,
      },
      {
        path: "tiendaonline",
        element: <TiendaOnlineView />,
      },
    ],
  },
]);
