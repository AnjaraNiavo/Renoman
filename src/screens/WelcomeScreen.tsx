
import React from "react";
import { Link } from "expo-router";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Alert,
} from "react-native";
import {
  Onest_400Regular,
  Onest_600SemiBold,
  Onest_700Bold,
  useFonts,
} from "@expo-google-fonts/onest";

import { COLORS } from "../constants/color";
import BuildingBackground from "@/components/BuildingBackground";

export default function WelcomeScreen() {
  const [fontsLoaded, fontError] = useFonts({
    OnestRegular: Onest_400Regular,
    Onest: Onest_700Bold,
    OnestSemiBold: Onest_600SemiBold,
  });

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return null;
  }

  const handleStart = () => {
    Alert.alert("Bienvenue", "Bienvenue sur Renoman !");
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" />
      </View>
      <BuildingBackground />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo/Logo Renoman.png")}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Logo Renoman"
        />
      </View>

      {/* Texte principal */}
      <View style={styles.content}>
        <Text style={styles.title}>
          Vos soumissions{"\n"}en{" "}
          <Text style={styles.highlight}>60 secondes.</Text>
        </Text>

        <Text style={styles.description}>
          Choisissez le client, le travail et le
          quantitatif. On s'occupe du reste.
        </Text>
      </View>

      {/* Bouton */}
      <View style={styles.footer}>
        <Pressable
          style={styles.button}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>
            Commencer
          </Text>
        </Pressable>

        <Link href="/login" asChild>
          <Pressable style={styles.loginLink} accessibilityRole="link">
            <Text style={styles.loginText}>J'ai déjà un compte</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
    paddingHorizontal: 25,
    paddingTop: 70,
    paddingBottom: 30,
    position: "relative",
    overflow: "hidden"
  },

  statusBar: {
    position: "absolute",
    top: 0,
    left: -25,
    right: -25,
    height: 52,
    backgroundColor: COLORS.navy,
  },

  logoContainer: {
    position: "absolute",
    top: 140,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  logo: {
    width: 100,
    height: 100,
  },

  content: {
    position: "absolute",
    top: 268,
    left: 21,
    right: 21,
    alignItems: "center",
  },

  title: {
    width: "100%",
    height: 92,
    color: COLORS.white,
    fontFamily: "Onest",
    fontSize: 40,
    fontWeight: "700",
    lineHeight: 46,
    letterSpacing: -2,
    textAlign: "center",
  },

  highlight: {
    color: COLORS.primary,
    fontFamily: "Onest",
    fontWeight: "700",
  },

  description: {
    width: "100%",
    maxWidth: 330,
    height: 48,
    color: "#C4CBD5",
    fontFamily: "OnestRegular",
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 23.8,
    letterSpacing: 0,
    textAlign: "center",
    marginTop: 24,
  },

  footer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 74,
    alignItems: "center",
    gap: 10,
  },

  button: {
    width: "100%",
    maxWidth: 370,
    height: 60,
    backgroundColor: "#FD9301",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
    shadowColor: "#FD9301",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 10,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign : "center",
    
  },

  loginText: {
    color: COLORS.white,
    fontFamily: "OnestSemiBold",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
  },

  loginLink: {
    width: "100%",
    maxWidth: 370,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  homeIndicator: {
    position: "absolute",
    bottom: 35,
    alignSelf: "center",
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.white,
    opacity: 1,
  },
});
