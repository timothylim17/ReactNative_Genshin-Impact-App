import React from "react";
import { View, Text, Button } from "react-native";
import * as firebase from 'firebase';

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home!</Text>
      <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
    </View>
  );
}
