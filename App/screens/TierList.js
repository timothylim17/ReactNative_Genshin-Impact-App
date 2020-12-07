import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  amber,
  barbara,
  beidou,
  bennett,
  chongyun,
  diluc,
  diona,
  fischl,
  jean,
  kaeya,
  keqing,
  klee,
  lisa,
  mona,
  ningguang,
  qiqi,
  razor,
  sucrose,
  tartaglia,
  venti,
  xiangling,
  xiao,
  xingqiu,
  xinyan,
  zhongli,
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
  const onPress = (name) => {
    navigation.navigate("Character Info", { name });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Tier List!</Text>
      <View style={styles.tier}>
        <TouchableOpacity onPress={() => onPress("Diluc")}>
          <Image style={styles.image} source={diluc} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress("Amber")}>
          <Image style={styles.image} source={amber} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPress("Mona")}>
          <Image style={styles.image} source={mona} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
