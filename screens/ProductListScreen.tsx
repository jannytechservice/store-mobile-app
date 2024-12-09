import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Card, Text } from 'react-native-paper';
import ScreenLoader from '../components/ScreenLoader';
import { useFetchProducts } from '../api/api'; 
import { IProduct } from '../utils/product';

export default function ProductListScreen() {
    const { products, loading, error } = useFetchProducts();
    const [page, setPage] = useState(0);
    const [visibleProducts, setVisibleProducts] = useState<IProduct[]>([]);
    const pageSize = 5;

    const handleLoadMore = () => {
        const nextPage = page + 1;
        const startIndex = nextPage * pageSize;
        const endIndex = startIndex + pageSize;
        const moreProducts = products.slice(startIndex, endIndex);

        if (moreProducts.length > 0) {
            setVisibleProducts((prev) => [...prev, ...moreProducts]);
            setPage(nextPage);
            }
    };

    useEffect(() => {
        setVisibleProducts(products.slice(0, pageSize));
    }, [products]);

    const renderProduct = ({ item }: { item: IProduct }) => (
        <Card style={styles.card}>
            <Card.Cover source={{ uri: item.image }} />
            <Card.Content>
                <Text variant="titleMedium">{item.title}</Text>
            </Card.Content>
        </Card>
    );

    if(loading) {
        return <ScreenLoader />
    }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Products" />
      </Appbar.Header>
      <FlatList
        data={visibleProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  card: {
    margin: 8,
    elevation: 2,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});
