export type SoumissionParams = {
  clientName?: string;
  clientEmail?: string;
  serviceName?: string;
  unit?: string;
  unitPrice?: string;
  quantity?: string;
};

export type SoumissionData = {
  clientName: string;
  clientEmail: string;
  serviceName: string;
  unit: string;
  unitPrice: number;
  quantity: number;
};

export type SoumissionTotals = {
  subtotal: number;
  tps: number;
  tvq: number;
  total: number;
};

export type SignatureStroke = {
  points: { x: number; y: number }[];
};

export type SoumissionLocale = SoumissionData &
  SoumissionTotals & {
    id: string;
    createdAt: string;
    signature?: SignatureStroke[];
  };

export const firstParam = (
  value: string | string[] | undefined
): string | undefined => (Array.isArray(value) ? value[0] : value);

export const formatCurrency = (value: number) =>
  `${value.toLocaleString("fr-FR", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  })} $`;

export const calculateSoumissionTotals = (
  quantity: number,
  unitPrice: number
): SoumissionTotals => {
  const subtotal = Math.round(quantity * unitPrice * 100) / 100;
  const tps = Math.round(subtotal * 0.05 * 100) / 100;
  const tvq = Math.round(subtotal * 0.09975 * 100) / 100;

  return {
    subtotal,
    tps,
    tvq,
    total: subtotal + tps + tvq,
  };
};
