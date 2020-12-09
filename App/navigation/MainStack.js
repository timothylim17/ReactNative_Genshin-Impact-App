import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Home,
  Threads,
  TierList,
  CharacterInfo,
  NewStatus,
  Feed
} from 'genshin-impact-app/App/modules/screens';

const Root = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainStack() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Threads" component={Threads} />
      <Drawer.Screen name="Tier List" component={TierList} />
      <Drawer.Screen name="Character Info" component={CharacterInfo} />
    </Drawer.Navigator>
  );
}

export default function RootStack() {
  return (
    <Root.Navigator mode="modal">
      <Root.Screen
        name="Main"
        component={MainStack}
        options={{ headerShown: false }}
      />
      <Root.Screen name="NewStatus" component={NewStatus} />
    </Root.Navigator>
  );
}
