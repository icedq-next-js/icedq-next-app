"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`header-bar ${scrolled ? "scrolled" : ""}`}>

      {/* Branding */}
      <div className="branding">
        <div className="left-cont">
            <Link href="/">
            <img
                src="https://abyssgroupindia.com/wp-content/uploads/2026/03/icedq-logo-2.svg"
                alt="iceDQ"
                className="logo"
            />
            </Link>

            <div className="tagline">
            <a href="/data-reliability-engineering">
                Data Reliability Engineered!
            </a>
            </div>
        </div>
        
        <div className="right-cont">
            <div className="review-badges">
            <a href="https://www.g2.com/products/icedq/reviews" target="_blank">
                <img src="https://abyssgroupindia.com/wp-content/uploads/2026/03/G2Crowd-1.webp" />
            </a>

            <a href="https://www.capterra.com/p/154912/iCEDQ/" target="_blank">
                <img src="https://abyssgroupindia.com/wp-content/uploads/2026/03/iceDQ-Capterra-Review.webp" />
            </a>
            </div>

            <div className="book-demo">
            <Link href="/request-a-demo">
                <button className="demo-btn">Book a Demo</button>
            </Link>
            </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="navigation">
        <ul className="main-nav">

          {/* Product Mega Menu */}
          <li className="menu-item mega">
            <span>Product</span>

            <div className="mega-menu">

              <div className="mega-left">
                <Link href="/overview">
                  <h4>Platform Overview</h4>
                  <p>
                    Unified data reliability platform for data testing,
                    monitoring, and AI-based observability.
                  </p>
                </Link>
              </div>

              <div className="mega-grid">

                <Link href="/product/data-testing-tool">
                  <div className="mega-card">
                    <img src="https://icedq.com/wp-content/uploads/2024/05/Data-Testing-Head-Icon.svg"/>
                    <h5>Data Testing</h5>
                    <p>Automate ETL, migration, and pipeline testing.</p>
                  </div>
                </Link>

                <Link href="/product/data-monitoring-tool">
                  <div className="mega-card">
                    <img src="https://icedq.com/wp-content/uploads/2024/05/Data-Monitoring-Head-Icon.svg"/>
                    <h5>Data Monitoring</h5>
                    <p>Checks and controls on production pipelines.</p>
                  </div>
                </Link>

                <Link href="/product/data-observability-tool">
                  <div className="mega-card">
                    <img src="https://icedq.com/wp-content/uploads/2024/05/Data-Observability-Head-Icon.svg"/>
                    <h5>Data Observability</h5>
                    <p>AI-based anomaly detection.</p>
                  </div>
                </Link>

              </div>

            </div>
          </li>

          {/* Solutions */}
          <li className="menu-item">
            <Link href="/solutions">Solutions</Link>
          </li>

          {/* Resources */}
          <li className="menu-item">
            <Link href="/resources">Resources</Link>
          </li>

          {/* About */}
          <li className="menu-item">
            <Link href="/about-us">About</Link>
          </li>

          {/* Contact */}
          <li className="menu-item">
            <Link href="/contact-us">Contact</Link>
          </li>

        </ul>
      </nav>

    </header>
  );
}