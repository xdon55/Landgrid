import { jsPDF } from "jspdf";
import {
  COMPANY,
  STATS,
  SERVICES,
  VALUES,
  PROJECTS,
  PROCESS,
  TESTIMONIAL,
  LIBASE2,
  LIGRIP_O2_LITE,
  LIGRIP_O2,
  CHC_GNSS_RECEIVERS,
  HCE320_CONTROLLER,
  GPS_TRACKING,
} from "./data";

/* ---------- Brand palette (RGB) ---------- */
const FOREST_950: RGB = [5, 23, 16];
const FOREST_900: RGB = [10, 39, 27];
const FOREST_800: RGB = [18, 61, 43];
const FOREST_700: RGB = [29, 90, 64];
const FOREST_500: RGB = [58, 138, 103];
const FOREST_300: RGB = [140, 198, 168];
const FOREST_100: RGB = [220, 238, 228];
const GOLD: RGB = [212, 162, 76];
const GOLD_LIGHT: RGB = [242, 224, 184];
const IVORY: RGB = [247, 245, 239];
const MUTED: RGB = [120, 128, 122];

type RGB = [number, number, number];

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 18;
const CONTENT_W = PAGE_W - MARGIN * 2;

/* ---------- Helpers ---------- */
async function loadImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function fill(doc: jsPDF, color: RGB) {
  doc.setFillColor(color[0], color[1], color[2]);
}
function stroke(doc: jsPDF, color: RGB) {
  doc.setDrawColor(color[0], color[1], color[2]);
}
function ink(doc: jsPDF, color: RGB) {
  doc.setTextColor(color[0], color[1], color[2]);
}

/** Draws the Landgrid survey-mark logo: ring + crosshair + dot, then wordmark. */
function drawLogo(doc: jsPDF, x: number, y: number, dark = true) {
  const c = dark ? IVORY : FOREST_800;
  stroke(doc, GOLD);
  doc.setLineWidth(1.3);
  doc.circle(x + 9, y + 9, 8.5);
  doc.setLineWidth(0.8);
  doc.line(x + 9, y - 3, x + 9, y + 4);
  doc.line(x + 9, y + 14, x + 9, y + 21);
  doc.line(x - 3, y + 9, x + 4, y + 9);
  doc.line(x + 14, y + 9, x + 21, y + 9);
  fill(doc, GOLD);
  doc.circle(x + 9, y + 9, 2.1, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  ink(doc, c);
  doc.text("LANDGRID", x + 30, y + 12);
  const w = doc.getTextWidth("LANDGRID");
  ink(doc, GOLD);
  doc.setFontSize(10);
  doc.text("UGANDA LIMITED", x + 30 + (w - doc.getTextWidth("UGANDA LIMITED")), y + 18);
}

function pageFooter(doc: jsPDF, num: number) {
  stroke(doc, GOLD);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, PAGE_H - 18, PAGE_W - MARGIN, PAGE_H - 18);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  ink(doc, MUTED);
  doc.text(`Landgrid Uganda Limited — Company Profile ${new Date().getFullYear()}`, MARGIN, PAGE_H - 10);
  const pg = String(num).padStart(2, "0");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  ink(doc, FOREST_700);
  doc.text(pg, PAGE_W - MARGIN - doc.getTextWidth(pg), PAGE_H - 10);
}

/** Kicker + big title used on light pages. */
function sectionHeader(doc: jsPDF, kicker: string, title: string, y: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  ink(doc, GOLD);
  doc.text(kicker.toUpperCase().split("").join(" "), MARGIN, y);
  doc.setFontSize(34);
  ink(doc, FOREST_900);
  const lines = doc.splitTextToSize(title, CONTENT_W * 0.95);
  doc.text(lines, MARGIN, y + 17);
  return y + 17 + lines.length * 13;
}

function bodyText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  w: number,
  size = 14,
  color: RGB = [51, 60, 55],
): string[] {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(size);
  ink(doc, color);
  // Line height ~ 1.45 × size in pt → in mm ≈ size * 0.51
  doc.setLineHeightFactor?.(1.45);
  const lines: string[] = doc.splitTextToSize(text, w);
  doc.text(lines, x, y);
  return lines;
}

function chip(doc: jsPDF, label: string, x: number, y: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  const w = doc.getTextWidth(label) + 14;
  fill(doc, FOREST_100);
  doc.roundedRect(x, y, w, 10, 5, 5, "F");
  ink(doc, FOREST_700);
  doc.text(label, x + 7, y + 7);
  return x + w + 4;
}

/* ---------- Pages ---------- */
function coverPage(doc: jsPDF, hero: string | null) {
  fill(doc, FOREST_950);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");

  // Concentric survey rings, right side
  stroke(doc, FOREST_700);
  for (let r = 24; r <= 150; r += 18) {
    doc.setLineWidth(0.22);
    doc.circle(PAGE_W + 10, 118, r);
  }
  stroke(doc, GOLD);
  doc.setLineWidth(0.3);
  doc.circle(PAGE_W + 10, 118, 60);

  // Topo curves
  stroke(doc, FOREST_800);
  doc.setLineWidth(0.25);
  doc.line(0, 210, 60, 196); doc.line(60, 196, 140, 216); doc.line(140, 216, 210, 202);
  doc.line(0, 232, 55, 220); doc.line(55, 220, 130, 238); doc.line(130, 238, 210, 226);

  drawLogo(doc, MARGIN, MARGIN + 2);

  // Kicker
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  ink(doc, GOLD);
  doc.text("C O M P A N Y   P R O F I L E", MARGIN, 70);

  stroke(doc, GOLD);
  doc.setLineWidth(0.8);
  doc.line(MARGIN, 80, MARGIN + 40, 80);

  // Title
  doc.setFont("helvetica", "bold");
  ink(doc, IVORY);
  doc.setFontSize(68);
  doc.text("Precision", MARGIN, 100);
  doc.text("Surveying.", MARGIN, 126);
  ink(doc, GOLD);
  doc.text("Smarter", MARGIN, 152);
  doc.text("Mapping.", MARGIN, 178);

  bodyText(
    doc,
    "World-class geospatial, surveying and engineering solutions delivered with African expertise — accurate data that powers better decisions.",
    MARGIN,
    200,
    110,
    16,
    FOREST_300,
  );

  // Badges
  const badges = ["EST. 2012", "ISO CERTIFIED", "RTK GNSS", "UAV MAPPING"];
  let bx = MARGIN;
  for (const b of badges) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    const w = doc.getTextWidth(b) + 18;
    stroke(doc, FOREST_500);
    doc.setLineWidth(0.5);
    doc.roundedRect(bx, 228, w, 14, 7, 7);
    ink(doc, FOREST_100);
    doc.text(b, bx + 9, 238);
    bx += w + 7;
  }

  // Hero image band (pushed down to fit larger title)
  if (hero) {
    try {
      doc.addImage(hero, "JPEG", MARGIN, 252, CONTENT_W, 32);
    } catch {
      /* image optional */
    }
  } else {
    fill(doc, FOREST_800);
    doc.rect(MARGIN, 252, CONTENT_W, 32, "F");
  }

  // Bottom meta
  stroke(doc, GOLD);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, 270, PAGE_W - MARGIN, 270);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  ink(doc, FOREST_300);
  doc.text(COMPANY.coordinates, MARGIN, 282);
  doc.text(COMPANY.location.toUpperCase(), MARGIN, 290);
  const right = `${COMPANY.email}  ·  ${COMPANY.website}`;
  doc.text(right, PAGE_W - MARGIN - doc.getTextWidth(right), 286);
  ink(doc, GOLD);
  doc.setFontSize(12);
  const yr = `${new Date().getFullYear()} EDITION`;
  doc.text(yr, PAGE_W - MARGIN - doc.getTextWidth(yr), 264);
}

function aboutPage(doc: jsPDF, img: string | null) {
  fill(doc, IVORY);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  drawLogo(doc, MARGIN, MARGIN - 2, false);

  let y = sectionHeader(doc, "About Us", "Built on precision.\nDelivered with care.", 40);

  const intro =
    "Landgrid Uganda Limited is a leading geospatial, surveying and engineering firm headquartered in Kampala, Uganda. Since 2012 we have combined African expertise with world-class technology to deliver data that stands up to the most demanding international standards — serving government agencies, engineers, developers and land owners across 62+ districts.";
  const lines = bodyText(doc, intro, MARGIN, y + 10, CONTENT_W * 0.56, 14);
  let y2 = y + 10 + lines.length * 7 + 10;

  const intro2 =
    "From single parcel boundary surveys to national infrastructure corridors, our registered surveyors, GIS specialists and engineers deliver sub-centimetre accuracy with rigorous quality control — on time, every time.";
  const l2 = bodyText(doc, intro2, MARGIN, y2, CONTENT_W * 0.56, 14);
  y2 += l2.length * 7 + 4;

  // Image right
  const imgX = MARGIN + CONTENT_W * 0.6;
  const imgW = CONTENT_W * 0.4;
  if (img) {
    try {
      doc.addImage(img, "JPEG", imgX, y + 4, imgW, 84);
    } catch { /* optional */ }
  } else {
    fill(doc, FOREST_800);
    doc.rect(imgX, y + 4, imgW, 84, "F");
  }
  fill(doc, GOLD);
  doc.rect(imgX, y + 90, 34, 2.2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  ink(doc, FOREST_700);
  doc.text("FIELD OPERATIONS — WESTERN UGANDA", imgX, y + 100);

  // Mission / Vision cards
  y2 = y2 + 28;
  const cardW = (CONTENT_W - 8) / 2;
  const cards = [
    {
      t: "OUR MISSION",
      d: "To empower confident land and infrastructure decisions with precise, accessible and timely geospatial data.",
    },
    {
      t: "OUR VISION",
      d: "To be East Africa's most trusted geospatial partner — mapping the future of a developing continent.",
    },
  ];
  cards.forEach((c, i) => {
    const x = MARGIN + i * (cardW + 8);
    fill(doc, i === 0 ? FOREST_900 : FOREST_800);
    doc.roundedRect(x, y2, cardW, 56, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    ink(doc, GOLD);
    doc.text(c.t, x + 12, y2 + 16);
    bodyText(doc, c.d, x + 12, y2 + 28, cardW - 24, 13, FOREST_100);
  });

  // Stats band
  y2 += 72;
  fill(doc, FOREST_950);
  doc.roundedRect(MARGIN, y2, CONTENT_W, 50, 3, 3, "F");
  const cols = STATS.length;
  const cw = CONTENT_W / cols;
  STATS.forEach((s, i) => {
    const cx = MARGIN + i * cw + cw / 2;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    ink(doc, GOLD);
    const v = `${s.value}${s.suffix}`;
    doc.text(v, cx - doc.getTextWidth(v) / 2, y2 + 22);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    ink(doc, FOREST_300);
    const l = s.label.toUpperCase();
    doc.text(l, cx - doc.getTextWidth(l) / 2, y2 + 37);
  });

  // Legal + registration note
  y2 += 64;
  stroke(doc, FOREST_300);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, y2, PAGE_W - MARGIN, y2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  ink(doc, FOREST_700);
  doc.text("REGISTRATIONS & MEMBERSHIPS", MARGIN, y2 + 12);
  bodyText(
    doc,
    "Registered surveyors with the Surveyors Registration Board (SRB) Uganda  ·  Member, Institution of Surveyors of Uganda (ISU)  ·  IFC-aligned land acquisition practice  ·  ISO 9001:2015 quality management certified.",
    MARGIN,
    y2 + 24,
    CONTENT_W,
    13,
  );
  pageFooter(doc, 2);
}

function servicesPage(doc: jsPDF) {
  fill(doc, IVORY);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  drawLogo(doc, MARGIN, MARGIN - 2, false);

  let y = sectionHeader(doc, "Our Services", "End-to-end geospatial solutions,\nengineered for precision.", 40);
  y += 8;

  const cardW = (CONTENT_W - 8) / 2;
  const cardH = 58;
  SERVICES.forEach((s, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = MARGIN + col * (cardW + 8);
    const cy = y + row * (cardH + 5);

    fill(doc, [255, 255, 255]);
    doc.roundedRect(x, cy, cardW, cardH, 2.6, 2.6, "F");
    stroke(doc, [225, 224, 214]);
    doc.setLineWidth(0.25);
    doc.roundedRect(x, cy, cardW, cardH, 2.6, 2.6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    ink(doc, [214, 212, 198]);
    doc.text(s.index, x + cardW - doc.getTextWidth(s.index) - 9, cy + 14);

    fill(doc, GOLD);
    doc.rect(x + 9, cy + 8, 13, 1.8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    ink(doc, FOREST_900);
    const titleLines = doc.splitTextToSize(s.title, cardW - 36);
    doc.text(titleLines[0], x + 9, cy + 20);

    const dl = bodyText(doc, s.description, x + 9, cy + 30, cardW - 18, 10.5, [80, 88, 83]);
    const ty = cy + 32 + dl.length * 5;
    let cx = x + 9;
    for (const t of s.tags) cx = chip(doc, t, cx, Math.min(ty, cy + cardH - 12));
  });
  pageFooter(doc, 3);
}

function whyPage(doc: jsPDF, corsImg: string | null) {
  fill(doc, IVORY);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  drawLogo(doc, MARGIN, MARGIN - 2, false);

  let y = sectionHeader(doc, "Why Landgrid", "Six reasons industry\nleaders choose us.", 40);
  y += 10;

  const cardW = (CONTENT_W - 8) / 3;
  const cardH = 62;
  VALUES.forEach((v, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = MARGIN + col * (cardW + 4);
    const cy = y + row * (cardH + 8);
    fill(doc, FOREST_900);
    doc.roundedRect(x, cy, cardW, cardH, 3, 3, "F");
    fill(doc, GOLD);
    doc.circle(x + 14, cy + 16, 3.8, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    ink(doc, IVORY);
    const tl = doc.splitTextToSize(v.title, cardW - 32);
    doc.text(tl[0], x + 26, cy + 18);
    bodyText(doc, v.text, x + 10, cy + 30, cardW - 20, 11, FOREST_300);
  });

  // CORS band
  y += cardH * 2 + 24;
  const bandH = 96;
  fill(doc, FOREST_950);
  doc.roundedRect(MARGIN, y, CONTENT_W, bandH, 3, 3, "F");
  // Coverage rings
  const rcx = MARGIN + 48;
  const rcy = y + bandH / 2;
  stroke(doc, FOREST_700);
  doc.setLineWidth(0.5);
  doc.circle(rcx, rcy, 34);
  stroke(doc, GOLD);
  doc.circle(rcx, rcy, 22);
  stroke(doc, FOREST_500);
  doc.circle(rcx, rcy, 11);
  fill(doc, GOLD);
  doc.circle(rcx, rcy, 2.8, "F");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  ink(doc, FOREST_300);
  nodes(doc, rcx, rcy);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  ink(doc, GOLD);
  doc.text("N A T I O N W I D E   C O R S   N E T W O R K", MARGIN + 104, y + 20);
  doc.setFontSize(26);
  ink(doc, IVORY);
  doc.text("18 reference stations.", MARGIN + 104, y + 36);
  doc.text("80% coverage.", MARGIN + 104, y + 50);
  bodyText(
    doc,
    "Our proprietary network of Continuously Operating Reference Stations streams real-time RTK corrections across Uganda — enabling centimetre-grade positioning without a local base station.",
    MARGIN + 104,
    y + 62,
    CONTENT_W - 118,
    12.5,
    FOREST_100,
  );

  if (corsImg) {
    try {
      doc.addImage(corsImg, "JPEG", MARGIN + 6, y + 6, 68, bandH - 12);
    } catch { /* optional */ }
  }
  pageFooter(doc, 4);
}

function nodes(doc: jsPDF, rcx: number, rcy: number) {
  const pts: Array<[number, number]> = [
    [rcx - 18, rcy - 15], [rcx + 12, rcy - 20], [rcx + 22, rcy + 5],
    [rcx - 12, rcy + 20], [rcx + 4, rcy + 10], [rcx - 22, rcy + 5],
  ];
  fill(doc, GOLD_LIGHT);
  for (const [px, py] of pts) doc.circle(px, py, 1.3, "F");
}

function technologyPage(doc: jsPDF, receiver: string | null) {
  fill(doc, IVORY);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  drawLogo(doc, MARGIN, MARGIN - 2, false);

  let y = sectionHeader(doc, "Technology Spotlight", "LiBase2 RTK GNSS\nSystem", 40);
  y += 2;

  // Intro left
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  ink(doc, FOREST_500);
  doc.text(LIBASE2.subtitle.toUpperCase(), MARGIN, y + 10);
  const introLines = bodyText(doc, LIBASE2.intro, MARGIN, y + 22, CONTENT_W * 0.55, 14);

  // Product image right
  const imgX = MARGIN + CONTENT_W * 0.6;
  const imgW = CONTENT_W * 0.4;
  fill(doc, FOREST_950);
  doc.roundedRect(imgX, y + 2, imgW, 90, 2.4, 2.4, "F");
  if (receiver) {
    try {
      doc.addImage(receiver, "JPEG", imgX, y + 2, imgW, 90);
    } catch { /* optional */ }
  }

  // Features
  let fy = y + 22 + Math.max(introLines.length * 7, 60) + 10;
  LIBASE2.features.forEach((f) => {
    fill(doc, GOLD);
    doc.circle(MARGIN + 3, fy - 2, 1.6, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    ink(doc, FOREST_900);
    doc.text(f.title, MARGIN + 12, fy);
    const fl = bodyText(doc, f.text, MARGIN + 12, fy + 7, CONTENT_W * 0.52, 11, [80, 88, 83]);
    fy += 8 + fl.length * 5.4 + 8;
  });

  // Spec table
  const tx = MARGIN + CONTENT_W * 0.6;
  const tw = CONTENT_W * 0.4;
  let ty = y + 100;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  ink(doc, FOREST_700);
  doc.text("TECHNICAL SPECIFICATIONS", tx, ty);
  ty += 7;
  LIBASE2.specs.forEach((s, i) => {
    fill(doc, i % 2 === 0 ? FOREST_100 : IVORY);
    doc.rect(tx, ty, tw, 11.5, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    ink(doc, [90, 96, 92]);
    doc.text(s.label, tx + 5, ty + 8);
    doc.setFont("helvetica", "bold");
    ink(doc, FOREST_900);
    doc.text(s.value, tx + tw - 5 - doc.getTextWidth(s.value), ty + 8);
    ty += 11.5;
  });

  // Industries
  ty += 8;
  const ind = `TRUSTED ACROSS:  ${LIBASE2.industries.map((s) => s.toUpperCase()).join("  ·  ")}`;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  ink(doc, GOLD);
  doc.text(ind, MARGIN, PAGE_H - 30);
  pageFooter(doc, 5);
}

function projectsPage(doc: jsPDF, imgs: (string | null)[]) {
  fill(doc, FOREST_950);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  drawLogo(doc, MARGIN, MARGIN - 2, true);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  ink(doc, GOLD);
  doc.text("F E A T U R E D   P R O J E C T S", MARGIN, 44);
  doc.setFontSize(34);
  ink(doc, IVORY);
  doc.text("Work that shapes", MARGIN, 62);
  doc.text("Uganda's future.", MARGIN, 78);

  let y = 102;
  const rowH = 82;
  PROJECTS.forEach((p, i) => {
    const img = imgs[i];
    if (img) {
      try {
        doc.addImage(img, "JPEG", MARGIN, y, 80, rowH - 12);
      } catch { /* optional */ }
    } else {
      fill(doc, FOREST_800);
      doc.rect(MARGIN, y, 80, rowH - 12, "F");
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    ink(doc, GOLD);
    doc.text(`${p.category.toUpperCase()}  ·  ${p.year}`, MARGIN + 94, y + 10);
    doc.setFontSize(18);
    ink(doc, IVORY);
    doc.text(p.title, MARGIN + 94, y + 24);
    bodyText(doc, p.description, MARGIN + 94, y + 36, CONTENT_W - 100, 12, FOREST_300);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    ink(doc, FOREST_500);
    const meta1 = "LOCATION";
    const meta2 = "SCALE";
    const by = y + rowH - 16;
    doc.text(meta1, MARGIN + 94, by);
    doc.text(meta2, MARGIN + 160, by);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    ink(doc, IVORY);
    doc.text(p.location, MARGIN + 94, by + 7);
    doc.text(p.area, MARGIN + 160, by + 7);

    if (i < PROJECTS.length - 1) {
      stroke(doc, FOREST_800);
      doc.setLineWidth(0.4);
      doc.line(MARGIN, y + rowH - 1, PAGE_W - MARGIN, y + rowH - 1);
    }
    y += rowH + 6;
  });

  // Note
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  ink(doc, FOREST_300);
  doc.text(
    "850+ completed projects span government, energy, transport, agriculture and private development across Uganda and East Africa.",
    MARGIN,
    y + 8,
  );
  stroke(doc, GOLD);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, PAGE_H - 18, PAGE_W - MARGIN, PAGE_H - 18);
  doc.setFontSize(11);
  ink(doc, FOREST_300);
  doc.text(`Landgrid Uganda Limited — Company Profile ${new Date().getFullYear()}`, MARGIN, PAGE_H - 10);
  ink(doc, GOLD);
  doc.text("11", PAGE_W - MARGIN - doc.getTextWidth("11"), PAGE_H - 10);
}

function processPage(doc: jsPDF) {
  fill(doc, IVORY);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  drawLogo(doc, MARGIN, MARGIN - 2, false);

  let y = sectionHeader(doc, "Our Process", "A proven methodology,\nstart to finish.", 40);
  y += 4;

  const cardW = (CONTENT_W - 12) / 4;
  PROCESS.forEach((p, i) => {
    const x = MARGIN + i * (cardW + 4);
    fill(doc, [255, 255, 255]);
    doc.roundedRect(x, y, cardW, 80, 3, 3, "F");
    stroke(doc, [225, 224, 214]);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y, cardW, 80, 3, 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(30);
    ink(doc, GOLD);
    doc.text(p.step, x + 8, y + 22);
    doc.setFontSize(14);
    ink(doc, FOREST_900);
    doc.text(p.title, x + 8, y + 38);
    bodyText(doc, p.text, x + 8, y + 48, cardW - 16, 11, [80, 88, 83]);
    if (i < 3) {
      stroke(doc, GOLD);
      doc.setLineWidth(0.8);
      doc.line(x + cardW + 1, y + 42, x + cardW + 3, y + 42);
    }
  });

  // Quality
  y += 96;
  fill(doc, FOREST_900);
  doc.roundedRect(MARGIN, y, CONTENT_W, 62, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  ink(doc, GOLD);
  doc.text("Q U A L I T Y   A S S U R A N C E", MARGIN + 12, y + 16);
  bodyText(
    doc,
    "Every deliverable passes a three-tier review: field QA, independent office check and professional sign-off by a registered surveyor. Deliverables comply with UTM Zone 35/36N (Arc 1960 / ITRF2014) national referencing standards and client-specific cadastral formats.",
    MARGIN + 12,
    y + 30,
    CONTENT_W - 24,
    12.5,
    FOREST_100,
  );

  // Testimonial
  y += 78;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  ink(doc, GOLD);
  doc.text("C L I E N T   V O I C E S", MARGIN, y + 8);
  doc.setFont("helvetica", "bolditalic");
  doc.setFontSize(20);
  ink(doc, FOREST_900);
  const ql = doc.splitTextToSize(`"${TESTIMONIAL.quote}"`, CONTENT_W);
  doc.text(ql, MARGIN, y + 26);
  const qy = y + 26 + ql.length * 9 + 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  ink(doc, FOREST_700);
  doc.text(TESTIMONIAL.author, MARGIN, qy);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  ink(doc, MUTED);
  doc.text(TESTIMONIAL.role, MARGIN, qy + 8);
  pageFooter(doc, 12);
}

function contactPage(doc: jsPDF) {
  fill(doc, FOREST_950);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  stroke(doc, FOREST_800);
  doc.setLineWidth(0.22);
  for (let r = 20; r <= 130; r += 16) doc.circle(-20, PAGE_H - 30, r);

  drawLogo(doc, MARGIN, MARGIN + 2);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  ink(doc, GOLD);
  doc.text("L E T ' S   W O R K   T O G E T H E R", MARGIN, 70);
  doc.setFontSize(34);
  ink(doc, IVORY);
  doc.text("Ready to map", MARGIN, 88);
  ink(doc, GOLD);
  doc.text("the future?", MARGIN, 104);

  bodyText(
    doc,
    "Tell us about your parcel, corridor or city — our consultants respond to every inquiry within one business day.",
    MARGIN,
    122,
    CONTENT_W * 0.7,
    12,
    FOREST_300,
  );

  // Contact grid
  let y = 158;
  const rows: Array<[string, string]> = [
    ["HEAD OFFICE", COMPANY.address],
    ["TELEPHONE", `${COMPANY.phone}  ·  ${COMPANY.phoneMobile}`],
    ["EMAIL", COMPANY.email],
    ["WEB", `www.${COMPANY.website}`],
    ["COORDINATES", `${COMPANY.coordinates} — Kampala`],
    ["OFFICE HOURS", "Monday – Friday, 08:00 – 17:30 EAT"],
  ];
  for (const [k, v] of rows) {
    stroke(doc, FOREST_800);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, y, PAGE_W - MARGIN, y);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    ink(doc, GOLD);
    doc.text(k, MARGIN, y + 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(15);
    ink(doc, IVORY);
    doc.text(v, MARGIN + 70, y + 14);
    y += 24;
  }
  stroke(doc, FOREST_800);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);

  // Closing band
  fill(doc, GOLD);
  doc.roundedRect(MARGIN, y + 16, CONTENT_W, 44, 3, 3, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  ink(doc, FOREST_950);
  doc.text("Precision Surveying. Smarter Mapping.", MARGIN + 12, y + 30);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  const sub = "Serving Uganda & East Africa since 2012.";
  doc.text(sub, MARGIN + 12, y + 44);

  stroke(doc, GOLD);
  doc.setLineWidth(0.4);
  doc.line(MARGIN, PAGE_H - 18, PAGE_W - MARGIN, PAGE_H - 18);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  ink(doc, FOREST_300);
  doc.text(`© ${new Date().getFullYear()} Landgrid Uganda Limited. All rights reserved.`, MARGIN, PAGE_H - 10);
  ink(doc, GOLD);
  doc.text("13", PAGE_W - MARGIN - doc.getTextWidth("13"), PAGE_H - 10);
}

/* ---------- Equipment Pages ---------- */
interface EquipmentProduct {
  name: string;
  subtitle: string;
  sku: string;
  intro: string;
  packageIncludes: string;
  specs: { label: string; value: string }[];
  features: { title: string; text: string }[];
  collectionModes: string[];
  applications: string[];
  image: string;
}

function equipmentProductPage(
  doc: jsPDF,
  product: EquipmentProduct,
  productImg: string | null,
  pageNum: number,
  isFirst: boolean,
) {
  fill(doc, IVORY);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  drawLogo(doc, MARGIN, MARGIN - 2, false);

  // Section header only on first equipment page
  let y = 40;
  if (isFirst) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    ink(doc, GOLD);
    doc.text("E Q U I P M E N T   C A T A L O G   —   L I G R I P   S E R I E S", MARGIN, y);
    doc.setFontSize(27);
    ink(doc, FOREST_900);
    doc.text("Handheld SLAM LiDAR", MARGIN, y + 12);
    doc.text("Scanners", MARGIN, y + 22);
    y += 34;
  }

  // Product name & subtitle
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  ink(doc, FOREST_500);
  doc.text(product.subtitle.toUpperCase(), MARGIN, y);
  doc.setFontSize(24);
  ink(doc, FOREST_900);
  doc.text(product.name, MARGIN, y + 11);

  // Product image
  const imgX = MARGIN + CONTENT_W * 0.6;
  const imgW = CONTENT_W * 0.4;
  const imgH = 70;
  fill(doc, FOREST_950);
  doc.roundedRect(imgX, y - 6, imgW, imgH, 2.4, 2.4, "F");
  if (productImg) {
    try {
      doc.addImage(productImg, "JPEG", imgX, y - 6, imgW, imgH);
    } catch { /* optional */ }
  }

  // SKU badge
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  ink(doc, MUTED);
  doc.text(`SKU: ${product.sku}`, imgX, y + imgH - 2);

  // Intro text
  const introLines = bodyText(doc, product.intro, MARGIN, y + 18, CONTENT_W * 0.55, 10.5);
  let fy = y + 18 + introLines.length * 5 + 5;

  // Package includes box
  fill(doc, FOREST_100);
  doc.roundedRect(MARGIN, fy, CONTENT_W * 0.55, 18, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  ink(doc, FOREST_700);
  doc.text("PACKAGE INCLUDES", MARGIN + 5, fy + 6);
  bodyText(doc, product.packageIncludes, MARGIN + 5, fy + 12, CONTENT_W * 0.52, 8.4, [60, 68, 63]);
  fy += 24;

  // Features
  product.features.forEach((f) => {
    fill(doc, GOLD);
    doc.circle(MARGIN + 2.5, fy - 1.5, 1.2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    ink(doc, FOREST_900);
    doc.text(f.title, MARGIN + 8, fy);
    const fl = bodyText(doc, f.text, MARGIN + 8, fy + 5.5, CONTENT_W * 0.5, 8.4, [80, 88, 83]);
    fy += 7 + fl.length * 4 + 4;
  });

  // Spec table on right
  let ty = y + imgH + 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  ink(doc, FOREST_700);
  doc.text("SPECIFICATIONS", imgX, ty);
  ty += 4;
  product.specs.forEach((s, i) => {
    fill(doc, i % 2 === 0 ? FOREST_100 : IVORY);
    doc.rect(imgX, ty, imgW, 9, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    ink(doc, [90, 96, 92]);
    doc.text(s.label, imgX + 3, ty + 5.8);
    doc.setFont("helvetica", "bold");
    ink(doc, FOREST_900);
    doc.text(s.value, imgX + imgW - 3 - doc.getTextWidth(s.value), ty + 5.8);
    ty += 9;
  });

  // Collection modes
  ty += 5;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  ink(doc, FOREST_700);
  doc.text("COLLECTION MODES", imgX, ty);
  ty += 5;
  let cx = imgX;
  product.collectionModes.forEach((m) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    const w = doc.getTextWidth(m) + 8;
    if (cx + w > imgX + imgW) {
      cx = imgX;
      ty += 9;
    }
    fill(doc, FOREST_900);
    doc.roundedRect(cx, ty, w, 7, 3.5, 3.5, "F");
    ink(doc, FOREST_100);
    doc.text(m, cx + 4, ty + 4.8);
    cx += w + 3;
  });

  // Applications strip at bottom
  const appY = PAGE_H - 34;
  stroke(doc, FOREST_300);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, appY, PAGE_W - MARGIN, appY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  ink(doc, GOLD);
  doc.text("APPLICATION SCENARIOS", MARGIN, appY + 6);
  const appStr = product.applications.join("  ·  ");
  bodyText(doc, appStr, MARGIN, appY + 13, CONTENT_W, 8.4, [80, 88, 83]);

  pageFooter(doc, pageNum);
}

function comparisonPage(doc: jsPDF, pageNum: number) {
  fill(doc, IVORY);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  drawLogo(doc, MARGIN, MARGIN - 2, false);

  let y = sectionHeader(doc, "Equipment Comparison", "LiGrip O2 Lite vs\nLiGrip O2 — at a glance.", 40);
  y += 6;

  // Comparison table
  const colW1 = 50;
  const colW2 = (CONTENT_W - colW1) / 2;
  const rowH = 10.4;

  // Header
  fill(doc, FOREST_950);
  doc.roundedRect(MARGIN, y, CONTENT_W, rowH + 3, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  ink(doc, GOLD);
  doc.text("SPECIFICATION", MARGIN + 5, y + 7.5);
  ink(doc, IVORY);
  const l1 = "LiGrip O2 Lite";
  const l2 = "LiGrip O2";
  doc.text(l1, MARGIN + colW1 + colW2 / 2 - doc.getTextWidth(l1) / 2, y + 7.5);
  doc.text(l2, MARGIN + colW1 + colW2 + colW2 / 2 - doc.getTextWidth(l2) / 2, y + 7.5);
  y += rowH + 3;

  const compRows: Array<[string, string, string]> = [
    ["Weight", "1.3 kg", "2.2 kg"],
    ["Absolute Accuracy", "< 3 cm", "< 3 cm"],
    ["Repeatability", "—", "2 cm"],
    ["LiDAR Scan Rate", "200,000 pts/s", "640,000 pts/s"],
    ["Max Detection Range", "70 m", "300 m"],
    ["Panoramic Camera", "12 MP × 2", "12 MP × 3"],
    ["VSLAM Camera", "1.3 MP × 2", "1.3 MP × 2"],
    ["FOV", "Standard", "280° × 360°"],
    ["Storage", "512 GB SSD", "512 GB SSD"],
    ["Point Cloud Spacing", "—", "2 mm"],
    ["Collection Modes", "4 modes", "6 modes (incl. Vehicle & UAV)"],
    ["SLAM Modes", "MLF-SLAM, RTK-SLAM", "RTK / PPK / MLF / SLAM"],
  ];

  compRows.forEach((row, i) => {
    fill(doc, i % 2 === 0 ? [240, 240, 235] : IVORY);
    doc.rect(MARGIN, y, CONTENT_W, rowH, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    ink(doc, FOREST_900);
    doc.text(row[0], MARGIN + 5, y + 6.8);
    doc.setFont("helvetica", "normal");
    ink(doc, [60, 68, 63]);
    doc.text(row[1], MARGIN + colW1 + colW2 / 2 - doc.getTextWidth(row[1]) / 2, y + 6.8);
    doc.text(row[2], MARGIN + colW1 + colW2 + colW2 / 2 - doc.getTextWidth(row[2]) / 2, y + 6.8);
    y += rowH;
  });

  // Highlights
  y += 12;
  fill(doc, FOREST_950);
  const hlH = 46;
  doc.roundedRect(MARGIN, y, (CONTENT_W - 6) / 2, hlH, 2.4, 2.4, "F");
  doc.roundedRect(MARGIN + (CONTENT_W - 6) / 2 + 6, y, (CONTENT_W - 6) / 2, hlH, 2.4, 2.4, "F");

  const hlW = (CONTENT_W - 6) / 2;

  // O2 Lite highlight
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  ink(doc, GOLD);
  doc.text("LiGrip O2 Lite", MARGIN + 10, y + 11);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  ink(doc, FOREST_300);
  doc.text("BEST FOR", MARGIN + 10, y + 18);
  bodyText(
    doc,
    "Compact all-scenario SLAM scanning. Ideal for forestry, stockpile measurement, construction surveying and real-estate in featureless environments.",
    MARGIN + 10,
    y + 25,
    hlW - 20,
    8.4,
    FOREST_100,
  );

  // O2 highlight
  const x2 = MARGIN + hlW + 6;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  ink(doc, GOLD);
  doc.text("LiGrip O2", x2 + 10, y + 11);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  ink(doc, FOREST_300);
  doc.text("BEST FOR", x2 + 10, y + 18);
  bodyText(
    doc,
    "Flagship 300 m-range scanning with 640K pts/s. Ideal for utility mapping, powerline inspection, tunnel surveying and large-scale topographic projects.",
    x2 + 10,
    y + 25,
    hlW - 20,
    8.4,
    FOREST_100,
  );

  // Note
  y += hlH + 12;
  stroke(doc, FOREST_300);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  bodyText(
    doc,
    "Both products are deployed by Landgrid Uganda Limited on our surveying and mapping projects — delivering centimetre-level SLAM LiDAR data across all terrain types and environments.",
    MARGIN,
    y + 8,
    CONTENT_W,
    9.5,
    [80, 88, 83],
  );

  pageFooter(doc, pageNum);
}

/* ---------- CHC GNSS Equipment Page ---------- */
function gnssEquipmentPage(doc: jsPDF, pageNum: number) {
  fill(doc, IVORY);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  drawLogo(doc, MARGIN, MARGIN - 2, false);

  let y = sectionHeader(doc, "GNSS Equipment Sale & Rental", "CHC GNSS Receivers", 40);
  y += 2;

  bodyText(
    doc,
    "We offer a complete range of CHC GNSS receivers for sale and rental — from the flagship i90 IMU-RTK to the compact M6 — plus the HCE 320 rugged Android controller. Complete with after-sales support, calibration and operator training.",
    MARGIN,
    y,
    CONTENT_W,
    11,
  );
  y += 24;

  // Receiver cards
  const cardW = (CONTENT_W - 8) / 2;
  const cardH = 56;
  CHC_GNSS_RECEIVERS.forEach((rx, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = MARGIN + col * (cardW + 8);
    const cy = y + row * (cardH + 6);

    fill(doc, [255, 255, 255]);
    doc.roundedRect(x, cy, cardW, cardH, 2.4, 2.4, "F");
    stroke(doc, [225, 224, 214]);
    doc.setLineWidth(0.25);
    doc.roundedRect(x, cy, cardW, cardH, 2.4, 2.4);

    // Model name
    fill(doc, GOLD);
    doc.rect(x + 7, cy + 7, 10, 1.4, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    ink(doc, FOREST_900);
    doc.text(rx.model, x + 7, cy + 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    ink(doc, FOREST_500);
    doc.text(rx.tagline.toUpperCase(), x + 7, cy + 22);

    // Description
    bodyText(doc, rx.description, x + 7, cy + 28, cardW - 14, 8.2, [80, 88, 83]);

    // Top specs on right side
    let sy = cy + 8;
    rx.specs.slice(0, 3).forEach((s) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      ink(doc, [130, 136, 132]);
      doc.text(s.label, x + cardW - 140, sy);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      ink(doc, FOREST_900);
      doc.text(s.value, x + cardW - 8 - doc.getTextWidth(s.value), sy);
      sy += 6;
    });
  });

  // HCE 320 card at bottom
  const ctrlY = y + Math.ceil(CHC_GNSS_RECEIVERS.length / 2) * (cardH + 6) + 4;
  if (ctrlY < PAGE_H - 50) {
    fill(doc, FOREST_900);
    doc.roundedRect(MARGIN, ctrlY, CONTENT_W, 26, 2.4, 2.4, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    ink(doc, GOLD);
    doc.text(HCE320_CONTROLLER.model, MARGIN + 8, ctrlY + 9);
    bodyText(doc, HCE320_CONTROLLER.description, MARGIN + 8, ctrlY + 16, CONTENT_W - 16, 8.4, FOREST_100);
  }

  pageFooter(doc, pageNum);
}

/* ---------- GPS Tracking Page ---------- */
function gpsTrackingPage(doc: jsPDF, pageNum: number) {
  fill(doc, IVORY);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  drawLogo(doc, MARGIN, MARGIN - 2, false);

  let y = sectionHeader(doc, "GPS Car Tracking Services", "Real-time 24/7 vehicle\n& asset tracking.", 40);
  y += 6;

  bodyText(doc, GPS_TRACKING.description, MARGIN, y, CONTENT_W * 0.6, 11);
  y += 36;

  // Features
  GPS_TRACKING.features.forEach((f) => {
    const x = MARGIN;
    fill(doc, GOLD);
    doc.circle(x + 2.5, y - 1.5, 1.2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    ink(doc, FOREST_900);
    doc.text(f.title, x + 9, y);
    const fl = bodyText(doc, f.text, x + 9, y + 5.5, CONTENT_W * 0.55, 8.4, [80, 88, 83]);
    y += 7 + fl.length * 4 + 5;
  });

  // Services grid on right
  const sx = MARGIN + CONTENT_W * 0.6;
  const sw = CONTENT_W * 0.4;
  let sy = 78;
  fill(doc, FOREST_950);
  doc.roundedRect(sx, sy, sw, 98, 2.4, 2.4, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  ink(doc, GOLD);
  doc.text("TRACKING SERVICES", sx + 8, sy + 12);
  sy += 18;
  GPS_TRACKING.services.forEach((s) => {
    fill(doc, FOREST_900);
    doc.roundedRect(sx + 7, sy, sw - 14, 10, 2, 2, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    ink(doc, FOREST_100);
    doc.text(s, sx + 12, sy + 6.6);
    sy += 12.5;
  });

  // 24/7 access box
  y += 10;
  fill(doc, GOLD);
  doc.roundedRect(MARGIN, y, CONTENT_W * 0.55, 28, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  ink(doc, FOREST_950);
  doc.text("24/7 Online Access", MARGIN + 8, y + 10);
  bodyText(
    doc,
    "Track in real time on PC or download the mobile app for on-the-go monitoring — anywhere, anytime.",
    MARGIN + 8,
    y + 18,
    CONTENT_W * 0.48,
    8.8,
    FOREST_900,
  );

  pageFooter(doc, pageNum);
}

/* ---------- Public API ---------- */
export async function generateProfilePDF(): Promise<void> {
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });

  const [hero, aboutImg, receiver, corsImg, p0, p1, p2, ligripLiteImg, ligripO2Img] =
    await Promise.all([
      loadImage("images/hero.jpg"),
      loadImage("images/drone.jpg"),
      loadImage("images/rtk-receiver.jpg"),
      loadImage("images/cors-station.jpg"),
      loadImage(PROJECTS[0].image),
      loadImage(PROJECTS[1].image),
      loadImage(PROJECTS[2].image),
      loadImage(LIGRIP_O2_LITE.image),
      loadImage(LIGRIP_O2.image),
    ]);

  coverPage(doc, hero);                                       // 1
  doc.addPage();
  aboutPage(doc, aboutImg);                                    // 2
  doc.addPage();
  servicesPage(doc);                                           // 3
  doc.addPage();
  whyPage(doc, corsImg);                                       // 4
  doc.addPage();
  technologyPage(doc, receiver);                               // 5
  doc.addPage();
  equipmentProductPage(doc, LIGRIP_O2_LITE, ligripLiteImg, 6, true); // 6
  doc.addPage();
  equipmentProductPage(doc, LIGRIP_O2, ligripO2Img, 7, false); // 7
  doc.addPage();
  comparisonPage(doc, 8);                                      // 8
  doc.addPage();
  gnssEquipmentPage(doc, 9);                                   // 9
  doc.addPage();
  gpsTrackingPage(doc, 10);                                    // 10
  doc.addPage();
  projectsPage(doc, [p0, p1, p2]);                             // 11
  doc.addPage();
  processPage(doc);                                            // 12
  doc.addPage();
  contactPage(doc);                                            // 13

  doc.save("Landgrid-Uganda-Limited-Company-Profile.pdf");
}
