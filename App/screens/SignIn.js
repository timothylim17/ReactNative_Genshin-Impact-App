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
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import * as Google from 'expo-google-app-auth';
import {
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
} from '@env';
import { TextInput } from "react-native-gesture-handler";

const isAndroid = () => Platform.OS === 'android',
  androidID = ANDROID_CLIENT_ID,
  iosID = IOS_CLIENT_ID;

const googleAuthConfig = {
  clientId: isAndroid() ? androidID : iosID,
  scopes: ['profile', 'email'],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '86%',
    marginTop: 15,
  },
  logo: {
    marginTop: 20
  },
  input: {
    fontSize: 20,
    borderColor: '#707070',
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25.5,
  },
  button: {
    backgroundColor: '#3a559f',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22
  },
  googleButton: {
    backgroundColor: '#ffffff',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#707070'
  }
});




export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage,] = useState(null);
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

  const renderLoading = () => {
    if (isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )
    }
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
      const result = await Google.logInAsync(googleAuthConfig);

      if (result.type === 'success') {
        const { idToken, accessToken } = result;
        console.log('sign in result: ', result);
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase.auth()
          .signInWithCredential(credential)
          .then(res => {
            // User is authenticated and can navigate to the main page
            console.log('login successful \n', res);
            onLoginSuccess();
          })
          .catch(e => {
            console.log('error with firebase')
          });
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
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#B1B1B1"
              returnKeyType="next"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={email}
              onChangeText={account => setEmail(account)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#b1b1b1"
              returnKeyType="done"
              textContentType="newPassword"
              secureTextEntry={true}
              value={password}
              onChangeText={credentials => setPassword(credentials)}
            />
          </View>
          {renderLoading()}
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: 'red',
              width: '80%',
            }}
          >
            {errorMessage}
          </Text>
          <TouchableOpacity
            style={{ width: '86%', marginTop: 10 }}
            onPress={() => signInWithEmail()}
          >
            <View style={styles.button}>
              <Text>Sign In</Text>  
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '86%', marginTop: 10 }}
            onPress={() => signInWithGoogleAsync()}
          >
            <View style={styles.googleButton}>
              <Text
              style={{
                letterSpacing: 0.5,
                fontSize: 16,
                color: '#707070'
              }}
            >
              Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{ fontWeight: "200", fontSize: 17, textAlign: "center" }}
              onPress={() => navigation.navigate('Create Account')}
            >
              Don't have an Account?
            </Text>
          </View>
        </KeyboardAvoidingView>   
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}