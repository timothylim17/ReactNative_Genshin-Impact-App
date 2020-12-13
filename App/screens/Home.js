import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
  Dimensions
} from "react-native";
import * as firebase from 'firebase';

import { EmbeddedWebView } from 'genshin-impact-app/App/modules/components';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222431'
  },
  welcomeUserText: {
    marginVertical: 40,
    color: '#fff',
    textAlign: 'center',
    fontSize: 30
  },
  text: {
    color: '#fff',
    fontSize: 20
  },
  optionsView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 35,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#20212c',
    paddingHorizontal: 110,
    height: 140,
  },
  icon: {
    height: 75,
    width: 75,
    marginRight: 250,
  }
});


export default function Home({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Image resizeMode="center" source={require('genshin-impact-app/App/assets/icons/genshin-logo.png')} />
      <ScrollView style={{ height: '100%', marginBottom: 20}}>
        <Text style={styles.welcomeUserText}>Welcome {firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : ''}!</Text>
        <TouchableOpacity
          style={styles.optionsView}
          onPress={() => navigation.navigate('Threads')}
        >
          <Image style={styles.icon} source={require('genshin-impact-app/App/assets/icons/thread.png')} />
          <Text style={styles.text}>Threads</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionsView}
          onPress={() => navigation.navigate('Tier List')}
        >
          <Image style={styles.icon} source={require('genshin-impact-app/App/assets/icons/tier.png')} />
          <Text style={styles.text}>Tier List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionsView}
          onPress={() => navigation.navigate('Artifact List')}
        >
          <Image style={[styles.icon, { height: 100, width: 100}]} source={require('genshin-impact-app/App/assets/artifacts/crimson-witch-of-flames.png')} />
          <Text style={styles.text}>Artifact List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionsView}
          onPress={() => setModalVisible(true)}
        >
          <Image style={[styles.icon, { left: 20}]} source={require('genshin-impact-app/App/assets/icons/genshin-gg.png')} />
          <Text style={styles.text}>Visit Genshin.GG</Text>
          <Modal animationType="slide" tansparent visible={modalVisible}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setModalVisible(false)}
            />
            <EmbeddedWebView />
          </Modal>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
