
import React from "react";
import { Image, StyleSheet } from "react-native";

export default function BuildingBackground() {
  return (
    <Image
      source={require("../../assets/images/chantier-navy.png")}
      resizeMode="contain"
      style={styles.building}
    />
  );
}

const styles = StyleSheet.create({
  building: {
    position: "absolute",
    width: 402,
    height: 300,
    top: 470,
    left: 0,
    opacity: 0.5,
  },
});
