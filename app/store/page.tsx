import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";

export const metadata: Metadata = { title: "Digital Store", description: "Explore the Nararya Studio digital product catalog." };

const categories = ["All products", "Kodename Base", "ACC", "Addons", "Other digital products"];

export default function StorePage() {
  return (
    <section className="page-section">
      <div className="container">
        <div className="page-kicker"><span className="eyebrow">NARARYA STUDIO / STORE</span><span className="eyebrow">COLLECTION 001</span></div>
        <div className="page-title-row"><div><h1>Digital goods,<br /><span>thoughtfully made.</span></h1><p className="section-lede">Browse releases and creative assets from Nararya Studio.</p></div><span className="page-index">01 — 04</span></div>
        <div className="catalog-toolbar"><div className="search-placeholder"><Search size={17} /><span>Search products</span></div><button className="filter-button" type="button" disabled aria-disabled="true"><SlidersHorizontal size={16} /> Filters <span className="coming-label">COMING WITH CATALOG API</span></button></div>
        <div className="category-row">{categories.map((category, index) => <span className={index === 0 ? "category-chip active" : "category-chip"} key={category}>{category}</span>)}</div>
        <div className="empty-catalog"><div className="empty-symbol">N<span>+</span></div><span className="eyebrow">CATALOG INITIALIZING</span><h2>Good things take shape.</h2><p>Products will appear here when they are published by the Nararya Studio team. No placeholder listings or invented prices are shown.</p><Link className="text-link" href="/request">Looking for something custom? <ArrowUpRight size={16} /></Link></div>
      </div>
    </section>
  );
}