import type { Metadata } from "next";
export const metadata: Metadata = { title: "FAQ", description: "Frequently asked questions about Nararya Studio." };
const items = [
  ["What does Nararya Studio create?", "Nararya Studio brings together digital products, graphic design, livery and texture work, 3D services, and custom digital projects."],
  ["How are service prices determined?", "Pricing depends on the scope and requirements. A quotation is provided for review before a custom project begins."],
  ["Are Kodename Base products the same as mods?", "No. Kodename Base, ACC, and Addons are distinct catalog categories and are not to be relabeled as mods."],
  ["When can I download a purchased product?", "Digital delivery is intended to be available after payment has been verified by the server. Payment and private-download integrations must be configured before production use."],
];
export default function FAQPage() { return <section className="page-section"><div className="container"><div className="page-kicker"><span className="eyebrow">NARARYA STUDIO / SUPPORT</span><span className="eyebrow">GOOD TO KNOW</span></div><div className="page-title-row"><div><h1>Frequently<br /><span>asked questions.</span></h1><p className="section-lede">A few useful details about products, services, and the studio process.</p></div></div><div className="faq-list">{items.map(([q,a],i)=><article key={q}><span className="eyebrow">0{i+1}</span><div><h2>{q}</h2><p>{a}</p></div></article>)}</div></div></section>; }
