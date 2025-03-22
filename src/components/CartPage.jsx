import { useMemo, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import ConfirmPurchase from "./ConfirmPurchase";
import CartPageItem from "./CartPageItem";
export default function CartPage() {
    const navigate = useNavigate();
    const [setSelectedItems, selectedItems] = useOutletContext();
    const [confirm, setConfirm] = useState(false);
    const allItemsPrice = useMemo(
        () =>
            selectedItems.reduce(
                (prev, current) => prev + current.price * current.amount,
                0
            ),
        [selectedItems]
    );

    function ChangeItemsAmount(item, amount) {
        setSelectedItems((prev) => {
            const existingItem = prev.find(
                (element) => element.title === item.title
            );

            if (existingItem) {
                return prev.map((element) => {
                    if (element.title === item.title) {
                        if (item.amount + amount <= 0) {
                            removeItem(item);
                        }
                        return { ...element, amount: element.amount + amount };
                    }
                    return element;
                });
            }
            return prev;
        });
    }
    function handleIncrementAmount(item) {
        ChangeItemsAmount(item, 1);
    }
    function handleDecrementAmount(item) {
        ChangeItemsAmount(item, -1);
    }

    function removeItem(item) {
        setSelectedItems((prev) => {
            const existingItem = prev.find(
                (element) => element.title === item.title
            );

            if (existingItem)
                return prev.filter((element) => element.title !== item.title);

            return prev;
        });
    }

    return (
        <>
            {selectedItems.length !== 0 ? (
                <main>
                    <ul>
                        {selectedItems.map((item) => (
                            <CartPageItem
                                item={item}
                                handleDecrementAmount={handleDecrementAmount}
                                handleIncrementAmount={handleIncrementAmount}
                                handleRemoveItem={removeItem}
                            />
                        ))}
                    </ul>
                    <div className="mb-[1rem] flex gap-[1rem] items-center justify-end">
                        Cost: <strong> {allItemsPrice} $</strong>
                        <button onClick={() => setConfirm(true)}>Buy</button>
                    </div>
                    <ConfirmPurchase
                        show={confirm}
                        setShow={setConfirm}
                        setSelectedItems={setSelectedItems}
                    />
                </main>
            ) : (
                <main className="flex flex-col gap-[1rem] items-center m-[2rem] text-center">
                    <h1>Your cart is empty </h1>
                    <button onClick={() => navigate("/")}>
                        Go to store page
                    </button>
                </main>
            )}
        </>
    );
}
