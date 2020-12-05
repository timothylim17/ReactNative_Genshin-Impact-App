import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as firebase from 'firebase';
import {
  Home,
  Threads,
  TierList,
  SignIn,
  CreateAccount,
  Initializing
} from 'genshin-impact-app/App/modules/screens';
import { firebaseConfig } from 'genshin-impact-app/App/modules/utils';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Sign In" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="Create Account" component={CreateAccount} />
    </Stack.Navigator>
  );
}

function DrawerStack() {
  return (
    <Drawer.Navigator>
    {/* <Drawer.Screen name="SignIn" component={SignIn} />
    <Drawer.Screen name="Initializing" component={Initializing} /> */}
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Threads" component={Threads} />
    <Drawer.Screen name="Tier List" component={TierList} />
  </Drawer.Navigator>
  )
}

export default function App() {
  const [loggedIn, isLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(!isloading);
  //   }, 500);
  // }, []);

  return (
    <NavigationContainer>
      {/* {isLoading ? (
        <Initializing />
        ) : isLoggedIn ? (
            <DrawerStack />
        ) : (
            <AuthStack />
          )
      } */}
      <AuthStack />
    </NavigationContainer>
  );
}
