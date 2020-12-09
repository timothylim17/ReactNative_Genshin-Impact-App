import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Home,
  Threads,
  TierList,
  CharacterInfo,
  NewThread,
  Messages,
  InitializingMessage
} from 'genshin-impact-app/App/modules/screens';
import { HeaderIcon } from 'genshin-impact-app/App/modules/components';

const Root = createStackNavigator();
const Drawer = createDrawerNavigator();
const Messaging = createStackNavigator();
const NewThreads = createStackNavigator();

function MainStack() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Threads" component={MessagingStack} />
      <Drawer.Screen name="Tier List" component={TierList} />
      <Drawer.Screen name="Character Info" component={CharacterInfo} />
    </Drawer.Navigator>
  );
}

function MessagingStack() {
  return (
    <Messaging.Navigator>
      <Messaging.Screen
        name="Threads"
        component={Threads}
        options={({ navigation }) => ({
          headerTitle: 'Threads',
          headerRight: () => (
            <HeaderIcon
              iconName="add"
              onPress={() => navigation.navigate('NewThread')}
            />
          ),
        })}
      />
      <Messaging.Screen
        name="Messages"
        component={Messages}
        options={({ navigation, route }) => ({
          title: route.params.thread.name,
        })}
      />
      <Messaging.Screen
        name="NewThread"
        component={NewThread}
        options={({ navigation }) => ({
          headerTitle: "New Thread",
          headerRight: () => (
            <HeaderIcon iconName="close" onPress={() => navigation.pop()} />
          )
        })}
      />
      <Messaging.Screen name="InitializingMessage" component={InitializingMessage} />
    </Messaging.Navigator>
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
    </Root.Navigator>
  );
}
