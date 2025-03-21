import { PlusIcon } from "@heroicons/react/24/solid";
import { MinusIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
export default function CartPageItem({
    item,
    handleDecrementAmount,
    handleIncrementAmount,
    handleRemoveItem,
}) {
    return (
        <li className="item-li-shopping-cart" key={item.id}>
            <h2>{item.title}</h2>
            <img src={item.image} alt={item.title} />
            <p>{item.description}</p>
            <div className="flex gap-[1rem] text-center items-center pb-[1rem] pt-[1rem]">
                <TrashIcon
                    data-testid="trash"
                    className="h-[2rem]"
                    onClick={() => handleRemoveItem(item)}
                />
                <MinusIcon
                    data-testid="minus"
                    className="h-[2rem]"
                    onClick={() => handleDecrementAmount(item)}
                />
                Amount: {item.amount}
                <PlusIcon
                    data-testid="plus"
                    className="h-[2rem]"
                    onClick={() => handleIncrementAmount(item)}
                />
            </div>
        </li>
    );
}
