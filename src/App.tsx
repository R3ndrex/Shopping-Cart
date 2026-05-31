import "./App.css";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import {
    ArrowLeftEndOnRectangleIcon,
    MagnifyingGlassIcon,
    Bars3Icon,
    ShoppingBagIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { Outlet, NavLink } from "react-router-dom";
import type { SelectedItemsType } from "./utils/types.js";

export type SetSelectedItemsType = Dispatch<
    SetStateAction<SelectedItemsType[]>
>;

export type ContextType = [SetSelectedItemsType, SelectedItemsType[]];

function App() {
    const [selecteditems, setSelectedItems] = useState<SelectedItemsType[]>([]);
    const amount = useMemo(
        () => selecteditems.reduce((prev, current) => prev + current.amount, 0),
        [selecteditems],
    );
    return (
        <>
            <header>
                <nav className="navbar fixed top-0 w-full z-1 ">
                    <ul className="items-center flex">
                        <Bars3Icon className="h-[2rem] text-[var(--color-text)] mr-[1em] cursor-pointer" />
                        <NavLink
                            to=""
                            className={({ isActive }) =>
                                isActive
                                    ? "move-to-bottom-navbar flex text-[var(--color-accent)] pb-[0.5em] pt-[0.5em] pl-[1.5em] pr-[1.5em] hover:text-[var(--color-accent-hover)] bg-[var(--color-accent-soft)] navlink"
                                    : "move-to-bottom-navbar flex text-[var(--color-text-muted)] pb-[0.5em] pt-[0.5em] pl-[1.5em] pr-[1.5em] navlink"
                            }
                        >
                            Store Page
                        </NavLink>
                        <div className="search-item relative flex-1 mr-[1em]">
                            <MagnifyingGlassIcon className="h-[2rem] w-[2rem] absolute left-[1em] top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="flex-1 text-5xl p-[0.5em] h-full pl-[3em] w-full bg-[var(--color-bg)] outline-0 text-[var(--color-text)] rounded-[var(--radius-pill)] ml-[0.5em] mr-[0.5em]"
                            />
                        </div>
                        <NavLink
                            to="admin-panel"
                            className={({ isActive }) =>
                                isActive
                                    ? "flex gap-[0.5em] pb-[0.5em] pt-[0.5em] pl-[1em] pr-[1em] text-[var(--color-accent)] ml-auto hover:text-[var(--color-accent-hover)] bg-[var(--color-accent-soft)] navlink"
                                    : "flex pb-[0.5em] pt-[0.5em] pl-[1em] pr-[1em] text-[var(--color-text-muted)] gap-[0.5em] navlink"
                            }
                        >
                            <WrenchScrewdriverIcon className="h-[2.5em]" />
                        </NavLink>
                        <NavLink
                            to="register"
                            className={({ isActive }) =>
                                isActive
                                    ? "move-to-bottom-navbar flex pb-[0.5rem] pt-[0.5rem] pl-[0.75rem] pr-[0.75rem] gap-[0.5rem] text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] bg-[var(--color-accent-soft)] navlink"
                                    : "move-to-bottom-navbar flex pb-[0.5rem] pt-[0.5rem] pl-[0.75rem] pr-[0.75rem] text-[var(--color-text-muted)] gap-[0.5rem] navlink"
                            }
                        >
                            <UserCircleIcon className="h-[2.5em]" />
                        </NavLink>
                        <NavLink
                            to="shopping-cart"
                            className={({ isActive }) =>
                                isActive
                                    ? "flex gap-[0.5em] pb-[0.5em] pt-[0.5em] pl-[1em] pr-[1em] text-[var(--color-accent)] ml-auto hover:text-[var(--color-accent-hover)] bg-[var(--color-accent-soft)] navlink"
                                    : "flex pb-[0.5em] pt-[0.5em] pl-[1em] pr-[1em] text-[var(--color-text-muted)] gap-[0.5em] navlink"
                            }
                        >
                            <ShoppingCartIcon className="h-[2.5em]" />
                            {amount}
                        </NavLink>
                    </ul>
                </nav>
            </header>
            <Outlet context={[setSelectedItems, selecteditems]} />
            <nav className="bottom-navbar justify-center flex">
                <ul className="flex justify-center">
                    <NavLink
                        to=""
                        className={({ isActive }) =>
                            isActive
                                ? "flex self-stretch text-[var(--color-accent)] h-full pb-[0.5em] pt-[0.5em] pl-[1.5em] pr-[1.5em] hover:text-[var(--color-accent-hover)] bg-[var(--color-accent-soft)] navlink"
                                : "flex self-stretch text-[var(--color-text-muted)] pb-[0.5em] pt-[0.5em] pl-[1.5em] pr-[1.5em] navlink"
                        }
                    >
                        <ShoppingBagIcon className="h-[2rem]" />
                        Store Page
                    </NavLink>
                    <div className="navlink self-stretch flex pb-[0.5em] pt-[0.5em] pl-[1em] pr-[1em] text-[var(--color-text-muted)] gap-[0.5em] font-medium">
                        <Bars3Icon className="h-[2rem]" />
                        <span>Catalogue</span>
                    </div>
                    <NavLink
                        to="login"
                        className={({ isActive }) =>
                            isActive
                                ? "flex self-stretch pb-[0.5em] pt-[0.5em] pl-[1em] pr-[1em] gap-[0.5em] text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] bg-[var(--color-accent-soft)] navlink"
                                : "flex self-stretch pb-[0.5em] pt-[0.5em] pl-[1em] pr-[1em] text-[var(--color-text-muted)] gap-[0.5em] navlink"
                        }
                    >
                        <ArrowLeftEndOnRectangleIcon className="h-[2.5em]" />
                        <span>Login</span>
                    </NavLink>
                    <NavLink
                        to="register"
                        className={({ isActive }) =>
                            isActive
                                ? "flex self-stretch pb-[0.5rem] pt-[0.5rem] pl-[0.75rem] pr-[0.75rem] gap-[0.5rem] text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] bg-[var(--color-accent-soft)] navlink"
                                : "flex self-stretch pb-[0.5rem] pt-[0.5rem] pl-[0.75rem] pr-[0.75rem] text-[var(--color-text-muted)] gap-[0.5rem] navlink"
                        }
                    >
                        <UserCircleIcon className="h-[2.5em]" />
                        <span>Register</span>
                    </NavLink>
                </ul>
            </nav>
        </>
    );
}

export default App;
