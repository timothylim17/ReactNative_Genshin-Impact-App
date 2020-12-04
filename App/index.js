// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// import SignIn from "genshin-impact-app/App/screens/SignIn";

import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import * as firebase from 'firebase';
import {
  Home,
  Threads,
  TierList,
  SignIn
} from 'genshin-impact-app/App/modules/screens';
import { firebaseConfig } from 'genshin-impact-app/App/modules/utils';


// Initialize firebase
firebase.initializeApp(firebaseConfig);

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
    // drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Sign In" component={SignIn} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Threads" component={Threads} />
      <Drawer.Screen name="Tier List" component={TierList} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
