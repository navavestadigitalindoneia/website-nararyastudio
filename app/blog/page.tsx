import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "Journal", description: "News, notes, and updates from Nararya Studio." };

export default function BlogPage() {
  return <section className="page-section"><div className="container"><div className="page-kicker"><span className="eyebrow">NARARYA STUDIO / JOURNAL</span><span className="eyebrow">NOTES & UPDATES</span></div><div className="page-title-row"><div><h1>Thoughts in<br /><span>the making.</span></h1><p className="section-lede">Updates, process notes, and stories from the studio.</p></div><span className="page-index">04 — 04</span></div><div className="portfolio-empty"><span className="eyebrow">STUDIO JOURNAL</span><h2>Nothing published just yet.</h2><p>New articles will appear here after they are reviewed and published through the content manager.</p><Link className="text-link" href="/request">Get in touch <ArrowUpRight size={16} /></Link></div></div></section>;
}