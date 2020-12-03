import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import * as firebase from 'firebase';

export default function SignInButton() {

  return (
    <TouchableOpacity>
      <Text>Sign In with Google</Text>
    </TouchableOpacity>
  )
}