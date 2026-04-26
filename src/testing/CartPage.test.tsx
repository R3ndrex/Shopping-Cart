import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CartPage from "../pages/CartPage.js";
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
        images: ["", ""],
    },
    {
        title: "TestTitle2",
        price: 223,
        amount: 1,
        image: "b",
        description: "Description3",
        images: ["", ""],
    },
];
const mockedUseOutletContext = vi.mocked(useOutletContext);

describe("CartPage", () => {
    it("renders 'empty cart' when no selected items", () => {
        mockedUseOutletContext.mockReturnValue([vi.fn(), []]);
        render(<CartPage />);

        expect(screen.getByText(/is empty$/)).toBeInTheDocument();
    });

    it("renders cart list with selected items", () => {
        mockedUseOutletContext.mockReturnValue([vi.fn(), products]);
        render(<CartPage />);

        expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("renders cart correct cost", () => {
        mockedUseOutletContext.mockReturnValue([vi.fn(), products]);
        render(<CartPage />);

        expect(screen.getByText(/267/)).toBeInTheDocument();
    });
});
