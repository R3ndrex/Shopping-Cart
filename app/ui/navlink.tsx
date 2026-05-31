"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

type NavLinkProps = {
    href: string;
    children?: React.ReactNode;
    className?: string;
};

export default function NavLink({ href, children, className }: NavLinkProps) {
    const pathname = usePathname();
    return (
        <Link
            href={href}
            className={clsx(
                `${className}  flex text-(--color-text-muted) pb-[0.5em] pt-[0.5em] pl-[1.5em] pr-[1.5em] rounded-lg`,
                {
                    "text-(--color-accent) hover:text-(--color-accent-hover) bg-(--color-accent-soft)  pb-[0.5em] pt-[0.5em] pl-[1.5em] pr-[1.5em]":
                        pathname === href,
                },
            )}
        >
            {children}
        </Link>
    );
}
