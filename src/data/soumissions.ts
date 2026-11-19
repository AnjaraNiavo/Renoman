import AsyncStorage from "@react-native-async-storage/async-storage";
import type { SoumissionLocale } from "../utils/soumission";

export async function enregistrerSoumissionLocale(
  soumission: SoumissionLocale
) {
  await AsyncStorage.setItem(
    `renoman:soumission:${soumission.id}`,
    JSON.stringify(soumission)
  );
}
