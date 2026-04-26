import { ImageResponse } from "next/og";

export const size        = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Browser-tab favicon.
 *
 * Uses the ✦ four-pointed star — the recurring decorative motif throughout
 * the UI — on the brand amber background. Consistent, recognisable, and
 * renders cleanly at 16 × 16 px all the way up to 512 × 512.
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(145deg, #D4924A 0%, #A06820 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "7px",
      }}
    >
      <div
        style={{
          color: "rgba(255, 255, 255, 0.95)",
          fontSize: 20,
          lineHeight: "1",
          display: "flex",
          marginTop: "-1px",
        }}
      >
        ✦
      </div>
    </div>,
    { ...size }
  );
}
