import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SignIn,
  CreateAccount
} from 'genshin-impact-app/App/modules/screens';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Sign In'>
      <Stack.Screen name="Sign In" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="Create Account" component={CreateAccount} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}