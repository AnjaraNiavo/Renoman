
import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
  useWindowDimensions,
} from "react-native";
import {
  Onest_400Regular,
  Onest_600SemiBold,
  Onest_700Bold,
  useFonts,
} from "@expo-google-fonts/onest";

import { COLORS } from "../constants/color";

export default function LoginScreen() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const titleWidth = Math.min(370, windowWidth - 32);
  const accountWidth = Math.min(330, windowWidth - 40);
  const legalWidth = Math.min(320, windowWidth - 40);
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

  const handleLogin = (method: string) => {
    Alert.alert(
      "Connexion",
      `La connexion avec ${method} sera configurée prochainement.`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" />
      </View>

      {/* Partie supérieure : chantier et logo */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/chantier-navy.png")}
          style={styles.buildingImage}
          resizeMode="cover"
        />

        <Image
          source={require("../../assets/images/logo/Logo Renoman.png")}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Logo Renoman"
        />
      </View>

      {/* Panneau de connexion */}
      <View style={styles.content}>
        <View style={[styles.heading, { width: titleWidth }]}>
          <Text style={[styles.title, { width: titleWidth }]}>Connexion</Text>

          <Text style={styles.subtitle}>
            Un seul toucher pour commencer.
          </Text>
        </View>

        {/* Apple */}
        <Pressable
          style={[styles.appleButton, { width: titleWidth }]}
          onPress={() => handleLogin("Apple")}
        >
          <Image
            source={require("../../assets/icone/apple.png")}
            style={[styles.providerIcon, styles.appleProviderIcon]}
            resizeMode="contain"
            accessibilityLabel="Apple"
          />
          <Text style={styles.appleButtonText}>
            Continuer avec Apple
          </Text>
        </Pressable>

        {/* Google */}
        <Pressable
          style={[styles.googleButton, { width: titleWidth }]}
          onPress={() => handleLogin("Google")}
        >
          <Image
            source={require("../../assets/icone/google.png")}
            style={[styles.providerIcon, styles.googleProviderIcon]}
            resizeMode="contain"
            accessibilityLabel="Google"
          />
          <Text style={styles.googleButtonText}>
            Continuer avec Google
          </Text>
        </Pressable>

        {/* Courriel */}
        <Pressable
          style={[styles.emailButton, { width: titleWidth }]}
          onPress={() => handleLogin("courriel")}
        >
          <Image
            source={require("../../assets/icone/couriel.png")}
            style={[styles.providerIcon, styles.emailProviderIcon]}
            resizeMode="contain"
            accessibilityLabel="Courriel"
          />
          <Text style={styles.emailButtonText}>
            Continuer avec un courriel
          </Text>
        </Pressable>

        {/* Création automatique du compte */}
        <Text style={[styles.accountText, { width: accountWidth }]}>
          Pas encore de compte ? Il se crée{"\n"}
          automatiquement.
        </Text>

        {/* Conditions d'utilisation */}
        <View style={[styles.legalContainer, { width: legalWidth }]}>
          <Text style={styles.legalText}>
            En continuant, vous acceptez les conditions d'utilisation
            {"\n"}et la politique de confidentialité.
          </Text>
        </View>

        <Pressable
          style={styles.homeIndicator}
          onPress={() => router.replace("/home")}
          hitSlop={16}
          accessibilityRole="button"
          accessibilityLabel="Retour à l’accueil"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
  },

  statusBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 45,
    backgroundColor: COLORS.navy,
    zIndex: 1,
  },

  header: {
    height: 270,
    backgroundColor: COLORS.navy,
    position: "relative",
    alignItems: "center",
  },

  buildingImage: {
    position: "absolute",
    width: "110%",
    maxWidth: 405,
    height: 260,
    top: 61,
    alignSelf: "center",
    opacity: 0.5,
  },

  logo: {
    position: "absolute",
    width: 80,
    height: 80,
    top: 110,
    alignSelf: "center",
  },

  content: {
    width: 402,
    maxWidth: "100%",
    height: 604,
    alignSelf: "center",
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 17,
    alignItems: "center",
  },

  heading: {
    alignItems: "center",
    marginTop: 19,
    marginBottom: 24,
  },

  title: {
    height: 38,
    fontFamily: "Onest",
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 30,
    letterSpacing: -0.6,
    textAlign: "center",
    color: "#101828",
  },

  subtitle: {
    fontSize: 20,
    width: "370px",
    height: "20px",
    color: "#475467",
    top: "12px",
    left: "25px"
  },

  appleButton: {
    height: 58,
    borderRadius: 999,
    gap: 10,
    backgroundColor: "#000000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    marginBottom: 14,
  },

  appleProviderIcon: {
    width: 22,
    height: 22,
    marginRight: 0,
  },

  providerIcon: {
    width: 22,
    height: 22,
    marginRight: 0,
  },

  appleButtonText: {
    width: 174,
    height: 22,
    fontFamily: "OnestSemiBold",
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 17,
    letterSpacing: 0,
  },

  googleButton: {
    height: 58,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 14,
  },

  googleProviderIcon: {
    marginRight: 0,
  },

  googleButtonText: {
    width: 184,
    height: 22,
    fontFamily: "OnestSemiBold",
    color: "#101828",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 17,
    letterSpacing: 0,
  },

  emailButton: {
    height: 58,
    backgroundColor: "#F1F2F4",
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  emailProviderIcon: {
    marginRight: 0,
  },

  emailButtonText: {
    width: 213,
    height: 22,
    fontFamily: "OnestSemiBold",
    color: "#101828",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 17,
    letterSpacing: 0,
  },

  accountText: {
    position: "absolute",
    top: 380,
    alignSelf: "center",
    height: 40,
    color: "#475467",
    fontFamily: "OnestRegular",
    fontSize: 14,
    lineHeight: 19.6,
    textAlign: "center",
  },

  legalContainer: {
    position: "absolute",
    top: 520,
    alignSelf: "center",
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  legalText: {
    width: "100%",
    color: "#98A2B3",
    fontFamily: "OnestRegular",
    fontSize: 12,
    lineHeight: 16.8,
    textAlign: "center",
  },

  homeIndicator: {
    position: "absolute",
    top: 590,
    alignSelf: "center",
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#101828",
  },
});
