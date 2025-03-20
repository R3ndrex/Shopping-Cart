import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";

export default function CartPage() {
    const [setSelectedItems, selectedItems] = useOutletContext();
    const allItemsPrice = useMemo(
        () =>
            selectedItems.reduce(
                (prev, current) => prev + current.price * current.amount,
                0
            ),
        [selectedItems]
    );
    function handleAdd(item) {
        setSelectedItems((prev) => {
            const existingItem = prev.find(
                (element) => element.title === item.title
            );

            if (existingItem) {
                return prev.map((element) =>
                    element.title === item.title
                        ? { ...element, amount: element.amount + 1 }
                        : element
                );
            }
            return;
        });
    }
    return (
        <>
            <ul>
                {selectedItems.map((item) => (
                    <li className="item-li-shopping-cart">
                        <h2>{item.title}</h2>
                        <img src={item.image} alt={item.title} />
                        <p>{item.description}</p>
                        <div>
                            Amount: {item.amount}{" "}
                            <button onClick={() => handleAdd(item)}>Add</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mb-[1rem]">
                Cost: <strong> {allItemsPrice} $</strong>
            </div>
        </>
    );
}
