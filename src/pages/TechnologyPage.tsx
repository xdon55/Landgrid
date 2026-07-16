import Technology from "../components/Technology";
import PageHeader from "../components/PageHeader";

export default function TechnologyPage() {
  return (
    <>
      <PageHeader
        kicker="TECHNOLOGY SPOTLIGHT"
        title="Powered by GreenValley"
        accent="& CHC instruments."
        subtitle="We deploy the latest GNSS receivers, handheld SLAM LiDAR scanners, drones and total stations to deliver unmatched precision on every project."
        crumbs={[{ label: "Technology" }]}
        bgImage="images/rtk-receiver.jpg"
      />
      <Technology />
    </>
  );
}
