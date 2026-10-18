import "./globals.css";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import GlowCursor from "./components/glow-cursor";
import NdaProjectGate from "./components/nda-project-gate";

export const metadata = {
  title: "Shivam Designs — UI/UX Designer",
  description: "Portfolio of Shivam, a product designer with 6 years of end-to-end design experience across FinTech, B2C, B2B and SaaS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><SiteHeader />{children}<SiteFooter /><GlowCursor /><NdaProjectGate /></body>
    </html>
  );
}
