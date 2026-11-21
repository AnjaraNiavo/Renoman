import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import {
  Onest_400Regular,
  Onest_600SemiBold,
  Onest_700Bold,
  useFonts,
} from "@expo-google-fonts/onest";

import { COLORS } from "../constants/color";
import {
  CompteLocalExistantError,
  enregistrerCompteLocal,
} from "../data/comptes";

type FieldIcon = "user" | "mail" | "phone" | "lock";

function FieldSymbol({ name }: { name: FieldIcon }) {
  const common = {
    fill: "none" as const,
    stroke: "#172033",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
  };

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" accessibilityElementsHidden>
      {name === "user" && (
        <>
          <Path {...common} d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
          <Path {...common} d="M4 21v-2a8 8 0 0 1 16 0v2" />
        </>
      )}
      {name === "mail" && (
        <>
          <Rect {...common} x={3} y={5} width={18} height={14} rx={2} />
          <Path {...common} d="m4 7 8 6 8-6" />
        </>
      )}
      {name === "phone" && (
        <Path
          {...common}
          d="M5 3h3l2 5-2 2a15 15 0 0 0 6 6l2-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"
        />
      )}
      {name === "lock" && (
        <>
          <Rect {...common} x={4} y={10} width={16} height={11} rx={2} />
          <Path {...common} d="M8 10V7a4 4 0 0 1 8 0v3" />
        </>
      )}
    </Svg>
  );
}

function PasswordVisibilitySymbol({ hidden }: { hidden: boolean }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" accessibilityElementsHidden>
      <Path
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
        fill="none"
        stroke="#667085"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
      />
      <Circle cx={12} cy={12} r={3} fill="none" stroke="#667085" strokeWidth={1.8} />
      {hidden && (
        <Path d="m3 3 18 18" stroke="#667085" strokeLinecap="round" strokeWidth={1.8} />
      )}
    </Svg>
  );
}

type RegisterFieldProps = {
  icon: FieldIcon;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad";
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "words";
  toggleSecureTextEntry?: () => void;
  accessibilityLabel: string;
};

function RegisterField({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "none",
  toggleSecureTextEntry,
  accessibilityLabel,
}: RegisterFieldProps) {
  return (
    <View style={styles.field}>
      <FieldSymbol name={icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#667085"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        accessibilityLabel={accessibilityLabel}
      />
      {toggleSecureTextEntry && (
        <Pressable
          onPress={toggleSecureTextEntry}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={secureTextEntry ? "Afficher le mot de passe" : "Masquer le mot de passe"}
        >
          <PasswordVisibilitySymbol hidden={secureTextEntry} />
        </Pressable>
      )}
    </View>
  );
}

export default function RegisterScreen() {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    OnestRegular: Onest_400Regular,
    OnestSemiBold: Onest_600SemiBold,
    OnestBold: Onest_700Bold,
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return null;
  }

  const handleRegister = async () => {
    if (isSaving) {
      return;
    }

    if (!name.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!acceptedTerms) {
      setError("Veuillez accepter les conditions d’utilisation.");
      return;
    }

    setError("");
    setIsSaving(true);
    try {
      await enregistrerCompteLocal({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
      });
    } catch (saveError) {
      setIsSaving(false);
      if (saveError instanceof CompteLocalExistantError) {
        setError(saveError.message);
        return;
      }

      console.error("Échec de l’enregistrement local du compte :", saveError);
      setError("Impossible d’enregistrer le compte sur cet appareil. Réessayez.");
      return;
    }
    setIsSaving(false);
    router.replace("/home");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/chantier-navy.png")}
          style={styles.buildingImage}
          resizeMode="cover"
          accessibilityLabel="Chantier Renoman"
        />
        <View style={styles.brand}>
          <Image
            source={require("../../assets/images/logo/Logo Renoman.png")}
            style={styles.brandMark}
            resizeMode="contain"
            accessibilityLabel="Logo Renoman"
          />
          <Text style={styles.brandName}>Inscription</Text>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <RegisterField
            icon="user"
            placeholder="Nom complet"
            accessibilityLabel="Nom complet"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <RegisterField
            icon="mail"
            placeholder="Adresse e-mail"
            accessibilityLabel="Adresse e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <RegisterField
            icon="phone"
            placeholder="Numéro de téléphone"
            accessibilityLabel="Numéro de téléphone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <RegisterField
            icon="lock"
            placeholder="Mot de passe"
            accessibilityLabel="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            toggleSecureTextEntry={() => setPasswordVisible((visible) => !visible)}
          />
          <RegisterField
            icon="lock"
            placeholder="Confirmer le mot de passe"
            accessibilityLabel="Confirmer le mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!confirmationVisible}
            toggleSecureTextEntry={() => setConfirmationVisible((visible) => !visible)}
          />
        </View>

        <Pressable
          style={styles.termsRow}
          onPress={() => setAcceptedTerms((accepted) => !accepted)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: acceptedTerms }}
        >
          <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
            {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            J’accepte les <Text style={styles.termsLink}>conditions d’utilisation</Text>
            {"\net la "}
            <Text style={styles.termsLink}>politique de confidentialité</Text>.
          </Text>
        </Pressable>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Pressable
          style={[styles.submitButton, isSaving && styles.submitButtonDisabled]}
          onPress={handleRegister}
          disabled={isSaving}
        >
          <Text style={styles.submitButtonText}>
            {isSaving ? "Enregistrement..." : "Créer mon compte"}
          </Text>
        </Pressable>

        <View style={styles.loginPrompt}>
          <Text style={styles.loginText}>Déjà un compte ? </Text>
          <Pressable onPress={() => router.replace("/login")} accessibilityRole="link">
            <Text style={styles.loginLink}>Se connecter</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
  },
  header: {
    height: 230,
    position: "relative",
    alignItems: "center",
    backgroundColor: COLORS.navy,
    overflow: "hidden",
  },
  buildingImage: {
    position: "absolute",
    width: "110%",
    maxWidth: 405,
    height: 260,
    top: 30,
    alignSelf: "center",
    opacity: 0.5,
  },
  content: {
    width: "100%",
    maxWidth: 402,
    flex: 1,
    alignSelf: "center",
    marginTop: -28,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  scrollContent: {
    width: "100%",
    paddingHorizontal: 26,
    paddingTop: 20,
    paddingBottom: 32,
  },
  brand: {
    position: "absolute",
    top: 54,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    zIndex: 1,
  },
  brandMark: {
    width: 48,
    height: 48,
  },
  brandName: {
    color: COLORS.white,
    fontFamily: "OnestBold",
    fontSize: 27,
    lineHeight: 30,
  },
  brandTagline: {
    color: "#101828",
    fontFamily: "OnestRegular",
    fontSize: 11,
  },
  heading: {
    marginBottom: 26,
  },
  title: {
    color: "#101828",
    fontFamily: "OnestBold",
    fontSize: 38,
    lineHeight: 40,
    letterSpacing: -1,
  },
  subtitle: {
    color: "#667085",
    fontFamily: "OnestRegular",
    fontSize: 17,
    lineHeight: 24,
    marginTop: 16,
  },
  form: {
    gap: 12,
    marginTop: 8,
  },
  field: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#D0D5DD",
    borderRadius: 25,
    paddingHorizontal: 16,
    gap: 16,
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 0,
    color: "#101828",
    fontFamily: "OnestRegular",
    fontSize: 16,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 18,
    marginBottom: 12,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    marginTop: 2,
    borderWidth: 1.5,
    borderColor: "#98A2B3",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 15,
    lineHeight: 19,
  },
  termsText: {
    flex: 1,
    color: "#101828",
    fontFamily: "OnestRegular",
    fontSize: 14,
    lineHeight: 21,
  },
  termsLink: {
    color: "#F58200",
    fontFamily: "OnestSemiBold",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "#B42318",
    fontFamily: "OnestRegular",
    fontSize: 13,
    marginBottom: 10,
  },
  submitButton: {
    minHeight: 58,
    borderRadius: 30,
    backgroundColor: "#FD8A00",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: COLORS.white,
    fontFamily: "OnestSemiBold",
    fontSize: 18,
  },
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  loginText: {
    color: "#101828",
    fontFamily: "OnestRegular",
    fontSize: 15,
  },
  loginLink: {
    color: "#F58200",
    fontFamily: "OnestSemiBold",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});
