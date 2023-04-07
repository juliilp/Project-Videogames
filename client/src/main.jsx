import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./vistas/Home/Home";
import Detail from "./vistas/Detail/Detail";
import CreateGame from "./vistas/CreateGame/CreateGame";
import NotFound from "./componentes/NotFound/NotFound";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";
axios.defaults.baseURL = "https://backend-videogames-zrk3.onrender.com/";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <h1>Error</h1>,
  },
  {
    path: "/:id",
    element: <Detail />,
  },
  {
    path: "/creategame",
    element: <CreateGame />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
