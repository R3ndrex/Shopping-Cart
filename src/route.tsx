import App from "./App.js";
import CartPage from "./pages/CartPage.js";
import StorePage from "./pages/StorePage.js";
import ErrorPage from "./pages/ErrorPage.js";
import getPagesAmount from "./utils/getPagesAmount.js";

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
        ],
    },
];

export default route;
