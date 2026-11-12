
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";

import { COLORS } from "../../constants/colors";

export default function Tutorial2() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pipeline</Text>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JT</Text>
          </View>
        </View>

        {/* FILTERS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          <View style={[styles.filter, styles.activeFilter]}>
            <Text style={styles.activeFilterText}>À faire 4</Text>
          </View>

          <View style={styles.filter}>
            <Text style={styles.filterText}>Rendez-vous 2</Text>
          </View>

          <View style={styles.filter}>
            <Text style={styles.filterText}>Envoyées 5</Text>
          </View>
        </ScrollView>

        {/* AUJOURD'HUI */}
        <Text style={styles.sectionTitle}>Aujourd'hui</Text>

        <View style={styles.taskCard}>
          <View style={[styles.taskIcon, { backgroundColor: "#FFF0D9" }]}>
            <Text style={styles.iconText}>☎</Text>
          </View>

          <View style={styles.taskContent}>
            <Text style={styles.taskTitle}>
              Rappeler Luc Bergeron
            </Text>
            <Text style={styles.taskDescription}>
              Relance · 18 682 $ envoyé il y a 3 j
            </Text>
          </View>

          <Text style={styles.taskTime}>14 h 00</Text>
        </View>

        <View style={styles.taskCard}>
          <View style={[styles.taskIcon, { backgroundColor: "#E8EEF7" }]}>
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
          <View style={[styles.taskIcon, { backgroundColor: "#FFF0D9" }]}>
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
          <View style={[styles.taskIcon, { backgroundColor: "#E2F5EB" }]}>
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
        </View>

        {/* ADD FOLLOW-UP */}
        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>
            + Ajouter un suivi
          </Text>
        </Pressable>
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNavigation}>
        <Pressable style={styles.navItem}>
          <Text style={styles.navIcon}>⌂</Text>
          <Text style={styles.navText}>Accueil</Text>
        </Pressable>

        <Pressable style={styles.addNavButton}>
          <Text style={styles.addNavText}>+</Text>
        </Pressable>

        <Pressable style={styles.navItem}>
          <Text style={styles.pipelineIcon}>▥</Text>
          <Text style={styles.activeNavText}>Pipeline</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 25,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: COLORS.navy,
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ECEEF2",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.navy,
  },

  filters: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 23,
  },

  filter: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#ECEEF2",
  },

  activeFilter: {
    backgroundColor: COLORS.navy,
  },

  filterText: {
    color: "#687080",
    fontSize: 10,
  },

  activeFilterText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.navy,
    marginBottom: 10,
    marginTop: 5,
  },

  taskCard: {
    minHeight: 62,
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    padding: 9,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
    elevation: 1,
  },

  taskIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  iconText: {
    fontSize: 18,
    color: COLORS.navy,
  },

  taskContent: {
    flex: 1,
  },

  taskTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: COLORS.navy,
    marginBottom: 4,
  },

  taskDescription: {
    fontSize: 9,
    color: "#858D9A",
  },

  taskTime: {
    fontSize: 9,
    fontWeight: "bold",
    color: COLORS.navy,
    marginLeft: 5,
  },

  addButton: {
    height: 42,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  },

  addButtonText: {
    color: "#B97913",
    fontSize: 11,
    fontWeight: "600",
  },

  bottomNavigation: {
    height: 62,
    backgroundColor: COLORS.navy,
    borderRadius: 30,
    marginHorizontal: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 8,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 75,
  },

  navIcon: {
    color: "#FFFFFF",
    fontSize: 20,
  },

  navText: {
    color: "#FFFFFF",
    fontSize: 9,
    marginTop: 2,
  },

  pipelineIcon: {
    color: "#FFFFFF",
    fontSize: 17,
  },

  activeNavText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
    marginTop: 2,
  },

  addNavButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  addNavText: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "300",
    marginTop: -3,
  },
});
