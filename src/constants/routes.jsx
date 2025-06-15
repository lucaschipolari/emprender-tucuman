import { createBrowserRouter } from "react-router-dom";
import RootView from "../views/routing/RootView";
import HomeView from "../views/HomeView";

import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import TiendaOnlineView from "../views/TiendaOnlineView.jsx";
import LeakedProducts from "../views/LeakedProducts";
import Error404 from "../components/NotFoundView/Error404";
import EntrepreneurProfile from "../components/EntrepreneurProfile/EntrepreneurProfile.jsx";
import EntrepreneurPrivate from "../views/EntrepreneurPrivate.jsx";


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

        path: "login",
        element: <LoginView />,
      },
      {
        path: "register",
        element: <RegisterView />,
      },
        path: "tiendaonline",
        element: <TiendaOnlineView />,
      },
      {
        path: "/shop",
        element: <LeakedProducts />,
      },
      {
        path: "/perfil-emprendedor",
        element: <EntrepreneurPrivate />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
]);
