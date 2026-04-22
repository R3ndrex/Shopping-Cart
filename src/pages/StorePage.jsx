import { useLoaderData, useOutletContext } from "react-router-dom";
import { useState } from "react";
import useFetchData from "../utils/useFetchData.jsx";
import Pagination from "../components/Pagination.jsx";
import ItemCard from "../components/ItemCard.jsx";
import { ITEMS_PER_PAGE } from "../utils/consts.js";

export default function StorePage() {
    const [page, setPage] = useState(0);
    const [products, error, loading] = useFetchData(
        `https://api.escuelajs.co/api/v1/products?offset=${page * ITEMS_PER_PAGE}&limit=${ITEMS_PER_PAGE}`,
    );
    const [setSelectedItems] = useOutletContext();
    const maxPages = useLoaderData();
    return (
        <main>
            {loading && (
                <div className="flex justify-center items-center">
                    <div className="lds-dual-ring"></div>
                </div>
            )}
            {error && (
                <div className="flex flex-col justify-center text-[var(--color-error)] items-center text-center gap-[1rem]">
                    <h1>Oops, we couldn't get products...</h1>
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
                    <Pagination
                        setter={setPage}
                        value={page}
                        min={0}
                        max={maxPages}
                    />
                </>
            )}
        </main>
    );
}
