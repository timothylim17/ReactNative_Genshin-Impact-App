import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Home,
  Threads,
  TierList,
} from 'genshin-impact-app/App/modules/screens';

const Drawer = createDrawerNavigator();

export default function MainStack() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Threads" component={Threads} />
      <Drawer.Screen name="Tier List" component={TierList} />
    </Drawer.Navigator>
  );
}

