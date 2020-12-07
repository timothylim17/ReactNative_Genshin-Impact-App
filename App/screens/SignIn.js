import React, { useState, useContext } from "react";
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
  const { signIn } = useContext(AuthContext);

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
        <TouchableOpacity
            style={{ width: '86%', marginTop: 10 }}
            onPress={() => signIn(email, password)}
        >
          <View style={styles.button}>
            <Text>Sign In</Text>  
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