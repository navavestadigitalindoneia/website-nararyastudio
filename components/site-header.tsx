import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "/store", label: "Store" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Journal" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Nararya Studio home">
          <span className="brand-mark">N</span>
          <span className="brand-copy">NARARYA<span>STUDIO</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <Link className="button button-dark header-cta" href="/request">
          Start a project <ArrowUpRight size={16} />
        </Link>
        <details className="mobile-menu">
          <summary aria-label="Toggle navigation"><span className="menu-equals">=</span><span className="menu-cross">×</span></summary>
          <nav aria-label="Mobile navigation">
            {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            <Link href="/request">Start a project <ArrowUpRight size={16} /></Link>
          </nav>
        </details>
      </div>
    </header>
  );
}