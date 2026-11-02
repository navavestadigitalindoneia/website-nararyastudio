import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark">N</span>
            <span className="brand-copy">NARARYA<span>STUDIO</span></span>
          </Link>
          <p className="footer-note">A digital creative studio for products, visuals, and ideas made with intention.</p>
        </div>
        <div className="footer-links">
          <div><span className="eyebrow">Explore</span><Link href="/store">Digital store</Link><Link href="/services">Creative services</Link><Link href="/portfolio">Portfolio</Link></div>
          <div><span className="eyebrow">Connect</span><Link href="/request">Custom request</Link><Link href="/blog">Journal</Link><Link href="/faq">FAQ</Link></div>
        </div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Nararya Studio</span><span>Independent creative studio</span></div>
    </footer>
  );
}