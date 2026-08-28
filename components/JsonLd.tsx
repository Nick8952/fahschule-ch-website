import { site } from "@/lib/data";
import { absUrl } from "@/lib/site";

export function DrivingSchoolJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    name: `${site.name} – ${site.instructor}`,
    image: absUrl("/img/hero-2.webp"),
    url: absUrl("/"),
    telephone: site.phone.tel,
    email: site.email,
    priceRange: "CHF 50–200",
    founder: { "@type": "Person", name: site.instructor },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: "CH",
    },
    areaServed: "Zürich",
    knowsLanguage: ["de", "en", "fr", "el"],
    sameAs: [site.social.instagram, site.social.facebook],
    memberOf: { "@type": "Organization", name: "Zürcher Fahrlehrerverband" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
