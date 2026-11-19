import React from "react";
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Onest_400Regular,
  Onest_600SemiBold,
  Onest_700Bold,
  useFonts,
} from "@expo-google-fonts/onest";
import {
  calculateSoumissionTotals,
  firstParam,
  formatCurrency,
} from "../utils/soumission";

export default function SoumissionEnregistreeScreen() {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const contentWidth = Math.min(370, screenWidth - 32);
  const params = useLocalSearchParams<{
    clientName?: string | string[];
    serviceName?: string | string[];
    unitPrice?: string | string[];
    quantity?: string | string[];
    unit?: string | string[];
    signed?: string | string[];
  }>();
  const clientName = firstParam(params.clientName) ?? "votre client";
  const signed = firstParam(params.signed) === "true";
  const unitPrice = Number(firstParam(params.unitPrice) ?? "20");
  const quantity = Number(firstParam(params.quantity) ?? "1200");
  const total = calculateSoumissionTotals(quantity, unitPrice).total;
  const [fontsLoaded, fontError] = useFonts({
    OnestRegular: Onest_400Regular,
    OnestSemiBold: Onest_600SemiBold,
    Onest: Onest_700Bold,
  });

  if (fontError) throw fontError;
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#061B38" />

      <Image
        source={require("../../assets/images/chantier-navy.png")}
        style={styles.artwork}
        resizeMode="cover"
        pointerEvents="none"
      />

      <View
        style={[
          styles.content,
          {
            width: contentWidth,
            left: (screenWidth - contentWidth) / 2,
          },
        ]}
      >
        <View style={styles.successIcon}>
          <Image
            source={require("../../assets/images/logo/Logo Renoman.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="Renoman"
          />
        </View>
        <Text style={[styles.title, { width: contentWidth }]}>Envoyer</Text>
        <Text
          style={[
            styles.subtitle,
            { width: Math.min(320, contentWidth) },
          ]}
        >
          Marie Gagnon a reçu votre soumission de 27 594 $.
        </Text>

        <View style={styles.localBadge}>
          <Image
            source={require("../../assets/icone/Chrono.png")}
            style={styles.chronoIcon}
            resizeMode="contain"
            accessibilityLabel="Chrono"
          />
          <Text style={styles.badgeText}>En 38 secondes</Text>
        </View>
      </View>

      <Pressable
        style={[
          styles.homeButton,
          { width: contentWidth, left: (screenWidth - contentWidth) / 2 },
        ]}
        onPress={() => router.replace("/home")}
        accessibilityRole="button"
        accessibilityLabel="Retour à l’accueil"
      >
        <Text style={styles.homeButtonText}>Retour à l’accueil</Text>
      </Pressable>
      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#061B38", alignItems: "center" },
  artwork: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 560,
    height: 300,
    opacity: 0.5,
  },
  content: {
    position: "absolute",
    top: 190,
    alignItems: "center",
  },
  successIcon: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { width: 150, height: 150 },
  title: {
    color: "#FFFFFF",
    fontFamily: "Onest",
    height: 56,
    fontSize: 44,
    lineHeight: 44,
    letterSpacing: -0.88,
    textAlign: "center",
    marginTop: 32,
  },
  subtitle: {
    width: 320,
    height: 48,
    color: "#FFFFFFCC",
    fontFamily: "OnestRegular",
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 6,
  },
  amount: {
    color: "#FFFFFF",
    fontFamily: "OnestSemiBold",
    fontSize: 16,
    marginTop: 7,
  },
  localBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: 180,
    height: 36,
    backgroundColor: "#FFFFFF24",
    borderRadius: 999,
    marginTop: 26,
  },
  chronoIcon: {
    width: 14,
    height: 14,
    position: "relative",
    top: 2,
    left: 2,
  },
  badgeText: {
    width: 114,
    height: 19,
    color: "#FFFFFF",
    fontFamily: "OnestSemiBold",
    fontSize: 15,
    lineHeight: 15,
  },
  homeButton: {
    position: "absolute",
    bottom: 54,
    height: 60,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  homeButtonText: {
    width: 148,
    height: 23,
    color: "#021733",
    fontFamily: "OnestSemiBold",
    fontSize: 18,
    lineHeight: 23,
  },
  homeIndicator: {
    position: "absolute",
    bottom: 9,
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
  },
});
