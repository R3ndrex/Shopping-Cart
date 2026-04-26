import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ItemCard from "../components/ItemCard.js";
import type { ProductType } from "../utils/types.js";
import { userEvent } from "@testing-library/user-event";
const product: ProductType = {
    title: "Title",
    price: 3.33,
    images: ["a", "b", "c"],
    id: 1,
    slug: "title",
    description: "",
    creationAt: "asdas",
    updatedAt: "",
};

describe("Item Card", () => {
    it("add correct amount of items", async () => {
        const setSelectedItems = vi.fn();
        const user = userEvent.setup();
        render(
            <ItemCard product={product} setSelectedItems={setSelectedItems} />,
        );

        await user.type(screen.getByPlaceholderText(/amount/i), "3");
        await user.click(screen.getByText(/add to cart/i));

        expect(setSelectedItems).toBeCalledTimes(1);
    });

    it("doesnt add if empty input", async () => {
        const setSelectedItems = vi.fn();
        const user = userEvent.setup();
        render(
            <ItemCard product={product} setSelectedItems={setSelectedItems} />,
        );

        await user.click(screen.getByText(/add to cart/i));

        expect(setSelectedItems).not.toBeCalled();
    });
    it("changes to default amount after adding to cart", async () => {
        const setSelectedItems = vi.fn();
        const user = userEvent.setup();
        render(
            <ItemCard product={product} setSelectedItems={setSelectedItems} />,
        );

        await user.type(screen.getByPlaceholderText(/amount/i), "3");
        await user.click(screen.getByText(/add to cart/i));

        expect(screen.getByPlaceholderText(/amount/i)).toHaveTextContent("");
    });

    it("renders correctly", () => {
        const setSelectedItems = vi.fn();
        const { container } = render(
            <ItemCard product={product} setSelectedItems={setSelectedItems} />,
        );

        expect(container).toMatchSnapshot();
    });
});
