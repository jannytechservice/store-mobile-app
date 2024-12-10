import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";

import { IProduct } from "../types/product";

type ProductDetailSummaryProps = {
  product: IProduct;
};

export default function ProductDetailSummary({
  product,
}: ProductDetailSummaryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.category}>{product.category}</Text>

      <View style={styles.ratingContainer}>
        <Rating
          type="star"
          startingValue={product.rating?.rate || 0}
          imageSize={16}
          readonly
          style={styles.rating}
        />
        <Text style={styles.reviewCount}>
          {`${product.rating?.count || 0} reviews`}
        </Text>
      </View>

      <Text style={styles.price}>{`$${product.price}`}</Text>

      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  category: {
    fontSize: 12,
    fontWeight: "600",
    color: "#28a745",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 12,
    color: "#6c757d",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#6c757d",
    lineHeight: 20,
  },
});
