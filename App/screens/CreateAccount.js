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




export default function CreateAccount({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading] = useState(false);

  const onLoginSuccess = () => {
    navigation.navigate('Home');
  }

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
        if (providerData[i].providerData === firebase.auth.GoogleAuthProvider.PROVIDER_ID
          && providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // No need to reauth Firebase Connection
          return true;
        }
      }
    }
    return false;
  }

  const onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);

    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();

      // Check if already signed-in Firebase with the correct user
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase Credential with the Google ID token
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.token,
          googleUser.accessToken
        );
        // Sign In with credential from the Google User
        firebase.auth().signInWithCredential(credential)
          .then(result => {
            console.log('user sign in');
            firebase.database()
              .ref('/users' + result.user.uid)
              .set({
                gmail: result.user.email,
                profile_picture: result.additionalUserInfo.profile_picture.locale,
                first_name: result.additionalUserInfo.given_name,
                last_name: result.additionalUserInfo.first_name
              })
              .then(snapshot => {
              
              });
              
          })
          .catch(e => {
            // Print errors here
            console.log('onSignIn Error: ', e);
          });
      } else {
        console.log('User already signed in Firebase');
      }
    })
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync(googleAuthConfig);

      if (result.type === 'success') {
        onSignIn(result.user.auth);
        return result.accessToken;
      }
    } catch ({ message }) {
      alert('login: Error: ' + message);
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dimiss();
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
              placeholderTextColor="#b1b1b1"
              returnKeyType="next"
              textContentType="emailAddress"
              keyboardType="email-address"
              value={email}
              onChangeText={account => setEmail({ account })}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#b1b1b1"
              returnKeyType="done"
              textContentType="newPassword"
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
              width: '80%'
            }}
          >
            {errorMessage}  
          </Text>
          <TouchableOpacity
            style={{ width: '86%', marginTop: 10 }}
            onPress={() => signInWithEmail()}
          >
            <View style={styles.button}>
              <Text>Sign Up</Text>
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
              style={{ fontWeight: '200', fontSize: 17, textAlign: 'center' }}
              onPress={() => {
                navigation.navigate('Sign In');
              }}
            >
              Already have an account?
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
