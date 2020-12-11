import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222431'
  }
});

export default function Initializing({ navigation }) {

  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}