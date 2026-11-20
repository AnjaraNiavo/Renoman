
import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Onest_400Regular,
  Onest_600SemiBold,
  Onest_700Bold,
  useFonts,
} from "@expo-google-fonts/onest";

import { COLORS } from "../constants/color";
import { lireClientsLocaux, type Client } from "../data/clients";

const clients: Client[] = [
  {
    id: "demo-1",
    initials: "MG",
    name: "Marie Gagnon",
    email: "marie.gagnon@courriel.com",
    phone: "",
    address: "",
  },
  {
    id: "demo-2",
    initials: "LB",
    name: "Luc Bergeron",
    email: "luc.b@courriel.com",
    phone: "",
    address: "",
  },
  {
    id: "demo-3",
    initials: "SL",
    name: "Sophie Lavoie",
    email: "slavoie@courriel.com",
    phone: "",
    address: "",
  },
  {
    id: "demo-4",
    initials: "GC",
    name: "Garage Côté inc.",
    email: "info@garagecote.ca",
    phone: "",
    address: "",
  },
];

export default function PourQuiScreen() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const contentWidth = Math.min(370, windowWidth - 32);
  const [search, setSearch] = useState("");
  const [localClients, setLocalClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string | null>(
    null
  );
  const [fontsLoaded, fontError] = useFonts({
    OnestRegular: Onest_400Regular,
    OnestSemiBold: Onest_600SemiBold,
    Onest: Onest_700Bold,
  });

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadClients = async () => {
        try {
          const storedClients = await lireClientsLocaux();
          if (isActive) {
            setLocalClients(storedClients);
          }
        } catch {
          if (isActive) {
            Alert.alert(
              "Chargement impossible",
              "Les clients enregistrés sur cet appareil n’ont pas pu être chargés."
            );
          }
        }
      };

      void loadClients();
      return () => {
        isActive = false;
      };
    }, [])
  );

  const filteredClients = useMemo(() => {
    const query = search.toLowerCase().trim();

    return [...localClients].reverse().concat(clients).filter(
      (client) =>
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query)
    );
  }, [localClients, search]);

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client.id);
    router.push({
      pathname: "/queltravail",
      params: {
        clientName: client.name,
        clientEmail: client.email,
      },
    });
  };

  const handleContinueSearch = () => {
    const client =
      filteredClients.find((item) => item.id === selectedClient) ??
      filteredClients[0];

    if (!client) {
      Alert.alert("Aucun client trouvé", "Choisissez un client dans la liste.");
      return;
    }

    handleSelectClient(client);
  };

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Retour"
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>

        <Text style={styles.stepText}>Étape 1 sur 3</Text>
      </View>

      {/* PROGRESS BAR */}
      <View style={styles.progressContainer}>
        <View style={styles.progressActive} />
        <View style={styles.progressInactive} />
        <View style={styles.progressInactive} />
      </View>

      {/* TITLE */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Pour qui ?</Text>

        <Text style={[styles.subtitle, { width: contentWidth }]}>
          Cherchez ou touchez un client.
        </Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <Image
          source={require("../../assets/icone/Loupe.png")}
          style={styles.searchIcon}
          resizeMode="contain"
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un client…"
          placeholderTextColor="#98A2B3"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleContinueSearch}
          returnKeyType="go"
          autoCapitalize="none"
        />
      </View>

      {/* CLIENT LIST */}
      <ScrollView
        style={styles.clientList}
        contentContainerStyle={styles.clientListContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {filteredClients.map((client) => {
          const isSelected = selectedClient === client.id;

          return (
            <Pressable
              key={client.id}
              style={[
                styles.clientCard,
                isSelected && styles.selectedClientCard,
              ]}
              onPress={() => handleSelectClient(client)}
            >
              <View style={styles.initialsContainer}>
                <Text style={styles.initialsText}>
                  {client.initials}
                </Text>
              </View>

              <View style={styles.clientInfo}>
                <Text style={styles.clientName}>
                  {client.name}
                </Text>

                <Text style={styles.clientEmail}>
                  {client.email}
                </Text>
              </View>

              <Text style={styles.chevron}>›</Text>
            </Pressable>
          );
        })}

        {filteredClients.length === 0 && (
          <Text style={styles.emptyText}>
            Aucun client trouvé.
          </Text>
        )}
      </ScrollView>

      {/* NEW CLIENT BUTTON */}
      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.newClientButton}
          onPress={() => router.push("/nouveauclient")}
          accessibilityRole="button"
          accessibilityLabel="Nouveau client"
        >
          <View style={styles.newClientContent}>
            <Text style={styles.newClientPlus}>+</Text>
            <Text style={styles.newClientText}>Nouveau client</Text>
          </View>
        </Pressable>
      </View>

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
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontSize: 32,
    color: COLORS.navy,
    lineHeight: 36,
    marginTop: -4,
  },

  stepText: {
    width: 200,
    height: 19,
    fontFamily: "OnestSemiBold",
    fontSize: 15,
    lineHeight: 15,
    color: "#475467",
    textAlign: "right",
  },

  progressContainer: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 12,
  },

  progressActive: {
    flex: 1,
    height: 6,
    backgroundColor: "#FD9301",
    borderRadius: 3,
  },

  progressInactive: {
    flex: 1,
    height: 6,
    backgroundColor: "#EAECF0",
    borderRadius: 3,
  },

  titleContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
    marginBottom: 22,
  },

  title: {
    width: 157,
    height: 43,
    fontFamily: "Onest",
    fontSize: 34,
    fontWeight: "700",
    lineHeight: 34,
    letterSpacing: -0.68,
    color: "#101828",
    marginBottom: 5,
  },

  subtitle: {
    height: 20,
    fontFamily: "OnestRegular",
    fontSize: 16,
    lineHeight: 20,
    color: "#475467",
  },

  searchContainer: {
    height: 54,
    marginHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: "#EAECF0",
    backgroundColor: "#F9FAFB",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 18,
    paddingRight: 20,
    gap: 10,
    marginBottom: 14,
  },

  searchIcon: {
    width: 22,
    height: 22,
  },

  searchInput: {
    flex: 1,
    fontFamily: "OnestRegular",
    fontSize: 16,
    lineHeight: 16,
    color: "#101828",
    paddingVertical: 0,
    outlineWidth: 0,
  },

  clientList: {
    flex: 1,
  },

  clientListContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },

  clientCard: {
    height: 72,
    backgroundColor: "#F9FAFB",
    borderWidth: 1.5,
    borderColor: "#EAECF0",
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 7,
  },

  selectedClientCard: {
    borderColor: COLORS.primary,
    backgroundColor: "#FFFAF1",
  },

  initialsContainer: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#FFF4E3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  initialsText: {
    fontFamily: "OnestSemiBold",
    fontSize: 14,
    fontWeight: "600",
    color: "#A87527",
  },

  clientInfo: {
    flex: 1,
  },

  clientName: {
    height: 22,
    fontFamily: "OnestSemiBold",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 17,
    color: "#101828",
    marginBottom: 2,
  },

  clientEmail: {
    height: 18,
    fontFamily: "OnestRegular",
    fontSize: 14,
    lineHeight: 14,
    color: "#475467",
  },

  chevron: {
    width: 24,
    height: 24,
    fontSize: 24,
    color: "#9299A5",
    textAlign: "center",
    lineHeight: 24,
  },

  emptyText: {
    textAlign: "center",
    color: "#9299A5",
    fontSize: 11,
    marginTop: 25,
  },

  bottomContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 144,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },

  newClientButton: {
    height: 60,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#FD9301",
    alignItems: "center",
    justifyContent: "center",
  },

  newClientContent: {
    width: 135,
    height: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  newClientPlus: {
    fontFamily: "OnestSemiBold",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 17,
    color: "#B86A00",
  },

  newClientText: {
    height: 22,
    fontFamily: "OnestSemiBold",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 17,
    color: "#B86A00",
  },

  homeIndicator: {
    position: "absolute",
    width: 134,
    height: 5,
    bottom: 9,
    alignSelf: "center",
    borderRadius: 3,
    backgroundColor: "#101828",
  },
});
