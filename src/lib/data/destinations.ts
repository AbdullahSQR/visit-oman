import type { Destination } from "@/lib/types";
import { DESTINATION_META } from "./destination-meta";

/**
 * Primary dataset — 38 destinations across all 6 Oman regions.
 * All coordinates are real GPS positions.
 * Ticket costs are approximations in OMR; 0 = free entry.
 * Crowd levels: 1=very quiet … 5=very busy.
 */
export const DESTINATIONS: Destination[] = [
  // ── MUSCAT ─────────────────────────────────────────────────────────────────
  {
    id: "sqgm",
    name: { en: "Sultan Qaboos Grand Mosque", ar: "مسجد السلطان قابوس الأكبر" },
    lat: 23.5958, lng: 58.4130,
    region: { en: "muscat", ar: "مسقط" },
    categories: ["culture"],
    company: { en: "Ministry of Endowments & Religious Affairs", ar: "وزارة الأوقاف والشؤون الدينية" },
    avg_visit_duration_minutes: 90,
    ticket_cost_omr: 0,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 4,
    description: {
      en: "One of the largest mosques in the world, the Sultan Qaboos Grand Mosque is an architectural masterpiece featuring the world's largest hand-woven Persian carpet and a stunning crystal chandelier. Non-Muslim visitors are welcomed outside prayer times.",
      ar: "أحد أكبر المساجد في العالم، وهو تحفة معمارية تضم أكبر سجادة فارسية منسوجة يدوياً في العالم وثريا كريستالية رائعة."
    }
  },
  {
    id: "mutrah-corniche",
    name: { en: "Mutrah Corniche & Souq", ar: "كورنيش مطرح والسوق" },
    lat: 23.6197, lng: 58.5839,
    region: { en: "muscat", ar: "مسقط" },
    categories: ["culture", "food"],
    company: { en: "Muscat Municipality", ar: "بلدية مسقط" },
    avg_visit_duration_minutes: 120,
    ticket_cost_omr: 0,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 4,
    description: {
      en: "Mutrah Corniche is Muscat's oldest waterfront promenade, lined with traditional wooden dhow boats and leading to the famous Mutrah Souq—a labyrinthine marketplace brimming with frankincense, silver jewellery, and traditional Omani crafts.",
      ar: "كورنيش مطرح هو أقدم ممشى بحري في مسقط، ويؤدي إلى سوق مطرح الشهير المليء بالبخور والمجوهرات الفضية والحرف التقليدية العمانية."
    }
  },
  {
    id: "royal-opera",
    name: { en: "Royal Opera House Muscat", ar: "دار الأوبرا السلطانية مسقط" },
    lat: 23.5931, lng: 58.4070,
    region: { en: "muscat", ar: "مسقط" },
    categories: ["culture"],
    company: { en: "Royal Opera House Muscat", ar: "دار الأوبرا السلطانية مسقط" },
    avg_visit_duration_minutes: 75,
    ticket_cost_omr: 2,
    recommended_months: [1,2,3,4,9,10,11,12],
    crowd_level: 2,
    description: {
      en: "The Royal Opera House Muscat is a world-class performing arts venue combining Islamic and contemporary architecture. Guided tours reveal its opulent interior, gardens, and the intricate craftsmanship in every hall.",
      ar: "دار الأوبرا السلطانية مسقط هي مكان للفنون الأداء يجمع بين العمارة الإسلامية والمعاصرة."
    }
  },
  {
    id: "bait-al-zubair",
    name: { en: "Bait Al Zubair Museum", ar: "بيت الزبير" },
    lat: 23.6140, lng: 58.5922,
    region: { en: "muscat", ar: "مسقط" },
    categories: ["culture"],
    company: { en: "Bait Al Zubair Foundation", ar: "مؤسسة بيت الزبير" },
    avg_visit_duration_minutes: 90,
    ticket_cost_omr: 3,
    recommended_months: [1,2,3,4,5,9,10,11,12],
    crowd_level: 2,
    description: { 
      en: "A private museum in a beautifully restored traditional Omani house, housing an extensive collection of silver jewellery, weaponry, textiles, and antique household items spanning centuries of Omani history.",
      ar: "متحف خاص في منزل عماني تقليدي مرمم بشكل جميل، يضم مجموعة واسعة من المجوهرات الفضية والأسلحة والمنسوجات."
    }
  },
  {
    id: "qurum-beach",
    name: { en: "Qurum Beach & Natural Park", ar: "شاطئ القرم والمتنزه الطبيعي" },
    lat: 23.5945, lng: 58.4248,
    region: { en: "muscat", ar: "مسقط" },
    categories: ["beach", "nature"],
    company: { en: "Ministry of Environment", ar: "وزارة البيئة" },
    avg_visit_duration_minutes: 90,
    ticket_cost_omr: 0,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 3,
    description: {
      en: "Qurum Beach is Muscat's premier urban beach, flanked by a lush natural park featuring mangrove lagoons. A favourite for evening strolls, swimming, and watching the sun set behind the Al Hajar Mountains.",
      ar: "شاطئ القرم هو الشاطئ الحضري الرئيسي في مسقط، مع حديقة طبيعية خضراء تضم بحيرات المانغروف."
    }
  },
  {
    id: "mutrah-fort",
    name: { en: "Mutrah Fort", ar: "قلعة مطرح" },
    lat: 23.6201, lng: 58.5813,
    region: { en: "muscat", ar: "مسقط" },
    categories: ["culture"],
    company: { en: "Ministry of Heritage & Culture", ar: "وزارة التراث والثقافة" },
    avg_visit_duration_minutes: 60,
    ticket_cost_omr: 0.5,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 3,
    description: {
      en: "Perched above the Mutrah harbour, this 17th-century Portuguese fort offers sweeping panoramic views of the bay, the old city, and the mountains behind Muscat. The ascent rewards visitors with a dramatic coastal tableau.",
      ar: "هذا الحصن البرتغالي من القرن السابع عشر يوفر إطلالات بانورامية رائعة على الخليج والمدينة القديمة."
    }
  },

  // ── DAKHILIYA ──────────────────────────────────────────────────────────────
  {
    id: "nizwa-fort",
    name: { en: "Nizwa Fort & Souq", ar: "قلعة نزوى وسوقها" },
    lat: 22.9327, lng: 57.5302,
    region: { en: "dakhiliya", ar: "الداخلية" },
    categories: ["culture"],
    company: { en: "Ministry of Heritage & Culture", ar: "وزارة التراث والثقافة" },
    avg_visit_duration_minutes: 150,
    ticket_cost_omr: 5,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 4,
    description: {
      en: "Nizwa Fort is Oman's most visited historical monument. Its colossal cylindrical tower—the largest in Arabia—houses a labyrinth of chambers, artillery rooms, and trap passages. The adjacent Friday livestock market is a spectacle of Omani rural life.",
      ar: "قلعة نزوى هي الموقع التاريخي الأكثر زيارة في عُمان، بمبناها الأسطواني الضخم والأكبر في شبه الجزيرة العربية."
    }
  },
  {
    id: "jebel-akhdar",
    name: { en: "Jebel Akhdar Rose Terraces", ar: "مدرجات الورد في جبل الأخضر" },
    lat: 23.0492, lng: 57.6618,
    region: { en: "dakhiliya", ar: "الداخلية" },
    categories: ["mountain", "nature"],
    company: { en: "Oman Tourism", ar: "هيئة السياحة العمانية" },
    avg_visit_duration_minutes: 180,
    ticket_cost_omr: 0,
    recommended_months: [1,2,3,4,11,12],
    crowd_level: 3,
    description: {
      en: "At 2,000m altitude, Jebel Akhdar (Green Mountain) surprises visitors with its cool climate, ancient irrigation falaj channels, and terraced orchards producing Oman's famous Damask rose. The annual Rose Festival in March is a highlight.",
      ar: "على ارتفاع 2000 متر، يفاجئ جبل الأخضر الزوار بمناخه البارد وبساتينه المدرجة التي تنتج وردة الدمشقي الشهيرة."
    }
  },
  {
    id: "jebel-shams",
    name: { en: "Jebel Shams & Wadi Ghul", ar: "جبل شمس ووادي غول" },
    lat: 23.2397, lng: 56.8305,
    region: { en: "dakhiliya", ar: "الداخلية" },
    categories: ["mountain", "nature"],
    company: { en: "Ministry of Environment", ar: "وزارة البيئة" },
    avg_visit_duration_minutes: 240,
    ticket_cost_omr: 0,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 2,
    description: {
      en: "Oman's highest peak at 3,009m, Jebel Shams towers above the Wadi Ghul—often called the 'Grand Canyon of Arabia'. A rim trail (W6) traces the canyon edge, offering vertiginous drops of over 1,000m and views that leave visitors speechless.",
      ar: "أعلى قمة في عُمان على ارتفاع 3009 متر، تعلو جبل شمس فوق وادي غول الذي يُعرف بـ'غراند كانيون العرب'."
    }
  },
  {
    id: "bahla-fort",
    name: { en: "Bahla Fort (UNESCO)", ar: "حصن بهلاء (اليونسكو)" },
    lat: 22.9638, lng: 57.2956,
    region: { en: "dakhiliya", ar: "الداخلية" },
    categories: ["culture"],
    company: { en: "Ministry of Heritage & Culture", ar: "وزارة التراث والثقافة" },
    avg_visit_duration_minutes: 120,
    ticket_cost_omr: 3,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 2,
    description: {
      en: "A UNESCO World Heritage Site, Bahla Fort dates to pre-Islamic times and represents one of the oldest and largest fortified settlements in Oman. The surrounding ancient mudbrick town walls stretch for kilometres through the palm oasis.",
      ar: "موقع تراث عالمي لليونسكو، يعود حصن بهلاء إلى عصور ما قبل الإسلام وهو من أقدم وأكبر المستوطنات المحصنة في عُمان."
    }
  },
  {
    id: "jabrin-castle",
    name: { en: "Jabrin Castle", ar: "قصر جبرين" },
    lat: 22.7738, lng: 57.2301,
    region: { en: "dakhiliya", ar: "الداخلية" },
    categories: ["culture"],
    company: { en: "Ministry of Heritage & Culture", ar: "وزارة التراث والثقافة" },
    avg_visit_duration_minutes: 90,
    ticket_cost_omr: 3,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 1,
    description: {
      en: "Jabrin Castle is Oman's finest example of 17th-century palatial architecture. Intricately painted ceilings, carved stucco, and hidden trapdoors reveal a sophisticated court culture. The castle served as both a seat of power and a centre of learning.",
      ar: "قصر جبرين هو أفضل مثال على العمارة القصرية في القرن السابع عشر في عُمان، مع سقوف مزخرفة بشكل معقد وغرف سرية."
    }
  },
  {
    id: "al-hamra",
    name: { en: "Al Hamra Old Town", ar: "مدينة الحمراء القديمة" },
    lat: 22.9035, lng: 57.2981,
    region: { en: "dakhiliya", ar: "الداخلية" },
    categories: ["culture", "mountain"],
    company: { en: "Ministry of Heritage & Culture", ar: "وزارة التراث والثقافة" },
    avg_visit_duration_minutes: 90,
    ticket_cost_omr: 0,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 1,
    description: {
      en: "Al Hamra is among the best-preserved mudbrick towns in Oman, with two-storey earthen houses clinging to the foothills of Jebel Shams. The Bait Al Safah living museum offers an authentic glimpse into traditional Omani domestic life.",
      ar: "الحمراء من أفضل المدن المحفوظة من الطوب اللبن في عُمان، مع منازل طينية ذات طابقين تتشبث بسفوح جبل شمس."
    }
  },

  // ── SHARQIYA ───────────────────────────────────────────────────────────────
  {
    id: "wahiba-sands",
    name: { en: "Wahiba Sands (Sharqiyah Sands)", ar: "رمال الوهيبة" },
    lat: 22.3500, lng: 58.7500,
    region: { en: "sharqiya", ar: "الشرقية" },
    categories: ["desert"],
    company: { en: "Desert Nights Camp", ar: "مخيم ليالي الصحراء" },
    avg_visit_duration_minutes: 240,
    ticket_cost_omr: 0,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 2,
    description: {
      en: "The Wahiba (Sharqiyah) Sands is a vast sea of rolling red and white dunes stretching 180km north to south. Dune-bashing, camel riding, and spending a night in a Bedouin-style tented camp under a sky blazing with stars are iconic experiences.",
      ar: "رمال الوهيبة هي بحر شاسع من الكثبان الرملية الحمراء والبيضاء المتدحرجة. ركوب الإبل وقضاء ليلة في مخيم بدوي تحت سماء مضيئة بالنجوم تجارب لا تنسى."
    }
  },
  {
    id: "ras-al-jinz",
    name: { en: "Ras Al Jinz Turtle Reserve", ar: "محمية رأس الجنز للسلاحف" },
    lat: 22.3917, lng: 59.8028,
    region: { en: "sharqiya", ar: "الشرقية" },
    categories: ["nature", "beach"],
    company: { en: "Ras Al Jinz Scientific & Visitor Center", ar: "مركز رأس الجنز العلمي" },
    avg_visit_duration_minutes: 120,
    ticket_cost_omr: 7,
    recommended_months: [6,7,8,9,10],
    crowd_level: 3,
    description: {
      en: "Ras Al Jinz is one of the world's most important green turtle nesting sites. Each night from June to October, hundreds of giant turtles haul themselves ashore to lay eggs. Guided nocturnal tours offer an unforgettable wildlife encounter.",
      ar: "رأس الجنز هو أحد أهم مواقع تعشيش السلاحف الخضراء في العالم. كل ليلة من يونيو إلى أكتوبر، تتوجه مئات السلاحف العملاقة إلى الشاطئ لوضع بيضها."
    }
  },
  {
    id: "wadi-bani-khalid",
    name: { en: "Wadi Bani Khalid", ar: "وادي بني خالد" },
    lat: 22.3667, lng: 59.0933,
    region: { en: "sharqiya", ar: "الشرقية" },
    categories: ["nature"],
    company: { en: "Ministry of Environment", ar: "وزارة البيئة" },
    avg_visit_duration_minutes: 150,
    ticket_cost_omr: 0,
    recommended_months: [1,2,3,4,5,10,11,12],
    crowd_level: 3,
    description: {
      en: "Wadi Bani Khalid is a perennial oasis wadi where crystal-clear turquoise pools are fed by year-round springs. Visitors swim in natural rock pools, explore short cave passages, and picnic under shady palm groves.",
      ar: "وادي بني خالد هو واحة دائمة الخضرة حيث تُغذّي الينابيع الدائمة أحواضاً فيروزية صافية على مدار العام."
    }
  },
  {
    id: "sur-dhow-yard",
    name: { en: "Sur Dhow Yard & Maritime Museum", ar: "ورشة صناعة السفن في صور" },
    lat: 22.5671, lng: 59.5293,
    region: { en: "sharqiya", ar: "الشرقية" },
    categories: ["culture"],
    company: { en: "Sur Municipality", ar: "بلدية صور" },
    avg_visit_duration_minutes: 90,
    ticket_cost_omr: 1,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 2,
    description: {
      en: "Sur's shipbuilding yard is one of the last places on Earth where traditional wooden dhows are still hand-crafted using centuries-old techniques. Watching a master boatbuilder at work—no nails, no blueprints—is a rare living heritage experience.",
      ar: "ورشة صور لبناء السفن هي أحد آخر الأماكن على وجه الأرض التي لا تزال تُصنع فيها السفن الخشبية التقليدية يدوياً."
    }
  },
  {
    id: "fins-beach",
    name: { en: "Fins Beach (Qalhat)", ar: "شاطئ فنيس (قلهات)" },
    lat: 22.4800, lng: 59.3270,
    region: { en: "sharqiya", ar: "الشرقية" },
    categories: ["beach"],
    company: { en: "Local Community", ar: "المجتمع المحلي" },
    avg_visit_duration_minutes: 120,
    ticket_cost_omr: 0,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 2,
    description: {
      en: "Fins Beach is widely considered one of Oman's most beautiful beaches—remote, crescent-shaped, and backed by dramatic rocky cliffs. The water is exceptional for snorkelling, with colourful reef fish visible in the shallows.",
      ar: "يُعتبر شاطئ فنيس على نطاق واسع أحد أجمل شواطئ عُمان، نائٍ وهلالي الشكل ومحاط بجروف صخرية درامية."
    }
  },
  {
    id: "qalhat",
    name: { en: "Ancient City of Qalhat (UNESCO)", ar: "مدينة قلهات الأثرية (اليونسكو)" },
    lat: 22.6984, lng: 59.3786,
    region: { en: "sharqiya", ar: "الشرقية" },
    categories: ["culture"],
    company: { en: "Ministry of Heritage & Culture", ar: "وزارة التراث والثقافة" },
    avg_visit_duration_minutes: 75,
    ticket_cost_omr: 2,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 1,
    description: {
      en: "Once one of the most important port cities on the Indian Ocean trade route, the ruins of Qalhat—including the intact mausoleum of Bibi Maryam—are a UNESCO World Heritage Site testifying to Oman's medieval maritime supremacy.",
      ar: "كانت قلهات ذات مرة من أهم مدن الموانئ على طريق التجارة في المحيط الهندي، وآثارها موقع تراث عالمي لليونسكو."
    }
  },

  // ── DHOFAR ─────────────────────────────────────────────────────────────────
  {
    id: "wadi-darbat",
    name: { en: "Wadi Darbat & Waterfall", ar: "وادي دربات وشلاله" },
    lat: 17.0722, lng: 54.0889,
    region: { en: "dhofar", ar: "ظفار" },
    categories: ["nature"],
    company: { en: "Salalah Tourism", ar: "هيئة سياحة صلالة" },
    avg_visit_duration_minutes: 150,
    ticket_cost_omr: 0,
    recommended_months: [7,8,9],
    crowd_level: 3,
    description: {
      en: "During the Khareef (monsoon) season from July to September, Wadi Darbat transforms into a lush green paradise. A dramatic waterfall plunges into a large lake, flamingos wade in the shallows, and the entire valley turns an impossibly deep green.",
      ar: "خلال موسم الخريف من يوليو إلى سبتمبر، يتحول وادي دربات إلى جنة خضراء بهيجة مع شلال درامي يصب في بحيرة كبيرة."
    }
  },
  {
    id: "al-mughsail",
    name: { en: "Al Mughsail Beach & Blowholes", ar: "شاطئ المغسيل والثقوب البركانية" },
    lat: 17.0283, lng: 54.0406,
    region: { en: "dhofar", ar: "ظفار" },
    categories: ["beach", "nature"],
    company: { en: "Salalah Tourism", ar: "هيئة سياحة صلالة" },
    avg_visit_duration_minutes: 90,
    ticket_cost_omr: 0,
    recommended_months: [6,7,8,9,10,11,12,1,2],
    crowd_level: 2,
    description: {
      en: "Al Mughsail is a sweeping white-sand beach south of Salalah, famous for its coastal blowholes—sea caves that shoot jets of seawater metres into the air. The cliffs behind the beach are draped in mist during the Khareef season.",
      ar: "المغسيل هو شاطئ رملي أبيض رائع جنوب صلالة، مشهور بثقوبه البركانية الساحلية التي تقذف نفاثات من مياه البحر."
    }
  },
  {
    id: "frankincense-land",
    name: { en: "Land of Frankincense (UNESCO)", ar: "أرض اللبان (اليونسكو)" },
    lat: 17.2767, lng: 54.1700,
    region: { en: "dhofar", ar: "ظفار" },
    categories: ["culture", "nature"],
    company: { en: "Ministry of Heritage & Culture", ar: "وزارة التراث والثقافة" },
    avg_visit_duration_minutes: 120,
    ticket_cost_omr: 3,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 2,
    description: {
      en: "The UNESCO-listed Land of Frankincense encompasses the ancient caravan city of Sumhuram, the Al Balid archaeological park, and living frankincense groves at Wadi Dawkah. Oman is the world's primary source of the finest grade of frankincense.",
      ar: "تشمل أرض اللبان المدرجة في اليونسكو مدينة سمهرم القديمة وأشجار اللبان الحية في وادي دوكة."
    }
  },
  {
    id: "khor-rori",
    name: { en: "Khor Rori Nature Reserve", ar: "خور روري" },
    lat: 17.0447, lng: 54.4231,
    region: { en: "dhofar", ar: "ظفار" },
    categories: ["nature", "culture"],
    company: { en: "Environment Authority", ar: "هيئة البيئة" },
    avg_visit_duration_minutes: 90,
    ticket_cost_omr: 1,
    recommended_months: [7,8,9,10,11,12,1],
    crowd_level: 1,
    description: {
      en: "Khor Rori is a tidal lagoon sheltered by the ruins of the ancient port city of Sumhuram. Flamingos, herons, and kingfishers populate the mangrove-fringed shores. Boat trips into the lagoon reveal the ancient city walls rising above the waterline.",
      ar: "خور روري هو بحيرة مدية محاطة بأطلال مدينة سمهرم القديمة. تسكن الطيور المهاجرة الشواطئ المحاطة بأشجار المانغروف."
    }
  },
  {
    id: "salalah-khareef",
    name: { en: "Salalah Khareef Season", ar: "صلالة موسم الخريف" },
    lat: 17.0151, lng: 54.0924,
    region: { en: "dhofar", ar: "ظفار" },
    categories: ["nature", "food"],
    company: { en: "Dhofar Municipality", ar: "بلدية ظفار" },
    avg_visit_duration_minutes: 180,
    ticket_cost_omr: 0,
    recommended_months: [7,8,9],
    crowd_level: 5,
    description: {
      en: "Salalah's Khareef (monsoon) transforms the city and its surrounding mountains into a green landscape unique in Arabia. Families gather at the Ittin viewpoint above the misty escarpment, traditional music fills the parks, and the air is cool and fragrant.",
      ar: "يحول موسم الخريف في صلالة المدينة وجبالها إلى منظر أخضر فريد من نوعه في شبه الجزيرة العربية."
    }
  },

  // ── BATINAH ────────────────────────────────────────────────────────────────
  {
    id: "nakhal-fort",
    name: { en: "Nakhal Fort & Hot Springs", ar: "قلعة نخل والعيون الحارة" },
    lat: 23.3833, lng: 57.8333,
    region: { en: "batinah", ar: "الباطنة" },
    categories: ["culture", "nature"],
    company: { en: "Ministry of Heritage & Culture", ar: "وزارة التراث والثقافة" },
    avg_visit_duration_minutes: 120,
    ticket_cost_omr: 2,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 2,
    description: {
      en: "Nakhal Fort is a stunning multi-tiered castle built over a rocky outcrop, offering panoramic views of the Batinah plains and the Al Hajar range. Nearby Ain Ath Thawarah is a natural hot spring whose warm mineral waters flow into bathing pools.",
      ar: "قلعة نخل هي قلعة رائعة متعددة الطوابق بُنيت فوق صخرة، وتوفر مناظر بانورامية لسهول الباطنة وجبال الحجر."
    }
  },
  {
    id: "rustaq-fort",
    name: { en: "Rustaq Fort & Al Hazm Castle", ar: "قلعة الرستاق وحصن الحزم" },
    lat: 23.3950, lng: 57.4175,
    region: { en: "batinah", ar: "الباطنة" },
    categories: ["culture"],
    company: { en: "Ministry of Heritage & Culture", ar: "وزارة التراث والثقافة" },
    avg_visit_duration_minutes: 150,
    ticket_cost_omr: 3,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 2,
    description: {
      en: "Rustaq Fort is the largest fort in Oman by ground area, featuring multiple towers of different periods and a resident population of falcons. The 18th-century Al Hazm Castle nearby is equally impressive with its ornate carved wooden doors and cannon passages.",
      ar: "قلعة الرستاق هي الأكبر في عُمان من حيث المساحة الأرضية، وتضم أبراجاً متعددة من فترات مختلفة."
    }
  },
  {
    id: "wadi-hoqain",
    name: { en: "Wadi Hoqain & Al Sawadi", ar: "وادي حوقين والسوادي" },
    lat: 23.4700, lng: 57.5800,
    region: { en: "batinah", ar: "الباطنة" },
    categories: ["nature", "mountain"],
    company: { en: "Ministry of Environment", ar: "وزارة البيئة" },
    avg_visit_duration_minutes: 120,
    ticket_cost_omr: 0,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 1,
    description: {
      en: "Wadi Hoqain is a beautiful canyon wadi cutting through the Al Hajar foothills. Its pools are refreshed by mountain runoff, creating a series of natural swimming holes beneath dramatic rock faces. Hiking trails lead to mountain villages above.",
      ar: "وادي حوقين هو وادٍ صخري جميل يشق طريقه عبر سفوح جبال الحجر، مع أحواض تُجدد بمياه الجبال لتشكل أماكن للسباحة."
    }
  },
  {
    id: "al-sawadi-beach",
    name: { en: "Al Sawadi Beach & Islands", ar: "شاطئ السوادي والجزر" },
    lat: 23.7167, lng: 57.6333,
    region: { en: "batinah", ar: "الباطنة" },
    categories: ["beach", "nature"],
    company: { en: "Al Sawadi Beach Resort", ar: "منتجع شاطئ السوادي" },
    avg_visit_duration_minutes: 150,
    ticket_cost_omr: 0,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 2,
    description: {
      en: "Al Sawadi is a sweeping beach famous for its offshore rocky islands reachable by small boat. The islands support nesting seabirds and offer exceptional snorkelling. A scenic sunset over the islands is one of the Batinah coast's signature images.",
      ar: "السوادي شاطئ رائع مشهور بجزره الصخرية البحرية التي يمكن الوصول إليها بقارب صغير وتوفر غطساً استثنائياً."
    }
  },
  {
    id: "sohar-fort",
    name: { en: "Sohar Fort & Fish Market", ar: "قلعة صحار وسوق السمك" },
    lat: 24.3544, lng: 56.7444,
    region: { en: "batinah", ar: "الباطنة" },
    categories: ["culture", "food"],
    company: { en: "Sohar Municipality", ar: "بلدية صحار" },
    avg_visit_duration_minutes: 90,
    ticket_cost_omr: 1,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 2,
    description: {
      en: "Sohar is the legendary birthplace of Sinbad the Sailor. Its whitewashed fort houses a regional museum. The adjacent fish market at dawn is one of Oman's most vibrant scenes—fishermen unloading kingfish, tuna, and shark to the calls of auctioneers.",
      ar: "صحار هي المسقط الأسطوري لسندباد البحري. يضم حصنها متحفاً إقليمياً وسوق السمك المجاور عند الفجر من أكثر المشاهد حيوية في عُمان."
    }
  },

  // ── DHAHIRA ────────────────────────────────────────────────────────────────
  {
    id: "bat-necropolis",
    name: { en: "Bat Necropolis (UNESCO)", ar: "منطقة بات الأثرية (اليونسكو)" },
    lat: 23.2897, lng: 56.7431,
    region: { en: "dhahira", ar: "الظاهرة" },
    categories: ["culture"],
    company: { en: "Ministry of Heritage & Culture", ar: "وزارة التراث والثقافة" },
    avg_visit_duration_minutes: 90,
    ticket_cost_omr: 2,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 1,
    description: {
      en: "The Bat, Al-Khutm and Al-Ayn archaeological sites form a UNESCO World Heritage complex of 3rd-millennium BCE beehive tombs—the largest and best-preserved Bronze Age funerary landscape in the Arabian Peninsula.",
      ar: "تشكل مواقع بات والخطم والعين مجمعاً أثرياً يعود إلى الألفية الثالثة قبل الميلاد، وهو أكبر وأحسن منظر جنائزي من العصر البرونزي في شبه الجزيرة العربية."
    }
  },
  {
    id: "ibri-oasis",
    name: { en: "Ibri Oasis & Fort", ar: "واحة عبري وحصنها" },
    lat: 23.2258, lng: 56.5142,
    region: { en: "dhahira", ar: "الظاهرة" },
    categories: ["culture", "nature"],
    company: { en: "Ministry of Heritage & Culture", ar: "وزارة التراث والثقافة" },
    avg_visit_duration_minutes: 90,
    ticket_cost_omr: 1,
    recommended_months: [1,2,3,4,10,11,12],
    crowd_level: 1,
    description: {
      en: "Ibri sits at a historic crossroads between interior Oman and the UAE. Its fort guards a sprawling palm oasis crossed by ancient falaj irrigation channels. The date-palm groves here produce some of Oman's most prized dates.",
      ar: "تقع عبري عند ملتقى تاريخي بين الداخلية العمانية والإمارات. يحرس حصنها واحة نخيل شاسعة تعبرها قنوات ري فلج قديمة."
    }
  },
  {
    id: "wadi-damm",
    name: { en: "Wadi Damm & Desert Pools", ar: "وادي دم وأحواض الصحراء" },
    lat: 23.5800, lng: 56.9500,
    region: { en: "dhahira", ar: "الظاهرة" },
    categories: ["desert", "nature"],
    company: { en: "Ministry of Environment", ar: "وزارة البيئة" },
    avg_visit_duration_minutes: 120,
    ticket_cost_omr: 0,
    recommended_months: [1,2,3,11,12],
    crowd_level: 1,
    description: {
      en: "Wadi Damm is a remote canyon in the Dhahira region where flash floods carve dramatic rock formations and leave behind seasonal rock pools. Explored almost exclusively by adventurous visitors, it offers genuine off-the-beaten-path solitude.",
      ar: "وادي دم هو وادٍ نائٍ في منطقة الظاهرة حيث تحفر الفيضانات المفاجئة تشكيلات صخرية درامية وتترك وراءها أحواضاً صخرية موسمية."
    }
  },
];

// ─── Lookup helpers ────────────────────────────────────────────────────────────

// Pre-built Map for O(1) lookup — populated after the forEach merge below
let DESTINATIONS_BY_ID: Map<string, Destination>;

export function getDestinationById(id: string): Destination | undefined {
  return DESTINATIONS_BY_ID.get(id);
}

// Merge imageUrl + hotels from the meta map into each destination, then build lookup Map
DESTINATIONS.forEach((d) => {
  const meta = DESTINATION_META[d.id];
  if (meta) {
    d.imageUrl = meta.imageUrl;
    d.hotels   = meta.hotels;
  }
});

DESTINATIONS_BY_ID = new Map(DESTINATIONS.map((d) => [d.id, d]));

export const MAX_TICKET_COST = Math.max(1, ...DESTINATIONS.map((d) => d.ticket_cost_omr));
