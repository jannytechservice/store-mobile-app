import { useEffect, useState } from 'react';
import { IProduct } from '../types/product';

export const useFetchProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://fakestoreapi.com/products`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data: IProduct[] = await response.json();
            setProducts(data);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

  return { products, loading, error, refetch: fetchProducts };
};
