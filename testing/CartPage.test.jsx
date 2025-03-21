import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CartPage from "../src/components/CartPage";
import { useOutletContext } from "react-router-dom";

vi.mock("react-router-dom", () => ({
    ...vi.importActual("react-router-dom"),
    useOutletContext: vi.fn(),
    useNavigate: vi.fn(),
}));

const products = [
    {
        title: "TestTitle1",
        price: 22,
        amount: 2,
        image: "ff",
        description: "Description",
    },
    {
        title: "TestTitle2",
        price: 223,
        amount: 1,
        image: "b",
        description: "Description3",
    },
];

describe("CartPage", () => {
    it("renders 'empty cart' when no selected items", () => {
        useOutletContext.mockReturnValue([vi.fn(), []]);
        render(<CartPage />);

        expect(screen.getByText(/is empty$/)).toBeInTheDocument();
    });

    it("renders cart list with selected items", () => {
        useOutletContext.mockReturnValue([vi.fn(), products]);
        render(<CartPage />);

        expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("renders cart correct cost", () => {
        useOutletContext.mockReturnValue([vi.fn(), products]);
        render(<CartPage />);

        expect(screen.getByText(/267/)).toBeInTheDocument();
    });
});
