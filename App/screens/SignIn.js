import React from "react";

import * as firebase from "firebase";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export default function SignIn({ navigation }) {
  navigationOptions = {
    drawerLabel: () => null,
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Sign In!</Text>
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}
