
import React, {useState} from "react";

import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Onest_400Regular,
  Onest_500Medium,
  Onest_600SemiBold,
  Onest_700Bold,
  useFonts,
} from "@expo-google-fonts/onest";

import { COLORS } from "../../constants/color";

export default function TutorialScreen() {

  const [showTutorial, setShowTutorial] = useState(true);
  const { width: windowWidth } = useWindowDimensions();
  const headerContentWidth = Math.min(370, windowWidth - 32);
  const tutorialHighlightWidth = Math.min(382, windowWidth - 20);
  const tutorialCardWidth = Math.min(370, windowWidth - 32);
  const navScale = headerContentWidth / 370;
  const greetingTitleWidth = Math.min(190, headerContentWidth);
  const greetingSubtitleWidth = Math.min(289, headerContentWidth);
  const quickActionWidth = Math.min(179, (windowWidth - 44) / 2);
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

  const handleAction = (action: string) => {
    Alert.alert(action, "Cette fonctionnalité sera développée prochainement.");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.statusBarBackground} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={require("../../../assets/images/logo/Logo Renoman.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Pressable
            style={styles.avatar}
            onPress={() => handleAction("Profil")}
          >
            <Text style={styles.avatarText}>JT</Text>
          </Pressable>

          <Image
            source={require("../../../assets/images/chantier-navy.png")}
            style={styles.headerBackground}
            resizeMode="cover"
          />

          <View style={styles.greeting}>
            <Text style={[styles.greetingTitle, { width: greetingTitleWidth }]}>
              Bonjour, Jean
            </Text>

            <Text style={[styles.greetingSubtitle, { width: greetingSubtitleWidth }]}>
              Une soumission ? C'est le gros bouton.
            </Text>
          </View>

          {/* Nouvelle soumission */}
          <Pressable
            style={[styles.newSubmission, { width: headerContentWidth }]}
            onPress={() => handleAction("Nouvelle soumission")}
          >
            <Image
              source={require("../../../assets/icone/Plus.png")}
              style={styles.plusIcon}
              resizeMode="contain"
            />

            <View style={styles.submissionText}>
              <Text style={styles.submissionTitle}>
                Nouvelle soumission
              </Text>

              <Text style={styles.submissionSubtitle}>
                Client - Travail - Quantité
              </Text>
            </View>
          </Pressable>
        </View>

        {/* RACCOURCIS */}
        <View style={styles.quickActions}>
          <Pressable
            style={[styles.quickButton, { width: quickActionWidth }]}
            onPress={() => handleAction("Nouveau client")}
          >
            <Image
              source={require("../../../assets/icone/newclient.png")}
              style={[styles.quickIcon, styles.newClientIcon]}
              resizeMode="contain"
            />

            <Text style={[styles.quickText, styles.newClientText]}>
              Nouveau client
            </Text>
          </Pressable>

          <Pressable
            style={[styles.quickButton, { width: quickActionWidth }]}
            onPress={() => handleAction("Rappel")}
          >
            <Image
              source={require("../../../assets/icone/rappel.png")}
              style={[styles.quickIcon, styles.reminderIcon]}
              resizeMode="contain"
            />

            <Text style={[styles.quickText, styles.reminderText]}>
              Rappel
            </Text>
          </Pressable>
        </View>

        {/* CARTE ILLUSTRATION */}
        <View style={[styles.illustrationCard, { width: headerContentWidth }]}>
          <Image
            source={require("../../../assets/icone/gif.png")}
            style={[styles.illustration, { width: headerContentWidth }]}
            resizeMode="contain"
          />

          <View
            style={[
              styles.sentBadge,
              { left: Math.min(236, headerContentWidth - 138) },
            ]}
          >
            <Image
              source={require("../../../assets/icone/Coche.png")}
              style={styles.sentIcon}
              resizeMode="contain"
            />

            <Text style={styles.sentText}>
              Envoyée · 38 s
            </Text>
          </View>

          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>
              Une pause, un téléphone : c’est envoyé.
            </Text>

            <Pressable
              onPress={() => handleAction("Mes soumissions")}
            >
              <Text style={styles.cardLink}>
                Voir mes soumissions →
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* NAVIGATION BASSE */}
      <View style={[styles.bottomNavigation, { width: headerContentWidth }]}>
        <Pressable
          style={[
            styles.navItem,
            { left: 28 * navScale },
          ]}
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
          style={[
            styles.navItem,
            { left: 252 * navScale },
          ]}
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


        {/* TUTORIEL PAGE 03B */}
        <Modal
        visible={showTutorial}
        transparent
        animationType="fade"
        statusBarTranslucent
        >
        <View style={styles.tutorialOverlay}>
            <View style={[styles.tutorialDimmer, styles.topDimmer]} />
            <View
              style={[
                styles.tutorialDimmer,
                styles.sideDimmer,
                { width: (windowWidth - tutorialHighlightWidth) / 2 },
              ]}
            />
            <View
              style={[
                styles.tutorialDimmer,
                styles.sideDimmer,
                {
                  width: (windowWidth - tutorialHighlightWidth) / 2,
                  right: 0,
                },
              ]}
            />
            <View
              style={[
                styles.tutorialDimmer,
                styles.bottomDimmer,
                { top: 332 },
              ]}
            />

            {/* Mise en évidence du bouton */}
            <View
              style={[
                styles.highlightBorder,
                { width: tutorialHighlightWidth },
              ]}
            />

            <View style={styles.tutorialArrow} />

            {/* Carte du tutoriel */}
            <View style={[styles.tutorialCard, { width: tutorialCardWidth }]}>
            <Text style={styles.stepLabel}>
                ÉTAPE 1 SUR 2
            </Text>

            <Text style={styles.tutorialTitle}>
                Commencez ici
            </Text>

            <Text style={styles.tutorialDescription}>
                Touchez ce bouton pour faire votre première
                soumission. Ça prend moins de 60 secondes.
            </Text>

            <View style={styles.tutorialActions}>
                <Pressable
                onPress={() => setShowTutorial(false)}
                >
                <Text style={styles.skipText}>
                    Passer
                </Text>
                </Pressable>

                <Pressable
                style={styles.understoodButton}
                onPress={() => setShowTutorial(false)}
                >
                <Text style={styles.understoodText}>
                    Compris
                </Text>
                </Pressable>
            </View>
            </View>

        </View>
        </Modal>

                
        <View style={styles.homeIndicator} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },

  scrollContent: {
    paddingBottom: 110,
  },

  statusBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 52,
    backgroundColor: COLORS.navy,
    zIndex: 2,
  },

  header: {
    height: 375,
    backgroundColor: COLORS.navy,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    overflow: "hidden",
  },

  headerBackground: {
    position: "absolute",
    width: "100%",
    height: 300,
    top: 60,
    left: 0,
    opacity: 0.5,
    zIndex: 0,
  },

  logo: {
    position: "absolute",
    width: 52,
    height: 52,
    top: 60,
    left: 12,
    zIndex: 1,
  },

  avatar: {
    position: "absolute",
    right: 16,
    top: 64,
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#FFFFFF26",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },

  greeting: {
    position: "absolute",
    top: 132,
    left: 16,
    zIndex: 1,
  },

  greetingTitle: {
    height: 38,
    fontFamily: "Onest",
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 30,
    letterSpacing: -0.6,
    color: COLORS.white,
  },

  greetingSubtitle: {
    height: 20,
    fontFamily: "OnestRegular",
    color: "#FFFFFFBF",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0,
    marginTop: 6,
  },

  newSubmission: {
    position: "absolute",
    top: 226,
    left: 16,
    height: 100,
    backgroundColor: "#FD9301",
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1,
    shadowOpacity: 0,
    elevation: 0,
  },

  plusIcon: {
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    marginRight: 16,
  },

  submissionText: {
    flex: 1,
  },

  submissionTitle: {
    height: 27,
    fontFamily: "Onest",
    color: COLORS.white,
    fontSize: 21,
    fontWeight: "700",
    lineHeight: 21,
    letterSpacing: 0,
  },

  submissionSubtitle: {
    height: 18,
    fontFamily: "OnestMedium",
    color: "#FFFFFFD9",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 14,
    letterSpacing: 0,
    marginTop: 3,
  },

  quickActions: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 5,
    gap: 12,
  },

  quickButton: {
    height: 52,
    backgroundColor: "#F2F4F7",
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  quickIcon: {
    height: 22,
  },

  newClientIcon: {
    width: 22,
  },

  reminderIcon: {
    width: 22,
  },

  quickText: {
    height: 19,
    fontFamily: "OnestSemiBold",
    color: "#101828",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 15,
    letterSpacing: 0,
  },

  newClientText: {
    width: 106,
  },

  reminderText: {
    width: 50,
  },

  illustrationCard: {
    alignSelf: "center",
    height: 296,
    marginTop: 20,
    backgroundColor: "#FFF4E3",
    borderRadius: 28,
    overflow: "hidden",
  },

  illustration: {
    height: 200,
    marginTop: 10,
  },

  sentBadge: {
    position: "absolute",
    top: 46,
    width: 138,
    height: 34,
    backgroundColor: COLORS.white,
    borderRadius: 999,
    paddingRight: 12,
    paddingLeft: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    shadowColor: "#B86A00",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
  },

  sentIcon: {
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: "#FD9301",
  },

  sentText: {
    width: 92,
    height: 17,
    fontFamily: "Onest",
    color: "#101828",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 13,
    letterSpacing: 0,
  },

  cardText: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 17,
  },

  cardTitle: {
    width: "100%",
    height: 22,
    fontFamily: "Onest",
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 17,
    letterSpacing: 0,
    color: "#101828",
  },

  cardLink: {
    width: 156,
    height: 18,
    fontFamily: "OnestSemiBold",
    color: "#B86A00",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 14,
    letterSpacing: 0,
    marginTop: 8,
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


tutorialOverlay: {
  flex: 1,
  alignItems: "center",
},

tutorialDimmer: {
  position: "absolute",
  backgroundColor: "rgba(0, 0, 0, 0.68)",
},

topDimmer: {
  top: 0,
  left: 0,
  right: 0,
  height: 220,
},

sideDimmer: {
  top: 220,
  height: 112,
},

bottomDimmer: {
  left: 0,
  right: 0,
  bottom: 0,
},

highlightBorder: {
  position: "absolute",
  top: 220,
  alignSelf: "center",
  height: 112,
  borderWidth: 3,
  borderColor: "#FFFFFF",
  borderRadius: 34,
  backgroundColor: "transparent",
},

tutorialArrow: {
  position: "absolute",
  top: 350,
  alignSelf: "center",
  width: 0,
  height: 0,
  borderLeftWidth: 14,
  borderRightWidth: 14,
  borderTopWidth: 16,
  borderLeftColor: "transparent",
  borderRightColor: "transparent",
  borderTopColor: "#FFFFFF",
},

tutorialCard: {
  position: "absolute",
  top: 365,
  alignSelf: "center",
  height: 196,
  backgroundColor: "#FFFFFF",
  borderRadius: 28,
  padding: 17,
  elevation: 15,
},

stepLabel: {
  color: "#D38A19",
  fontSize: 10,
  fontWeight: "bold",
  marginBottom: 7,
},

tutorialTitle: {
  color: "#172033",
  fontSize: 19,
  fontWeight: "bold",
},

tutorialDescription: {
  color: "#687080",
  fontSize: 12,
  lineHeight: 18,
  marginTop: 7,
},

tutorialActions: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 18,
},

skipText: {
  color: "#626B78",
  fontSize: 12,
},

understoodButton: {
  backgroundColor: "#FF9900",
  paddingHorizontal: 25,
  paddingVertical: 10,
  borderRadius: 20,
},

understoodText: {
  color: "#FFFFFF",
  fontSize: 12,
  fontWeight: "bold",
},



});
