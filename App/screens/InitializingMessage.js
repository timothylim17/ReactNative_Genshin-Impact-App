import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222431'
  }
});

export default function InitializingMessage({ navigation }) {
  useEffect(() => {
    const removeAuthListener = () => firebase.auth().onAuthStateChanged(authUser => {
      if (!authUser) {
        // sign the user out
        return firebase.auth().signOut();
      }

      // bring them to threads
      return navigation.navigate('Threads');
    });

    return () => removeAuthListener();
  }, []);

  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
    </View>
  )
}