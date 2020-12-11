import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import images from "genshin-impact-app/App/modules/assets";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#222431'
  },
  image: {
    height: 40,
    width: 40,
  },
  tierView: {
    flexDirection: 'row',
    backgroundColor: '#20212c',
    borderRadius: 8,
    justifyContent: "center",
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
    height: 100,
    width: 400
  },
  tier: {
    flex: 1,
    flexDirection: "column",
  },
  titleText: {
    color: '#eee',
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold"
  },
  text: {
    color: '#eee',
    fontSize: 20,
  }
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
    let Tier, output = [];
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

  const RenderTierView = ({ children }) => {
    return (
      <View style={styles.tierView}>
        {children}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Tier List</Text>
      <ScrollView style={{ flex: 1 }}>
        <RenderTierView>{ printTier("S") }</RenderTierView>
        <RenderTierView>{printTier("A")}</RenderTierView> 
        <RenderTierView>{printTier("B")}</RenderTierView> 
        <RenderTierView>{printTier("C")}</RenderTierView> 
        <RenderTierView>{printTier("D")}</RenderTierView> 
      </ScrollView>
    </SafeAreaView>
  );
}
