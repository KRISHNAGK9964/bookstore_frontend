import React, {} from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Book/Home";
import Book from "./pages/Book/Book";
import Error from "./pages/Error";

const Routes = createBrowserRouter([
  {
    id: "auth-login",
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    id: "auth-signup",
    path: "/signup",
    element: <Signup />,
    errorElement: <Error />,
  },
  {
    id: "home",
    path: "/",
    element: <Home />,
    errorElement: <Error />
  },
  {
    id: "book",
    path: "/:bookId",
    element: <Book />,
    errorElement: <Error />
  },
  {
    id: "snap",
    path: "/error",
    element: <Error />
  },
  {
    path: "*",
    element: <div>OOPS</div>,
  },
]);



interface appProps {}

const App: React.FC<appProps> = () => {
  return (
      <RouterProvider router={Routes} />
  );
};

export default App;
