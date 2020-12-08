import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import * as firebase from 'firebase';

import { AuthContext } from 'genshin-impact-app/App/modules/navigation';
// import { currentUser } from 'genshin-impact-app/App/firebase';


export default function Home({ navigation }) {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home!</Text>
      <Text>Hello {firebase.auth().currentUser.displayName}</Text>
      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  );
}
