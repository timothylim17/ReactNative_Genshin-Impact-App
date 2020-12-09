import React from "react";
import { render } from "react-dom";
import { View, Text } from "react-native";

import { genshinApi } from "../utils/genshinApi";

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
  };

  handleError = () => {
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
            });
          }
        }
        // console.log("state:", this.state);
      }
    });
  };

  componentDidMount() {
    const sentName = this.props.route.params.name;
    this.getCharacterInfo({ name: sentName });
  }

  componentDidUpdate() {
    const { name } = this.props.route.params;
    this.getCharacterInfo({ name });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Character Info!</Text>
        <Text>name: {this.state.name}</Text>
        <Text>gender: {this.state.gender}</Text>
        <Text>vision: {this.state.vision}</Text>
        <Text>weapon: {this.state.weapon}</Text>
        <Text>rarity: {this.state.rarity}</Text>
      </View>
    );
  }
}
