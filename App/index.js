import React, { useState, useEffect, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as firebase from 'firebase';
import { firebaseConfig } from 'genshin-impact-app/App/modules/utils';
import MainStack from 'genshin-impact-app/App/navigation/MainStack';
import AuthStack from 'genshin-impact-app/App/navigation/AuthStack';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(!isloading);
  //   }, 500);

  //   setTimeout(() => {
  //     setUser({});
  //   }, 1000)
  // }, []);

  return (
    <NavigationContainer>
      {/* {isLoading ? (
        <Initializing />
        ) : user ? (
            <MainStack />
        ) : (
            <AuthStack />
          )
      } */}
      {/* <AuthStack /> */}
      <MainStack />
    </NavigationContainer>
  );
}
