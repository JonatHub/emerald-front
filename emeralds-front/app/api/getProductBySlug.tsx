import {useEffect, useState } from "react";

export function getProductBySlug(slug: string | string[]) {
    const url = 'http://localhost:8080/api/v1/emeralds?id=' + slug;
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error("Error al obtener productos");
                }
                const data = await response.json();
                console.log("Product data:", data);
                setResult(data);
            } catch (err:any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [url]);
    return { result, loading, error };
}   