import { PlusIcon } from "@heroicons/react/24/solid";
import { MinusIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useOutletContext } from "react-router-dom";

import { MAX_ITEM_AMOUNT } from "../App";

export default function CartPageItem({ item }) {
    const [setSelectedItems, _] = useOutletContext();

    function ChangeItemsAmount(item, amount) {
        setSelectedItems((prev) => {
            if (item.amount + amount <= 0) {
                return removeItem(prev, item);
            }
            return prev.map((element) => {
                if (element.title === item.title) {
                    if (element.amount < MAX_ITEM_AMOUNT || amount < 0)
                        return {
                            ...element,
                            amount: element.amount + amount,
                        };
                }
                return element;
            });
        });
    }
    const incrementAmount = (item) => ChangeItemsAmount(item, 1);

    const decrementAmount = (item) => ChangeItemsAmount(item, -1);

    const removeItem = (prev, item) =>
        prev.filter((element) => element.title !== item.title);

    return (
        <li className="item-li-shopping-cart" key={item.id}>
            <h2>{item.title}</h2>
            <img src={item.image} alt={item.title} />
            <p>{item.description}</p>
            <div className="flex gap-[1rem] text-center items-center pb-[1rem] pt-[1rem]">
                <TrashIcon
                    data-testid="trash"
                    className="h-[2rem]"
                    onClick={() =>
                        setSelectedItems((prev) => removeItem(prev, item))
                    }
                />
                <MinusIcon
                    data-testid="minus"
                    className="h-[2rem]"
                    onClick={() => decrementAmount(item)}
                />
                Amount: {item.amount}
                <PlusIcon
                    data-testid="plus"
                    className="h-[2rem]"
                    onClick={() => incrementAmount(item)}
                />
            </div>
        </li>
    );
}
