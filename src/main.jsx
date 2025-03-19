import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import route from "./route.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(route);
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
