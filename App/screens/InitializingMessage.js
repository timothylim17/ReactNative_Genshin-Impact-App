import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function InitializingMessage({ navigation }) {
  useEffect(() => {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(authUser => {
      if (!authUser) {
        return navigation.navigate('Home');
      }

      return navigation.navigate('Messaging');
    });

    return () => {
      if (this.removeAuthListener) {
        this.removeAuthListener();
      }
    }
  }, []);

  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
    </View>
  )
}