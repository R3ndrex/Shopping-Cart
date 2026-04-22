import App from "./App";
import CartPage from "./pages/CartPage";
import StorePage from "./pages/StorePage";
import ErrorPage from "./pages/ErrorPage";
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
