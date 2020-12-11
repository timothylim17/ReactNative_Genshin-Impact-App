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
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#20212c',
    paddingHorizontal: 100,
    height: 100,
  }
});


export default function Home({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.welcomeUserText}>Welcome {firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : ''}!</Text>
        <View style={styles.optionsView}>
          <TouchableOpacity onPress={() => navigation.navigate('Threads')}>
            <Text style={styles.text}>Go to Threads!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsView}>
          <TouchableOpacity onPress={() => navigation.navigate('Tier List')}>
            <Text style={styles.text}>Go to Tier List!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsView}>
          <TouchableOpacity onPress={() => console.log('TODO')}>
            <Text style={styles.text}>Webview to Genshin.gg!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
