import { createRoot } from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import your layouts and pages
import MainLayout from "./layouts/MainLayout.tsx";
import ProductsList from "./pages/ProductsList.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import Cart from "./pages/Cart.tsx";
import NotFound from "./pages/NotFound.tsx";

// Define the router with proper configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Parent layout with Navbar + Outlet
    errorElement: <NotFound />, // Shows when route error occurs
    children: [
      {
        index: true, // This renders at the parent path "/"
        element: <ProductsList />,
      },
      {
        path: "product/:id", // Dynamic route with parameter
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "*", // Catch-all route for 404
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
