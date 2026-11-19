import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Onest_400Regular,
  Onest_600SemiBold,
  Onest_700Bold,
  useFonts,
} from "@expo-google-fonts/onest";

export default function SignatureScreen() {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const contentWidth = Math.min(370, screenWidth - 32);
  const [fontsLoaded, fontError] = useFonts({
    OnestRegular: Onest_400Regular,
    OnestSemiBold: Onest_600SemiBold,
    Onest: Onest_700Bold,
  });

  if (fontError) throw fontError;
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.header, { width: contentWidth }]}>
        <View style={styles.backButton}>
          <Image
            source={require("../../assets/icone/Flèche.png")}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.clearText}>Effacer</Text>
      </View>

      <ScrollView
        style={[styles.scroll, { width: contentWidth }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Signez ici</Text>
        <Text style={styles.subtitle}>Marie Gagnon · Total 27 594 $</Text>

        <View style={styles.signatureBox}>
          <Image
            source={require("../../assets/icone/Signature.png")}
            style={[styles.signatureImage, { width: contentWidth - 70 }]}
            resizeMode="contain"
          />
          <Text style={styles.clearMark}>×</Text>
          <View style={styles.signatureBaseline} />
          <Text style={styles.signatureCaption}>Signature du client</Text>
        </View>

        <View style={styles.acceptRow}>
          <Image
            source={require("../../assets/icone/Case.png")}
            style={styles.checkboxImage}
            resizeMode="contain"
          />
          <Text style={[styles.acceptText, { width: contentWidth - 112 }]}>
            J’accepte la soumission S-2026-042{"\n"}et ses conditions.
          </Text>
        </View>

        <Text style={styles.localNote}>
          Signé le 28 oct. 2026 · Montréal
        </Text>
      </ScrollView>

      <View
        style={[
          styles.confirmButton,
          { width: contentWidth, left: (screenWidth - contentWidth) / 2 },
        ]}
      >
        <Text style={styles.confirmText}>Confirmer la signature</Text>
      </View>
      <Pressable
        style={styles.homeIndicator}
        onPress={() => router.push("/envoyee")}
        hitSlop={16}
        accessibilityRole="button"
        accessibilityLabel="Ouvrir la page Soumission envoyée"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", paddingTop: 64 },
  header: {
    height: 44,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#F2F4F7",
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: { width: 24, height: 24 },
  clearText: {
    width: 200,
    height: 19,
    color: "#079455",
    fontFamily: "OnestSemiBold",
    fontSize: 15,
    lineHeight: 15,
    textAlign: "right",
  },
  scroll: { flex: 1, alignSelf: "center" },
  content: { paddingTop: 50, paddingBottom: 120 },
  title: {
    width: 185,
    height: 43,
    color: "#101828",
    fontFamily: "Onest",
    fontSize: 34,
    lineHeight: 34,
    letterSpacing: -0.68,
  },
  subtitle: {
    width: "89%",
    height: 20,
    color: "#475467",
    fontFamily: "OnestRegular",
    fontSize: 16,
    lineHeight: 16,
    marginTop: 5,
  },
  signatureBox: {
    height: 300,
    width: "100%",
    position: "relative",
    borderRadius: 28,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#EAECF0",
    backgroundColor: "#F9FAFB",
    overflow: "hidden",
    marginTop: -6,
  },
  signatureImage: {
    position: "absolute",
    top: 70,
    left: 35,
    height: 120,
  },
  clearMark: {
    position: "absolute",
    top: 196,
    left: 30,
    width: 13,
    height: 28,
    color: "#98A2B3",
    fontFamily: "OnestSemiBold",
    fontSize: 22,
    lineHeight: 22,
  },
  signatureBaseline: {
    position: "absolute",
    top: 226,
    left: 30,
    right: 30,
    height: 1.5,
    backgroundColor: "#98A2B3",
  },
  signatureCaption: {
    position: "absolute",
    top: 244,
    left: 0,
    right: 0,
    height: 17,
    color: "#475467",
    fontFamily: "OnestRegular",
    fontSize: 13,
    lineHeight: 13,
    textAlign: "center",
  },
  acceptRow: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 14,
    paddingHorizontal: 14,
  },
  checkboxImage: { width: 26, height: 26 },
  acceptText: {
    height: 42,
    color: "#101828",
    fontFamily: "OnestRegular",
    fontSize: 15,
    lineHeight: 21,
  },
  localNote: {
    width: 192,
    height: 17,
    color: "#475467",
    fontFamily: "OnestRegular",
    fontSize: 13,
    lineHeight: 13,
    marginLeft: 40,
    marginTop: 40,
  },
  confirmButton: {
    position: "absolute",
    bottom: 84,
    height: 60,
    borderRadius: 999,
    backgroundColor: "#FD9301",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FD9301",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  confirmText: {
    color: "#FFFFFF",
    fontFamily: "OnestSemiBold",
    fontSize: 18,
    lineHeight: 23,
  },
  homeIndicator: {
    position: "absolute",
    bottom: 9,
    alignSelf: "center",
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#101828",
  },
});
