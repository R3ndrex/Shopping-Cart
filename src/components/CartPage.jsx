import { useMemo } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function CartPage() {
    const navigate = useNavigate();
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
            {selectedItems.length > 1 ? (
                <>
                    <ul>
                        {selectedItems.map((item) => (
                            <li className="item-li-shopping-cart">
                                <h2>{item.title}</h2>
                                <img src={item.image} alt={item.title} />
                                <p>{item.description}</p>
                                <div>
                                    Amount: {item.amount}{" "}
                                    <button onClick={() => handleAdd(item)}>
                                        Add
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mb-[1rem]">
                        Cost: <strong> {allItemsPrice} $</strong>
                    </div>
                </>
            ) : (
                <div className="flex flex-col gap-[1rem] items-center m-[2rem]">
                    <h1>Your cart is empty </h1>
                    <button onClick={() => navigate("/store")}>
                        Go to store page
                    </button>
                </div>
            )}
        </>
    );
}
