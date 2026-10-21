import Image from "next/image";

const brands = [
  { name: "Schok", file: "schok.png", darken: true },
  { name: "NPFulfilment", file: "npfulfilment.png", darken: false },
  { name: "FirstGroup", file: "firstgroup.png", darken: false },
  { name: "KPMG", file: "kpmg.png", darken: false },
  { name: "Aditya Birla Group", file: "aditya-birla.png", darken: false },
  { name: "Adani", file: "adani.png", darken: false },
  { name: "TTK Prestige", file: "ttk-prestige.png", darken: false },
  { name: "Hero", file: "hero.png", darken: false },
  { name: "Veidekke", file: "veidekke.png", darken: false },
  { name: "Sentrias", file: "sentrias.png", darken: false },
];

export default function BrandMarquee() {
  return (
    <section className="brand-section" aria-label="Brands I have worked with">
      <div className="brand-marquee">
        <div className="brand-track">
          {[false, true].map((duplicate) => (
            <ul className="brand-group" key={String(duplicate)} aria-hidden={duplicate ? true : undefined}>
              {brands.map(({ name, file, darken }) => (
                <li className={`brand-logo brand-logo-image brand-mark-${file.replace(".png", "")}${darken ? " brand-logo-darken" : ""}`} key={name}>
                  {["adani.png", "kpmg.png", "ttk-prestige.png"].includes(file) ? <span className="brand-colour-mark" role={duplicate ? undefined : "img"} aria-label={duplicate ? undefined : name} style={{ "--brand-mask": `url(/images/brands/${file})` }} /> : <Image src={`/images/brands/${file}`} alt={duplicate ? "" : name} width={180} height={70} sizes="(max-width: 800px) 140px, 180px" />}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
