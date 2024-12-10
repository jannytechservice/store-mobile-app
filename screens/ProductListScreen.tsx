import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import ScreenLoader from "../components/ScreenLoader";
import ProductItem from "../components/ProductItem";
import { useFetchProducts } from "../api/api";
import {
  IProduct,
  IProductFilters,
  IProductFilterValue,
} from "../types/product";
import SearchBar from "../components/SearchBar";
import ProductFilters from "../components/ProductFilters";
import { applyFilter } from "../utils/apply-filter";
import { isEqual } from "lodash";
import NoResults from "../components/NoResults";

const defaultFilters: IProductFilters = {
  category: "all",
};
export default function ProductListScreen() {
  const { products, loading, error } = useFetchProducts();
  const [visibleProducts, setVisibleProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(0);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [sortBy, setSortBy] = useState(false);
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

  const handleFilters = useCallback(
    (name: string, value: IProductFilterValue) => {
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );
  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const dataFiltered = applyFilter({
    inputData: visibleProducts,
    filters,
    sortBy,
    searchQuery,
  });
  const canReset = !isEqual(defaultFilters, filters);
  const categories = Array.from(
    new Set(
      products
        .map((product) =>
          product.category !== "undefined" ? product.category : null
        )
        .filter((category): category is string => category !== null)
    )
  );
  if (loading) {
    return <ScreenLoader />;
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Products" />
      </Appbar.Header>
      <View style={styles.rowContainer}>
        <SearchBar
          query={searchQuery}
          onSearch={(query: string) => setSearchQuery(query)}
        />
        <ProductFilters
          visible={filtersVisible}
          onClose={() => setFiltersVisible(false)}
          onOpen={() => setFiltersVisible(true)}
          filters={filters}
          onFilters={handleFilters}
          canReset={canReset}
          onResetFilters={handleResetFilters}
          categoryOptions={["all", ...categories]}
          sortBy={sortBy}
          onSortBy={() => setSortBy(!sortBy)}
        />
      </View>
      {dataFiltered.length > 0 ? (
        <FlatList
          data={dataFiltered}
          renderItem={({ item }) => <ProductItem product={item} />}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ScreenLoader /> : null}
        />
      ) : (
        <NoResults />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
