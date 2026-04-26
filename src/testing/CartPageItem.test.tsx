import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CartPageItem from "../components/CartPageItem.js";
import { userEvent } from "@testing-library/user-event";
import { useOutletContext } from "react-router-dom";

vi.mock("react-router-dom", () => ({
    ...vi.importActual("react-router-dom"),
    useOutletContext: vi.fn(),
}));

const itemWithImages = {
    title: "Title",
    price: 3.33,
    images: ["a", "b", "c"],
    id: 1,
    slug: "title",
    description: "",
    creationAt: "asdas",
    updatedAt: "",
    amount: 1,
};

const mockedUseOutletContext = vi.mocked(useOutletContext);

describe("CartPageItem", () => {
    it("calls setter function on plus click", async () => {
        const setter = vi.fn();
        mockedUseOutletContext.mockReturnValue([setter, []]);
        const user = userEvent.setup();
        render(<CartPageItem item={itemWithImages} />);

        await user.click(screen.getByTestId("plus"));

        expect(setter).toBeCalled();
    });

    it("calls setter function on minus click", async () => {
        const setter = vi.fn();
        mockedUseOutletContext.mockReturnValue([setter, []]);
        const user = userEvent.setup();
        render(<CartPageItem item={itemWithImages} />);

        await user.click(screen.getByTestId("minus"));

        expect(setter).toBeCalled();
    });

    it("calls setter function on trash click", async () => {
        const setter = vi.fn();
        mockedUseOutletContext.mockReturnValue([setter, []]);
        const user = userEvent.setup();
        render(<CartPageItem item={itemWithImages} />);

        await user.click(screen.getByTestId("trash"));

        expect(setter).toBeCalled();
    });

    it("renders correctly", () => {
        const { container } = render(<CartPageItem item={itemWithImages} />);
        expect(container).toMatchSnapshot();
    });
});
