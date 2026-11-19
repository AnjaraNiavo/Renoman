
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  StatusBar,
} from "react-native";
import {
  Onest_400Regular,
  Onest_600SemiBold,
  Onest_700Bold,
  useFonts,
} from "@expo-google-fonts/onest";

type CombienData = {
  quantity: number;
  unitPrice: number;
  total: number;
};

type Props = {
  onBack?: () => void;
  onContinue?: (data: CombienData) => void;
  serviceName?: string;
  unit?: string;
  unitPrice?: number;
};

const KEYPAD = [
  "1", "2", "3",
  "4", "5", "6",
  "7", "8", "9",
  ",", "0", "delete",
];

const formatNumber = (value: string) => {
  if (!value) return "0";

  const [integer, decimal] = value.split(",");
  const formattedInteger = integer.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    " "
  );

  return decimal !== undefined
    ? `${formattedInteger},${decimal}`
    : formattedInteger;
};

const formatCurrency = (value: number) =>
  `${Math.round(value).toLocaleString("fr-FR")} $`;

export default function CombienScreen({
  onBack,
  onContinue,
  serviceName = "Asphalte",
  unit = "pi²",
  unitPrice = 20,
}: Props) {
  const [quantity, setQuantity] = useState("1200");
  const [fontsLoaded, fontError] = useFonts({
    OnestRegular: Onest_400Regular,
    OnestSemiBold: Onest_600SemiBold,
    Onest: Onest_700Bold,
  });

  const numericQuantity = Number(quantity.replace(",", "."));
  const total = numericQuantity * unitPrice;

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return null;
  }

  const handleKeyPress = (key: string) => {
    if (key === "delete") {
      setQuantity((current) => current.slice(0, -1));
      return;
    }

    if (key === ",") {
      setQuantity((current) =>
        current.includes(",")
          ? current
          : `${current || "0"},`
      );
      return;
    }

    if (quantity.replace(",", "").length >= 9) return;

    const decimalPart = quantity.split(",")[1];

    if (quantity.includes(",") && decimalPart.length >= 2) {
      return;
    }

    setQuantity((current) =>
      current === "0" ? key : current + key
    );
  };

  const handleContinue = () => {
    if (!quantity || numericQuantity <= 0) return;

    onContinue?.({
      quantity: numericQuantity,
      unitPrice,
      total,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={onBack}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Retour à l'étape précédente"
        >
          <Image
            source={require("../../assets/icone/Flèche.png")}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </Pressable>

        <Text style={styles.stepText}>Étape 3 sur 3</Text>
      </View>

      {/* Progression */}
      <View style={styles.progressContainer}>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.progressSegment} />
        ))}
      </View>

      {/* Titre */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Combien ?</Text>

        <Text style={styles.subtitle}>
          {serviceName} · 20 $/ pi²
        </Text>
      </View>

      {/* Quantité et total */}
      <View style={styles.quantityCard}>
        <View style={styles.quantityRow}>
          <Text
            style={styles.quantityValue}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {formatNumber(quantity)}
          </Text>

          <Text style={styles.quantityUnit}> pi²</Text>
        </View>

        <View style={styles.totalBadge}>
          <Text style={styles.totalText}>
            = 24000 $ 
          </Text>
        </View>
      </View>

      {/* Clavier numérique */}
      <View style={styles.keypad}>
        {KEYPAD.map((key) => (
          <Pressable
            key={key}
            onPress={() => handleKeyPress(key)}
            style={({ pressed }) => [
              styles.key,
              pressed && styles.keyPressed,
            ]}
          >
            {key === "delete" ? (
              <Text style={styles.deleteIcon}>⌫</Text>
            ) : (
              <Text style={styles.keyText}>{key}</Text>
            )}
          </Pressable>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable
          onPress={handleContinue}
          disabled={!quantity || numericQuantity <= 0}
          style={({ pressed }) => [
            styles.continueButton,
            pressed && styles.buttonPressed,
            (!quantity || numericQuantity <= 0) &&
              styles.disabledButton,
          ]}
        >
          <Text style={styles.continueText}>Continuer</Text>
        </Pressable>

        <Pressable
          style={styles.homeIndicatorContainer}
          onPress={handleContinue}
          disabled={!quantity || numericQuantity <= 0}
          accessibilityRole="button"
          accessibilityLabel="Continuer vers le récapitulatif de la soumission"
        >
          <View style={styles.homeIndicator} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 64,
  },

  header: {
    height: 44,
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

  backIcon: {
    width: 24,
    height: 24,
  },

  stepText: {
    width: 200,
    height: 19,
    fontFamily: "OnestSemiBold",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 15,
    color: "#475467",
    textAlign: "right",
  },

  progressContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
  },

  progressSegment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FD9301",
  },

  titleContainer: {
    marginTop: 24,
  },

  title: {
    height: 43,
    fontFamily: "Onest",
    fontSize: 34,
    fontWeight: "700",
    lineHeight: 34,
    letterSpacing: -0.68,
    color: "#101828",
  },

  subtitle: {
    height: 20,
    fontFamily: "OnestRegular",
    fontSize: 16,
    lineHeight: 20,
    color: "#475467",
    marginTop: 5,
  },

  quantityCard: {
    height: 150,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "#EAECF0",
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    paddingTop: 20,
    marginTop: 26,
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 66,
  },

  quantityValue: {
    fontFamily: "Onest",
    fontSize: 52,
    fontWeight: "700",
    lineHeight: 52,
    letterSpacing: -1.56,
    color: "#101828",
  },

  quantityUnit: {
    fontFamily: "Onest",
    fontSize: 52,
    fontWeight: "700",
    lineHeight: 52,
    letterSpacing: -1.56,
    color: "#101828",
    textAlign: "center",
    marginLeft: 8,
  },

  totalBadge: {
    width: 150,
    height: 34,
    borderRadius: 999,
    backgroundColor: "#FFF4E3",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  totalText: {
    width: 90,
    height: 22,
    fontFamily: "Onest",
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 17,
    color: "#B86A00",
    textAlign: "center",
  },

  keypad: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-between",
    marginTop: 18,
  },

  key: {
    width: "31%",
    height: "22%",
    minHeight: 48,
    borderRadius: 20,
    backgroundColor: "#F2F4F7",
    justifyContent: "center",
    alignItems: "center",
  },

  keyPressed: {
    backgroundColor: "#E4E7EC",
  },

  keyText: {
    fontFamily: "OnestSemiBold",
    fontSize: 26,
    fontWeight: "600",
    lineHeight: 26,
    color: "#101828",
  },

  deleteIcon: {
    fontFamily: "OnestSemiBold",
    fontSize: 26,
    lineHeight: 26,
    color: "#101828",
  },

  footer: {
    paddingTop: 34,
  },

  continueButton: {
    height: 60,
    borderRadius: 999,
    backgroundColor: "#FD9301",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FD9301",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },

  buttonPressed: {
    opacity: 0.85,
  },

  disabledButton: {
    opacity: 0.5,
  },

  continueText: {
    fontFamily: "OnestSemiBold",
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 23,
    color: "#FFFFFF",
  },

  homeIndicatorContainer: {
    height: 84,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 9,
  },

  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#101828",
  },
});
