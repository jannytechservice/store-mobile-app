import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

type Props = {
  query: string;
  onSearch: (inputValue: string) => void;
};

export default function SearchBar({ query, onSearch }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={onSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    minWidth: 120,
  },
});
