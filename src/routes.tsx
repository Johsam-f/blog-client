import Signup from "./pages/auth/signup";
import ErrorPage from "./pages/errorPage";

const routes = [
    {
      path: "/",
      element: <Signup />,
      errorElement: <ErrorPage/>
    },
    // {
    //   path: "/dashboard",
    //   element: <Dashboard />,
    //   children: [
    //     {
    //       path: "",
    //       element: <Games />
    //     },
    //     {
    //       path: "games/:category",
    //       element: <Games />
    //     }
    //   ]
    // },
    // {
    //   path: "/game_details/:name/:id",
    //   element: <GameDetails />
    // }
  ]

export default routes;