import { useLoaderData, useOutletContext } from "react-router-dom";
import { useState } from "react";
import useFetchData from "../utils/useFetchData.js";
import Pagination from "../components/Pagination.js";
import ItemCard from "../components/ItemCard.js";
import { ITEMS_PER_PAGE } from "../utils/consts.js";
import type { ProductType } from "../utils/types.js";
import type { ContextType } from "../App.js";

export default function StorePage() {
    const [page, setPage] = useState(0);
    const { data, error, loading } = useFetchData(
        `https://api.escuelajs.co/api/v1/products?offset=${page * ITEMS_PER_PAGE}&limit=${ITEMS_PER_PAGE}`,
    );
    const [setSelectedItems]: ContextType = useOutletContext();
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
            {data && (
                <>
                    <ul className="store-items">
                        {data.map((product: ProductType) => (
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
