import { useState, useEffect } from "react";
import type { ProductDTO } from "./dto/product.dto.js";
export default function useFetchData(url: string): {
    data: ProductDTO[] | null;
    error: Error | null;
    loading: boolean;
} {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState<ProductDTO[] | null>(null);
    useEffect(() => {
        const controller = new AbortController();
        fetch(url, {
            signal: controller.signal,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Something went wrong:${response?.status}`);
                }
                return response.json();
            })
            .then((response) => {
                setData(response.data);
                setError(null);
            })
            .catch((error) => {
                setData(null);
                if (error.name !== "AbortError") {
                    setError(error);
                }
            })
            .finally(() => {
                setLoading(false);
            });

        return () => controller.abort();
    }, [url]);
    return { data, error, loading };
}
