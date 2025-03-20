import { useState } from "react";
import ImageSlider from "./ImageSlider.jsx";
export default function ItemCard({ product, setSelectedItems }) {
    const [inputValue, setinputValue] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const amount = Number(formData.get(`${product.title}-amount`));
        const item = {
            amount: amount,
            title: product.title,
            price: product.price,
            image: product.images[0],
            description: product.description,
        };
        if (isNaN(amount) || amount <= 0) {
            console.error("Please enter a valid amount");
            return;
        }
        setSelectedItems((prev) => {
            const existingItem = prev.find(
                (element) => element.title === item.title
            );

            if (existingItem) {
                return prev.map((element) =>
                    element.title === item.title
                        ? { ...element, amount: element.amount + item.amount }
                        : element
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
                max={100}
                required
                onChange={(e) => setinputValue(e.currentTarget.value)}
                type="number"
                name={`${product.title}-amount`}
                id={`${product.title}-amount`}
            />
            <button type="submit">Add to cart</button>
        </form>
    );
}
