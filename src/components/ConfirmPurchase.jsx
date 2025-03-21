export default function ConfirmPurchase({ show, setShow, setSelectedItems }) {
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
