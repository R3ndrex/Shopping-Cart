import App from "./App";
import CartPage from "./components/CartPage";
import ItemPage from "./components/ItemPage";
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
            {
                path: "store/:id",
                element: <ItemPage />,
            },
        ],
    },
];

export default route;
