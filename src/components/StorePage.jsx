import { useOutletContext } from "react-router-dom";
import { useState } from "react";

import useFetchData from "../utils/useFetchData.jsx";
import Pagination from "./Pagination.jsx";
import ItemCard from "./ItemCard";

export default function StorePage() {
    const [page, setPage] = useState(0);
    const [products, error, loading] = useFetchData(
        `https://api.escuelajs.co/api/v1/products?offset=${page * 10}&limit=10`
    );
    const [setSelectedItems] = useOutletContext();

    return (
        <main>
            {loading && (
                <div className="flex justify-center items-center">
                    <div className="lds-dual-ring"></div>
                </div>
            )}
            {error && (
                <div className="flex flex-col justify-center items-center text-center gap-[1rem]">
                    <h1>Oops, it seems there was an error with getting data</h1>
                    <p>Error: {error.message}</p>
                </div>
            )}
            {products && (
                <>
                    <ul className="store-items">
                        {products.map((product) => (
                            <ItemCard
                                key={product.id}
                                setSelectedItems={setSelectedItems}
                                product={product}
                            />
                        ))}
                    </ul>
                    <Pagination setter={setPage} value={page} min={0} max={3} />
                </>
            )}
        </main>
    );
}
