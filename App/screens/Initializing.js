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

export default function Initializing() {

  useEffect(() => {
    // Check if user is authenticated
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user)
    //     this.props.navigation.navigate('Home');
    //   else
    //     this.props.navigate.navigate('CreateAccount');
    // })
  });

  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
    </View>
  );
}