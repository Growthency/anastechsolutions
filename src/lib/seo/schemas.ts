/**
 * Centralised JSON-LD schema builders.
 * All builders return plain objects ready to feed into <JsonLd data={...} />.
 */

export const SITE_URL = "https://anastechsolutions.com";
export const SITE_NAME = "AnasTech Solutions";
export const SITE_LOGO = `${SITE_URL}/newlogo.png`;

export const ORG_SAME_AS = [
  // Add real social URLs here when available; keeping the array empty is fine
  // — Google ignores the field if it's omitted.
];

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    alternateName: "AnasTech",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: SITE_LOGO,
      width: 512,
      height: 512,
    },
    description:
      "Enterprise websites, software, mobile apps, bulk SMS & call center solutions for businesses across Bangladesh and beyond.",
    foundingDate: "2020",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+8801743656066",
        contactType: "customer service",
        areaServed: "BD",
        availableLanguage: ["English", "Bengali"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: ORG_SAME_AS,
  } as const;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}#organization` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  } as const;
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#localbusiness`,
    name: SITE_NAME,
    url: SITE_URL,
    image: SITE_LOGO,
    telephone: "+8801743656066",
    email: "infoabubakar786@gmail.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    areaServed: ["BD", "Worldwide"],
  } as const;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  } as const;
}

interface ProductSchemaInput {
  slug: string;
  title: string;
  description: string;
  image?: string;
}
export function productSchema({ slug, title, description, image }: ProductSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description,
    image: image ?? SITE_LOGO,
    brand: { "@type": "Brand", name: SITE_NAME },
    url: `${SITE_URL}/products/${slug}`,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${slug}`,
      priceCurrency: "BDT",
      price: "0",
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}#organization` },
    },
  } as const;
}

interface ServiceSchemaInput {
  slug: string;
  title: string;
  description: string;
}
export function serviceSchema({ slug, title, description }: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    serviceType: title,
    url: `${SITE_URL}/services/${slug}`,
    provider: { "@id": `${SITE_URL}#organization` },
    areaServed: ["BD", "Worldwide"],
  } as const;
}

interface FaqSchemaInput {
  q: string;
  a: string;
}
export function faqPageSchema(faqs: FaqSchemaInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } as const;
}

interface ArticleSchemaInput {
  slug: string;
  title: string;
  description: string;
  image?: string;
  author: string;
  datePublished: string;
  dateModified?: string;
}
export function articleSchema({
  slug,
  title,
  description,
  image,
  author,
  datePublished,
  dateModified,
}: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
    headline: title,
    description,
    image: image ?? SITE_LOGO,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: SITE_LOGO },
    },
    datePublished,
    dateModified: dateModified ?? datePublished,
  } as const;
}
