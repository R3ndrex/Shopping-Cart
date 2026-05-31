import { useOutletContext } from "react-router-dom";
import type { Dispatch } from "react";
import type { ContextType } from "../App.js";
import type { SetStateAction } from "react";

interface ParamTypes {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

export default function ConfirmPurchase({ show, setShow }: ParamTypes) {
    const [setSelectedItems]: ContextType = useOutletContext();
    function handleBuying() {
        setShow(false);
        setSelectedItems([]);
    }

    if (show) {
        return (
            <dialog open className="purchase-dialog">
                <div className="confirm-container">
                    <h1>We need you to confirm this purchase</h1>
                    <p>Please review your order details before confirming.</p>
                    <div className="flex gap-[1rem]">
                        <button onClick={handleBuying}>Confirm Purchase</button>
                        <button onClick={() => setShow(false)}>Exit</button>
                    </div>
                </div>
            </dialog>
        );
    }
    return;
}
