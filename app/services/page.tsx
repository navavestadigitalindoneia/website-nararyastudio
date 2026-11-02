import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Brush, Cuboid, Image, Layers3, Palette, ScanLine } from "lucide-react";

export const metadata: Metadata = { title: "Creative Services", description: "Design, 3D, texture, and custom digital creative services." };

const groups = [
  { title: "Livery & visual treatment", icon: Palette, items: ["Livery BUSSID", "Itasha design", "Livery transfer"] },
  { title: "Graphic design", icon: Brush, items: ["Logo & visual identity", "Brochure & poster", "Jersey & sticker", "Vector design"] },
  { title: "3D & animation", icon: Cuboid, items: ["3D modeling", "3D animation", "3D conversion for BUSSID", "3D conversion for ETS2"] },
  { title: "Texture & digital assets", icon: ScanLine, items: ["Texture editing", "Texture extraction", "Custom digital design", "Digital asset creation"] },
];

export default function ServicesPage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-kicker"><span className="eyebrow">NARARYA STUDIO / SERVICES</span><span className="eyebrow">CREATIVE PRACTICE</span></div>
        <div className="page-title-row"><div><h1>Designed around<br /><span>your vision.</span></h1><p className="section-lede">From a single visual asset to a considered digital project, let's find the right way to bring it to life.</p></div><span className="page-index">02 — 04</span></div>
        <div className="service-grid">{groups.map(({ title, icon: Icon, items }, index) => <article className="service-card" key={title}><div className="service-card-top"><span>0{index + 1}</span><Icon size={23} strokeWidth={1.4} /></div><h2>{title}</h2><ul>{items.map((item) => <li key={item}><span>{item}</span><Image size={14} /></li>)}</ul></article>)}</div>
        <div className="service-note"><Layers3 size={22} /><p>Pricing and turnaround are confirmed individually. We do not publish estimated rates as fixed prices before a project is reviewed.</p><Link className="text-link" href="/request">Request a quotation <ArrowUpRight size={16} /></Link></div>
      </div>
    </section>
  );
}