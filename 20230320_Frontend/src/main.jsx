import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import Home from "./pages/home page/home";
import ConfigurationPage from "./pages/configuration page/configuration.page";
import NewConfig from "./pages/configuration page/new.configration";
import StartSystemButton from "./pages/configuration page/start";
import CustomerDetailPage from "./pages/customer page/customer.detail";
import VendorDetailPage from "./pages/vendor page/vender.detail";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/newConfiguration",
    element: <NewConfig/>,
  },
  {
    path: "configuration",
    element: <ConfigurationPage/>,
  },
  {
    path: "/add",
    element: <StartSystemButton/>
  },
  {
    path: "/customer-details",
    element: <CustomerDetailPage/>,
  },
  {
    path: "/vendor-details",
    element: <VendorDetailPage/>,
  },
]); 



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
