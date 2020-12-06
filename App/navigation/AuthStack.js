import React, { useState, useEffect, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from 'firebase';
import {
  SignIn,
  CreateAccount,
  Initializing
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