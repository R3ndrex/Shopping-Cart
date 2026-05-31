import App from "./App.js";
import CartPage from "./pages/CartPage.js";
import StorePage from "./pages/StorePage.js";
import ErrorPage from "./pages/ErrorPage.js";
import getPagesAmount from "./utils/getPagesAmount.js";
import { LoginPage } from "./pages/LoginPage.js";
import { RegisterPage } from "./pages/RegisterPage.js";
import AdminPanelPage from "./pages/AdminPanel.js";
const route = [
    {
        path: "",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <StorePage />,
                loader: getPagesAmount,
            },
            {
                path: "shopping-cart",
                element: <CartPage />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
            {
                path: "admin-panel",
                element: <AdminPanelPage />,
            },
        ],
    },
];

export default route;
