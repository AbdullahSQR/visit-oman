import type { ImageLoaderProps } from "next/image";

/**
 * Custom Next.js image loader for Cloudinary.
 *
 * Instead of routing images through Next.js's /_next/image proxy (which fetches
 * the full original from Cloudinary, re-encodes it, then serves it), this loader
 * injects w_{width} directly into the Cloudinary transformation chain so the
 * browser fetches the correctly-sized image straight from Cloudinary's CDN.
 *
 * Input:  https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/sqgm_xrnalj
 * Output: https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto,w_640/sqgm_xrnalj
 */
export default function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const q = quality ?? "auto";
  return src.replace("f_auto,q_auto", `f_auto,q_${q},w_${width}`);
}
