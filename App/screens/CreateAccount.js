import React from "react";
import * as firebase from 'firebase';
import { View, Text } from "react-native";

const createNewUser = () => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      // signed in, reroute user to home menu
    })
    .catch(e => {
      var errorCode = e.code;
      var errorMessage = e.message;
      console.log('Something happened: ', errorCode, errorMessage);
    });
}

export default function CreateAccount() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Create Account!</Text>
    </View>
  );
}
