"use client";

import { useEffect } from "react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: Props) {
  useEffect(() => { console.error("[Visit Oman] Unhandled error:", error); }, [error]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="card rounded-2xl p-8 max-w-md w-full text-center">
        <p className="font-hand text-sand text-lg mb-2">— something went wrong —</p>
        <h2 className="font-display font-bold text-ink text-2xl mb-3">
          Unexpected Error
        </h2>
        <p className="text-ink/55 text-sm leading-relaxed mb-6">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-omred text-white rounded-xl text-sm font-semibold
            hover:bg-omred/90 transition-colors"
        >
          Try again
        </button>
        {error.digest && (
          <p className="text-[10px] text-ink/30 mt-4 font-mono">
            ref: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
