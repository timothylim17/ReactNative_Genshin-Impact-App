import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import {
  MainStack,
  AuthStack,
  AuthContext
} from 'genshin-impact-app/App/modules/navigation';
import * as firebase from 'firebase';
import { Initializing } from 'genshin-impact-app/App/modules/screens';

export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

   // handle user state changes
  function onAuthStateChanged(currUser) {
    setUser(currUser);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  // checks if user is logged in
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // if loading, render initializing screen
  if (loading) {
    return <Initializing />;
  }

  return (
    <NavigationContainer>
      { user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  )

}