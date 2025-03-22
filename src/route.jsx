import App from "./App";
import CartPage from "./components/CartPage";
import StorePage from "./components/StorePage";
import ErrorPage from "./components/ErrorPage";

const route = [
    {
        path: "",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <StorePage />,
            },
            {
                path: "shopping-cart",
                element: <CartPage />,
            },
        ],
    },
];

export default route;
