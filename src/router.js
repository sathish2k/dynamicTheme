import { useRoutes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./layout/header";
import Login from "./pages/login";
import { PrivateRoute } from "./privateRoute";

const WithHeader = (Component) => {
  return (
    <>
      <Header />
      <Component />
    </>
  );
};
const Routes = () => {
  const element = useRoutes([
    { path: "/", element: <PrivateRoute>{WithHeader(Home)}</PrivateRoute> },
    {
      path: "login",
      element: <Login />,
    },
  ]);
  return element;
};
export default Routes;
