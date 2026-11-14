
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Onest_400Regular,
  Onest_600SemiBold,
  Onest_700Bold,
  useFonts,
} from "@expo-google-fonts/onest";

import { COLORS } from "../../constants/color";

export default function FicheClient() {
  const { width: windowWidth } = useWindowDimensions();
  const contentWidth = Math.min(370, windowWidth - 32);
  const actionGap = contentWidth < 350 ? 8 : 14;
  const [fontsLoaded, fontError] = useFonts({
    OnestRegular: Onest_400Regular,
    OnestSemiBold: Onest_600SemiBold,
    Onest: Onest_700Bold,
  });

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return null;
  }

  const handleAction = (action: string) => {
    Alert.alert(action, "Cette fonctionnalité sera ajoutée prochainement.");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.statusBarBackground} />

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => handleAction("Retour")}
        >
          <Image
            source={require("../../../assets/icone/Flèche.png")}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </Pressable>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Envoyée</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* INFORMATIONS CLIENT */}
        <View style={[styles.clientHeader, { width: contentWidth }]}>
          <Text style={styles.clientName}>Luc Bergeron</Text>

          <Text style={[styles.clientInfo, { width: contentWidth }]}>
            Toiture · 18 682 $ · 514-555-0142
          </Text>
        </View>

        {/* ACTIONS */}
        <View style={[styles.actions, { width: contentWidth, gap: actionGap }]}>
          <Pressable
            style={styles.actionCard}
            onPress={() => handleAction("Appeler")}
          >
            <Image
              source={require("../../../assets/icone/Type appel.png")}
              style={styles.actionIcon}
              resizeMode="contain"
            />
            <Text style={styles.actionText}>Appeler</Text>
          </Pressable>

          <Pressable
            style={styles.actionCard}
            onPress={() => handleAction("Note")}
          >
            <Image
              source={require("../../../assets/icone/note.png")}
              style={styles.actionIcon}
              resizeMode="contain"
            />
            <Text style={styles.actionText}>Note</Text>
          </Pressable>

          <Pressable
            style={styles.actionCard}
            onPress={() => handleAction("Rappel")}
          >
            <Image
              source={require("../../../assets/icone/rappel.png")}
              style={styles.actionIcon}
              resizeMode="contain"
            />
            <Text style={styles.actionText}>Rappel</Text>
          </Pressable>
        </View>

        {/* PROCHAIN SUIVI */}
        <View style={[styles.followUpCard, { width: contentWidth }]}>
          <Text
            style={[
              styles.followUpLabel,
              { width: Math.min(238, contentWidth - 43) },
            ]}
          >
            PROCHAIN SUIVI · AUJOURD'HUI 14H
          </Text>

          <Text style={[styles.followUpTitle, { width: contentWidth - 43 }]}>
            Confirmer la date des travaux
          </Text>
        </View>

        {/* HISTORIQUE */}
        <Text style={[styles.historyTitle, { width: contentWidth }]}>
          Historique
        </Text>

        <View style={[styles.timeline, { width: contentWidth }]}>
          <View style={styles.timelineLine} pointerEvents="none" />

          {/* EVENEMENT 1 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineIndicator}>
              <View style={styles.activeDot} />
            </View>

            <View style={styles.timelineContent}>
              <Text style={styles.eventTitle}>
                Note · 22 oct.
              </Text>

              <Text style={styles.eventDescription}>
                Veut commencer avant la neige. Budget OK.
              </Text>
            </View>
          </View>

          {/* EVENEMENT 2 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineIndicator}>
              <View style={styles.inactiveDot} />
            </View>

            <View style={styles.timelineContent}>
              <Text style={styles.eventTitle}>
                Soumission envoyée · 21 oct.
              </Text>

              <Text style={styles.eventDescription}>
                S-2026-039 · 18 682 $ · ouvert
              </Text>
            </View>
          </View>

          {/* EVENEMENT 3 */}
          <View style={styles.timelineItem}>
            <View style={styles.timelineIndicator}>
              <View style={styles.inactiveDot} />
            </View>

            <View style={styles.timelineContent}>
              <Text style={styles.eventTitle}>
                Rendez-vous · 18 oct.
              </Text>

              <Text style={styles.eventDescription}>
                Prise de mesures sur place
              </Text>
            </View>
          </View>

        </View>

        {/* NOUVELLE SOUMISSION */}
        <Pressable
          style={[styles.newQuoteButton, { width: contentWidth }]}
          onPress={() => handleAction("Nouvelle soumission")}
        >
          <Text
            style={[
              styles.newQuoteText,
              { width: Math.min(255, contentWidth - 32) },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
          >
            + Nouvelle soumission pour Luc
          </Text>
        </Pressable>

      </ScrollView>

      <View style={styles.homeIndicator} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    height: 68,
    marginTop: 52,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 52,
    backgroundColor: "#FFFFFF",
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
    width: 12,
    height: 18,
  },

  statusBadge: {
    width: 90,
    height: 26,
    backgroundColor: "#E6ECF5",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: 1 }],
  },

  statusText: {
    color: "#021733",
    fontFamily: "OnestSemiBold",
    fontSize: 13,
    lineHeight: 13,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 7,
    paddingBottom: 80,
    alignItems: "center",
  },

  clientHeader: {
    marginBottom: 17,
  },

  clientName: {
    width: 200,
    height: 41,
    color: "#101828",
    fontFamily: "Onest",
    fontSize: 25,
    lineHeight: 20,
    letterSpacing: -0.64,
  },

  clientInfo: {
    minHeight: 19,
    color: "#475467",
    fontFamily: "OnestRegular",
    fontSize: 15,
    lineHeight: 15,
  },

  actions: {
    flexDirection: "row",
    marginBottom: 11,
  },

  actionCard: {
    flex: 1,
    minWidth: 0,
    height: 80,
    gap: 6,
    borderRadius: 22,
    backgroundColor: "#F2F4F7",
    justifyContent: "center",
    alignItems: "center",
  },

  actionIcon: {
    width: 22,
    height: 22,
  },

  actionText: {
    color: "#101828",
    fontFamily: "OnestSemiBold",
    fontSize: 14,
    lineHeight: 18,
  },

  followUpCard: {
    minHeight: 84,
    backgroundColor: "#FFF4E3",
    borderColor: "#FD9301",
    borderWidth: 1.5,
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 17,
  },

  followUpLabel: {
    minHeight: 40,
    
    color: "#a5722b",
    fontFamily: "Onest",
    fontSize: 13,
    lineHeight: 12,
    letterSpacing: 0.48,
    marginBottom: 7,
    fontWeight:"bold"
  },

  followUpTitle: {
    minHeight: 10,
    color: "#101828",
    fontFamily: "OnestSemiBold",
    fontSize: 16,
    lineHeight: 16,
  },

  historyTitle: {
    width: 90,
    height: 23,
    color: "#101828",
    fontFamily: "Onest",
    fontSize: 18,
    lineHeight: 18,
    marginBottom: 12,
  },

  timeline: {
    position: "relative",
    marginBottom: 16,
  },

  timelineItem: {
    flexDirection: "row",
    minHeight: 80,
  },

  timelineIndicator: {
    width: 24,
    alignItems: "center",
  },

  activeDot: {
    width: 16,
    height: 16,
    borderRadius: 999,
    backgroundColor: "#FD9301",
    zIndex: 1,
  },

  inactiveDot: {
    width: 16,
    height: 16,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#98A2B3",
    backgroundColor: "#FFFFFF",
    zIndex: 1,
  },

  timelineLine: {
    position: "absolute",
    top: 8,
    left: 11,
    width: 2,
    bottom: 30,
    backgroundColor: "#EAECF0",
  },

  timelineContent: {
    flex: 1,
    minWidth: 0,
    paddingLeft: 10,
  },

  eventTitle: {
    minHeight: 17,
    color: "#475467",
    fontFamily: "OnestSemiBold",
    fontSize: 13,
    lineHeight: 13,
    marginBottom: 5,
  },

  eventDescription: {
    width: "100%",
    minHeight: 19,
    color: "#101828",
    fontFamily: "OnestRegular",
    fontSize: 15,
    lineHeight: 20,
  },

  newQuoteButton: {
    height: 60,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#FD9301",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  newQuoteText: {
    width: 255,
    height: 22,
    color: "#B86A00",
    fontFamily: "OnestSemiBold",
    fontSize: 17,
    lineHeight: 17,
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
