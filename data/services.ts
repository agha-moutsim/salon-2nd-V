export type ServiceTier = "s" | "l" | "sr";

export type PriceEntry = {
  d?: number | string;
  s?: number | string;
  l?: number | string;
  sr?: number | string;
};

export type StandardService = { n: string; p: PriceEntry };
export type PackageService = { t: string; inc: string[]; pr: Record<string, number> };

export type Category = {
  id: string;
  num: string;
  title: string;
  type: "tiered" | "standard" | "package";
  note?: string;
  services?: StandardService[];
  packages?: PackageService[];
};

export const CATS: Category[] = [
  {
    id: "haircut",
    num: "01",
    title: "Haircut & Beard",
    type: "tiered",
    note: "Prices shown per session.",
    services: [
      { n: "Undercut", p: { s: 700, l: 1000, sr: 1500 } },
      { n: "Simple / Fade Cut", p: { s: 1200, l: 1800, sr: 2500 } },
      { n: "Razor Cut", p: { s: 1500, l: 2000, sr: 3000 } },
      { n: "Express Haircut Detailing", p: { s: 800, l: 1000, sr: 1500 } },
      { n: "Beard", p: { s: 500, l: 800, sr: 1000 } },
      { n: "Threading", p: { s: "—", l: 300, sr: 500 } },
      { n: "Makeup", p: { s: "—", l: 2500, sr: 3500 } },
    ],
  },
  {
    id: "styling",
    num: "02",
    title: "Styling",
    type: "tiered",
    note: "Head Wash add-on: +PKR 200.",
    services: [
      { n: "Styling", p: { s: 500, l: 800, sr: 1000 } },
      { n: "Beard Styling", p: { s: 500, l: 800, sr: 1000 } },
      { n: "Hair Straightening", p: { s: 1000, l: 1500, sr: 2000 } },
      { n: "Fiber Application", p: { s: 800, l: 1000, sr: 1200 } },
      { n: "Head Wash", p: { d: 200 } },
    ],
  },
  {
    id: "facial",
    num: "03",
    title: "Facial Services",
    type: "standard",
    services: [
      { n: "Janssen Plus", p: { d: 10000 } },
      { n: "Janssen", p: { d: 8000 } },
      { n: "Hydra", p: { d: 7000 } },
      { n: "Dermacos", p: { d: 6000 } },
      { n: "Charcoal", p: { d: 5000 } },
      { n: "Dr. Shazil", p: { d: 4500 } },
      { n: "Deep Cleansing", p: { d: 2000 } },
      { n: "Cleansing", p: { d: 1000 } },
      { n: "Charcoal Mask", p: { d: 1000 } },
      { n: "Face Polisher", p: { d: 1000 } },
      { n: "Nose Strip", p: { d: 700 } },
    ],
  },
  {
    id: "body",
    num: "04",
    title: "Body Care",
    type: "standard",
    services: [
      { n: "Full Body Scrub", p: { d: 6000 } },
      { n: "Full Body Polisher", p: { d: 4000 } },
      { n: "Body Massage 20 Min", p: { d: 2000 } },
      { n: "Body Massage 40 Min", p: { d: 3000 } },
      { n: "Body Massage 60 Min", p: { d: 4000 } },
      { n: "Head Massage 15 Min", p: { d: 500 } },
      { n: "Back & Shoulder Massage", p: { d: 1000 } },
      { n: "Head, Back & Shoulder", p: { d: 1500 } },
      { n: "Foot Massage 15 Min", p: { d: 1000 } },
      { n: "Half Leg Massage", p: { d: 1000 } },
      { n: "Full Leg Massage", p: { d: 1500 } },
    ],
  },
  {
    id: "hair",
    num: "05",
    title: "Hair Treatments",
    type: "standard",
    services: [
      { n: "Hair Mask", p: { d: 1500 } },
      { n: "Hair Mask w/ Oil (Dandruff)", p: { d: 2000 } },
      { n: "Hair Mask Plus (Damaged)", p: { d: 2500 } },
      { n: "Protein Treatment (Frizzy)", p: { d: 3000 } },
      { n: "Hair Streaking", p: { d: 7000 } },
      { n: "Hair Polish", p: { d: 2500 } },
      { n: "Beard Colour", p: { d: 1000 } },
      { n: "Keratin Straightening", p: { d: 10000 } },
      { n: "Hair Perming", p: { d: 10000 } },
      { n: "Colour Application", p: { d: 1000 } },
      { n: "Hair Colour (Freecia/Keune/L'Oréal)", p: { d: 3500 } },
      { n: "Fashion Colour", p: { d: 10000 } },
    ],
  },
  {
    id: "waxing",
    num: "06",
    title: "Waxing / Hair Removal",
    type: "standard",
    services: [
      { n: "Full Body", p: { d: 12000 } },
      { n: "Half Body", p: { d: 6000 } },
      { n: "Full Legs", p: { d: 6000 } },
      { n: "Half Legs", p: { d: 4000 } },
      { n: "Face", p: { d: 1000 } },
      { n: "Ears", p: { d: 500 } },
      { n: "Nose", p: { d: 500 } },
    ],
  },
  {
    id: "mani",
    num: "07",
    title: "Manicure & Pedicure",
    type: "standard",
    services: [
      { n: "Manicure & Pedicure", p: { d: 4500 } },
      { n: "Manicure", p: { d: 2500 } },
      { n: "Pedicure", p: { d: 2500 } },
      { n: "Nail Cut & Buff", p: { d: 1500 } },
      { n: "Nail Cut", p: { d: 1000 } },
    ],
  },
  {
    id: "pkgs",
    num: "08",
    title: "Grooming Packages",
    type: "package",
    note: "Prices vary by facial product chosen.",
    packages: [
      {
        t: "Express Self Care",
        inc: ["Hair Cut", "Beard", "Styling", "Face Cleansing (2 Steps)"],
        pr: { s: 2500, c: 3000, d: 3500, h: 4000, j: 5500 },
      },
      {
        t: "Self Care Package 01",
        inc: ["Hair Cut", "Beard", "Styling", "Facial"],
        pr: { s: 4500, c: 5000, d: 6500, h: 8500, j: 10000 },
      },
      {
        t: "Full Grooming Package",
        inc: [
          "Hair Cut",
          "Beard",
          "Styling",
          "Facial",
          "Mani + Pedi",
          "Hair Treatment",
          "Head & Shoulder Massage",
          "Head Massage",
        ],
        pr: { s: 8500, c: 10000, d: 11500, h: 13500, j: 15000 },
      },
    ],
  },
];

export const PL: Record<string, string> = {
  s: "Dr. Shazil",
  c: "Charcoal",
  d: "Dermacos",
  h: "Hydra",
  j: "Janssen",
};

export function getMinPrice(cat: Category): number {
  if (cat.type === "package" && cat.packages) {
    let m = Infinity;
    cat.packages.forEach((p) =>
      Object.values(p.pr).forEach((v) => {
        if (v < m) m = v;
      })
    );
    return m;
  }
  let m = Infinity;
  if (cat.services) {
    cat.services.forEach((s) => {
      Object.values(s.p).forEach((v) => {
        if (typeof v === "number" && v < m) m = v;
      });
    });
  }
  return m === Infinity ? 0 : m;
}
