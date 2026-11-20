import React, { useId } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
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
import { enregistrerSoumissionLocale } from "../data/soumissions";
import {
  calculateSoumissionTotals,
  firstParam,
  formatCurrency,
  type SoumissionData,
} from "../utils/soumission";

export default function SoumissionScreen() {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const contentWidth = Math.min(370, screenWidth - 32);
  const params = useLocalSearchParams<{
    clientName?: string | string[];
    clientEmail?: string | string[];
    serviceName?: string | string[];
    unit?: string | string[];
    unitPrice?: string | string[];
    quantity?: string | string[];
    draftId?: string | string[];
  }>();
  const generatedDraftId = useId();
  const draftId = firstParam(params.draftId) ?? generatedDraftId;
  const clientName = firstParam(params.clientName) ?? "Marie Gagnon";
  const clientEmail =
    firstParam(params.clientEmail) ?? "marie.gagnon@courriel.com";
  const serviceName = firstParam(params.serviceName) ?? "Asphalte";
  const unit = firstParam(params.unit) ?? "pi²";
  const unitPrice = Number(firstParam(params.unitPrice) ?? "20");
  const quantity = Number(firstParam(params.quantity) ?? "1200");
  const totals = calculateSoumissionTotals(quantity, unitPrice);
  const [fontsLoaded, fontError] = useFonts({
    OnestRegular: Onest_400Regular,
    OnestSemiBold: Onest_600SemiBold,
    Onest: Onest_700Bold,
  });

  if (fontError) throw fontError;
  if (!fontsLoaded) return null;

  const soumission: SoumissionData = {
    clientName,
    clientEmail,
    serviceName,
    unit,
    unitPrice,
    quantity,
  };

  const handleSave = async () => {
    try {
      await enregistrerSoumissionLocale({
        ...soumission,
        ...totals,
        id: draftId,
        createdAt: new Date().toISOString(),
      });
      router.push({
        pathname: "/envoyee",
        params: {
          ...params,
          draftId,
          localOnly: "true",
        },
      });
    } catch (error) {
      Alert.alert(
        "Enregistrement impossible",
        error instanceof Error
          ? error.message
          : "La soumission n’a pas pu être enregistrée sur cet appareil."
      );
    }
  };

  const goToSignature = () => {
    router.push({
      pathname: "/signature",
      params: { ...params, draftId },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.header, { width: contentWidth }]}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Retour"
        >
          <Image
            source={require("../../assets/icone/Flèche.png")}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </Pressable>
        <Text style={styles.readyLabel}>C’est prêt</Text>
      </View>

      <View style={[styles.progressTrack, { width: contentWidth }]} />

      <ScrollView
        style={[styles.scroll, { width: contentWidth }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>On envoie ?</Text>
        <Text style={styles.subtitle}>
          Envoyez-la, ou faites signer {clientName} sur place.
        </Text>

        <View style={styles.clientCard}>
          <Text style={styles.eyebrow}>CLIENT</Text>
          <Text style={styles.clientName}>{clientName}</Text>
          <Text style={styles.clientEmail}>{clientEmail}</Text>

          <View style={styles.topDivider} />

          <View style={styles.lineRow}>
            <View>
              <Text style={styles.lineTitle}>{serviceName}</Text>
              <Text style={styles.lineDetail}>
                {quantity.toLocaleString("fr-FR")} {unit} ×{" "}
                {formatCurrency(unitPrice)}
              </Text>
            </View>
            <Text style={styles.lineAmount}>
              {formatCurrency(totals.subtotal)}
            </Text>
          </View>

          <View style={styles.taxRow}>
            <Text style={styles.taxLabel}>Taxes (TPS + TVQ)</Text>
            <Text style={styles.taxAmount}>
              {formatCurrency(totals.tps + totals.tvq)}
            </Text>
          </View>

          <View style={styles.bottomDivider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>
              {formatCurrency(totals.total)}
            </Text>
          </View>
        </View>

        <View style={styles.fileCard}>
          <View style={styles.fileIconBox}>
            <Image
              source={require("../../assets/icone/PDF.png")}
              style={styles.fileIconImage}
              resizeMode="contain"
              accessibilityLabel="PDF"
            />
          </View>
          <View style={styles.fileInfo}>
            <Text style={styles.fileName} numberOfLines={1}>
              Soumission / contrat S-2026-042.pdf
            </Text>
            <Text style={styles.fileNote} numberOfLines={1}>
              Joint automatiquement
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { width: contentWidth, left: (screenWidth - contentWidth) / 2 },
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.pressed,
          ]}
          onPress={handleSave}
          accessibilityRole="button"
          accessibilityLabel={`Enregistrer localement pour ${clientName}`}
        >
          <Image
            source={require("../../assets/icone/Envoyer.png")}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
          <Text style={styles.primaryButtonText}>
            Envoyer à {clientName.split(" ")[0]}
          </Text>
        </Pressable>
        <Pressable
          style={styles.secondaryButton}
          onPress={goToSignature}
          accessibilityRole="button"
        >
          <Image
            source={require("../../assets/icone/Modifier.png")}
            style={styles.buttonIcon}
            resizeMode="contain"
          />
          <Text style={styles.secondaryButtonText}>Signer sur place</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.homeIndicator}
        onPress={goToSignature}
        hitSlop={16}
        accessibilityRole="button"
        accessibilityLabel="Ouvrir la page de signature"
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
  readyLabel: {
    width: 200,
    height: 19,
    color: "#079455",
    fontFamily: "OnestSemiBold",
    fontSize: 15,
    lineHeight: 15,
    textAlign: "right",
  },
  progressTrack: {
    height: 6,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 3,
    backgroundColor: "#FD9301",
  },
  scroll: { flex: 1, alignSelf: "center" },
  content: { paddingTop: 24, paddingBottom: 240 },
  title: {
    height: 43,
    width: 185,
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
    marginBottom: 22,
  },
  clientCard: {
    height: 300,
    position: "relative",
    borderWidth: 1.5,
    borderColor: "#EAECF0",
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
  },
  eyebrow: {
    position: "absolute",
    top: 22,
    left: 22,
    width: 47,
    height: 15,
    color: "#475467",
    fontFamily: "OnestSemiBold",
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.72,
  },
  clientName: {
    position: "absolute",
    top: 42,
    left: 22,
    width: 128,
    height: 24,
    color: "#101828",
    fontFamily: "Onest",
    fontSize: 19,
    lineHeight: 19,
  },
  clientEmail: {
    position: "absolute",
    top: 70,
    left: 22,
    width: 183,
    height: 18,
    color: "#667085",
    fontFamily: "OnestRegular",
    fontSize: 14,
    lineHeight: 14,
  },
  topDivider: {
    position: "absolute",
    top: 102,
    left: 22,
    right: 22,
    height: 1,
    backgroundColor: "#EAECF0",
  },
  bottomDivider: {
    position: "absolute",
    top: 220,
    left: 22,
    right: 22,
    height: 1,
    backgroundColor: "#EAECF0",
  },
  lineRow: {
    position: "absolute",
    top: 124,
    left: 22,
    right: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  lineTitle: {
    width: 68,
    height: 20,
    color: "#101828",
    fontFamily: "OnestSemiBold",
    fontSize: 16,
    lineHeight: 16,
  },
  lineDetail: {
    width: 102,
    height: 18,
    color: "#475467",
    fontFamily: "OnestRegular",
    fontSize: 14,
    lineHeight: 14,
    marginTop: 4,
  },
  lineAmount: {
    color: "#101828",
    fontFamily: "OnestSemiBold",
    fontSize: 16,
    lineHeight: 16,
  },
  taxRow: {
    position: "absolute",
    top: 184,
    left: 22,
    right: 22,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taxLabel: {
    color: "#475467",
    fontFamily: "OnestRegular",
    fontSize: 14,
    lineHeight: 18,
  },
  taxAmount: {
    color: "#475467",
    fontFamily: "OnestRegular",
    fontSize: 14,
    lineHeight: 18,
  },
  totalRow: {
    position: "absolute",
    top: 238,
    left: 22,
    right: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalLabel: {
    position: "absolute",
    top: 10,
    left: 0,
    width: 43,
    height: 23,
    color: "#101828",
    fontFamily: "Onest",
    fontSize: 18,
    lineHeight: 18,
  },totalAmount: {
    width: 200,
    height: 38,
    color: "#021733",
    fontFamily: "Onest",
    fontSize: 30,
    lineHeight: 30,
    letterSpacing: -0.6,
   marginLeft: 210
  },
  fileCard: {
    flexDirection: "row",
    alignItems: "center",
    height: 68,
    backgroundColor: "#F9FAFB",
    borderRadius: 22,
    paddingHorizontal: 6,
    marginTop: 16,
  },
  fileIconBox: {
    width: 24,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  fileIconImage: { width: 24, height: 32 },
  fileInfo: { flex: 1, marginLeft: 16 },
  fileName: {
    width: 269,
    height: 19,
    color: "#101828",
    fontFamily: "OnestSemiBold",
    fontSize: 15,
    lineHeight: 15,
  },
  fileNote: {
    width: 141,
    color: "#667085",
    fontFamily: "OnestRegular",
    fontSize: 13,
    lineHeight: 17,
    marginTop: 2,
  },
  footer: {
    position: "absolute",
    bottom: 50,
    gap: 14,
  },
  primaryButton: {
    height: 60,
    borderRadius: 999,
    backgroundColor: "#FD9301",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    shadowColor: "#FD9301",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  pressed: { opacity: 0.82 },
  buttonIcon: { width: 24, height: 24 },
  primaryButtonText: {
    width: 139,
    height: 23,
    color: "#FFFFFF",
    fontFamily: "OnestSemiBold",
    fontSize: 18,
    lineHeight: 23,
  },
  secondaryButton: {
    height: 60,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#FD9301",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  secondaryButtonText: {
    width: 131,
    height: 22,
    color: "#B86A00",
    fontFamily: "OnestSemiBold",
    fontSize: 16,
    lineHeight: 22,
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
