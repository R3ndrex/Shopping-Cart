import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CartPageItem from "../src/components/CartPageItem";
import userEvent from "@testing-library/user-event";
import { useOutletContext } from "react-router-dom";

vi.mock("react-router-dom", () => ({
    ...vi.importActual("react-router-dom"),
    useOutletContext: vi.fn(),
}));

const item = { title: "name", amount: 1, cost: 4 };
describe("CartPageItem", () => {
    it("calls setter function on plus click", async () => {
        const setter = vi.fn();
        useOutletContext.mockReturnValue([setter, []]);
        const user = userEvent.setup();
        render(<CartPageItem item={item} />);

        await user.click(screen.getByTestId("plus"));

        expect(setter).toBeCalled();
    });

    it("calls setter function on minus click", async () => {
        const setter = vi.fn();
        useOutletContext.mockReturnValue([setter, []]);
        const user = userEvent.setup();
        render(<CartPageItem item={item} />);

        await user.click(screen.getByTestId("minus"));

        expect(setter).toBeCalled();
    });

    it("calls setter function on trash click", async () => {
        const setter = vi.fn();
        useOutletContext.mockReturnValue([setter, []]);
        const user = userEvent.setup();
        render(<CartPageItem item={item} />);

        await user.click(screen.getByTestId("trash"));

        expect(setter).toBeCalled();
    });

    it("renders correctly", () => {
        const { container } = render(
            <CartPageItem
                item={item}
                handleDecrementAmount={vi.fn()}
                handleIncrementAmount={vi.fn()}
            />
        );

        expect(container).toMatchSnapshot();
    });
});
