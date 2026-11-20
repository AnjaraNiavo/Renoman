import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Onest_400Regular,
  Onest_600SemiBold,
  Onest_700Bold,
  useFonts,
} from "@expo-google-fonts/onest";
import { COLORS } from "../constants/color";
import { enregistrerClientLocal } from "../data/clients";

export default function NouveauClientScreen() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const contentWidth = Math.min(370, windowWidth - 32);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    OnestRegular: Onest_400Regular,
    OnestSemiBold: Onest_600SemiBold,
    Onest: Onest_700Bold,
  });

  if (fontError) throw fontError;
  if (!fontsLoaded) return null;

  const handleSaveClient = async () => {
    const clientName = fullName.trim();
    const clientPhone = phone.trim();
    const clientEmail = email.trim();
    const clientAddress = address.trim();

    if (!clientName || !clientPhone || !clientEmail || !clientAddress) {
      Alert.alert(
        "Informations manquantes",
        "Veuillez remplir tous les champs avant d’enregistrer le client."
      );
      return;
    }

    setIsSaving(true);
    try {
      await enregistrerClientLocal({
        name: clientName,
        phone: clientPhone,
        email: clientEmail,
        address: clientAddress,
      });
    } catch {
      setIsSaving(false);
      Alert.alert(
        "Enregistrement impossible",
        "Le client n’a pas pu être enregistré sur cet appareil."
      );
      return;
    }
    setIsSaving(false);

    router.push({
      pathname: "/queltravail",
      params: {
        clientName,
        clientEmail,
        clientPhone,
        clientAddress,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={[styles.header, { width: contentWidth }]}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Retour à la sélection du client"
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Nouveau client</Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={{ width: contentWidth }}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Ajouter un client</Text>
          <Text style={styles.subtitle}>
            Renseignez ses coordonnées pour continuer.
          </Text>

          <View style={styles.field}>
            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Nom et prénom"
              placeholderTextColor="#98A2B3"
              autoCapitalize="words"
              returnKeyType="next"
              accessibilityLabel="Nom complet"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Numéro de téléphone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+261 33 49 183 41"
              placeholderTextColor="#98A2B3"
              keyboardType="phone-pad"
              returnKeyType="next"
              accessibilityLabel="Numéro de téléphone"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Adresse e-mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="nom@exemple.com"
              placeholderTextColor="#98A2B3"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              accessibilityLabel="Adresse e-mail"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Adresse du client</Text>
            <TextInput
              style={[styles.input, styles.addressInput]}
              value={address}
              onChangeText={setAddress}
              placeholder="Adresse complète"
              placeholderTextColor="#98A2B3"
              autoCapitalize="words"
              multiline
              textAlignVertical="top"
              accessibilityLabel="Adresse du client"
            />
          </View>

          <Pressable
            style={styles.saveButton}
            onPress={handleSaveClient}
            disabled={isSaving}
            accessibilityRole="button"
            accessibilityLabel="Enregistrer le client"
          >
            <Text style={styles.saveButtonText}>
              {isSaving ? "Enregistrement…" : "Enregistrer le client"}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

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
    backgroundColor: "#FFFFFF",
    paddingTop: 64,
  },
  header: {
    height: 44,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
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
    color: COLORS.navy,
    fontSize: 32,
    lineHeight: 36,
    marginTop: -4,
  },
  headerTitle: {
    color: "#475467",
    fontFamily: "OnestSemiBold",
    fontSize: 15,
  },
  headerSpacer: {
    width: 44,
  },
  keyboardContainer: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  title: {
    color: "#101828",
    fontFamily: "Onest",
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -0.64,
  },
  subtitle: {
    color: "#475467",
    fontFamily: "OnestRegular",
    fontSize: 15,
    lineHeight: 21,
    marginTop: 6,
    marginBottom: 24,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    color: "#344054",
    fontFamily: "OnestSemiBold",
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    minHeight: 54,
    borderWidth: 1.5,
    borderColor: "#EAECF0",
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    color: "#101828",
    fontFamily: "OnestRegular",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  addressInput: {
    minHeight: 88,
  },
  saveButton: {
    height: 60,
    borderRadius: 999,
    backgroundColor: "#FD9301",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    elevation: 6,
    shadowColor: "#FD9301",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontFamily: "OnestSemiBold",
    fontSize: 17,
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
