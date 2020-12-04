import React, {useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  }
})

export default function SignIn({ navigation }) {
  const [email, password, errorMessage, setErrorMessage] = useState('');
  const [isLoading] = useState(false);

  // Login successful
  const onLoginSuccess = () => {
    navigation.navigate('Home');
  }

  // Login failed
  const onLoginFailure = e => {
    setErrorMessage(e);
    isLoading(false);
  }

  // Sign in with Email
  async function signInWithEmail() {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        onLoginSuccess();
      })
      .catch(e => {
        let errorCode = e.code;
        let errorMessage = e.message;

        if (errorCode == 'auth/weak-password')
          onLoginFailure('Weak Password!');
        else
          onLoginFailure(errorMessage);
      })
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId,
        iosClientId,
        behavior: 'web',
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        const googleProfileData = await firebase.auth().signInWithCredential(credential);
        onLoginSuccess();
      }
    } catch ({ message }) {
      alert('login: Error: ' + message);
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={{ fontSize: 32, fontWeight: "700", color: "#000", paddingTop: 40 }}>
            Genshin Impact
          </Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}