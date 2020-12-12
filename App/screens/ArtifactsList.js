import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { artifacts } from "genshin-impact-app/App/modules/assets";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222431",
  },
  image: {
    height: 40,
    width: 40,
  },
  tierView: {
    flexDirection: "row",
    backgroundColor: "#20212c",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 30,
    height: 100,
    width: 400,
  },
  tier: {
    flex: 1,
    flexDirection: "column",
  },
  titleText: {
    color: "#eee",
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  textContainer: {
    marginVertical: 40,
    paddingBottom: 20,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  text: {
    color: "#eee",
    fontSize: 20,
  },
});

export default function ArtifactsList({ navigation }) {
  const FiveStar = [
    "Archaic_Petra",
    "Bloodstained_Chivalry",
    "Crimson_Witch_of_Flames",
    "Gladiators_Finale",
    "Lavawalker",
    "Maiden_Beloved",
    "Noblesse_Oblige",
    "Retracing_Bolide",
    "Thundering_Fury",
    // "Thundersoother",
    // "Viridescent_Venerer",
    // "Wanderers_Troupe",
  ];
  const FourStar = [
    "Berserker",
    "Brave_Heart",
    "Defenders_Will",
    "Gambler",
    "Instructor",
    "Martial_Artist",
    "Resolution_of_Sojourner",
    "Scholar",
    "The_Exile",
    "Tiny_Miracle",
  ];
  const ThreeStar = ["Adventurer", "Lucky_Dog", "Traveling_Doctor"];

  const onPress = (title) => {
    const temp = title.replace(/_/g, " ");
    navigation.navigate("Artifact Info", { name: temp, pic: title });
  };

  const printArtifacts = (star) => {
    var i;
    let Star,
      output = [];
    if (star === "5") Star = FiveStar;
    else if (star === "4") Star = FourStar;
    else if (star === "3") Star = ThreeStar;

    for (i = 0; i < Star.length; i++) {
      const title = Star[i];
      const temp = (
        <TouchableOpacity
          key={i}
          // style={styles.tier}
          onPress={() => onPress(title)}
        >
          <Image style={styles.image} source={artifacts[title]} />
        </TouchableOpacity>
      );
      output[i] = temp;
    }

    return output;
  };

  const RenderTierView = ({ children, style, tier }) => {
    return <View style={[styles.tierView, style]}>{children}</View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Tier List</Text>
      <View>
        <Text style={[styles.text, { paddingHorizontal: 20 }]}>
          This is a tier list based on the Genshin.gg website. Expect the list
          to change as the game updates.
        </Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <Text style={[styles.text, { marginBottom: 5 }]}>5 Star and under</Text>
        <RenderTierView style={{ borderColor: "#ff7f7f" }}>
          {printArtifacts("5")}
        </RenderTierView>
        <Text style={[styles.text, { marginBottom: 5 }]}>4 Star and under</Text>
        <RenderTierView style={{ borderColor: "#ffbf7f" }}>
          {printArtifacts("4")}
        </RenderTierView>
        <Text style={[styles.text, { marginBottom: 5 }]}>3 Star</Text>
        <RenderTierView style={{ borderColor: "#ffff7f" }}>
          {printArtifacts("3")}
        </RenderTierView>
      </ScrollView>
    </SafeAreaView>
  );
}
