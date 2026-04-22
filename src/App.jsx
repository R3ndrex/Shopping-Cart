import "./App.css";
import { useMemo, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Outlet, NavLink } from "react-router-dom";

function App() {
    const [selecteditems, setSelectedItems] = useState([]);
    const amount = useMemo(
        () => selecteditems.reduce((prev, current) => prev + current.amount, 0),
        [selecteditems],
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
                                    ? " text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] bg-[var(--color-accent-hover)] navlink"
                                    : "text-[var(--color-text-muted)] navlink"
                            }
                        >
                            Store Page
                        </NavLink>
                        <NavLink
                            to="shopping-cart"
                            className={({ isActive }) =>
                                isActive
                                    ? "flex gap-[1rem] text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] bg-[var(--color-accent-soft)] ml-auto navlink"
                                    : "flex text-[var(--color-text-muted)] gap-[1rem] ml-auto navlink"
                            }
                        >
                            <ShoppingCartIcon className="h-[2.5rem]" />
                            {amount}
                        </NavLink>
                    </ul>
                </nav>
            </header>
            <Outlet context={[setSelectedItems, selecteditems]} />
        </>
    );
}

export default App;
