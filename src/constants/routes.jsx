import { createBrowserRouter } from "react-router-dom";
import RootView from "../views/routing/RootView";
import HomeView from "../views/HomeView";
import TiendaOnlineView from "../views/TiendaOnlineView.jsx";
import LeakedProducts from "../views/LeakedProducts";
import Error404 from "../components/NotFoundView/Error404";


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
      {
        path: "/shop",
        element: <LeakedProducts />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);
