"use client";

import dynamic from "next/dynamic";

// Leaflet must never be imported server-side
const MapPreviewInner = dynamic(() => import("./MapPreviewInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-parch animate-pulse flex items-center justify-center text-ink/30 text-sm font-hand text-base">
      Loading map…
    </div>
  ),
});

interface Props {
  lat: number;
  lng: number;
  name: string;
}

export default function DestinationMapPreview({ lat, lng, name }: Props) {
  return <MapPreviewInner lat={lat} lng={lng} name={name} />;
}
