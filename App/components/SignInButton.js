import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  button: {

  },
  text: {

  }
});

async function onGoogleButtonPress() {
  
}

export default function SignInButton() {

  return (
    <TouchableOpacity style={styles.button}>
      <Text>Sign In with Google</Text>
    </TouchableOpacity>
  )
}