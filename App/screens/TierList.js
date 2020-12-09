import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import {
  Amber,
  Barbara,
  Beidou,
  Bennett,
  Chongyun,
  Diluc,
  Diona,
  Fischl,
  Jean,
  Kaeya,
  Keqing,
  Klee,
  Lisa,
  Mona,
  Ningguang,
  Qiqi,
  Razor,
  Sucrose,
  Tartaglia,
  Venti,
  Xiangling,
  Xiao,
  Xingqiu,
  Xinyan,
  Zhongli,
} from "genshin-impact-app/App/modules/assets";

const styles = StyleSheet.create({
  image: {
    height: 75,
    width: 75,
  },
  tier: {
    flex: 1,
    flexDirection: "row",
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
  const BTier = ["Barbara", "Beidou", "Chongyun", "Sucrose", "Xingyan"];
  const CTier = ["Kaeya", "Lisa", "Noelle", "Traveler"];
  const DTier = ["Amber"];

  const onPress = (name) => {
    navigation.navigate("Character Info", { name });
  };

  const printTier = (tier) => {
    var i;
    //Option 2 (Semi Dynamic):
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
          <Image style={styles.image} source={Xiao} />
        </TouchableOpacity>
      );

      output[i] = temp;
    }

    return output;

    // Option 3 (Barely Dynamic):
    // if (tier === "S") {
    //   for (i = 0; i < STier.length; i++) {
    //     // const pic = STier[i];
    //     return (
    //       <TouchableOpacity onPress={() => onPress(STier[i])}>
    //         <Image style={styles.image} source={STier[i]} />
    //       </TouchableOpacity>
    //     );
    //   }
    // } else if (tier === "A") {
    //   for (i = 0; i < ATier.length; i++) {
    //     return (
    //       <TouchableOpacity onPress={() => onPress(ATier[i])}>
    //         <Image style={styles.image} source={ATier[i]} />
    //       </TouchableOpacity>
    //     );
    //   }
    // } else if (tier === "B") {
    //   for (i = 0; i < BTier.length; i++) {
    //     return (
    //       <TouchableOpacity onPress={() => onPress(BTier[i])}>
    //         <Image style={styles.image} source={BTier[i]} />
    //       </TouchableOpacity>
    //     );
    //   }
    // } else if (tier === "C") {
    //   for (i = 0; i < CTier.length; i++) {
    //     return (
    //       <TouchableOpacity onPress={() => onPress(CTier[i])}>
    //         <Image style={styles.image} source={CTier[i]} />
    //       </TouchableOpacity>
    //     );
    //   }
    // } else if (tier === "D") {
    //   for (i = 0; i < DTier.length; i++) {
    //     return (
    //       <TouchableOpacity onPress={() => onPress(DTier[i])}>
    //         <Image style={styles.image} source={DTier[i]} />
    //       </TouchableOpacity>
    //     );
    //   }
    // }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Tier List!</Text>
      <View style={styles.tier}>
        {printTier("S")}
        {/* <TouchableOpacity onPress={() => onPress("Diluc")}>
            <Image style={styles.image} source={diluc} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress("Amber")}>
            <Image style={styles.image} source={amber} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress("Mona")}>
            <Image style={styles.image} source={mona} />
          </TouchableOpacity> */}
      </View>
      <View style={styles.tier}>{printTier("A")}</View>
      <View style={styles.tier}>{printTier("B")}</View>
      <View style={styles.tier}>{printTier("C")}</View>
      <View style={styles.tier}>{printTier("D")}</View>
    </View>
  );
}
