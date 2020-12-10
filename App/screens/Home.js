import React, { useContext } from "react";
import { SafeAreaView, Text, Button, StyleSheet, ScrollView } from "react-native";
import * as firebase from 'firebase';

import { AuthContext } from 'genshin-impact-app/App/modules/navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222431'
  },
  text: {
    color: '#fff'
  }
});


export default function Home({ navigation }) {
  const { signOut } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Welcome {firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : ''}!</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
