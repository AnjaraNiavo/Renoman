
import { useLocalSearchParams, useRouter } from "expo-router";
import CombienScreen from "@/screens/CombienScreen";

export default function App() {
  const router = useRouter();
  const { serviceName, unitPrice } = useLocalSearchParams<{
    serviceName?: string | string[];
    unitPrice?: string | string[];
  }>();

  const getParam = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;
  const parsedUnitPrice = Number(getParam(unitPrice));

  return (
    <CombienScreen
      onBack={() => router.back()}
      serviceName={getParam(serviceName)}
      unit="pi²"
      unitPrice={
        Number.isFinite(parsedUnitPrice) && parsedUnitPrice > 0
          ? parsedUnitPrice
          : undefined
      }
    />
  );
}
