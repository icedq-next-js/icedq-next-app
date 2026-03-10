import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Logo + Certifications */}
        <div className="footer-col logo-col">

          <img
            src="https://icedq.com/wp-content/uploads/2024/03/iceDQ-Logo-White.svg"
            alt="iceDQ"
            className="footer-logo"
          />

          <div className="certifications">

            <a href="https://trust.icedq.com/">
              <img
                src="https://icedq.com/wp-content/uploads/2024/08/iso-27001.png"
                alt="ISO"
              />
            </a>

            <a href="https://trust.icedq.com/">
              <img
                src="https://icedq.com/wp-content/uploads/2024/08/AIPC-SOC.png"
                alt="SOC"
              />
            </a>

          </div>

        </div>

        {/* Company */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link href="/about-us">About</Link></li>
            <li><Link href="/partners">Partners</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="https://university.icedq.com/">Training</Link></li>
          </ul>
        </div>

        {/* Products */}
        <div className="footer-col">
          <h4>Products</h4>
          <ul>
            <li><Link href="/overview">Platform Overview</Link></li>
            <li><Link href="/product/data-testing-tool">Data Testing Tool</Link></li>
            <li><Link href="/product/data-monitoring-tool">Data Monitoring Tool</Link></li>
            <li><Link href="/products/data-observability-tool">Data Observability Tool</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><Link href="/resources#blog">Blogs</Link></li>
            <li><Link href="/resources#case-studies">Case Studies</Link></li>
            <li><Link href="/resources#videos">Videos</Link></li>
            <li><Link href="/resources#faqs">FAQs</Link></li>
            <li><Link href="/resources#news">News</Link></li>
          </ul>
        </div>

        {/* Address */}
        <div className="footer-col">
          <h4>Our Address</h4>

          <p>
            Headquarters: 60 Long Ridge Road<br/>
            Suite 303, Stamford CT 06902
          </p>

          <p>Phone: (203) 666-4442</p>

          <p>
            Email:
            <a href="mailto:contact@icedq.com">
              contact@icedq.com
            </a>
          </p>

        </div>

        {/* Social */}
        <div className="footer-col">
          <h4>Follow us</h4>

          <div className="social-icons">

            <a href="https://www.facebook.com/iCEDQ.ToranaInc">
              <img src="https://icedq.com/wp-content/uploads/2025/01/Connect-with-iceDQ-on-Facebook.svg"/>
            </a>

            <a href="https://www.linkedin.com/company/icedq/">
              <img src="https://icedq.com/wp-content/uploads/2025/01/Connect-with-iceDQ-on-linkedin.svg"/>
            </a>

            <a href="https://x.com/iceDQ_Toranainc">
              <img src="https://icedq.com/wp-content/uploads/2025/01/Connect-with-iceDQ-on-Twitter.svg"/>
            </a>

            <a href="https://www.youtube.com/@iceDQ">
              <img src="https://icedq.com/wp-content/uploads/2025/01/Connect-with-iceDQ-on-YouTube.svg"/>
            </a>

            <a href="https://www.reddit.com/r/icedq/">
              <img src="https://icedq.com/wp-content/uploads/2025/01/Reddit-iceDQ.svg"/>
            </a>

          </div>

        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">

        <div className="copyright">
          Torana Inc. © 2026. All Rights Reserved
        </div>

        <div className="footer-links">

          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
          <Link href="/terms-of-services">Terms of Services</Link>

        </div>

      </div>

    </footer>
  );
}