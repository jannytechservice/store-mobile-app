import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function NoResults() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No results found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 16,
    color: "#757575",
  },
});
