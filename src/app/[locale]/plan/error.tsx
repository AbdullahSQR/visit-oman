"use client";

import { useEffect } from "react";
import Link from "next/link";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PlannerError({ error, reset }: Props) {
  useEffect(() => { console.error("[Visit Oman] Planner error:", error); }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-5 py-20 text-center">
      <p className="font-hand text-sand text-lg mb-2">— oops —</p>
      <h2 className="font-display font-bold text-ink text-2xl mb-3">
        Itinerary Generation Failed
      </h2>
      <p className="text-ink/55 text-sm leading-relaxed mb-8 max-w-sm mx-auto">
        Something went wrong while building your itinerary. Your saved destinations
        are safe — try generating again or adjust your preferences.
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-omred text-white rounded-xl text-sm font-semibold
            hover:bg-omred/90 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 border border-ink/15 text-ink/70 rounded-xl text-sm
            font-semibold hover:border-sand hover:text-sand transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
