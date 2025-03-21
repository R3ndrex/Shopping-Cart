import { useOutletContext } from "react-router-dom";
import ItemCard from "./ItemCard";
import useFetchData from "../utils/useFetchData.jsx";
import { useState } from "react";
import Pagination from "./Pagination.jsx";
export default function StorePage() {
    const [page, setPage] = useState(0);
    const [products, error, loading] = useFetchData(
        `https://api.escuelajs.co/api/v1/products?offset=${page * 10}&limit=10`
    );
    const [setSelectedItems] = useOutletContext();
    return (
        <>
            <main>
                {loading && <div>Loading...</div>}
                {error && (
                    <div className="flex flex-col justify-center items-center gap-[1rem]">
                        <h1>
                            Oops, it seems there was an error with getting data
                        </h1>
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
                            max={3}
                        />
                    </>
                )}
            </main>
        </>
    );
}
