import { useMemo, useState } from "react";
import "./App.css";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Outlet, NavLink } from "react-router-dom";
function App() {
    const [selecteditems, setSelectedItems] = useState([]);
    const amount = useMemo(
        () => selecteditems.reduce((prev, current) => prev + current.amount, 0),
        [selecteditems]
    );
    return (
        <>
            <header>
                <nav className="navbar">
                    <ul>
                        <NavLink
                            to=""
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-[#a33298] text-white navlink"
                                    : "navlink"
                            }
                        >
                            Main
                        </NavLink>
                        <NavLink
                            to="store"
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-[#a33298] text-white navlink"
                                    : "navlink"
                            }
                        >
                            Store Page
                        </NavLink>
                        <NavLink
                            to="shopping-cart"
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-[#a33298] flex gap-[1rem] ml-auto text-white navlink"
                                    : "flex gap-[1rem] ml-auto navlink"
                            }
                        >
                            {amount} <ShoppingCartIcon className="h-[3rem] " />
                        </NavLink>
                    </ul>
                </nav>
            </header>
            <Outlet context={[setSelectedItems, selecteditems]} />
        </>
    );
}

export default App;
