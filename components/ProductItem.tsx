import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';

export default function ProductItem({ product }: { product: any }) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => setCollapsed(!collapsed);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.name}>{product.title}</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        <View style={styles.details}>
          <Text>Category: {product.category}</Text>
          <Text>Price: ${product.price}</Text>
          <Text>Description: {product.description}</Text>
        </View>
      </Collapsible>
      {!collapsed && (
        <TouchableOpacity onPress={toggleCollapse}>
          <Text style={styles.collapseButton}>-</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  details: {
    marginTop: 10,
  },
  collapseButton: {
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});
