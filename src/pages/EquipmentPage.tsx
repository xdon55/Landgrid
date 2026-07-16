import Equipment from "../components/Equipment";
import PageHeader from "../components/PageHeader";

export default function EquipmentPage() {
  return (
    <>
      <PageHeader
        kicker="EQUIPMENT CATALOG · LIGRIP SERIES"
        title="Handheld SLAM"
        accent="LiDAR scanners."
        subtitle="Our field teams deploy GreenValley's complete LiGrip range — from the compact O2 Lite to the flagship O2 — delivering centimetre-level SLAM LiDAR data on every project."
        crumbs={[{ label: "LiDAR Equipment" }]}
        bgImage="images/ligrip-o2.jpg"
      />
      <Equipment />
    </>
  );
}
