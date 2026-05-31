import { useMemo, type FormEvent } from "react";
import ImageSlider from "./ImageSlider.js";
import { MAX_ITEM_AMOUNT } from "../utils/consts.js";
import type { ProductMinimalDTO } from "../utils/dto/product.dto.js";
import type { SetSelectedItemsType } from "../App.js";
interface ParamTypes {
    product: ProductMinimalDTO;
    setSelectedItems: SetSelectedItemsType;
}

export default function ItemCard({ product, setSelectedItems }: ParamTypes) {
    const fullProduct = useMemo(async () => {
        return await fetch(
            `${import.meta.env.VITE_API_URL}/product/${product.id}-${product.slug}`,
        ).then((res) => res.json());
    }, [product]);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSelectedItems((prev) => {
            const existingItem = prev.find(
                (element) => element.id === fullProduct.id,
            );
            if (existingItem) {
                return prev.map((element) =>
                    element.id === fullProduct.id
                        ? { ...element, amount: element.amount + 1 }
                        : element,
                );
            } else {
                const item = { ...fullProduct, amount: 1 };
                return [...prev, item];
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="store-item">
            <h2>{product.name}</h2>
            <ImageSlider images={product.images} alt={product.name} />
            <div className="flex justify-between pl-[1rem] items-center">
                <span>{product.price}$</span>
                <button type="submit">Add to cart</button>
            </div>
        </form>
    );
}
