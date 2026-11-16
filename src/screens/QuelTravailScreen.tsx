
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import type { ImageSourcePropType } from "react-native";
import { useRouter } from "expo-router";
import {
  Onest_400Regular,
  Onest_600SemiBold,
  Onest_700Bold,
  useFonts,
} from "@expo-google-fonts/onest";

type WorkOption = {
  id: string;
  title: string;
  price: string;
  image: ImageSourcePropType;
};

const workOptions: WorkOption[] = [
  {
    id: "asphalte",
    title: "Asphalte",
    price: "20 $ / pi²",
    image: require("../../assets/icone/Panneau Asphalte.png"),
  },
  {
    id: "toiture",
    title: "Toiture",
    price: "8,50 $ / pi²",
    image: require("../../assets/icone/Panneau Toiture.png"),
  },
  {
    id: "beton",
    title: "Béton",
    price: "45 $ / pi lin",
    image: require("../../assets/icone/Panneau Béton.png"),
  },
  {
    id: "bordure",
    title: "Bordure",
    price: "38 $ / pi lin",
    image: require("../../assets/icone/Panneau Bordure.png"),
  },
  {
    id: "main-oeuvre",
    title: "Main-d'œuvre",
    price: "75 $ / heure",
    image: require("../../assets/icone/Panneau Main-d’œuvre.png"),
  },
  {
    id: "manuel",
    title: "Prix manuel",
    price: "Votre nom, votre prix",
    image: require("../../assets/icone/Panneau Prix manuel.png"),
  },
];

export default function QuelTravailScreen() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const contentWidth = Math.min(370, windowWidth - 32);
  const [selectedWork, setSelectedWork] = useState("asphalte");
  const [fontsLoaded, fontError] = useFonts({
    OnestRegular: Onest_400Regular,
    OnestSemiBold: Onest_600SemiBold,
    Onest: Onest_700Bold,
  });

  const handleSelectWork = (id: string) => {
    setSelectedWork(id);
  };

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
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
        <View style={styles.progressSegment} />
        <View style={styles.progressSegment} />
        <View style={styles.progressInactive} />
      </View>

      {/* TITLE */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Quel travail ?</Text>

        <Text style={[styles.subtitle, { width: contentWidth }]}>
          Pour Marie Gagnon. Touchez un forfait ou entrez votre prix.
        </Text>
      </View>

      {/* WORK OPTIONS */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.optionsContainer}
      >
        <View style={styles.optionsGrid}>
          {workOptions.map((option) => {
            const isSelected = selectedWork === option.id;
            const isManual = option.id === "manuel";

            return (
              <Pressable
                key={option.id}
                onPress={() => handleSelectWork(option.id)}
                style={[
                  styles.optionCard,
                  isSelected && styles.selectedCard,
                  isManual && styles.manualCard,
                ]}
              >
                <View
                  style={[
                    styles.iconContainer,
                    isSelected && styles.selectedIconContainer,
                  ]}
                >
                  <Image
                    source={option.image}
                    style={styles.optionIcon}
                    resizeMode="contain"
                  />
                </View>

                <Text style={styles.optionTitle}>
                  {option.title}
                </Text>

                <Text
                  style={[
                    styles.optionPrice,
                    isManual && styles.manualPrice,
                  ]}
                >
                  {option.price}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* HOME INDICATOR */}
      <View style={styles.homeIndicatorContainer}>
        <View style={styles.homeIndicator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 64,
  },

  // HEADER
  header: {
    height: 44,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    paddingHorizontal: 16,
    gap: 8,
    marginTop: 12,
  },

  progressSegment: {
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
    paddingHorizontal: 16,
    marginTop: 32,
  },

  title: {
    width: 204,
    height: 43,
    fontFamily: "Onest",
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: -0.68,
    lineHeight: 34,
    color: "#101828",
    marginBottom: 5,
  },

  subtitle: {
    height: 40,
    fontFamily: "OnestRegular",
    fontSize: 16,
    lineHeight: 20,
    color: "#475467",
  },

  // OPTIONS
  optionsContainer: {
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 20,
  },

  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },

  optionCard: {
    width: "48.38%",
    height: 150,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "#F9FAFB",
    backgroundColor: "#F9FAFB",
    paddingTop: 14,
    paddingLeft: 14,
  },

  selectedCard: {
    backgroundColor: "#FFF4E3",
    borderColor: "#FD9301",
  },

  manualCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FD9301",
  },

  iconContainer: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },

  selectedIconContainer: {
    backgroundColor: "#FFE8C4",
    borderRadius: 16,
  },

  optionIcon: {
    width: 64,
    height: 64,
  },

  optionTitle: {
    height: 23,
    fontFamily: "Onest",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 18,
    color: "#101828",
    marginTop: 14,
    marginLeft: 4,
  },

  optionPrice: {
    height: 18,
    fontFamily: "OnestRegular",
    fontSize: 14,
    lineHeight: 18,
    color: "#475467",
    marginTop: 3,
    marginLeft: 4,
  },

  manualPrice: {
    color: "#B86A00",
  },

  // HOME INDICATOR
  homeIndicatorContainer: {
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#101828",
  },
});
