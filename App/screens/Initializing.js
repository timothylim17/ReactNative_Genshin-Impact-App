import React, {useEffect} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default function Initializing({ navigation }) {

  useEffect(() => {
    checkIfLoggedIn();
  });
    

  const checkIfLoggedIn = () => {
    // Check if user is authenticated
    firebase.auth().onAuthStateChanged(user => {
      console.log("AUTH STATE CHANGED", user);
      if (user)
        navigation.navigate('Home');
      else
        navigation.navigate('Sign In');
    })
  };

  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
    </View>
  );
}