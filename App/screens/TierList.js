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

import { images } from "genshin-impact-app/App/modules/assets";

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
    justifyContent: "space-evenly",
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
    marginTop: 40,
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

export default function TierList({ navigation }) {
  const STier = [
    "Bennett",
    "Diluc",
    "Klee",
    "Mona",
    "Qiqi",
    "Tartaglia",
    "Venti",
    "Xingqiu",
  ];
  const ATier = [
    "Diona",
    "Fischl",
    "Jean",
    "Keqing",
    "Ningguang",
    "Razor",
    "Xiangling",
    "Zhongli",
  ];
  const BTier = ["Barbara", "Beidou", "Chongyun", "Sucrose", "Xinyan"];
  const CTier = ["Kaeya", "Lisa", "Noelle"];
  const DTier = ["Amber"];

  const onPress = (name) => {
    navigation.navigate("Character Info", { name });
  };

  const printTier = (tier) => {
    var i;
    let Tier,
      output = [];
    if (tier === "S") Tier = STier;
    else if (tier === "A") Tier = ATier;
    else if (tier === "B") Tier = BTier;
    else if (tier === "C") Tier = CTier;
    else if (tier === "D") Tier = DTier;

    for (i = 0; i < Tier.length; i++) {
      const name = Tier[i];
      const temp = (
        <TouchableOpacity
          key={i}
          style={styles.tier}
          onPress={() => onPress(name)}
        >
          <Image style={styles.image} source={images[name]} />
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
      <View style={styles.textContainer}>
        <Text style={[styles.text, { paddingHorizontal: 20 }]}>
          This is a tier list based on the Genshin.gg website. Expect the list
          to change as the game updates.
        </Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <Text style={[styles.text, { marginBottom: 5 }]}>S Tier</Text>
        <RenderTierView style={{ borderColor: "#ff7f7f" }}>
          {printTier("S")}
        </RenderTierView>
        <Text style={[styles.text, { marginBottom: 5 }]}>A Tier</Text>
        <RenderTierView style={{ borderColor: "#ffbf7f" }}>
          {printTier("A")}
        </RenderTierView>
        <Text style={[styles.text, { marginBottom: 5 }]}>B Tier</Text>
        <RenderTierView style={{ borderColor: "#ffff7f" }}>
          {printTier("B")}
        </RenderTierView>
        <Text style={[styles.text, { marginBottom: 5 }]}>C Tier</Text>
        <RenderTierView style={{ borderColor: "#bfff7f" }}>
          {printTier("C")}
        </RenderTierView>
        <Text style={[styles.text, { marginBottom: 5 }]}>D Tier</Text>
        <RenderTierView style={{ borderColor: "#7fff7f" }}>
          {printTier("D")}
        </RenderTierView>
      </ScrollView>
    </SafeAreaView>
  );
}
