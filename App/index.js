// import React from "react";
// import { StatusBar } from "react-native";
// import { NavigationContainer, StackActions } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// import SignIn from "genshin-impact-app/App/screens/SignIn";
// import CreateAccount from "genshin-impact-app/App/screens/CreateAccount";
// import Drawer from "genshin-impact-app/App/Drawer";

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="SignIn" component={SignIn} />
//         <Stack.Screen name="CreateAccount" component={CreateAccount} />
//         <Stack.Screen name="Drawer" component={Drawer} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import Home from "genshin-impact-app/App/screens/Home";
import Threads from "genshin-impact-app/App/screens/Threads";
import TierList from "genshin-impact-app/App/screens/TierList";
import SignIn from "genshin-impact-app/App/screens/SignIn";
import CreateAccount from "genshin-impact-app/App/screens/CreateAccount";

const MainDrawerNavigator = createDrawerNavigator();

function MyDrawer() {
  return (
    <MainDrawerNavigator.Navigator
    // drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <MainDrawerNavigator.Screen name="Home" component={Home} />
      <MainDrawerNavigator.Screen name="Threads" component={Threads} />
      <MainDrawerNavigator.Screen name="Tier List" component={TierList} />
      <MainDrawerNavigator.Screen
        name="SignIn"
        component={SignIn}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
          gestureEnabled: false,
        }}
      />
      <MainDrawerNavigator.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
          gestureEnabled: false,
        }}
      />
    </MainDrawerNavigator.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
