import { useRouter } from "expo-router";
import PrixManuelScreen from "@/screens/PrixManuelScreen";

export default function App() {
  const router = useRouter();

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
          },
        })
      }
      onHomeIndicator={(data) =>
        router.push({
          pathname: "/combien",
          params: {
            serviceName: data.name,
            unit: data.unit,
            unitPrice: data.price,
          },
        })
      }
    />
  );
}