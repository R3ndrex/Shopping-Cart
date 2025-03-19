import { useState, useEffect } from "react";

export default function useFetchData(url) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState();
    useEffect(() => {
        const controller = new AbortController();
        fetch(url, {
            signal: controller.signal,
        })
            .then((response) => response.json())
            .then((response) => {
                setData(response);
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
    return [data, error, loading];
}
