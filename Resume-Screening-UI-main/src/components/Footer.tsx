import Link from "next/link";
import { Youtube, Instagram, Mail, Twitter, Linkedin } from "lucide-react";
import styles from "./Footer.module.css";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/billing", label: "Billing" },
  { href: "/login", label: "Login" },
];

const socialLinks = [
  { href: "https://twitter.com", label: "Twitter", icon: Twitter },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "https://youtube.com", label: "YouTube", icon: Youtube },
  {
    href: "mailto:support@resumescreeningui.com",
    label: "Email",
    icon: Mail,
  },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <div className={styles.brandBlock}>
          <p className={styles.brandTitle}>
            Resume Screening UI
          </p>
          <p className={styles.brandText}>
            Build, screen, and manage resumes in one place.
          </p>
        </div>

        <div className={styles.navLinks}>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              className={styles.navLink}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.socialLinks}>
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className={styles.socialLink}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <Icon className={styles.socialIcon} />
              <span>{label}</span>
            </a>
          ))}
        </div>

        <p className={styles.copy}>
          © 2026 Resume Screening UI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
