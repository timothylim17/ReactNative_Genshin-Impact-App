import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";

import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';
import {
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
} from '@env';

const IOSClientId = {
  IOS_CLIENT_ID
};

const androidClientId = {
  ANDROID_CLIENT_ID
};

export default function SignIn() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Sign In</Text>
    </View>
  );
}