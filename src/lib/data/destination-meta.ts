import type { Hotel } from "@/lib/types";

export interface DestinationMeta {
  imageUrl: string;
  hotels: Hotel[];
}

export const DESTINATION_META: Record<string, DestinationMeta> = {
  // ── Muscat Region ────────────────────────────────────────────────────────────
  "sqgm": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/sqgm_xrnalj",
    hotels: [
      { name: "Ruwi Hotel", stars: 2, pricePerNight: 22, tier: "low" },
      { name: "Ramada Encore Muscat", stars: 3, pricePerNight: 40, tier: "medium" },
      { name: "Grand Hyatt Muscat", stars: 5, pricePerNight: 135, tier: "luxury" },
    ],
  },
  "mutrah-corniche": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/mutrah-corniche_gzlebs",
    hotels: [
      { name: "Ruwi Hotel", stars: 2, pricePerNight: 22, tier: "low" },
      { name: "Ramada Encore Muscat", stars: 3, pricePerNight: 40, tier: "medium" },
      { name: "Grand Hyatt Muscat", stars: 5, pricePerNight: 135, tier: "luxury" },
    ],
  },
  "royal-opera": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/royal-opera_ej2pfq",
    hotels: [
      { name: "Ruwi Hotel", stars: 2, pricePerNight: 22, tier: "low" },
      { name: "Ramada Encore Muscat", stars: 3, pricePerNight: 40, tier: "medium" },
      { name: "Grand Hyatt Muscat", stars: 5, pricePerNight: 135, tier: "luxury" },
    ],
  },
  "bait-al-zubair": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/bait-al-zubair_fnwhum",
    hotels: [
      { name: "Ruwi Hotel", stars: 2, pricePerNight: 22, tier: "low" },
      { name: "Ramada Encore Muscat", stars: 3, pricePerNight: 40, tier: "medium" },
      { name: "Grand Hyatt Muscat", stars: 5, pricePerNight: 135, tier: "luxury" },
    ],
  },
  "qurum-beach": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/qurum-beach_hunmza",
    hotels: [
      { name: "Ruwi Hotel", stars: 2, pricePerNight: 22, tier: "low" },
      { name: "Ramada Encore Muscat", stars: 3, pricePerNight: 40, tier: "medium" },
      { name: "Grand Hyatt Muscat", stars: 5, pricePerNight: 135, tier: "luxury" },
    ],
  },
  "mutrah-fort": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/mutrah-fort_leyx0f",
    hotels: [
      { name: "Ruwi Hotel", stars: 2, pricePerNight: 22, tier: "low" },
      { name: "Ramada Encore Muscat", stars: 3, pricePerNight: 40, tier: "medium" },
      { name: "Grand Hyatt Muscat", stars: 5, pricePerNight: 135, tier: "luxury" },
    ],
  },

  // ── Dakhiliya Region ─────────────────────────────────────────────────────────
  "nizwa-fort": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/nizwa-fort_vxmi31",
    hotels: [
      { name: "Al Diyar Hotel Nizwa", stars: 2, pricePerNight: 20, tier: "low" },
      { name: "Falaj Daris Hotel", stars: 3, pricePerNight: 42, tier: "medium" },
      { name: "Anantara Al Jabal Al Akhdar Resort", stars: 5, pricePerNight: 215, tier: "luxury" },
    ],
  },
  "jebel-akhdar": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/jebel-akhdar_cmdy3l",
    hotels: [
      { name: "Al Diyar Hotel Nizwa", stars: 2, pricePerNight: 20, tier: "low" },
      { name: "Falaj Daris Hotel", stars: 3, pricePerNight: 42, tier: "medium" },
      { name: "Anantara Al Jabal Al Akhdar Resort", stars: 5, pricePerNight: 215, tier: "luxury" },
    ],
  },
  "jebel-shams": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/jebel-shams_hglqq8",
    hotels: [
      { name: "Al Diyar Hotel Nizwa", stars: 2, pricePerNight: 20, tier: "low" },
      { name: "Falaj Daris Hotel", stars: 3, pricePerNight: 42, tier: "medium" },
      { name: "Anantara Al Jabal Al Akhdar Resort", stars: 5, pricePerNight: 215, tier: "luxury" },
    ],
  },
  "bahla-fort": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/bahla-fort_iukkvp",
    hotels: [
      { name: "Al Diyar Hotel Nizwa", stars: 2, pricePerNight: 20, tier: "low" },
      { name: "Falaj Daris Hotel", stars: 3, pricePerNight: 42, tier: "medium" },
      { name: "Anantara Al Jabal Al Akhdar Resort", stars: 5, pricePerNight: 215, tier: "luxury" },
    ],
  },
  "jabrin-castle": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/jabrin-castle_lwpp2r",
    hotels: [
      { name: "Al Diyar Hotel Nizwa", stars: 2, pricePerNight: 20, tier: "low" },
      { name: "Falaj Daris Hotel", stars: 3, pricePerNight: 42, tier: "medium" },
      { name: "Anantara Al Jabal Al Akhdar Resort", stars: 5, pricePerNight: 215, tier: "luxury" },
    ],
  },
  "al-hamra": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/al-hamra_tnkug5",
    hotels: [
      { name: "Al Diyar Hotel Nizwa", stars: 2, pricePerNight: 20, tier: "low" },
      { name: "Falaj Daris Hotel", stars: 3, pricePerNight: 42, tier: "medium" },
      { name: "Anantara Al Jabal Al Akhdar Resort", stars: 5, pricePerNight: 215, tier: "luxury" },
    ],
  },

  // ── Sharqiya Region ──────────────────────────────────────────────────────────
  "wahiba-sands": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/wahiba-sands_zaitgd",
    hotels: [
      { name: "Bidiya Desert Camp", stars: 2, pricePerNight: 28, tier: "low" },
      { name: "1000 Nights Camp", stars: 3, pricePerNight: 72, tier: "medium" },
      { name: "Desert Nights Camp", stars: 4, pricePerNight: 115, tier: "luxury" },
    ],
  },
  "ras-al-jinz": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/ras-al-jinz_e2yyn3",
    hotels: [
      { name: "Bidiya Desert Camp", stars: 2, pricePerNight: 28, tier: "low" },
      { name: "1000 Nights Camp", stars: 3, pricePerNight: 72, tier: "medium" },
      { name: "Desert Nights Camp", stars: 4, pricePerNight: 115, tier: "luxury" },
    ],
  },
  "wadi-bani-khalid": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/wadi-bani-khaled_kyji8r",
    hotels: [
      { name: "Bidiya Desert Camp", stars: 2, pricePerNight: 28, tier: "low" },
      { name: "1000 Nights Camp", stars: 3, pricePerNight: 72, tier: "medium" },
      { name: "Desert Nights Camp", stars: 4, pricePerNight: 115, tier: "luxury" },
    ],
  },
  "sur-dhow-yard": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/sur-dhow-yard_psqpwp",
    hotels: [
      { name: "Bidiya Desert Camp", stars: 2, pricePerNight: 28, tier: "low" },
      { name: "1000 Nights Camp", stars: 3, pricePerNight: 72, tier: "medium" },
      { name: "Desert Nights Camp", stars: 4, pricePerNight: 115, tier: "luxury" },
    ],
  },
  "fins-beach": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/fins-beach_dw91ou",
    hotels: [
      { name: "Bidiya Desert Camp", stars: 2, pricePerNight: 28, tier: "low" },
      { name: "1000 Nights Camp", stars: 3, pricePerNight: 72, tier: "medium" },
      { name: "Desert Nights Camp", stars: 4, pricePerNight: 115, tier: "luxury" },
    ],
  },
  "qalhat": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/qalhat_u0wwlm",
    hotels: [
      { name: "Bidiya Desert Camp", stars: 2, pricePerNight: 28, tier: "low" },
      { name: "1000 Nights Camp", stars: 3, pricePerNight: 72, tier: "medium" },
      { name: "Desert Nights Camp", stars: 4, pricePerNight: 115, tier: "luxury" },
    ],
  },

  // ── Dhofar Region ────────────────────────────────────────────────────────────
  "wadi-darbat": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/wadi-darbat_u9vv5f",
    hotels: [
      { name: "Dhofar Palace Hotel", stars: 3, pricePerNight: 28, tier: "low" },
      { name: "Juweira Boutique Hotel", stars: 4, pricePerNight: 65, tier: "medium" },
      { name: "Hilton Salalah Resort", stars: 5, pricePerNight: 82, tier: "luxury" },
    ],
  },
  "al-mughsail": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/almughsail_mskvra",
    hotels: [
      { name: "Dhofar Palace Hotel", stars: 3, pricePerNight: 28, tier: "low" },
      { name: "Juweira Boutique Hotel", stars: 4, pricePerNight: 65, tier: "medium" },
      { name: "Hilton Salalah Resort", stars: 5, pricePerNight: 82, tier: "luxury" },
    ],
  },
  "frankincense-land": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/frankencise-land_kgoxsk",
    hotels: [
      { name: "Dhofar Palace Hotel", stars: 3, pricePerNight: 28, tier: "low" },
      { name: "Juweira Boutique Hotel", stars: 4, pricePerNight: 65, tier: "medium" },
      { name: "Hilton Salalah Resort", stars: 5, pricePerNight: 82, tier: "luxury" },
    ],
  },
  "khor-rori": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/khor-rori_icka87",
    hotels: [
      { name: "Dhofar Palace Hotel", stars: 3, pricePerNight: 28, tier: "low" },
      { name: "Juweira Boutique Hotel", stars: 4, pricePerNight: 65, tier: "medium" },
      { name: "Hilton Salalah Resort", stars: 5, pricePerNight: 82, tier: "luxury" },
    ],
  },
  "salalah-khareef": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/salalah-khareef_hem4ue",
    hotels: [
      { name: "Dhofar Palace Hotel", stars: 3, pricePerNight: 28, tier: "low" },
      { name: "Juweira Boutique Hotel", stars: 4, pricePerNight: 65, tier: "medium" },
      { name: "Hilton Salalah Resort", stars: 5, pricePerNight: 82, tier: "luxury" },
    ],
  },

  // ── Batinah Region ───────────────────────────────────────────────────────────
  "nakhal-fort": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/nakhal-fort_mkrsyk",
    hotels: [
      { name: "Sohar Beach Hotel", stars: 3, pricePerNight: 25, tier: "low" },
      { name: "Al Nahda Resort & Spa", stars: 4, pricePerNight: 70, tier: "medium" },
      { name: "Kempinski Hotel Muscat", stars: 5, pricePerNight: 110, tier: "luxury" },
    ],
  },
  "rustaq-fort": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/rustaq-fort_tyerbn",
    hotels: [
      { name: "Sohar Beach Hotel", stars: 3, pricePerNight: 25, tier: "low" },
      { name: "Al Nahda Resort & Spa", stars: 4, pricePerNight: 70, tier: "medium" },
      { name: "Kempinski Hotel Muscat", stars: 5, pricePerNight: 110, tier: "luxury" },
    ],
  },
  "wadi-hoqain": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/wadi-hoqain_soayuq",
    hotels: [
      { name: "Sohar Beach Hotel", stars: 3, pricePerNight: 25, tier: "low" },
      { name: "Al Nahda Resort & Spa", stars: 4, pricePerNight: 70, tier: "medium" },
      { name: "Kempinski Hotel Muscat", stars: 5, pricePerNight: 110, tier: "luxury" },
    ],
  },
  "al-sawadi-beach": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/al-sawadi-beach_p8tn3f",
    hotels: [
      { name: "Sohar Beach Hotel", stars: 3, pricePerNight: 25, tier: "low" },
      { name: "Al Nahda Resort & Spa", stars: 4, pricePerNight: 70, tier: "medium" },
      { name: "Kempinski Hotel Muscat", stars: 5, pricePerNight: 110, tier: "luxury" },
    ],
  },

  // ── Dhahira Region ───────────────────────────────────────────────────────────
  "sohar-fort": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/sohar-fort_q025lw",
    hotels: [
      { name: "Al Fanar Hotel Sohar", stars: 3, pricePerNight: 22, tier: "low" },
      { name: "Holiday Inn Sohar", stars: 4, pricePerNight: 48, tier: "medium" },
      { name: "Sohar Beach Hotel & Resort", stars: 4, pricePerNight: 75, tier: "luxury" },
    ],
  },
  "bat-necropolis": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/bat-necropolis_jbsvul",
    hotels: [
      { name: "Al Fanar Hotel Sohar", stars: 3, pricePerNight: 22, tier: "low" },
      { name: "Holiday Inn Sohar", stars: 4, pricePerNight: 48, tier: "medium" },
      { name: "Sohar Beach Hotel & Resort", stars: 4, pricePerNight: 75, tier: "luxury" },
    ],
  },
  "ibri-oasis": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/ibri-oasis_kkvhsu",
    hotels: [
      { name: "Al Fanar Hotel Sohar", stars: 3, pricePerNight: 22, tier: "low" },
      { name: "Holiday Inn Sohar", stars: 4, pricePerNight: 48, tier: "medium" },
      { name: "Sohar Beach Hotel & Resort", stars: 4, pricePerNight: 75, tier: "luxury" },
    ],
  },
  "wadi-damm": {
    imageUrl: "https://res.cloudinary.com/dci3nnc5k/image/upload/f_auto,q_auto/wadi-damm_mpt329",
    hotels: [
      { name: "Al Fanar Hotel Sohar", stars: 3, pricePerNight: 22, tier: "low" },
      { name: "Holiday Inn Sohar", stars: 4, pricePerNight: 48, tier: "medium" },
      { name: "Sohar Beach Hotel & Resort", stars: 4, pricePerNight: 75, tier: "luxury" },
    ],
  },
};
