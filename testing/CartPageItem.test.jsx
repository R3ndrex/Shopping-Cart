import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CartPageItem from "../src/components/CartPageItem";
import userEvent from "@testing-library/user-event";

const item = { title: "name", amount: 1, cost: 4 };
describe("CartPageItem", () => {
    it("calls increment function items", async () => {
        const incrementButton = vi.fn();
        const user = userEvent.setup();
        render(
            <CartPageItem
                item={item}
                handleDecrementAmount={vi.fn()}
                handleIncrementAmount={incrementButton}
            />
        );

        await user.click(screen.getByTestId("plus"));

        expect(incrementButton).toBeCalled();
    });

    it("calls increment function items", async () => {
        const decrementButton = vi.fn();
        const user = userEvent.setup();
        render(
            <CartPageItem
                item={item}
                handleDecrementAmount={decrementButton}
                handleIncrementAmount={vi.fn()}
            />
        );

        await user.click(screen.getByTestId("minus"));

        expect(decrementButton).toBeCalled();
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
