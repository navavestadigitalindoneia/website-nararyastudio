import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "Portfolio", description: "Selected projects and creative work by Nararya Studio." };

export default function PortfolioPage() {
  return <section className="page-section"><div className="container"><div className="page-kicker"><span className="eyebrow">NARARYA STUDIO / PORTFOLIO</span><span className="eyebrow">SELECTED WORK</span></div><div className="page-title-row"><div><h1>Work with<br /><span>a point of view.</span></h1><p className="section-lede">A growing archive of projects, experiments, and collaborations.</p></div><span className="page-index">03 — 04</span></div><div className="portfolio-empty"><span className="eyebrow">PROJECT ARCHIVE</span><h2>The next chapter is being prepared.</h2><p>Published projects and case studies will be displayed here once added to the portfolio manager.</p><Link className="text-link" href="/request">Create something together <ArrowUpRight size={16} /></Link></div></div></section>;
}