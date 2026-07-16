export const COMPANY = {
  name: "Landgrid Uganda Limited",
  shortName: "LANDGRID",
  tagline: "Precision Surveying. Smarter Mapping.",
  founded: 2012,
  coordinates: "N 0°21'55.2\"  E 32°34'12.8\"",
  location: "Kampala · Uganda",
  phone: "+256 781 423 708",
  phoneMobile: "+256 748 405 713",
  email: "info@landgrip.net",
  website: "landgrid.net",
  address: "Nansana Lule Complex, Kampala, Uganda",
};

export const STATS = [
  { value: 850, suffix: "+", label: "Projects Completed" },
  { value: 62, suffix: "", label: "Districts Served" },
  { value: 45, suffix: "+", label: "Professional Surveyors" },
  { value: 13, suffix: "", label: "Years of Excellence" },
  { value: 500, suffix: "+", label: "Satisfied Clients" },
];

export const SERVICES = [
  {
    id: "cadastral",
    index: "01",
    title: "Cadastral & Boundary Surveys",
    description:
      "Land title surveys, boundary opening and re-establishment, subdivision, mutation surveys and lease documentation — fully compliant with the Ministry of Lands, Housing and Urban Development.",
    tags: ["Title Surveys", "Boundary Opening", "Subdivision"],
  },
  {
    id: "uav",
    index: "02",
    title: "UAV Mapping & LiDAR",
    description:
      "High-resolution drone photogrammetry, LiDAR point clouds, orthomosaics, DSM/DTM terrain models and volumetric analysis for agriculture, mining and infrastructure corridors.",
    tags: ["Photogrammetry", "LiDAR", "Volumetrics"],
  },
  {
    id: "engineering",
    index: "03",
    title: "Engineering & Construction Surveys",
    description:
      "Topographic surveys, road and pipeline alignment, structural setting-out, as-built verification and deformation monitoring for contractors, engineers and government agencies.",
    tags: ["Topography", "Setting-Out", "As-Builts"],
  },
  {
    id: "gis",
    index: "04",
    title: "GIS & Remote Sensing",
    description:
      "Enterprise geospatial platforms, spatial databases, land-use analysis and custom web-mapping dashboards that turn raw field data into decision-ready intelligence.",
    tags: ["Web GIS", "Spatial Analysis", "Dashboards"],
  },
  {
    id: "cors",
    index: "05",
    title: "CORS Network & RTK Correction",
    description:
      "A nationwide network of Continuously Operating Reference Stations delivering real-time centimetre-level RTK and DGPS corrections via industry-standard RTCM format. Includes a Reference Data Shop for downloading RINEX 2.3 static data files.",
    tags: ["Real-Time RTK", "RTCM", "RINEX Data Shop"],
  },
  {
    id: "gnss-sale",
    index: "06",
    title: "GNSS Equipment Sale & Rental",
    description:
      "We offer a full range of CHC GNSS receivers for sale and rental — from the flagship i90 IMU-RTK to the compact i50 — plus the HCE 320 rugged Android controller. Complete with after-sales support, calibration and operator training.",
    tags: ["Sale & Rental", "CHC GNSS", "After-Sales"],
  },
  {
    id: "tracking",
    index: "07",
    title: "GPS Car Tracking Services",
    description:
      "Real-time GPS tracking for cars, motorcycles and assets — accessible 24/7 on PC and phone. Includes geofencing alerts, remote fuel cut-off, fleet management, fuel monitoring, heavy equipment monitoring and instant SMS/email notifications.",
    tags: ["Real-Time Tracking", "Fleet Management", "Geofencing"],
  },
  {
    id: "equipment",
    index: "08",
    title: "Advanced Survey Equipment",
    description:
      "Our teams deploy cutting-edge GreenValley and CHC technology — GNSS receivers, handheld SLAM LiDAR scanners, drones, total stations and GPR — ensuring every project benefits from the latest instrumentation.",
    tags: ["GNSS", "SLAM LiDAR", "Total Stations"],
  },
];

export const VALUES = [
  {
    title: "Latest Technology",
    text: "We deploy cutting-edge CHC & GreenValley GNSS receivers, SLAM LiDAR scanners, drones, GPR and our own nationwide CORS network on every project.",
  },
  {
    title: "Certified Professionals",
    text: "Registered surveyors, GIS specialists and engineers with decades of combined field experience across East Africa.",
  },
  {
    title: "Fast Delivery",
    text: "Streamlined workflows and dedicated project managers ensure on-time delivery, every single time.",
  },
  {
    title: "Accurate Results",
    text: "Sub-centimetre accuracy backed by rigorous quality control and industry-leading methodologies.",
  },
  {
    title: "Nationwide CORS Network",
    text: "18 Continuously Operating Reference Stations covering 80% of Uganda — real-time RTK corrections anywhere, anytime.",
  },
  {
    title: "Client Partnership",
    text: "Long-term relationships built on transparency, communication and exceptional service.",
  },
];

export const PROJECTS = [
  {
    id: "albertine",
    title: "Albertine Oil Fields Cadastral Programme",
    category: "Cadastral Survey",
    location: "Albertine Graben, Western Uganda",
    year: "2023",
    area: "5,200 ha",
    description:
      "Large-scale cadastral re-establishment and parcel mapping across the oil-rich Albertine Graben for a multinational energy consortium.",
    image:
      "https://images.pexels.com/photos/25301009/pexels-photo-25301009.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "kampala-gis",
    title: "Kampala Metro GIS Platform",
    category: "GIS & Remote Sensing",
    location: "Kampala Capital City",
    year: "2024",
    area: "3.8M records",
    description:
      "Enterprise geospatial platform integrating property, utility and transport layers for the metropolitan planning authority.",
    image:
      "https://images.pexels.com/photos/28146858/pexels-photo-28146858.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
  {
    id: "entebbe",
    title: "Entebbe Expressway Engineering Survey",
    category: "Engineering Survey",
    location: "Kampala – Entebbe Corridor",
    year: "2022",
    area: "51 km corridor",
    description:
      "Alignment surveys, setting-out control and as-built verification along Uganda's flagship expressway corridor.",
    image:
      "https://images.pexels.com/photos/6872325/pexels-photo-6872325.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Consultation",
    text: "We listen, understand your objectives and design a tailored methodology for your project.",
  },
  {
    step: "02",
    title: "Field Work",
    text: "Expert teams deploy with the latest equipment to collect precise field data.",
  },
  {
    step: "03",
    title: "Processing",
    text: "Data is processed using industry-standard software with rigorous quality control.",
  },
  {
    step: "04",
    title: "Delivery",
    text: "Final deliverables — maps, reports, models — presented with expert insights.",
  },
];

export const TESTIMONIAL = {
  quote:
    "Landgrid delivered a complex cadastral survey for our 5,000-hectare project two weeks ahead of schedule. Their precision and professionalism set a new standard for the industry in Uganda.",
  author: "Eng. Samuel Mukasa",
  role: "Director of Engineering · Uganda National Roads Authority",
};

export const LIBASE2 = {
  name: "LiBase2 RTK",
  subtitle: "Ready-to-Use Intelligent GNSS Receiver",
  intro:
    "An intelligent GNSS receiver built for fast and reliable field surveying. Calibration-free inertial navigation enables tilt measurement up to 60° without bubble leveling — capture points instantly while maintaining centimetre-level accuracy.",
  specs: [
    { label: "Channels", value: "1408" },
    { label: "RTK Horizontal", value: "8 mm + 1 ppm" },
    { label: "RTK Vertical", value: "15 mm + 1 ppm" },
    { label: "Tilt Compensation", value: "Up to 60°" },
    { label: "GNSS Board", value: "UM980" },
    { label: "Update Rate", value: "10 / 20 / 50 Hz" },
    { label: "Battery", value: "8,000 mAh · 12 h" },
    { label: "Storage", value: "8 GB" },
    { label: "Rating", value: "IP68 · 1.5 m drop" },
    { label: "Weight", value: "0.8 kg" },
  ],
  features: [
    {
      title: "Full Constellation, Full Frequency",
      text: "Tracks GPS, GLONASS, BeiDou, Galileo, QZSS and SBAS with full BeiDou-3 support for rapid satellite lock in demanding environments.",
    },
    {
      title: "Calibration-Free Tilt Compensation",
      text: "Fourth-generation inertial navigation immune to electromagnetic interference — walk-and-measure workflows without bubble leveling.",
    },
    {
      title: "AR-Assisted Stakeout",
      text: "Satellite, inertial and visual fusion algorithms enable immersive AR stakeout on both controller and receiver for one-step completion.",
    },
    {
      title: "Built for Reliable Field Performance",
      text: "IP68 sealing, −25 °C to 65 °C operation, 6.0-inch sunlight-readable display and a 13 MP documentation camera with NFC.",
    },
  ],
  industries: ["Forestry", "HD Maps", "Mining", "Power Line", "Utilities", "Terrain"],
};

export const LIGRIP_O2_LITE = {
  name: "LiGrip O2 Lite",
  subtitle: "All-Scenario Handheld SLAM LiDAR Scanner",
  sku: "704009-005",
  intro:
    "The latest-generation handheld SLAM product from GreenValley International, utilizing MLF-SLAM (Multiple Localization Fusion-SLAM) multi-sensor fusion positioning technology. It overcomes mapping challenges in featureless environments such as airports, beaches and rivers, achieving centimetre-level data collection in all scenarios.",
  packageIncludes: "LiGrip O2 Lite (with GNSS Module) + LiDAR360MLS BP Module",
  specs: [
    { label: "Weight", value: "1.3 kg" },
    { label: "Absolute Accuracy", value: "< 3 cm" },
    { label: "LiDAR Scan Rate", value: "200,000 pts/s" },
    { label: "Max Detection Range", value: "70 m" },
    { label: "Panoramic Camera", value: "12 MP × 2" },
    { label: "VSLAM Camera", value: "1.3 MP × 2" },
    { label: "Storage", value: "512 GB SSD" },
    { label: "Horizontality", value: "< 0.025°" },
  ],
  features: [
    {
      title: "Featureless Data Acquisition",
      text: "MLF-SLAM algorithm overcomes mapping challenges in weak or featureless environments — airports, beaches, water surfaces — enabling high-precision data acquisition across all scenarios.",
    },
    {
      title: "Precision Data, Outstanding Performance",
      text: "3 cm absolute accuracy, high-fidelity point cloud with precise horizontal & vertical alignment, meeting surveying-grade standards and streamlining fieldwork.",
    },
    {
      title: "HD Panoramic + Visual SLAM Camera",
      text: "Dual 12 MP panoramic cameras with microsecond-level synchronisation. VSLAM & LiDAR-SLAM deep fusion enables precise mapping in complex environments.",
    },
    {
      title: "Real-time Processing & Colorization",
      text: "True-color point cloud mapping ready for instant export — supports earthwork calculation, tree segmentation and topographic mapping.",
    },
    {
      title: "Multi-dimensional Output",
      text: "One-time data collection outputs point clouds, images, 3DGS, MESH and more — boosting efficiency and cutting costs.",
    },
    {
      title: "RTK-SLAM Collection Mode",
      text: "Self-developed RTK-SLAM technology with telescopic pole enables full-range high-precision RTK data collection — < 5 cm accuracy in 1 minute, even without GNSS.",
    },
  ],
  collectionModes: ["Handheld", "Backpack", "Frontpack", "Telescopic Pole"],
  applications: [
    "Open Scene Measurement",
    "Topographic Surveying",
    "Stockpile Measurement",
    "Forestry Survey",
    "Underground Mapping",
    "Real Estate Surveying",
    "Construction Surveying",
  ],
  image: "images/ligrip-o2-lite.jpg",
};

export const LIGRIP_O2 = {
  name: "LiGrip O2",
  subtitle: "Flagship Handheld SLAM LiDAR Scanner",
  sku: "704009-005",
  channelNote: "16-channel, 120 m",
  intro:
    "The next-generation flagship handheld SLAM LiDAR scanner developed by GreenValley International. This all-in-one device integrates LiDAR, panoramic cameras, visual SLAM cameras and a GNSS antenna, enabling high-precision, all-directional data acquisition without limitations of time or environment.",
  packageIncludes:
    "Main unit · Small antenna module ×1 · Frontpack Kit ×1 · Battery ×2 · LiDAR360MLS BP Module Perpetual Subscription ×1",
  specs: [
    { label: "Weight", value: "2.2 kg" },
    { label: "Absolute Accuracy", value: "< 3 cm" },
    { label: "Repeatability", value: "2 cm" },
    { label: "LiDAR Scan Rate", value: "640,000 pts/s" },
    { label: "Max Detection Range", value: "300 m" },
    { label: "Panoramic Camera", value: "12 MP × 3" },
    { label: "VSLAM Camera", value: "1.3 MP × 2" },
    { label: "FOV", value: "280° × 360°" },
    { label: "Storage", value: "512 GB SSD" },
    { label: "Point Cloud Spacing", value: "2 mm" },
  ],
  features: [
    {
      title: "MLF-SLAM — Featureless Environments",
      text: "Combines multiple localisation sources for centimetre-level absolute positioning on highways, beaches, bridges and open water where GNSS is weak or unavailable.",
    },
    {
      title: "Triple-Camera Panoramic Coverage",
      text: "Front, left and right 12 MP cameras offer full 3D coverage, simplifying capture and enhancing colourisation and 3DGS quality.",
    },
    {
      title: "Survey-Grade Accuracy",
      text: "Multi-sensor fusion SLAM ensures 3 cm absolute accuracy and 2 cm repeatability — regardless of operator, environment, path or time.",
    },
    {
      title: "Millimetre-Level Point Clouds",
      text: "2 mm point cloud spacing delivers results comparable to terrestrial laser scanning for high-fidelity reality capture.",
    },
    {
      title: "Multiple Positioning Modes",
      text: "RTK-SLAM for RTK areas, PPK-SLAM without RTK signal, MLF-SLAM for featureless zones and pure SLAM for GNSS-denied environments.",
    },
  ],
  collectionModes: [
    "Handheld",
    "Backpack Kit",
    "Frontpack Kit",
    "Telescopic Pole",
    "Vehicle-Mounted",
    "UAV-Mounted",
  ],
  applications: [
    "Forestry Investigation",
    "Utility Mapping",
    "Powerline Inspection",
    "Tunnel Surveying",
    "Topographic Survey",
    "Mining",
    "Real Estate Surveying",
  ],
  image: "images/ligrip-o2.jpg",
};

export const CHC_GNSS_RECEIVERS = [
  {
    model: "i90 IMU-RTK GNSS",
    tagline: "Flagship IMU-RTK Receiver",
    description:
      "High-performance IMU-RTK GNSS receiver with 624-channel full-constellation tracking. Calibration-free pole-tilt compensation up to 30° boosts survey and stakeout speed by up to 20%.",
    specs: [
      { label: "Channels", value: "624" },
      { label: "Constellations", value: "GPS / GLONASS / Galileo / BeiDou" },
      { label: "IMU Tilt", value: "Up to 30°, 3 cm accuracy" },
      { label: "Connectivity", value: "Bluetooth, Wi-Fi, NFC, 4G, UHF" },
      { label: "UHF Range", value: "Up to 5 km" },
    ],
    highlights: [
      "Calibration-free IMU — just walk a few metres to initialise",
      "Automatic pole-tilt compensation in real time",
      "NFC instant controller pairing",
      "4G modem for seamless CORS network connection",
    ],
  },
  {
    model: "i80 GNSS",
    tagline: "Premium Full-GNSS Solution",
    description:
      "Truly versatile 220-channel GNSS receiver with extended connectivity, LCD display and dual hot-swappable batteries for uninterrupted full-day fieldwork in harsh environments.",
    specs: [
      { label: "Channels", value: "220" },
      { label: "Constellations", value: "GPS / GLONASS / Galileo / BeiDou" },
      { label: "Display", value: "128 × 64 dpi LCD" },
      { label: "Batteries", value: "3,400 mAh × 2 (hot-swap)" },
      { label: "Rating", value: "IP68" },
    ],
    highlights: [
      "Dual hot-swappable batteries for all-day operation",
      "In-field mode switching via LCD display",
      "3.75G modem, UHF, Bluetooth, Wi-Fi",
      "Cast magnesium IP68 chassis",
    ],
  },
  {
    model: "i70 GNSS",
    tagline: "Robust Surveying & Construction",
    description:
      "Smart antenna GNSS receiver with 220-channel engine, integrated UHF radio with 5 km range, 3.75G modem and Wi-Fi hotspot capability for land survey and construction professionals.",
    specs: [
      { label: "Channels", value: "220" },
      { label: "Constellations", value: "GPS / GLONASS / Galileo / BeiDou" },
      { label: "UHF Range", value: "Up to 5 km (410–470 MHz)" },
      { label: "Modem", value: "3.75G + Wi-Fi hotspot" },
      { label: "Display", value: "128 × 64 dpi LCD" },
    ],
    highlights: [
      "Integrated UHF Rx/Tx up to 5 km",
      "Wi-Fi hotspot for internet to controller",
      "LCD display for at-a-glance status",
      "Compact and rugged field design",
    ],
  },
  {
    model: "i50 GNSS",
    tagline: "Speed & Accuracy in One",
    description:
      "624-channel full-constellation GNSS receiver with NTRIP client, internal UHF radio, dual hot-swappable batteries and IP67 rating — the perfect solution for topographic and construction positioning.",
    specs: [
      { label: "Channels", value: "624" },
      { label: "Constellations", value: "GPS / GLONASS / Galileo / BeiDou / QZSS" },
      { label: "Batteries", value: "3,400 mAh × 2 (hot-swap)" },
      { label: "Rating", value: "IP67, 2 m drop" },
      { label: "Connectivity", value: "NTRIP, UHF Rx/Tx, BT, Wi-Fi" },
    ],
    highlights: [
      "624-channel engine for fast RTK fix",
      "Easy base-rover switching when CORS unavailable",
      "IP67 with 2 m drop resistance",
      "Pairs with LandStar7 + HCE 320 controller",
    ],
  },
  {
    model: "M6 GNSS",
    tagline: "Compact Network Receiver",
    description:
      "High-performance, compact GNSS network receiver designed for survey and construction professionals who need reliable centimetre-grade accuracy in a lightweight package.",
    specs: [
      { label: "Form Factor", value: "Compact" },
      { label: "Constellations", value: "GPS / GLONASS / Galileo / BeiDou" },
      { label: "Mode", value: "Network RTK" },
    ],
    highlights: [
      "Lightweight and portable",
      "Optimised for CORS network use",
      "Quick deployment in the field",
    ],
  },
];

export const HCE320_CONTROLLER = {
  model: "HCE 320 Controller",
  description:
    "Professional rugged Android data controller for demanding surveying and construction applications. Pairs seamlessly with CHC GNSS receivers and LandStar7 field software.",
  specs: [
    { label: "OS", value: "Android" },
    { label: "Rating", value: "Rugged / IP-rated" },
    { label: "Software", value: "LandStar7 compatible" },
  ],
};

export const GPS_TRACKING = {
  title: "GPS Car Tracking Services",
  subtitle: "Real-time 24/7 vehicle & asset tracking",
  description:
    "Landgrid Uganda Limited owns and operates a real-time GPS car tracking service that enables you to easily track and monitor your car, motorcycle or assets on your PC and phone. Our service is robust and available 24/7, suitable for personal use and business fleets.",
  trackingUrl: "https://www.survtrack.com",
  features: [
    {
      title: "Real-Time Tracking",
      text: "Know the exact position of your vehicle at any moment, accessible on PC and mobile app.",
    },
    {
      title: "Geofencing Alerts",
      text: "Get real-time alerts if a vehicle suddenly leaves or enters a geo-zone you have marked.",
    },
    {
      title: "Remote Fuel Cut-Off",
      text: "Disable or enable fuel supply to the engine remotely for enhanced security.",
    },
    {
      title: "Instant Notifications",
      text: "Receive instant SMS and email alerts for speed, ignition, movement and geofence events.",
    },
  ],
  services: [
    "Fleet Management",
    "Fuel Monitoring",
    "Heavy Equipment Monitoring",
    "Tracking Device Installation",
    "Personal Vehicle Tracking",
    "Motorcycle & Boda-Boda Tracking",
  ],
};
