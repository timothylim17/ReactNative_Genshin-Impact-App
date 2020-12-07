import React, {useState, useContext} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import {
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
} from '@env';
import { TextInput } from "react-native-gesture-handler";

import { AuthContext } from 'genshin-impact-app/App/modules/navigation';

// const isAndroid = () => Platform.OS === 'android',
//   androidID = ANDROID_CLIENT_ID,
//   iosID = IOS_CLIENT_ID;

// const googleAuthConfig = {
//   clientId: isAndroid() ? androidID : iosID,
//   scopes: ['profile', 'email'],
// };

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

  const { signUp } = useContext(AuthContext);

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
              onChangeText={account => setEmail(account)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#b1b1b1"
              returnKeyType="done"
              textContentType="newPassword"
              value={password}
              onChangeText={credentials => setPassword(credentials)}
            />
          </View>
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
            onPress={() => signUp(email, password)}
          >
            <View style={styles.button}>
              <Text>Sign Up</Text>
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
