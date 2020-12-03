import React from "react";

import * as firebase from "firebase";
import { View, Text } from "react-native";
import { SignInButton } from 'genshin-impact-app/App/modules/components';

export default function SignIn() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SignInButton />
    </View>
  );
}