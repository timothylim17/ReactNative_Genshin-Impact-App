import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222431'
  },
  welcomeUserText: {
    marginVertical: 90,
    color: '#fff',
    textAlign: 'center',
    fontSize: 30
  },
  text: {
    color: '#fff',
  },
  optionsView: {
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#20212c',
    paddingHorizontal: 110,
    height: 140,
  }
});


export default function Home({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.welcomeUserText}>Welcome {firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : ''}!</Text>
        <TouchableOpacity
          style={styles.optionsView}
          onPress={() => navigation.navigate('Threads')}
        >
          <Text style={styles.text}>Go to Threads!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionsView}
          onPress={() => navigation.navigate('Tier List')}
        >
          <Text style={styles.text}>Go to Tier List!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionsView}
          onPress={() => console.log('TODO')}
        >
          <Text style={styles.text}>Webview to Genshin.gg!</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
