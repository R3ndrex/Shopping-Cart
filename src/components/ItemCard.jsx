import { useState } from "react";
import ImageSlider from "./ImageSlider.jsx";
import { MAX_ITEM_AMOUNT } from "../utils/consts.js";

export default function ItemCard({ product, setSelectedItems }) {
    const [inputValue, setinputValue] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const amount = Number(formData.get(`${product.title}-amount`));
        const item = {
            ...product,
            amount: amount,
        };
        if (isNaN(amount) || amount <= 0) {
            console.error("This amount cannot be added");
            return;
        }
        setSelectedItems((prev) => {
            const existingItem = prev.find(
                (element) => element.title === item.title,
            );

            if (existingItem) {
                return prev.map((element) =>
                    element.title === item.title
                        ? { ...element, amount: element.amount + item.amount }
                        : element,
                );
            }
            return [...prev, item];
        });
        setinputValue("");
    }
    return (
        <form onSubmit={handleSubmit} className="store-item">
            <h2>{product.title}</h2>
            <ImageSlider images={product.images} alt={product.title} />
            <input
                placeholder="Amount"
                min={1}
                value={inputValue}
                max={MAX_ITEM_AMOUNT}
                required
                onChange={(e) => setinputValue(e.currentTarget.value)}
                type="number"
                name={`${product.title}-amount`}
                id={`${product.title}-amount`}
            />
            <div className="flex justify-between pl-[1rem] items-center">
                <span>{product.price}$</span>
                <button type="submit">Add to cart</button>
            </div>
        </form>
    );
}
