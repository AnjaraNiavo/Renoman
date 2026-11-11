
import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";

import { COLORS } from "../constants/color";

export default function LoginScreen() {
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
        <View style={styles.heading}>
          <Text style={styles.title}>Connexion</Text>

          <Text style={styles.subtitle}>
            Un seul toucher pour commencer.
          </Text>
        </View>

        {/* Apple */}
        <Pressable
          style={styles.appleButton}
          onPress={() => handleLogin("Apple")}
        >
          <Image
            source={require("../../assets/icone/apple.png")}
            style={styles.providerIcon}
            resizeMode="contain"
            accessibilityLabel="Apple"
          />
          <Text style={styles.appleButtonText}>
            Continuer avec Apple
          </Text>
        </Pressable>

        {/* Google */}
        <Pressable
          style={styles.googleButton}
          onPress={() => handleLogin("Google")}
        >
          <Image
            source={require("../../assets/icone/google.png")}
            style={styles.providerIcon}
            resizeMode="contain"
            accessibilityLabel="Google"
          />
          <Text style={styles.googleButtonText}>
            Continuer avec Google
          </Text>
        </Pressable>

        {/* Courriel */}
        <Pressable
          style={styles.emailButton}
          onPress={() => handleLogin("courriel")}
        >
          <Image
            source={require("../../assets/icone/couriel.png")}
            style={styles.providerIcon}
            resizeMode="contain"
            accessibilityLabel="Courriel"
          />
          <Text style={styles.emailButtonText}>
            Continuer avec un courriel
          </Text>
        </Pressable>

        {/* Création automatique du compte */}
        <Text style={styles.accountText}>
          Pas encore de compte ? Il se crée{"\n"}
          automatiquement.
        </Text>

        {/* Conditions d'utilisation */}
        <View style={styles.legalContainer}>
          <Text style={styles.legalText}>
            En continuant, vous acceptez les conditions d'utilisation
            {"\n"}et la politique de confidentialité.
          </Text>
        </View>
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
    flex: 1,
    width: "100%",
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 17,
    alignItems: "center",
  },

  heading: {
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: COLORS.text,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.secondaryText,
    marginTop: 3,
  },

  appleButton: {
    width: "100%",
    height: 52,
    backgroundColor: "#000000",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  providerIcon: {
    width: 20,
    height: 20,
    marginRight: 9,
  },

  appleButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },

  googleButton: {
    width: "100%",
    height: 52,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  googleButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600",
  },

  emailButton: {
    width: "100%",
    height: 52,
    backgroundColor: "#F1F2F4",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  emailButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600",
  },

  accountText: {
    color: COLORS.secondaryText,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 30,
  },

  legalContainer: {
    marginTop: "auto",
    marginBottom: 25,
    alignItems: "center",
  },

  legalText: {
    color: "#A0A5AE",
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
  },
});
