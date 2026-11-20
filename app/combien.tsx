
import { useLocalSearchParams, useRouter } from "expo-router";
import CombienScreen from "@/screens/CombienScreen";

export default function App() {
  const router = useRouter();
  const { serviceName, unit, unitPrice, clientName, clientEmail } =
    useLocalSearchParams<{
    serviceName?: string | string[];
    unit?: string | string[];
    unitPrice?: string | string[];
    clientName?: string | string[];
    clientEmail?: string | string[];
  }>();

  const getParam = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;
  const parsedUnitPrice = Number(getParam(unitPrice));
  const resolvedUnitPrice =
    Number.isFinite(parsedUnitPrice) && parsedUnitPrice > 0
      ? parsedUnitPrice
      : 20;
  const resolvedUnit = getParam(unit) ?? "pi²";

  return (
    <CombienScreen
      onBack={() => router.back()}
      serviceName={getParam(serviceName)}
      unit={resolvedUnit}
      unitPrice={resolvedUnitPrice}
      onContinue={({ quantity }) =>
        router.push({
          pathname: "/soumission",
          params: {
            serviceName: getParam(serviceName),
            unit: resolvedUnit,
            unitPrice: String(resolvedUnitPrice),
            quantity: String(quantity),
            clientName: getParam(clientName),
            clientEmail: getParam(clientEmail),
          },
        })
      }
    />
  );
}
