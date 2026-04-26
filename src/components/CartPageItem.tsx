import { PlusIcon } from "@heroicons/react/24/solid";
import { MinusIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useOutletContext } from "react-router-dom";

import { MAX_ITEM_AMOUNT } from "../utils/consts.js";
import type { ContextType, SelectedItemsType } from "../App.js";

export default function CartPageItem({ item }: { item: SelectedItemsType }) {
    const [setSelectedItems]: ContextType = useOutletContext();

    function changeItemsAmount(item: SelectedItemsType, amount: number) {
        setSelectedItems((prev) => {
            if (item.amount + amount <= 0) {
                return removeItem(prev, item);
            }
            return prev.map((element) => {
                if (element.id === item.id) {
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
    function incrementAmount(item: SelectedItemsType) {
        return changeItemsAmount(item, 1);
    }

    function decrementAmount(item: SelectedItemsType) {
        return changeItemsAmount(item, -1);
    }

    function removeItem(prev: SelectedItemsType[], item: SelectedItemsType) {
        return prev.filter((element) => element.id !== item.id);
    }

    return (
        <li className="item-li-shopping-cart" key={item.id}>
            <h2>{item.title}</h2>
            <img src={item.images[0]} alt={item.title} />
            <p>{item.description}</p>
            <div className="flex gap-[1rem] text-center items-center pb-[1rem] pt-[1rem]">
                <MinusIcon
                    data-testid="minus"
                    className="h-[2rem] hover:cursor-pointer"
                    onClick={() => decrementAmount(item)}
                />
                {item.amount}
                <PlusIcon
                    data-testid="plus"
                    className="h-[2rem] hover:cursor-pointer"
                    onClick={() => incrementAmount(item)}
                />
                <TrashIcon
                    data-testid="trash"
                    className="h-[2rem] ml-auto mr-[1rem] hover:cursor-pointer"
                    onClick={() =>
                        setSelectedItems((prev) => removeItem(prev, item))
                    }
                />
            </div>
        </li>
    );
}
