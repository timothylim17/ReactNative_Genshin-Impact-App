import React, { useContext } from "react";
import { View, Text, Button } from "react-native";

import { AuthContext } from 'genshin-impact-app/App/modules/navigation';


export default function Home({ navigation }) {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home!</Text>
      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  );
}
