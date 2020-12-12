import React, {useState, useContext} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image
} from "react-native";
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
  },
  input: {
    fontSize: 20,
    borderColor: '#707070',
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25.5,
    color: '#fff'
  },
  button: {
    backgroundColor: '#3a559a',
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

  const { signUp } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#222431' }}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image resizeMode="center" source={require('../assets/icons/genshin-logo.png')} />
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
            secureTextEntry={true}
            value={password}
            onChangeText={credentials => setPassword(credentials)}
          />
        </View>
        <TouchableOpacity
          style={{ width: '86%', marginTop: 20 }}
          onPress={() => signUp(email, password)}
        >
          <View style={styles.button}>
            <Text style={{ color: '#fff'}}>Create Account</Text>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{ fontWeight: '200', fontSize: 17, textAlign: 'center', color: '#fff' }}
            onPress={() => {
              navigation.navigate('Sign In');
            }}
          >
            Already have an account?
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
