import React from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { artifacts } from "genshin-impact-app/App/modules/assets";
import { genshinApi } from "genshin-impact-app/App/modules/utils";

export default class ArtifactInfo extends React.Component {
  state = {
    name: "",
    pic: "",
    two_set_bonus: "",
    four_set_bonus: "",
  };

  handleError = () => {
    this.setState({ loading: true });
    Alert.alert("No location data found!", "Please try again", [
      {
        text: "Okay",
      },
    ]);
  };

  getArtifactInfo = ({ name, pic }) => {
    genshinApi("/artifacts").then((response) => {
      if (response.cod === "404") {
        this.handleError();
      } else {
        var i;
        for (i = 0; i < response.length; i++) {
          if (response[i].name === name) {
            const temp = response[i];
            this.setState({
              name: response[i].name,
              two_set_bonus: temp["2_set_bonus"],
              four_set_bonus: temp["4_set_bonus"],
              pic,
            });
          }
        }
      }
    });
  };

  componentDidMount() {
    const { name, pic } = this.props.route.params;
    this.getArtifactInfo({ name, pic });
  }

  componentDidUpdate() {
    const { name, pic } = this.props.route.params;
    this.getArtifactInfo({ name, pic });
  }

  render() {
    return (
      <View>
        <Image source={artifacts[this.state.pic]} />
        <Text>name: {this.state.name}</Text>
        <Text>2 set bonus: {this.state.two_set_bonus}</Text>
        <Text>4 set bonus: {this.state.four_set_bonus}</Text>
      </View>
    );
  }
}
