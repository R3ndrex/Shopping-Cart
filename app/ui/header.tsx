import NavLink from "./navlink";
import { Wrench, ShoppingBasket, User } from "lucide-react";
import HeaderSearch from "./headerSearch";
export default function Header({ amount }: { amount: number }) {
    return (
        <header>
            <nav className="fixed top-0 w-full z-1 p-5 border-border border-b bg-card">
                <ul className="items-center flex">
                    <NavLink className="hidden md:block" href="/">
                        Store Page
                    </NavLink>
                    <HeaderSearch />
                    <NavLink className="hidden md:block" href="/admin-panel">
                        <Wrench />
                    </NavLink>
                    <NavLink className="hidden md:block" href="/register">
                        <User />
                    </NavLink>
                    <NavLink href="/basket">
                        <ShoppingBasket />
                        {amount}
                    </NavLink>
                </ul>
            </nav>
        </header>
    );
}
// <header>
//     <nav className="navbar fixed top-0 w-full z-1 ">
//         <ul className="items-center flex">
//             {/* <Bars3Icon className="h-[2rem] text-[var(--color-text)] mr-[1em] cursor-pointer" /> */}
//             <Link
//                 to=""
//                 className={clsx("move-to-bottom-navbar flex text-[var(--color-accent)] pb-[0.5em] pt-[0.5em] pl-[1.5em] pr-[1.5em] hover:text-[var(--color-accent-hover)] bg-[var(--color-accent-soft)] navlink"
//                         ,{"flex text-[var(--color-text-muted)] pb-[0.5em] pt-[0.5em] pl-[1.5em] pr-[1.5em] navlink":pathname===""
//                 }
//             >
//                 Store Page
//             </Link>
//             <div className="search-item relative flex-1 mr-[1em]">
//                 {/* <MagnifyingGlassIcon className="h-[2rem] w-[2rem] absolute left-[1em] top-1/2 -translate-y-1/2" /> */}
//                 <input
//                     type="text"
//                     placeholder="Search..."
//                     className="flex-1 text-5xl p-[0.5em] h-full pl-[3em] w-full bg-[var(--color-bg)] outline-0 text-[var(--color-text)] rounded-[var(--radius-pill)] ml-[0.5em] mr-[0.5em]"
//                 />
//             </div>
//             <Link
//                 to="admin-panel"
//                 className={({ isActive }) =>
//                     isActive
//                         ? "flex gap-[0.5em] pb-[0.5em] pt-[0.5em] pl-[1em] pr-[1em] text-[var(--color-accent)] ml-auto hover:text-[var(--color-accent-hover)] bg-[var(--color-accent-soft)] navlink"
//                         : "flex pb-[0.5em] pt-[0.5em] pl-[1em] pr-[1em] text-[var(--color-text-muted)] gap-[0.5em] navlink"
//                 }
//             >
//                 {/* <WrenchScrewdriverIcon className="h-[2.5em]" /> */}
//             </Link>
//             <Link
//                 to="register"
//                 className={({ isActive }) =>
//                     isActive
//                         ? "move-to-bottom-navbar flex pb-[0.5rem] pt-[0.5rem] pl-[0.75rem] pr-[0.75rem] gap-[0.5rem] text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] bg-[var(--color-accent-soft)] navlink"
//                         : "move-to-bottom-navbar flex pb-[0.5rem] pt-[0.5rem] pl-[0.75rem] pr-[0.75rem] text-[var(--color-text-muted)] gap-[0.5rem] navlink"
//                 }
//             >
//                 {/* <UserCircleIcon className="h-[2.5em]" /> */}
//             </Link>
//             <Link
//                 to="shopping-cart"
//                 className={({ isActive }) =>
//                     isActive
//                         ? "flex gap-[0.5em] pb-[0.5em] pt-[0.5em] pl-[1em] pr-[1em] text-[var(--color-accent)] ml-auto hover:text-[var(--color-accent-hover)] bg-[var(--color-accent-soft)] navlink"
//                         : "flex pb-[0.5em] pt-[0.5em] pl-[1em] pr-[1em] text-[var(--color-text-muted)] gap-[0.5em] navlink"
//                 }
//             >
//                 {/* <ShoppingCartIcon className="h-[2.5em]" /> */}
//                 {amount}
//             </Link>
//         </ul>
//     </nav>
// </header>
//     );
// }
