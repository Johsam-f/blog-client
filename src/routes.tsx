import Signup from "./pages/auth/signup";
import ErrorPage from "./pages/errorPage";
import Dashboard from "./pages/dashboard";
import PostDetails from "./pages/postDetails";
import Login from "./pages/auth/login";

const routes = [
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage/>
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
    {
      path: "/post/:slug",
      element: <PostDetails />
    }
  ]

export default routes;