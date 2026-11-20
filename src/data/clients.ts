import AsyncStorage from "@react-native-async-storage/async-storage";

export type Client = {
  id: string;
  initials: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type NouveauClient = Omit<Client, "id" | "initials">;

const CLIENTS_STORAGE_KEY = "renoman:clients";

function isClient(value: unknown): value is Client {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "id" in value &&
    typeof value.id === "string" &&
    "initials" in value &&
    typeof value.initials === "string" &&
    "name" in value &&
    typeof value.name === "string" &&
    "email" in value &&
    typeof value.email === "string" &&
    "phone" in value &&
    typeof value.phone === "string" &&
    "address" in value &&
    typeof value.address === "string"
  );
}

export async function lireClientsLocaux(): Promise<Client[]> {
  const storedClients = await AsyncStorage.getItem(CLIENTS_STORAGE_KEY);
  if (storedClients === null) {
    return [];
  }

  const parsedClients: unknown = JSON.parse(storedClients);
  if (!Array.isArray(parsedClients) || !parsedClients.every(isClient)) {
    throw new Error("La liste des clients enregistrés est invalide.");
  }

  return parsedClients;
}

export async function enregistrerClientLocal(
  nouveauClient: NouveauClient
): Promise<Client> {
  const clients = await lireClientsLocaux();
  const initials = nouveauClient.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
  const client: Client = {
    ...nouveauClient,
    id: `local-${Date.now()}-${clients.length + 1}`,
    initials,
  };

  await AsyncStorage.setItem(
    CLIENTS_STORAGE_KEY,
    JSON.stringify([...clients, client])
  );

  return client;
}
