/**
 * Haversine distance implementation.
 * All external routing/distance APIs are forbidden per contest rules.
 * Travel time assumes an average road speed of 70 km/h (appropriate for Omani roads).
 */

const EARTH_RADIUS_KM = 6371;
const AVG_SPEED_KMH = 70;

export interface LatLng {
  lat: number;
  lng: number;
}

/**
 * Returns the great-circle distance in kilometres between two GPS points.
 * Formula: a = sin²(Δlat/2) + cos(lat1)·cos(lat2)·sin²(Δlng/2)
 *          c = 2·atan2(√a, √(1−a))
 *          d = R·c
 */
export function distanceKm(a: LatLng, b: LatLng): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);

  const haversine =
    sinDLat * sinDLat +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinDLng * sinDLng;

  const angularDist = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
  return EARTH_RADIUS_KM * angularDist;
}

/**
 * Total route distance — sum of consecutive segment distances.
 * Points: [A, B, C, D] → dist(A,B) + dist(B,C) + dist(C,D)
 */
export function totalKm(points: LatLng[]): number {
  if (points.length < 2) return 0;
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    total += distanceKm(points[i], points[i + 1]);
  }
  return total;
}

/**
 * Travel time in minutes between two points at AVG_SPEED_KMH.
 */
export function travelMinutes(a: LatLng, b: LatLng): number {
  return (distanceKm(a, b) / AVG_SPEED_KMH) * 60;
}

export const MAX_DAILY_KM = 250;
export const MAX_DAILY_MINUTES = 8 * 60; // 480
