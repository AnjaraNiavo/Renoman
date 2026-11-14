
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Onest_400Regular,
  Onest_600SemiBold,
  Onest_700Bold,
  useFonts,
} from "@expo-google-fonts/onest";

import { COLORS } from "../../constants/color";

export default function Tutorial2() {
  const router = useRouter();
  const { width: windowWidth } = useWindowDimensions();
  const headerContentWidth = Math.min(370, windowWidth - 32);
  const navScale = headerContentWidth / 370;
  const headerTitleWidth = Math.min(124, windowWidth - 76);
  const [fontsLoaded, fontError] = useFonts({
    Onest: Onest_700Bold,
    OnestRegular: Onest_400Regular,
    OnestSemiBold: Onest_600SemiBold,
  });

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return null;
  }

  const handleAction = (action: string) => {
    Alert.alert(action, "Cette fonctionnalité sera développée prochainement.");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.statusBarBackground} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { width: headerTitleWidth }]}>
            Pipeline
          </Text>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JT</Text>
          </View>
        </View>

        {/* FILTERS */}
        <ScrollView
          horizontal
          style={styles.filterScroll}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          <View style={[styles.filter, styles.activeFilter]}>
            <Text style={[styles.filterText, styles.activeFilterText]}>
              À faire
            </Text>
            <Text style={[styles.filterCount, styles.activeFilterCount]}>
              4
            </Text>
          </View>

          <View style={[styles.filter, styles.appointmentsFilter]}>
            <Text style={styles.filterText}>Rendez-vous</Text>
            <Text style={styles.filterCount}>2</Text>
          </View>

          <View style={[styles.filter, styles.sentFilter]}>
            <Text style={styles.filterText}>Envoyées</Text>
            <Text style={styles.filterCount}>5</Text>
          </View>

          <View style={[styles.filter, styles.wonFilter]}>
            <Text style={[styles.filterText, styles.wonFilterText]}>
              Gagnées
            </Text>
          </View>
        </ScrollView>

        {/* AUJOURD'HUI */}
        <Text style={styles.sectionTitle}>Aujourd'hui</Text>

        <View style={styles.taskCard}>
          <View style={[styles.taskIcon, styles.callTaskIcon]}>
            <Image
              source={require("../../../assets/icone/Type appel.png")}
              style={styles.taskIconImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>
              Rappeler Luc Bergeron
            </Text>
            <Text style={styles.taskDescription}>
              Toiture · 18 682 $ · envoyée il y a 3 j
            </Text>
          </View>

          <Text style={styles.taskTime}>14 h 00</Text>
        </View>

        <View style={styles.taskCard}>
          <View style={[styles.taskIcon, styles.appointmentTaskIcon]}>
            <Text style={styles.iconText}>□</Text>
          </View>

          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>
              RDV chez Sophie Lavoie
            </Text>
            <Text style={styles.taskDescription}>
              Prise de mesures · 123 rue Principale
            </Text>
          </View>

          <Text style={styles.taskTime}>16 h 30</Text>
        </View>

        {/* DEMAIN */}
        <Text style={styles.sectionTitle}>Demain</Text>

        <View style={styles.taskCard}>
          <View style={[styles.taskIcon, styles.callTaskIcon]}>
            <Text style={styles.iconText}>↗</Text>
          </View>

          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>
              Relancer Garage Côté
            </Text>
            <Text style={styles.taskDescription}>
              Brouillon · 9 450 $ à envoyer
            </Text>
          </View>

          <Text style={styles.taskTime}>9 h 00</Text>
        </View>

        <View style={styles.taskCard}>
          <View style={[styles.taskIcon, styles.noteTaskIcon]}>
            <Text style={styles.iconText}>✓</Text>
          </View>

          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>
              Note : Marie Gagnon
            </Text>
            <Text style={styles.taskDescription}>
              Veut commencer avant la neige
            </Text>
          </View>

          <Text style={styles.taskTime}>—</Text>
        </View>

        {/* ADD FOLLOW-UP */}
        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>
            + Ajouter un suivi
          </Text>
        </Pressable>
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={[styles.bottomNavigation, { width: headerContentWidth }]}>
        <Pressable
          style={[styles.navItem, { left: 28 * navScale }]}
          onPress={() => handleAction("Accueil")}
        >
          <Image
            source={require("../../../assets/icone/home.png")}
            style={styles.homeNavIcon}
            resizeMode="contain"
          />
          <Text style={[styles.navText, styles.homeNavText]}>Accueil</Text>
        </Pressable>

        <Pressable
          style={[styles.centerButton, { left: 153 * navScale }]}
          onPress={() => handleAction("Nouvelle soumission")}
          accessibilityRole="button"
          accessibilityLabel="Nouvelle soumission"
        >
          <View style={styles.centerPlus} accessible={false}>
            <View style={styles.centerPlusHorizontal} />
            <View style={styles.centerPlusVertical} />
          </View>
        </Pressable>

        <Pressable
          style={[styles.navItem, { left: 252 * navScale }]}
          onPress={() => handleAction("Pipeline")}
        >
          <View style={styles.pipelineNavIconClip}>
            <Image
              source={require("../../../assets/icone/Onglet Pipeline.png")}
              style={styles.pipelineNavIcon}
              resizeMode="stretch"
            />
          </View>
          <Text style={[styles.navText, styles.pipelineNavText]}>Pipeline</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.homeIndicator}
        onPress={() => router.push("/ficheclient")}
        hitSlop={16}
        accessibilityRole="button"
        accessibilityLabel="Ouvrir la fiche client"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 64,
    paddingBottom: 25,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    height: 44,
  },

  statusBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 52,
    backgroundColor: "#FFFFFF",
  },

  headerTitle: {
    height: 43,
    fontFamily: "Onest",
    fontSize: 34,
    fontWeight: "700",
    lineHeight: 34,
    letterSpacing: -0.68,
    color: "#101828",
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#F2F4F7",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.navy,
  },

  filters: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 36,
    marginBottom: 23,
  },

  filterScroll: {
    width: "100%",
    flexGrow: 0,
  },

  filter: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 16,
    borderRadius: 999,
    flexShrink: 0,
  },

  activeFilter: {
    width: 91,
    backgroundColor: "#021733",
  },

  appointmentsFilter: {
    width: 134,
    backgroundColor: "#F2F4F7",
  },

  sentFilter: {
    width: 111,
    backgroundColor: "#F2F4F7",
  },

  wonFilter: {
    width: 105,
    backgroundColor: "#F2F4F7",
  },

  wonFilterText: {
    width: 59,
  },

  filterText: {
    height: 18,
    color: "#101828",
    fontFamily: "OnestSemiBold",
    fontSize: 14,
    lineHeight: 18,
    flexShrink: 0,
  },

  activeFilterText: {
    color: "#FFFFFF",
  },

  filterCount: {
    height: 17,
    color: "#98A2B3",
    fontFamily: "Onest",
    fontSize: 13,
    lineHeight: 17,
    flexShrink: 0,
  },

  activeFilterCount: {
    color: "#FD9301",
  },

  sectionTitle: {
    height: 23,
    fontFamily: "Onest",
    fontSize: 18,
    lineHeight: 18,
    color: "#101828",
    marginBottom: 10,
    marginTop: 5,
  },

  taskCard: {
    width: "100%",
    height: 80,
    backgroundColor: "#F9FAFB",
    borderWidth: 1.5,
    borderColor: "#EAECF0",
    borderRadius: 22,
    paddingLeft: 14,
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  taskIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  callTaskIcon: {
    backgroundColor: "#FFF4E3",
  },

  appointmentTaskIcon: {
    backgroundColor: "#E6ECF5",
  },

  noteTaskIcon: {
    backgroundColor: "#E7F8EF",
  },

  iconText: {
    fontSize: 18,
    color: COLORS.navy,
  },

  taskIconImage: {
    width: 22,
    height: 22,
  },

  taskContent: {
    flex: 1,
  },

  taskTitle: {
    fontFamily: "OnestSemiBold",
    fontSize: 16,
    lineHeight: 22,
    color: "#101828",
  },

  taskDescription: {
    fontFamily: "OnestRegular",
    fontSize: 13,
    lineHeight: 17,
    color: "#475467",
  },

  taskTime: {
    width: 80,
    fontFamily: "Onest",
    fontSize: 14,
    lineHeight: 18,
    color: "#101828",
    textAlign: "right",
    marginLeft: 8,
  },

  addButton: {
    width: "100%",
    height: 60,
    borderWidth: 2,
    borderColor: "#FD9301",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  },

  addButtonText: {
    color: "#B86A00",
    fontFamily: "OnestSemiBold",
    fontSize: 17,
    lineHeight: 22,
  },

  bottomNavigation: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    height: 72,
    backgroundColor: "#010E22",
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#010E22",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },

  navItem: {
    position: "absolute",
    top: 12,
    width: 90,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },

  homeNavIcon: {
    width: 16,
    height: 17,
  },

  navText: {
    fontFamily: "OnestSemiBold",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 12,
    letterSpacing: 0,
  },

  homeNavText: {
    color: COLORS.white,
  },

  pipelineNavText: {
    width: 45,
    height: 15,
    color: COLORS.white,
  },

  pipelineNavIconClip: {
    width: 16,
    height: 17,
    overflow: "hidden",
  },

  pipelineNavIcon: {
    position: "absolute",
    width: 72,
    height: 38.4,
    top: -5,
    left: -28,
    tintColor: COLORS.white,
  },

  centerButton: {
    position: "absolute",
    top: 8,
    width: 64,
    height: 56,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  centerPlus: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  centerPlusHorizontal: {
    position: "absolute",
    width: 22,
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.white,
  },

  centerPlusVertical: {
    position: "absolute",
    width: 2,
    height: 22,
    borderRadius: 1,
    backgroundColor: COLORS.white,
  },

  homeIndicator: {
    position: "absolute",
    bottom: 8,
    alignSelf: "center",
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#101828",
  },
});
