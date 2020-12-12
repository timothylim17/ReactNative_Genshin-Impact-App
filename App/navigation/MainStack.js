import React, { useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Home,
  Threads,
  TierList,
  CharacterInfo,
  NewThread,
  Messages,
  InitializingMessage,
  ArtifactsList,
  ArtifactInfo,
} from "genshin-impact-app/App/modules/screens";
import { HeaderIcon } from "genshin-impact-app/App/modules/components";
import { AuthContext } from "genshin-impact-app/App/modules/navigation";

const Root = createStackNavigator();
const Drawer = createDrawerNavigator();
const Messaging = createStackNavigator();
const NewThreads = createStackNavigator();

function SignOutButton(props) {
  const { signOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList style={{ color: "#fff" }} {...props} />
      <DrawerItem
        label="Sign Out"
        labelStyle={{ color: "#fff" }}
        onPress={() => signOut()}
      />
    </DrawerContentScrollView>
  );
}

function MainStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: "#222431",
      }}
      drawerContentOptions={{
        labelStyle: { color: "#fff" },
      }}
      drawerContent={(props) => <SignOutButton {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Threads" component={MessagingStack} />
      <Drawer.Screen name="Tier List" component={TierList} />
      <Drawer.Screen name="Artifacts List" component={ArtifactsList} />
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
          headerTitle: "Threads",
          headerTitleStyle: {
            color: "#eee",
          },
          headerStyle: {
            backgroundColor: "#222431",
          },
          headerRight: () => (
            <HeaderIcon
              iconName="add"
              onPress={() => navigation.navigate("NewThread")}
            />
          ),
        })}
      />
      <Messaging.Screen
        name="Messages"
        component={Messages}
        options={({ navigation, route }) => ({
          title: route.params.thread.name,
          headerStyle: {
            backgroundColor: "#222431",
          },
          headerTitleStyle: {
            color: "#eee",
          },
        })}
      />
      <Messaging.Screen
        name="NewThread"
        component={NewThread}
        options={({ navigation }) => ({
          headerTitle: "New Thread",
          headerTitleStyle: {
            color: "#eee",
          },
          headerStyle: {
            backgroundColor: "#222431",
          },
          headerRight: () => (
            <HeaderIcon iconName="close" onPress={() => navigation.pop()} />
          ),
        })}
      />
      <Messaging.Screen
        name="InitializingMessage"
        component={InitializingMessage}
      />
    </Messaging.Navigator>
  );
}

export default function RootStack() {
  return (
    <Root.Navigator mode="modal">
      <Root.Screen
        name="Home"
        component={MainStack}
        options={{
          headerShown: false,
        }}
      />
      <Root.Screen
        name="Character Info"
        component={CharacterInfo}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#222431",
          },
          headerTitleStyle: {
            color: "#eee",
          },
        })}
      />
      <Root.Screen
        name="Artifact Info"
        component={ArtifactInfo}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#222431",
          },
          headerTitleStyle: {
            color: "#eee",
          },
        })}
      />
    </Root.Navigator>
  );
}
