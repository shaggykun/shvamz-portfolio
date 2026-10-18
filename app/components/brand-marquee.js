// Sample identities; replace these with client-approved brands when available.
const brands = [
  { name: "Layers", mark: "M4 9 16 3 28 9 16 15Z M4 15l12 6 12-6 M4 21l12 6 12-6" },
  { name: "Quotient", mark: "M24 24a12 12 0 1 1 3-8 M17 17l11 11 M21 16h7" },
  { name: "Circooles", mark: "M19 16a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM29 16a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" },
  { name: "Sisyphus", mark: "M4 27 16 7l12 20Z M20 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" },
  { name: "Catalog", mark: "M16 3a13 13 0 1 0 13 13H16Z M21 3v8h8" },
  { name: "Luminous", mark: "M16 2v28 M2 16h28 M6 6l20 20 M6 26 26 6" },
  { name: "Nietzsche", mark: "M5 27V5l22 22V5 M5 16l11 11 M16 5l11 11" },
  { name: "Acme", mark: "M3 27 16 4l13 23 M9 27l7-13 7 13 M12 22h8" },
  { name: "Pulse", mark: "M2 17h7l5-12 6 22 4-10h6" },
  { name: "Orbit", mark: "M23 16a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM29 6c4 4-2 13-9 19S4 31 3 26 6 13 13 7 26 2 29 6Z" },
];

export default function BrandMarquee() {
  return (
    <section className="brand-section" aria-label="Brand logos">
      <div className="brand-marquee">
        <div className="brand-track">
          {[false, true].map((duplicate) => (
            <ul className="brand-group" key={String(duplicate)} aria-hidden={duplicate ? true : undefined}>
              {brands.map(({ name, mark }) => (
                <li className={`brand-logo brand-logo-${name.toLowerCase()}`} key={name}>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={mark} /></svg>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
