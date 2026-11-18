
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import {
  Onest_400Regular,
  Onest_500Medium,
  Onest_600SemiBold,
  Onest_700Bold,
  useFonts,
} from "@expo-google-fonts/onest";

type Category = "Caissons" | "Matériel" | "Extra" | "Main-d'œuvre";
type Unit = "pi²" | "pi lin." | "heure" | "unité";

type PrixManuelData = {
  name: string;
  category: Category;
  unit: Unit;
  price: string;
  saveToPackages: boolean;
};

type Props = {
  onBack?: () => void;
  onContinue?: (data: PrixManuelData) => void;
};

const CATEGORIES: Category[] = [
  "Caissons",
  "Matériel",
  "Extra",
  "Main-d'œuvre",
];

const UNITS: Unit[] = ["pi²", "pi lin.", "heure", "unité"];

export default function PrixManuelScreen({
  onBack,
  onContinue,
}: Props) {
  const [name, setName] = useState("Caissons");
  const [category, setCategory] = useState<Category>("Caissons");
  const [unit, setUnit] = useState<Unit>("unité");
  const [price, setPrice] = useState("1250");
  const [saveToPackages, setSaveToPackages] = useState(true);
  const [fontsLoaded, fontError] = useFonts({
    OnestRegular: Onest_400Regular,
    OnestMedium: Onest_500Medium,
    OnestSemiBold: Onest_600SemiBold,
    Onest: Onest_700Bold,
  });

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return null;
  }

  const formatPrice = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, "");

    if (!numbers) return "";

    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handlePriceChange = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, "");
    setPrice(numbers);
  };

  const handleContinue = () => {
    const numericPrice = Number(price);

    if (!name.trim()) {
      Alert.alert("Nom manquant", "Veuillez nommer votre forfait.");
      return;
    }

    if (!price || numericPrice <= 0) {
      Alert.alert("Prix invalide", "Veuillez saisir un prix valide.");
      return;
    }

    const data: PrixManuelData = {
      name: name.trim(),
      category,
      unit,
      price,
      saveToPackages,
    };

    if (onContinue) {
      onContinue(data);
    } else {
      Alert.alert(
        "Forfait enregistré",
        `${data.name} : ${formatPrice(data.price)} $ / ${data.unit}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={onBack ?? (() => Alert.alert("Retour"))}
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

            <Text style={styles.stepText}>Étape 2 sur 3</Text>
          </View>

          {/* PROGRESS BAR */}
          <View style={styles.progressContainer}>
            <View style={styles.progressActive} />
            <View style={styles.progressActive} />
            <View style={styles.progressInactive} />
          </View>

          {/* TITLE */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Prix manuel</Text>

            <Text style={styles.subtitle}>
              Nommez-le comme vous voulez.
            </Text>
          </View>

          {/* NAME */}
          <View style={styles.nameSection}>
            <Text style={styles.label}>Nom</Text>

            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
              placeholder="Nom du forfait"
              placeholderTextColor="#98A2B3"
              maxLength={50}
              returnKeyType="next"
            />
          </View>

          {/* CATEGORIES */}
          <View style={styles.categoriesContainer}>
            {CATEGORIES.map((item) => {
              const selected = category === item;

              return (
                <Pressable
                  key={item}
                  style={[
                    styles.categoryChip,
                    selected && styles.selectedCategoryChip,
                  ]}
                  onPress={() => setCategory(item)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selected && styles.selectedCategoryText,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* CALCULATED BY */}
          <View style={styles.unitSection}>
            <Text style={styles.label}>Calculé par</Text>

            <View style={styles.unitContainer}>
              {UNITS.map((item) => {
                const selected = unit === item;

                return (
                  <Pressable
                    key={item}
                    style={[
                      styles.unitButton,
                      selected && styles.selectedUnitButton,
                    ]}
                    onPress={() => setUnit(item)}
                  >
                    <Text
                      style={[
                        styles.unitText,
                        selected && styles.selectedUnitText,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* PRICE */}
          <View style={styles.priceSection}>
            <Text style={styles.label}>Prix</Text>

            <View style={styles.priceInputContainer}>
              <View style={styles.priceValueContainer}>
                <TextInput
                  style={styles.priceInput}
                  value={formatPrice(price)}
                  onChangeText={handlePriceChange}
                  keyboardType="number-pad"
                  placeholder="0"
                  placeholderTextColor="#98A2B3"
                  returnKeyType="done"
                />

                <Text style={styles.priceDollarText}>$</Text>
              </View>

              <Text style={styles.currencyText}>/ {unit}</Text>
            </View>
          </View>

          {/* SAVE TO PACKAGES */}
          <View style={styles.saveContainer}>
            <Pressable
              onPress={() => setSaveToPackages((value) => !value)}
              accessibilityRole="switch"
              accessibilityState={{ checked: saveToPackages }}
              accessibilityLabel="Ajouter à mes forfaits"
            >
              {saveToPackages ? (
                <Image
                  source={require("../../assets/icone/Interrupteur.png")}
                  style={styles.saveSwitch}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.switchOffTrack}>
                  <View style={styles.switchOffThumb} />
                </View>
              )}
            </Pressable>

            <Text style={styles.saveText}>
              Ajouter à mes forfaits
            </Text>
          </View>
        </ScrollView>

        {/* CONTINUE BUTTON */}
        <View style={styles.footer}>
          <Pressable
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Continuer</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      {/* HOME INDICATOR */}
      <Pressable
        style={styles.homeIndicatorContainer}
        onPress={handleContinue}
        accessibilityRole="button"
        accessibilityLabel="Continuer vers le calcul de quantité"
      >
        <View style={styles.homeIndicator} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 64,
    paddingBottom: 16,
  },

  // HEADER
  header: {
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#F2F4F7",
    justifyContent: "center",
    alignItems: "center",
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

  // PROGRESS
  progressContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },

  progressActive: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FD9301",
  },

  progressInactive: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EAECF0",
  },

  // TITLE
  titleContainer: {
    marginTop: 32,
  },

  title: {
    height: 43,
    fontFamily: "Onest",
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: -0.68,
    lineHeight: 34,
    color: "#101828",
  },

  subtitle: {
    height: 20,
    fontFamily: "OnestRegular",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    color: "#475467",
    marginTop: 5,
  },

  // NAME
  nameSection: {
    marginTop: 24,
  },

  label: {
    height: 18,
    fontFamily: "OnestSemiBold",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 14,
    color: "#101828",
    marginBottom: 6,
    marginLeft: 4,
  },

  nameInput: {
    height: 56,
    borderWidth: 2,
    borderColor: "#FD9301",
    borderRadius: 999,
    paddingHorizontal: 22,
    fontFamily: "OnestSemiBold",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
    color: "#101828",
    backgroundColor: "#F9FAFB",
  },

  // CATEGORIES
  categoriesContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
    marginRight: -16,
  },

  categoryChip: {
    height: 34,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#F2F4F7",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },

  selectedCategoryChip: {
    backgroundColor: "#FFF4E3",
  },

  categoryText: {
    fontFamily: "OnestSemiBold",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 17,
    color: "#475467",
  },

  selectedCategoryText: {
    color: "#B86A00",
  },

  // UNIT
  unitSection: {
    marginTop: 24,
  },

  unitContainer: {
    height: 54,
    borderRadius: 999,
    backgroundColor: "#F2F4F7",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    gap: 4,
  },

  unitButton: {
    flex: 1,
    height: 46,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },

  selectedUnitButton: {
    backgroundColor: "#FD9301",
    elevation: 2,
  },

  unitText: {
    fontFamily: "OnestSemiBold",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 19,
    color: "#475467",
  },

  selectedUnitText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  // PRICE
  priceSection: {
    marginTop: 24,
  },

  priceInputContainer: {
    height: 68,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#EAECF0",
    backgroundColor: "#F9FAFB",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    gap: 8,
  },

  priceValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  priceInput: {
    width: 70,
    height: 36,
    fontFamily: "Onest",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
    letterSpacing: -0.56,
    color: "#101828",
    paddingVertical: 0,
  },

  priceDollarText: {
    width: 20,
    height: 36,
    fontFamily: "Onest",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
    letterSpacing: -0.56,
    color: "#101828",
  },

  currencyText: {
    width: 50,
    height: 20,
    fontFamily: "OnestRegular",
    fontSize: 16,
    lineHeight: 20,
    color: "#475467",
  },

  // SAVE
  saveContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 4,
    gap: 12,
  },

  saveSwitch: {
    width: 48,
    height: 28,
  },

  switchOffTrack: {
    width: 48,
    height: 28,
    borderRadius: 999,
    backgroundColor: "#EAECF0",
    justifyContent: "center",
    paddingHorizontal: 2,
  },

  switchOffThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },

  saveText: {
    fontFamily: "OnestMedium",
    fontSize: 16,
    lineHeight: 20,
    color: "#101828",
    fontWeight: "500",
  },

  // FOOTER
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 60,
    backgroundColor: "#FFFFFF",
  },

  continueButton: {
    height: 60,
    borderRadius: 999,
    backgroundColor: "#FD9301",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#FD9301",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },

  continueText: {
    fontFamily: "OnestSemiBold",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // HOME INDICATOR
  homeIndicatorContainer: {
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#101828",
  },
});
