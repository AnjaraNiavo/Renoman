
import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  useWindowDimensions,
} from "react-native";
import {
  Onest_400Regular,
  Onest_600SemiBold,
  Onest_700Bold,
  useFonts,
} from "@expo-google-fonts/onest";

import { COLORS } from "../constants/color";
import { verifierIdentifiantsLocaux } from "../data/comptes";

export default function LoginScreen() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const titleWidth = Math.min(370, windowWidth - 32);
  const accountWidth = Math.min(330, windowWidth - 40);
  const legalWidth = Math.min(320, windowWidth - 40);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
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

  const handleEmailLogin = async () => {
    if (isChecking) {
      return;
    }

    if (!email.trim() || !password) {
      setLoginError("Saisissez votre adresse e-mail et votre mot de passe.");
      return;
    }

    setLoginError("");
    setIsChecking(true);
    try {
      const isValid = await verifierIdentifiantsLocaux(email, password);
      if (!isValid) {
        setLoginError("Adresse e-mail ou mot de passe incorrect.");
        setIsChecking(false);
        return;
      }

      setIsChecking(false);
      router.replace("/home");
      return;
    } catch (error) {
      console.error("Échec de la vérification du compte local :", error);
      setLoginError("Impossible de vérifier le compte sur cet appareil.");
    }
    setIsChecking(false);
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
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.heading, { width: titleWidth }]}>
          <Text style={[styles.title, { width: titleWidth }]}>Connexion</Text>

          <Text style={styles.subtitle}>
            Un seul toucher pour commencer.
          </Text>
        </View>

        <View style={[styles.credentials, { width: titleWidth }]}>
          <TextInput
            style={styles.credentialInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Adresse e-mail"
            placeholderTextColor="#667085"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            accessibilityLabel="Adresse e-mail"
          />
          <TextInput
            style={styles.credentialInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Mot de passe"
            placeholderTextColor="#667085"
            secureTextEntry
            returnKeyType="done"
            accessibilityLabel="Mot de passe"
          />
          {loginError ? <Text style={styles.loginError}>{loginError}</Text> : null}
          <Pressable
            style={[styles.credentialsButton, isChecking && styles.credentialsButtonDisabled]}
            onPress={handleEmailLogin}
            disabled={isChecking}
          >
            <Text style={styles.credentialsButtonText}>
              {isChecking ? "Vérification..." : "Se connecter"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>ou</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Apple */}
        <Pressable
          style={[styles.appleButton, { width: titleWidth }]}
          onPress={() => router.push("/home")}
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
          onPress={() => router.push("/home")}
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
          onPress={() => router.push("/home")}
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

        <Pressable
          style={[styles.accountText, { width: accountWidth }]}
          onPress={() => router.push("/register")}
          accessibilityRole="link"
        >
          <Text style={styles.accountLinkText}>Pas encore de compte ? Créez-en un</Text>
        </Pressable>

        {/* Conditions d'utilisation */}
        <View style={[styles.legalContainer, { width: legalWidth }]}>
          <Text style={styles.legalText}>
            En continuant, vous acceptez les conditions d’utilisation
            {"\n"}et la politique de confidentialité.
          </Text>
        </View>
        </ScrollView>

      <Pressable
        style={styles.homeIndicator}
        onPress={() => router.replace("/")}
        hitSlop={16}
        accessibilityRole="button"
        accessibilityLabel="Aller à la page de bienvenue"
      />
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
    width: "100%",
    maxWidth: "100%",
    flex: 1,
    alignSelf: "center",
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },

  contentContainer: {
    width: "100%",
    maxWidth: 402,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 17,
    paddingBottom: 40,
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

  credentials: {
    gap: 12,
    marginBottom: 4,
  },

  credentialInput: {
    minHeight: 54,
    borderWidth: 1.5,
    borderColor: "#D0D5DD",
    borderRadius: 22,
    paddingHorizontal: 16,
    color: "#101828",
    fontFamily: "OnestRegular",
    fontSize: 16,
  },

  loginError: {
    color: "#B42318",
    fontFamily: "OnestRegular",
    fontSize: 13,
  },

  credentialsButton: {
    minHeight: 56,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  credentialsButtonDisabled: {
    opacity: 0.7,
  },

  credentialsButtonText: {
    color: COLORS.white,
    fontFamily: "OnestSemiBold",
    fontSize: 17,
  },

  separator: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginVertical: 14,
  },

  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#D0D5DD",
  },

  separatorText: {
    color: "#667085",
    fontFamily: "OnestRegular",
    fontSize: 15,
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
    alignSelf: "center",
    minHeight: 40,
    marginTop: 18,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  accountLinkText: {
    color: "#475467",
    fontFamily: "OnestRegular",
    fontSize: 14,
    lineHeight: 19.6,
    textDecorationLine: "underline",
  },

  legalContainer: {
    alignSelf: "center",
    height: 34,
    marginTop: 18,
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
    bottom: 8,
    alignSelf: "center",
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.white,
    zIndex: 10,
    elevation: 10,
  },
});
