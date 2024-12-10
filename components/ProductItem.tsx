import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
import ProductDetailSummary from "./ProductDetailSummary";
import { IProduct } from "../types/product";
import Animated, { Layout } from "react-native-reanimated";

type ProductItemProps = {
  product: IProduct;
};

export default function ProductItem({ product }: ProductItemProps) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.name}>{product.title}</Text>
      </TouchableOpacity>
      <Animated.View layout={Layout.springify()}>
        <Collapsible collapsed={collapsed}>
          {!collapsed && <ProductDetailSummary product={product} />}
        </Collapsible>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
});
