import React from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { artifacts } from "genshin-impact-app/App/modules/assets";
import { genshinApi } from "genshin-impact-app/App/modules/utils";
import { Initializing } from "genshin-impact-app/App/modules/screens";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222431",
  },
  artifactView: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#20212c',
    height: 300,
    marginHorizontal: 5
  },
  artifactInfoView: {
    marginTop: 20,
    justifyContent: 'center',
    paddingVertical: 10,
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
  artifactInfoText: {
    paddingBottom: 5,
    paddingHorizontal: 10
  },
  artifactImage: {
    height: 120,
    width: 120,
    marginTop: 20
  },
  separator: {
    marginTop: 40,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  }
});

export default class ArtifactInfo extends React.Component {
  state = {
    name: "",
    pic: "",
    two_set_bonus: "",
    four_set_bonus: "",
    loading: true
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

    this.setState({ loading: false });
  }

  componentDidUpdate() {
    const { name, pic } = this.props.route.params;
    this.getArtifactInfo({ name, pic });
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
        <ScrollView style={{ height: '100%', marginTop: 30 }}>
          <Text style={[styles.text, { fontWeight: 'bold', fontSize: 35, textAlign: 'center'}]}>{this.state.name}</Text>
          <View style={styles.artifactView}>
            <Image style={styles.artifactImage} source={artifacts[this.state.pic]} />  
          </View>  
          <View style={styles.separator} />
          <Text style={
            [styles.text,
              {
                fontWeight: 'bold',
                fontSize: 25,
                marginTop: 45,
                paddingHorizontal: 10
              }
            ]}>Overview</Text>
          <View style={styles.artifactInfoView}>
            <Text style={[styles.text, styles.artifactInfoText]}>2 Set Bonus: {this.state.two_set_bonus}</Text>
            <Text style={[styles.text, styles.artifactInfoText]}>4 Set Bonus: {this.state.four_set_bonus}</Text>
          </View>
          <Text style={[styles.text, { fontSize: 10, marginVertical: 20, paddingHorizontal: 5, color: '#cfcec8'}]}>Information used by ©GenshinList.com 2020</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
