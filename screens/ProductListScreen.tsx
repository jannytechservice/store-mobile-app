import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import ProductItem from '../components/ProductItem';
import { fetchProducts } from '../api/api';
import { IProduct } from '../utils/product';

export default function ProductListScreen() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    const newProducts = await fetchProducts();
    setProducts((prev) => [...prev, ...newProducts]);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  const handleLoadMore = () => setPage((prev) => prev + 1);

  const renderProduct = ({ item }: { item: any }) => <ProductItem product={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
