import React, { useCallback, useMemo } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { IProductFilters, IProductFilterValue } from "../types/product";
import { IconButton, Text, MD3Colors, RadioButton } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

type Props = {
  visible: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  filters: IProductFilters;
  onFilters: (name: string, value: IProductFilterValue) => void;
  canReset: boolean;
  categoryOptions: string[];
  onResetFilters: VoidFunction;
  sortBy: boolean;
  onSortBy: VoidFunction;
};

export default function ProductFilters({
  visible,
  onOpen,
  onClose,
  filters,
  onFilters,
  categoryOptions,
  canReset,
  onResetFilters,
  sortBy,
  onSortBy,
}: Props) {
  const handleFilterCategory = useCallback(
    (newValue: string) => {
      onFilters("category", newValue);
    },
    [onFilters]
  );

  const renderCategory = useMemo(
    () => (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Text style={styles.categoryTitle}>Category</Text>
          <TouchableOpacity onPress={onSortBy}>
            <MaterialIcons
              name={sortBy ? "arrow-upward" : "arrow-downward"}
              size={14}
              color="black"
              style={styles.categoryArrow}
            />
          </TouchableOpacity>
        </View>
        {categoryOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.categoryContainer}
            onPress={() => handleFilterCategory(option)}
          >
            <RadioButton
              value={option}
              status={option === filters.category ? "checked" : "unchecked"}
              onPress={() => handleFilterCategory(option)}
            />
            <Text
              style={[
                styles.categoryLabel,
                option === "all" && { textTransform: "capitalize" },
              ]}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ),
    [categoryOptions, filters.category]
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton} onPress={onOpen}>
        <MaterialIcons name="filter-list" size={24} color="black" />
      </TouchableOpacity>
      {visible && (
        <Animated.View style={styles.sidebar}>
          <ScrollView style={styles.filterContainer}>
            <View>
              <View style={styles.filterHeader}>
                <Text style={styles.headerTitle}>Filters</Text>
                <View style={styles.filterHeaderActions}>
                  {canReset && (
                    <IconButton
                      style={{ margin: 0, padding: 0 }}
                      icon="restart"
                      iconColor={MD3Colors.neutral0}
                      size={15}
                      onPress={onResetFilters}
                    />
                  )}
                  <IconButton
                    style={{ margin: 0, padding: 0 }}
                    icon="close"
                    iconColor={MD3Colors.neutral0}
                    size={15}
                    onPress={onClose}
                  />
                </View>
              </View>
              {renderCategory}
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryArrow: {
    marginBottom: 4,
    marginLeft: 3,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 14,
    marginLeft: 8,
  },
  container: {
    flex: 1,
    height: "100%",
    marginTop: 10,
  },
  filterHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterHeaderActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  filterButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 5,
    padding: 10,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 250,
    height: 500,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 16,
    zIndex: 10,
  },
  filterContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
