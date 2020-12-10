import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from "react-native";

import images from "genshin-impact-app/App/modules/assets";

const styles = StyleSheet.create({
  image: {
    height: 75,
    width: 75,
  },
  tier: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20
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
    let Tier = [];
    let output = [];
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

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#222431' }}>
      <Text>Tier List!</Text>
      <View style={styles.tier}>{printTier("S")}</View>
      <View style={styles.tier}>{printTier("A")}</View>
      <View style={styles.tier}>{printTier("B")}</View>
      <View style={styles.tier}>{printTier("C")}</View>
      <View style={styles.tier}>{printTier("D")}</View>
    </SafeAreaView>
  );
}
