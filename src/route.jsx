import App from "./App";
import CartPage from "./components/CartPage";
import MainPage from "./components/MainPage";
import StorePage from "./components/StorePage";

const route = [
    {
        path: "",
        element: <App />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },

            {
                path: "store",
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
