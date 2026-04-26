"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import React from "react";
import L from "leaflet";
import type { DayPlan, Locale } from "@/lib/types";
import type { TranslationKeys } from "@/lib/i18n/translations";

// Cache icon instances — keyed by stop number + active state to avoid recreating on every render
const iconCache = new Map<string, L.DivIcon>();

const numberedIcon = (n: number, active: boolean): L.DivIcon => {
  const key = `${n}-${active}`;
  if (iconCache.has(key)) return iconCache.get(key)!;
  const icon = L.divIcon({
    html: `<div style="
      width:28px; height:28px; border-radius:50%;
      background:${active ? "#C0392B" : "#0E7490"};
      border:2px solid white;
      box-shadow:0 1px 5px rgba(0,0,0,0.35);
      display:flex; align-items:center; justify-content:center;
      font-size:11px; font-weight:bold; color:white;
    ">${n}</div>`,
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
  });
  iconCache.set(key, icon);
  return icon;
};

// Day colours for polylines
const DAY_COLOURS = [
  "#0E7490", "#C0392B", "#D97706", "#059669", "#7C3AED", "#DC2626", "#0891B2",
];

interface Props {
  days: DayPlan[];
  activeDay: number;
  onDayChange: (day: number) => void;
  t: TranslationKeys;
  locale: Locale;
}

/** Sub-component to pan/zoom map when active day changes */
function MapFitter({ days, activeDay }: { days: DayPlan[]; activeDay: number }) {
  const map = useMap();

  useEffect(() => {
    const day = days.find((d) => d.day === activeDay);
    if (!day || day.stops.length === 0) return;

    const points = day.stops.map((s) => [s.destination.lat, s.destination.lng] as [number, number]);
    if (points.length === 1) {
      map.setView(points[0], 10, { animate: true });
    } else {
      map.fitBounds(L.latLngBounds(points), { padding: [40, 40], animate: true });
    }
  }, [activeDay, days, map]);

  return null;
}

export default function RouteMap({ days, activeDay, onDayChange, t, locale }: Props) {
  const isRtl = locale === "ar";

  // Compute initial centre from all stops
  const allPoints = days.flatMap((d) => d.stops.map((s) => [s.destination.lat, s.destination.lng] as [number, number]));
  const centre: [number, number] = allPoints.length > 0
    ? [
        allPoints.reduce((s, p) => s + p[0], 0) / allPoints.length,
        allPoints.reduce((s, p) => s + p[1], 0) / allPoints.length,
      ]
    : [23.0, 57.5]; // centre of Oman

  return (
    <MapContainer
      center={centre}
      zoom={7}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom
      aria-label="Interactive route map showing itinerary stops across Oman"
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapFitter days={days} activeDay={activeDay} />

      {/* Render each day's route */}
      {days.map((day, di) => {
        const isActive = day.day === activeDay;
        const colour = DAY_COLOURS[di % DAY_COLOURS.length];
        const points = day.stops.map((s) => [s.destination.lat, s.destination.lng] as [number, number]);

        return (
          <React.Fragment key={day.day}>
            {/* Route polyline */}
            {points.length > 1 && (
              <Polyline
                positions={points}
                color={colour}
                weight={isActive ? 4 : 2}
                opacity={isActive ? 0.9 : 0.35}
                dashArray={isActive ? undefined : "6,4"}
              />
            )}

            {/* Stop markers */}
            {day.stops.map((stop, si) => (
              <Marker
                key={stop.destination.id}
                position={[stop.destination.lat, stop.destination.lng]}
                icon={numberedIcon(si + 1, isActive)}
                eventHandlers={{ click: () => onDayChange(day.day) }}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold">
                      {isRtl ? stop.destination.name.ar : stop.destination.name.en}
                    </p>
                    <p className="text-xs text-ink/50 mt-0.5">
                      {t.itinerary.day} {day.day} · {t.itinerary.stops.replace(/s$/, "")} {si + 1}
                    </p>
                    <p className="text-xs mt-1 text-ink/70">
                      {stop.arrivalTime} – {stop.departureTime}
                    </p>
                    {stop.travelKmFromPrev > 0 && (
                      <p className="text-xs text-teal mt-0.5">
                        {stop.travelKmFromPrev} {t.itinerary.km}
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
}
