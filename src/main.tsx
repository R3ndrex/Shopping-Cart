import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import route from "./route.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(route);

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
