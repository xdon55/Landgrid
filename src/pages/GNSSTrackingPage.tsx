import GNSSEquipment from "../components/GNSSEquipment";
import PageHeader from "../components/PageHeader";

export default function GNSSTrackingPage() {
  return (
    <>
      <PageHeader
        kicker="GNSS SALE · RENTAL · TRACKING"
        title="GNSS receivers &"
        accent="GPS tracking."
        subtitle="A complete range of CHC GNSS receivers for sale and rental, plus our real-time 24/7 GPS car tracking service for fleets, personal vehicles and assets."
        crumbs={[{ label: "GNSS & Tracking" }]}
        bgImage="images/cors-station.jpg"
      />
      <GNSSEquipment />
    </>
  );
}
