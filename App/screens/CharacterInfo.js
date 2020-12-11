import React from "react";
import { View, Text, Alert, StyleSheet, Image, Dimensions, SafeAreaView, ScrollView } from "react-native";

import { portrait, devNotes } from "genshin-impact-app/App/modules/assets";
import { genshinApi } from "genshin-impact-app/App/modules/utils";
import { Initializing } from "genshin-impact-app/App/modules/screens";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222431",
  },
  characterView: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  characterInfoView: {
    marginTop: 20,
    justifyContent: 'center',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#20212c',
    marginHorizontal: 5
  },
  devNotesView: {
    marginTop: 20,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#20212c',
    marginHorizontal: 5
  },
  text: {
    color: "#eee",
    fontSize: 15
  },
  characterBackgroundImage: {
    marginTop: 20,
    height: deviceHeight / 2,
    width: deviceWidth / 2,
  },
  characterInfoText: {
    paddingBottom: 5
  }
});

export default class CharacterInfo extends React.Component {
  state = {
    id: "",
    name: "",
    description: "",
    gender: "",
    birthday: "",
    vision: "",
    weapon: "",
    obtain: "",
    rarity: "",
    devNotes: "",
    loading: true,
  };

  handleError = () => {
    this.setState({ loading: true });
    Alert.alert("No location data found!", "Please try again", [
      {
        text: "Okay",
      },
    ]);
  };

  getCharacterInfo = ({ name }) => {
    genshinApi("/characters").then((response) => {
      if (response.cod === "404") {
        this.handleError();
      } else {
        var i;
        for (i = 0; i < response.length; i++) {
          if (response[i].name === name) {
            this.setState({
              id: response[i].id,
              name: response[i].name,
              description: response[i].description,
              gender: response[i].gender,
              birthday: response[i].birthday,
              vision: response[i].vision,
              weapon: response[i].weapon,
              obtain: response[i].obtain,
              rarity: response[i].rarity,
              devNotes: devNotes[response[i].name],
            });
          }
        }
      }
    });
  };

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  componentDidMount() {
    const { name } = this.props.route.params;
    this.getCharacterInfo({ name });

    this.setState({ loading: false });
  }

  componentDidUpdate() {
    const { name } = this.props.route.params;
    this.getCharacterInfo({ name });
  }

  conmponentWillUnmount() {
    this.handleError();
  }

  render() {
    const { name } = this.props.route.params;
    const { loading } = this.state;

    if (loading || name === "undefined") {
      return <Initializing />;
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ height: '100%' }}>
          <View style={styles.characterView}>
            <Text style={[styles.text, {fontWeight: 'bold', fontSize: 35, textAlign: "center"}]}>{this.state.name}</Text>
            <Image style={styles.characterBackgroundImage} source={portrait[this.state.name]} />
            <Text style={[styles.text, {fontSize: 15, paddingHorizontal: 10, marginTop: 30}]}>"{this.capitalizeFirstLetter(this.state.description)}"</Text>
          </View>
          <Text style={[styles.text, { fontWeight: 'bold', fontSize: 25, marginTop: 45, paddingHorizontal: 10}]}>Overview</Text>
        <View style={styles.characterInfoView}>
          <Text style={[styles.text, styles.characterInfoText]}>Sex: {this.capitalizeFirstLetter(this.state.gender)}</Text>
          <Text style={[styles.text, styles.characterInfoText]}>Vision: {this.capitalizeFirstLetter(this.state.vision)}</Text>
          <Text style={[styles.text, styles.characterInfoText]}>Weapon: {this.capitalizeFirstLetter(this.state.weapon)}</Text>
          <Text style={[styles.text, styles.characterInfoText]}>Birthday: {this.capitalizeFirstLetter(this.state.birthday)}</Text>
          <Text style={[styles.text, styles.characterInfoText]}>How to Obtain: {this.capitalizeFirstLetter(this.state.obtain)}</Text>
          <Text style={[styles.text, styles.characterInfoText]}>Rarity: {this.state.rarity} Star</Text>
          </View>
        <Text style={[styles.text, { marginTop: 20, fontSize: 25, fontWeight: 'bold', paddingHorizontal: 10}]}>Developer's Insights</Text>
        <View style={styles.devNotesView}>
            <Text style={styles.text}>{this.state.devNotes}</Text>  
        </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
