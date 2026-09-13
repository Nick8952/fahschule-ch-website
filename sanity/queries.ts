import { groq } from "next-sanity";

/* Die Abfragen liefern bewusst exakt die Form, die data/*.json schon hatte.
   Dadurch mussten die Komponenten beim Umstieg auf Sanity nicht angefasst
   werden — und der Rückfall auf die lokalen Dateien (siehe sanity/fetch.ts)
   hat dieselbe Form. */

export const siteQuery = groq`*[_type == "siteSettings"][0]{
  demo, web3formsKey, name, legalName, instructor, tagline, blurb,
  address{street, zip, city, center, floorNote},
  phone{display, tel},
  email,
  social{instagram, facebook},
  transit, membership, mapQuery,
  "languages": coalesce(languages, []),
  stats{students, studentsLabel, firstTryPass, firstTryPassLabel, sinceYear, sinceYearLabel},
  themeColor
}`;

export const navQuery = groq`*[_type == "navigation"][0]{
  "primary": coalesce(primary[]{label, href, lang}, []),
  "mobileExtra": coalesce(mobileExtra[]{label, href}, []),
  ctaLabel, ctaHref,
  "footerColumns": coalesce(footerColumns[]{
    title,
    "links": coalesce(links[]{label, href}, [])
  }, [])
}`;

export const pricesQuery = groq`*[_type == "pricing"][0]{
  offer,
  vehicles{automat, geschaltet},
  vehicleNote,
  lessonLengths{single, onehalf, double},
  "tiers": coalesce(tiers[]{key, name, cond, minLessons, automat, geschaltet}, []),
  "tierIncludes": coalesce(tierIncludes, []),
  calc{rangeMin, rangeMax, default, priceSuffix, heading, intro},
  "extraRows": coalesce(extraRows[]{label, automat, geschaltet, "free": coalesce(free, false)}, []),
  disclaimer
}`;

export const coursesQuery = groq`*[_type == "courses"][0]{
  theoriekurs{fee, voucher, intro, "times": coalesce(times, []), location, note},
  nothelferkurs{fee, voucher, intro},
  vkuDeutsch{fee, feeEnglish, intro, includes, bring, location, iframeUrl},
  vkuEnglish{
    fee, intro, feeNote, requirements, bring, location, datesNote,
    "dates": coalesce(dates[]{label, friday, saturday, "bookable": coalesce(bookable, true), value}, [])
  }
}`;

export const testimonialsQuery = groq`*[_type == "testimonials"][0]{
  intro,
  "items": coalesce(items[]{name, lang, text}, [])
}`;

export const stepsQuery = groq`*[_type == "steps"][0]{
  intro,
  "items": coalesce(items[]{n, title, body, badge}, [])
}`;

export const modulesQuery = groq`*[_type == "modules"][0]{
  heading, intro,
  "items": coalesce(items[]{range, level, title, body}, [])
}`;

export const reasonsQuery = groq`*[_type == "reasons"][0]{
  "warum": coalesce(warum[]{title, body}, []),
  "vorteile": coalesce(vorteile, []),
  "trustStrip": coalesce(trustStrip, [])
}`;

export const pageContentQuery = groq`*[_type == "pageContent"][0]{
  home{
    sections{warum, leistungen, vorteile, testimonials},
    "services": coalesce(services[]{tag, title, body, price, href, image}, [])
  },
  ueberMich{
    sections{intro, konzept, auszeichnet},
    introBody,
    "konzeptPunkte": coalesce(konzeptPunkte[]{title, body}, []),
    "auszeichnetPunkte": coalesce(auszeichnetPunkte[]{title, body}, [])
  },
  kurse{
    "cards": coalesce(cards[]{tag, title, body, price, "points": coalesce(points, []), href, image}, [])
  },
  kontrollfahrt{
    callout,
    "gutZuWissen": coalesce(gutZuWissen, [])
  },
  drivingSchool{
    langNote,
    langNoteLink{label, href},
    sections{intro, reasonsTitle},
    intro,
    "reasons": coalesce(reasons[]{title, body}, [])
  }
}`;

export const pageQuery = groq`*[_type == "page" && slug == $slug][0]{
  seoTitle, seoDescription, ogImage,
  hero{eyebrow, title, lead, badge},
  sections{form{title}, anfahrt{title}},
  body
}`;

export const legalQuery = groq`*[_type == "legalPage" && slug == $slug][0]{
  title, subtitle, seoTitle, seoDescription, body
}`;
