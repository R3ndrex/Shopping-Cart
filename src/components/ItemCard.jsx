import { useState } from "react";
import ImageSlider from "./ImageSlider.jsx";
export default function ItemCard({ product, setSelectedItems }) {
    const [inputValue, setinputValue] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        console.log(1);
        const formData = new FormData(e.currentTarget);
        const item = {
            amount: Number(formData.get(`${product.title}-amount`)),
            title: product.title,
            price: product.price,
        };
        setSelectedItems((prev) => {
            if (prev.some((element) => element.title === item.title)) {
                return prev.map((element) => {
                    if (element.title === item.title)
                        return {
                            ...element,
                            amount: element.amount + item.amount,
                        };
                });
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
