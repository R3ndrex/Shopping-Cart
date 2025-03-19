import { useOutletContext } from "react-router-dom";
import ItemCard from "./ItemCard";
import useFetchData from "../utils/useFetchData.jsx";

export default function StorePage() {
    const [products, error, loading] = useFetchData(
        "https://api.escuelajs.co/api/v1/products?offset=0&limit=10"
    );
    const setSelectedItems = useOutletContext();
    return (
        <>
            <main>
                {loading && <div>Loading...</div>}
                {error && <div>{error.message}</div>}
                {products && (
                    <ul className="store-items">
                        {products.map((product) => (
                            <ItemCard
                                key={product.title}
                                setSelectedItems={setSelectedItems}
                                product={product}
                            />
                        ))}
                    </ul>
                )}
            </main>
        </>
    );
}
