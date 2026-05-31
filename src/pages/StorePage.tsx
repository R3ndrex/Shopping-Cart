import { useLoaderData, useOutletContext } from "react-router-dom";
import { useState } from "react";
import useFetchData from "../utils/useFetchData.js";
import Pagination from "../components/Pagination.js";
import ItemCard from "../components/ItemCard.js";
import { ITEMS_PER_PAGE } from "../utils/consts.js";
import type { ProductMinimalDTO } from "../utils/dto/product.dto.js";
import type { ContextType } from "../App.js";

export default function StorePage() {
    const [page, setPage] = useState(0);
    const { data, error, loading } = useFetchData(
        `${import.meta.env.VITE_API_URL}/product/`,
    );
    console.log(data);
    const [setSelectedItems]: ContextType = useOutletContext();
    const maxPages = useLoaderData();
    return (
        <main>
            {loading && (
                <div className="mb-[5rem] flex justify-center items-center">
                    <div className="lds-dual-ring"></div>
                </div>
            )}
            {error && (
                <div className="flex flex-col justify-center text-(--color-error) items-center text-center gap-[1rem]">
                    <h1>Oops, we couldn't get products...</h1>
                    <p>Error: {error.message}</p>
                </div>
            )}
            {data && (
                <>
                    <ul className="store-items">
                        {data.map((product: ProductMinimalDTO) => (
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
