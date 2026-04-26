"use client";

import { Component, type ReactNode } from "react";

interface Props  { children: ReactNode }
interface State  { hasError: boolean; message: string }

/**
 * React error boundary specifically for the Leaflet RouteMap.
 * Leaflet is the most failure-prone dependency (dynamic import, external tiles,
 * browser-only APIs). A map crash should never take down the whole itinerary display.
 */
export default class MapErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  override componentDidCatch(error: Error) {
    console.error("[Visit Oman] Map render error:", error);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full bg-parch rounded-xl flex flex-col items-center
          justify-center gap-3 text-center p-6">
          <span className="text-3xl opacity-40">🗺️</span>
          <p className="text-sm font-semibold text-ink/50">Map unavailable</p>
          <p className="text-xs text-ink/35 max-w-xs">
            The interactive map failed to load. Route and schedule information
            is still available in the day view.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, message: "" })}
            className="text-xs text-teal hover:underline font-medium mt-1"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
