import { findClosestUnit, findMappedUnit, type CoverageResult } from "@/lib/coverage";

type PostalLocation = {
  locality: string;
  state: string;
  latitude?: number;
  longitude?: number;
};

export async function searchCoverageByCep(cep: string): Promise<CoverageResult> {
  const location = await fetchPostalLocation(cep);
  let unit = findMappedUnit(location.locality, location.state);
  let latitude = location.latitude;
  let longitude = location.longitude;

  if (!unit && (latitude === undefined || longitude === undefined)) {
    const coordinates = await fetchCityCoordinates(location.locality, location.state);
    latitude = coordinates?.latitude;
    longitude = coordinates?.longitude;
  }

  let distanceKm: number | undefined;
  if (!unit && latitude !== undefined && longitude !== undefined) {
    const closest = findClosestUnit(location.state, latitude, longitude);
    unit = closest?.unit;
    distanceKm = closest?.distanceKm;
  }

  if (!unit) throw new Error("Nenhuma unidade de destinação foi encontrada.");

  return {
    locality: location.locality,
    state: location.state,
    unit,
    distanceKm,
  };
}

async function fetchPostalLocation(cep: string): Promise<PostalLocation> {
  try {
    return await fetchFromBrasilApi(cep);
  } catch {
    return fetchFromViaCep(cep);
  }
}

async function fetchFromBrasilApi(cep: string): Promise<PostalLocation> {
  const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  if (!response.ok) throw new Error("CEP não encontrado na BrasilAPI.");

  const data = (await response.json()) as {
    city?: string;
    state?: string;
    location?: {
      coordinates?: {
        latitude?: string | number;
        longitude?: string | number;
      };
    };
  };

  if (!data.city || !data.state) throw new Error("Localidade incompleta na BrasilAPI.");

  const latitude = Number(data.location?.coordinates?.latitude);
  const longitude = Number(data.location?.coordinates?.longitude);
  const hasCoordinates =
    Number.isFinite(latitude) && Number.isFinite(longitude) && (latitude !== 0 || longitude !== 0);

  return {
    locality: data.city,
    state: data.state,
    latitude: hasCoordinates ? latitude : undefined,
    longitude: hasCoordinates ? longitude : undefined,
  };
}

async function fetchFromViaCep(cep: string): Promise<PostalLocation> {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = (await response.json()) as {
    localidade?: string;
    uf?: string;
    erro?: boolean;
  };

  if (!response.ok || data.erro || !data.localidade || !data.uf) {
    throw new Error("CEP não encontrado no ViaCEP.");
  }

  return { locality: data.localidade, state: data.uf };
}

async function fetchCityCoordinates(locality: string, state: string) {
  try {
    const query = encodeURIComponent(`${locality}, ${state}, Brasil`);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=jsonv2&limit=1`,
    );
    const places = (await response.json()) as Array<{ lat?: string; lon?: string }>;
    const latitude = Number(places[0]?.lat);
    const longitude = Number(places[0]?.lon);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return undefined;
    return { latitude, longitude };
  } catch {
    return undefined;
  }
}
