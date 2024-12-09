import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export default function ScreenLoader() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" animating color="#005C6E" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999,
    },
  });
