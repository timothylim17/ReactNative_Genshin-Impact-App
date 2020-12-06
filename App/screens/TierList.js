import React from "react";
import { View, Text, Button } from "react-native";

export default function TierList({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Tier List!</Text>
      <Button
        title="Diluc"
        onPress={() => navigation.navigate("Character Info", { name: "Diluc" })}
      />
      <Button
        title="Mona"
        onPress={() => navigation.navigate("Character Info", { name: "Mona" })}
      />
      <Button
        title="Keqing"
        onPress={() =>
          navigation.navigate("Character Info", { name: "Keqing" })
        }
      />
    </View>
  );
}
