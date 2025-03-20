import { useOutletContext } from "react-router-dom";
import ItemCard from "./ItemCard";
import useFetchData from "../utils/useFetchData.jsx";
import { useState } from "react";
import Pagination from "./Pagination.jsx";
export default function StorePage() {
    const [page, setPage] = useState(0);
    const [products, error, loading] = useFetchData(
        `https://api.escuelajs.co/api/v1/products?offset=${page * 10}&limit=10`,
        { mode: "cors" }
    );
    const [setSelectedItems] = useOutletContext();
    return (
        <>
            <main>
                {loading && <div>Loading...</div>}
                {error && <div>{error.message}</div>}
                {products && (
                    <ul className="store-items">
                        {products.map((product) => (
                            <ItemCard
                                key={product.id}
                                setSelectedItems={setSelectedItems}
                                product={product}
                            />
                        ))}
                    </ul>
                )}
                <Pagination setter={setPage} value={page} min={0} max={3} />
            </main>
        </>
    );
}
