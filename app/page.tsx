import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Boxes, Compass, Layers3, Sparkles } from "lucide-react";

const capabilities = [
  { number: "01", title: "Digital products", text: "A considered catalog of digital assets, releases, and useful add-ons.", icon: Boxes, href: "/store" },
  { number: "02", title: "Creative services", text: "Visual design, 3D work, textures, and custom creative execution.", icon: Sparkles, href: "/services" },
  { number: "03", title: "Custom projects", text: "A clear request-to-quotation process for work made around your brief.", icon: Compass, href: "/request" },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span className="status-dot" /> DIGITAL CREATIVE STUDIO</span>
            <h1>Ideas into <span>digital</span> experiences.</h1>
            <p className="hero-lede">Thoughtful digital products and creative services, shaped with detail and built around your vision.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/store">Explore the store <ArrowUpRight size={17} /></Link>
              <Link className="text-link" href="/portfolio">View selected work <ArrowRight size={16} /></Link>
            </div>
            <div className="hero-meta"><span>DESIGN · DIGITAL · 3D</span><span>INDEPENDENTLY CREATED</span></div>
          </div>
          <div className="hero-art" aria-label="Abstract purple geometric artwork">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="art-core"><span>N</span></div>
            <div className="art-caption"><span>NS / 001</span><span>FORM FOLLOWS PURPOSE</span></div>
            <div className="art-side-label">NARARYA STUDIO — CREATIVE DIVISION</div>
          </div>
        </div>
        <div className="container hero-bottom"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={17} /><span className="hero-bottom-line" /></div>
      </section>

      <section className="section section-intro">
        <div className="container intro-grid">
          <span className="eyebrow">01 / WHAT WE DO</span>
          <div><h2>Creative thinking.<br /><span>Purposeful making.</span></h2><p className="section-lede">Nararya Studio brings digital products, design services, and custom commissions together in one focused creative space.</p></div>
        </div>
      </section>

      <section className="section capabilities-section">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">02 / OUR CAPABILITIES</span><h2>Made for ideas<br />that move forward.</h2></div><span className="heading-aside">THREE WAYS TO CREATE<br />SOMETHING DISTINCT.</span></div>
          <div className="capability-grid">
            {capabilities.map(({ number, title, text, icon: Icon, href }) => (
              <Link className="capability-card" href={href} key={number}>
                <div className="capability-top"><span>{number}</span><Icon size={22} strokeWidth={1.5} /></div>
                <div><h3>{title}</h3><p>{text}</p></div>
                <span className="card-arrow"><ArrowUpRight size={18} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="statement-band"><div className="container statement-inner"><span className="eyebrow">THE NARARYA APPROACH</span><p>Good work is not just seen.<br /><em>It is felt in every detail.</em></p><Layers3 size={30} strokeWidth={1.2} /></div></section>

      <section className="section final-cta"><div className="container final-cta-inner"><div><span className="eyebrow">HAVE SOMETHING IN MIND?</span><h2>Let's make it<br /><span>meaningful.</span></h2></div><Link className="button button-dark" href="/request">Tell us about your project <ArrowUpRight size={17} /></Link></div></section>
    </>
  );
}