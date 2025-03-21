import { PlusIcon } from "@heroicons/react/24/solid";
import { MinusIcon } from "@heroicons/react/24/solid";
export default function CartPageItem({
    item,
    handleDecrementAmount,
    handleIncrementAmount,
}) {
    return (
        <li className="item-li-shopping-cart" key={item.id}>
            <h2>{item.title}</h2>
            <img src={item.image} alt={item.title} />
            <p>{item.description}</p>
            <div className="flex gap-[1rem]">
                <MinusIcon
                    data-testid="minus"
                    className="h-[2rem]"
                    onClick={() => handleDecrementAmount(item)}
                />{" "}
                Amount: {item.amount}{" "}
                <PlusIcon
                    data-testid="plus"
                    className="h-[2rem]"
                    onClick={() => handleIncrementAmount(item)}
                />
            </div>
        </li>
    );
}
