import "./globals.css";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";

export const metadata = {
  title: "Shivam — UI/UX Designer",
  description: "Portfolio of Shivam, a product designer with 6 years of end-to-end design experience across FinTech, B2C, B2B and SaaS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><SiteHeader />{children}<SiteFooter /></body>
    </html>
  );
}
