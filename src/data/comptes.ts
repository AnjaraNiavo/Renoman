import AsyncStorage from "@react-native-async-storage/async-storage";

export type CompteLocal = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  createdAt: string;
};

export type NouveauCompteLocal = Omit<CompteLocal, "id" | "createdAt" | "password"> & {
  password: string;
};

const COMPTES_STORAGE_KEY = "renoman:comptes";

export class CompteLocalExistantError extends Error {
  constructor() {
    super("Un compte avec cette adresse e-mail existe déjà sur cet appareil.");
    this.name = "CompteLocalExistantError";
  }
}

function isCompteLocal(value: unknown): value is CompteLocal {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "string" &&
    "name" in value &&
    typeof value.name === "string" &&
    "email" in value &&
    typeof value.email === "string" &&
    "phone" in value &&
    typeof value.phone === "string" &&
    (!("password" in value) || typeof value.password === "string") &&
    "createdAt" in value &&
    typeof value.createdAt === "string"
  );
}

async function lireComptesLocaux(): Promise<CompteLocal[]> {
  const storedAccounts = await AsyncStorage.getItem(COMPTES_STORAGE_KEY);
  if (storedAccounts === null) {
    return [];
  }

  const parsedAccounts: unknown = JSON.parse(storedAccounts);
  if (!Array.isArray(parsedAccounts) || !parsedAccounts.every(isCompteLocal)) {
    throw new Error("La liste des comptes locaux enregistrés est invalide.");
  }

  return parsedAccounts;
}

export async function verifierIdentifiantsLocaux(
  email: string,
  password: string
): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();
  const comptes = await lireComptesLocaux();

  return comptes.some(
    (compte) =>
      compte.email.toLowerCase() === normalizedEmail &&
      compte.password === password
  );
}

export async function enregistrerCompteLocal(
  nouveauCompte: NouveauCompteLocal
): Promise<CompteLocal> {
  const comptes = await lireComptesLocaux();
  const normalizedEmail = nouveauCompte.email.trim().toLowerCase();

  if (comptes.some((compte) => compte.email.toLowerCase() === normalizedEmail)) {
    throw new CompteLocalExistantError();
  }

  const compte: CompteLocal = {
    name: nouveauCompte.name.trim(),
    email: normalizedEmail,
    phone: nouveauCompte.phone.trim(),
    password: nouveauCompte.password,
    id: `local-${Date.now()}-${comptes.length + 1}`,
    createdAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem(
    COMPTES_STORAGE_KEY,
    JSON.stringify([...comptes, compte])
  );

  return compte;
}
