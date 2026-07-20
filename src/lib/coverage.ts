export type Unit = {
  id: string;
  name: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
};

export type CoverageResult = {
  locality: string;
  state: string;
  unit: Unit;
  distanceKm?: number;
};

const units: Unit[] = [
  {
    id: "vilhena",
    name: "Aterro Sanitário NCF Ambiental – Vilhena/RO",
    city: "Vilhena",
    state: "RO",
    latitude: -12.7406,
    longitude: -60.1458,
  },
  {
    id: "cacoal",
    name: "Aterro Sanitário NCF Ambiental – Cacoal/RO",
    city: "Cacoal",
    state: "RO",
    latitude: -11.4343,
    longitude: -61.4562,
  },
  {
    id: "ji-parana",
    name: "Aterro Sanitário NCF Ambiental – Ji-Paraná/RO",
    city: "Ji-Paraná",
    state: "RO",
    latitude: -10.8777,
    longitude: -61.9322,
  },
  {
    id: "tangara",
    name: "Aterro Sanitário NCF Ambiental – Tangará da Serra/MT",
    city: "Tangará da Serra",
    state: "MT",
    latitude: -14.6229,
    longitude: -57.4933,
  },
  {
    id: "juina",
    name: "Aterro Sanitário NCF Ambiental – Juína/MT",
    city: "Juína",
    state: "MT",
    latitude: -11.3728,
    longitude: -58.7483,
  },
  {
    id: "campo-novo",
    name: "Aterro Sanitário NCF Ambiental – Campo Novo do Parecis/MT",
    city: "Campo Novo do Parecis",
    state: "MT",
    latitude: -13.6587,
    longitude: -57.8907,
  },
  {
    id: "pontes-lacerda",
    name: "Aterro Sanitário NCF Ambiental – Pontes e Lacerda/MT",
    city: "Pontes e Lacerda",
    state: "MT",
    latitude: -15.2261,
    longitude: -59.3353,
  },
];

const destinationOverrides: Record<string, string> = {
  "rolim de moura|RO": "cacoal",
  "pimenta bueno|RO": "cacoal",
  "colorado do oeste|RO": "vilhena",
};

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export function findMappedUnit(locality: string, state: string) {
  const normalizedLocality = normalize(locality);
  const normalizedState = state.toUpperCase();
  const localUnit = units.find(
    (unit) => normalize(unit.city) === normalizedLocality && unit.state === normalizedState,
  );

  if (localUnit) return localUnit;

  const overrideId = destinationOverrides[`${normalizedLocality}|${normalizedState}`];
  return overrideId ? units.find((unit) => unit.id === overrideId) : undefined;
}

export function findClosestUnit(state: string, latitude: number, longitude: number) {
  const unitsInState = units.filter((unit) => unit.state === state.toUpperCase());
  const candidates = unitsInState.length ? unitsInState : units;

  return candidates
    .map((unit) => ({
      unit,
      distanceKm: distanceBetween(latitude, longitude, unit.latitude, unit.longitude),
    }))
    .sort((first, second) => first.distanceKm - second.distanceKm)[0];
}

function distanceBetween(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const latitudeDistance = toRadians(lat2 - lat1);
  const longitudeDistance = toRadians(lon2 - lon1);
  const haversine =
    Math.sin(latitudeDistance / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(longitudeDistance / 2) ** 2;

  return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}
