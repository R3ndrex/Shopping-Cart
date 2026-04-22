import App from "./App";
import CartPage from "./components/CartPage";
import StorePage from "./components/StorePage";
import ErrorPage from "./pages/ErrorPage";
import getPagesAmount from "./components/getPagesAmount.js";

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
