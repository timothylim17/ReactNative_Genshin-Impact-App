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
  Plaform,
  Platform
} from "react-native";
import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';
import {
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
  WEB_CLIENT_ID
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
})

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

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  const onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential)
          .then(() => {
            console.log('User is signed in');
          })
          .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync(googleAuthConfig);
      console.log(result);

      if (result.type === 'success') {
        onSignIn(result);
        // await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        // const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        // const googleProfileData = await firebase.auth().signInWithCredential(credential);
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
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#B1B1B1"
              returnKeyType="next"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={email}
              onChangeText={account => setEmail({ account })}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#b1b1b1"
              returnKeyType="done"
              textContentType="newPassword"
              secureTextEntry={true}
              value={password}
              onChangeText={credentials => setPassword({ credentials })}
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
            <Text>Sign In</Text>  
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '86%', marginTop: 10 }}
            onPress={() => signInWithGoogleAsync()}
          >
            <Text
              style={{
                letterSpacing: 0.5,
                fontSize: 16,
                color: '#707070'
              }}
            >
              Continue with Google
              </Text>
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