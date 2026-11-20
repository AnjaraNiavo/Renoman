import React, { useMemo, useState } from "react";
import {
  Image,
  PanResponder,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
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

type Point = { x: number; y: number };
type Stroke = Point[];

export default function SignatureScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    clientName?: string | string[];
    clientEmail?: string | string[];
    serviceName?: string | string[];
    unit?: string | string[];
    unitPrice?: string | string[];
    quantity?: string | string[];
    draftId?: string | string[];
  }>();
  const clientName = firstParam(params.clientName) ?? "Marie Gagnon";
  const unitPrice = Number(firstParam(params.unitPrice) ?? "20");
  const quantity = Number(firstParam(params.quantity) ?? "1200");
  const totals = calculateSoumissionTotals(quantity, unitPrice);
  const confirmSignature = () =>
    router.push({
      pathname: "/envoyee",
      params: { ...params, signed: "true" },
    });
  const signatureDate = new Date().toLocaleDateString("fr-CA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "America/Toronto",
  });
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [signatureSize, setSignatureSize] = useState({ width: 0, height: 0 });
  const signaturePanResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (event) => {
          const point = {
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
          };
          setStrokes((current) => [...current, [point]]);
        },
        onPanResponderMove: (event) => {
          const point = {
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
          };
          setStrokes((current) => {
            if (current.length === 0) return [[point]];
            const lastIndex = current.length - 1;
            const next = [...current];
            next[lastIndex] = [...next[lastIndex], point];
            return next;
          });
        },
      }),
    []
  );
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
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Retour à la page précédente"
        >
          <Image
            source={require("../../assets/icone/Flèche.png")}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          onPress={() => setStrokes([])}
          accessibilityRole="button"
          accessibilityLabel="Effacer la signature"
        >
          <Text style={styles.clearText}>Effacer</Text>
        </Pressable>
      </View>

      <ScrollView
        style={[styles.scroll, { width: contentWidth }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Signez ici</Text>
        <Text
          style={styles.subtitle}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {clientName} · Total {formatCurrency(totals.total)}
        </Text>

        <View
          style={styles.signatureBox}
          onLayout={({ nativeEvent }) =>
            setSignatureSize({
              width: nativeEvent.layout.width,
              height: nativeEvent.layout.height,
            })
          }
          {...signaturePanResponder.panHandlers}
        >
          <Text style={styles.clearMark}>×</Text>
          <View style={styles.signatureBaseline} />
          <Text style={styles.signatureCaption}>Signature du client</Text>
          {signatureSize.width > 0 && signatureSize.height > 0 && (
            <Svg
              width={signatureSize.width}
              height={signatureSize.height}
              viewBox={`0 0 ${signatureSize.width} ${signatureSize.height}`}
              pointerEvents="none"
              style={styles.signatureDrawing}
            >
              {strokes.map((stroke, index) => {
                if (stroke.length === 1) {
                  return (
                    <Circle
                      key={index}
                      cx={stroke[0].x}
                      cy={stroke[0].y}
                      r={1.5}
                      fill="#101828"
                    />
                  );
                }

                const path = stroke
                  .map(
                    (point, pointIndex) =>
                      `${pointIndex === 0 ? "M" : "L"} ${point.x} ${point.y}`
                  )
                  .join(" ");

                return (
                  <Path
                    key={index}
                    d={path}
                    fill="none"
                    stroke="#101828"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                );
              })}
            </Svg>
          )}
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
          Signé le {signatureDate} · Montréal
        </Text>
      </ScrollView>

      <Pressable
        style={[
          styles.confirmButton,
          { width: contentWidth, left: (screenWidth - contentWidth) / 2 },
        ]}
        onPress={confirmSignature}
        accessibilityRole="button"
        accessibilityLabel="Confirmer la signature et terminer la soumission"
      >
        <Text style={styles.confirmText}>Confirmer la signature</Text>
      </Pressable>
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
  signatureDrawing: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
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
