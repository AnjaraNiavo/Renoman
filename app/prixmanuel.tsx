import { useLocalSearchParams, useRouter } from "expo-router";
import PrixManuelScreen from "@/screens/PrixManuelScreen";

export default function App() {
  const router = useRouter();
  const { clientName, clientEmail } = useLocalSearchParams<{
    clientName?: string | string[];
    clientEmail?: string | string[];
  }>();
  const getParam = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  return (
    <PrixManuelScreen
      onBack={() => router.back()}
      onContinue={(data) =>
        router.push({
          pathname: "/combien",
          params: {
            serviceName: data.name,
            unit: data.unit,
            unitPrice: data.price,
            clientName: getParam(clientName),
            clientEmail: getParam(clientEmail),
          },
        })
      }
      onHomeIndicator={() => router.replace("/")}
    />
  );
}