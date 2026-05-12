import { createRoot } from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.tsx";
import ProductsList from "./pages/ProductsList.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import Cart from "./pages/Cart.tsx";
import Register from "./pages/Register.tsx";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <ProductsList />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  </StrictMode>,
);
