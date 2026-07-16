import Projects from "../components/Projects";
import PageHeader from "../components/PageHeader";
import { PROJECTS } from "../lib/data";

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        kicker="FEATURED PROJECTS"
        title="Work that shapes"
        accent="Uganda's future."
        subtitle={`${PROJECTS.length}+ flagship projects across government, energy, transport, agriculture and private development — delivered with sub-centimetre precision.`}
        crumbs={[{ label: "Projects" }]}
        bgImage="https://images.pexels.com/photos/6872325/pexels-photo-6872325.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
      />
      <Projects />
    </>
  );
}
