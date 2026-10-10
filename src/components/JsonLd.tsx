import { projectCatalog } from "@/data/projects";
import { hasProjectPage } from "@/data/project-slugs";
import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
} from "@/lib/seo";

const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: SITE_NAME,
  url: SITE_URL,
  email: `mailto:${CONTACT_EMAIL}`,
  jobTitle: "Full Stack Developer",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lisbon",
    addressCountry: "PT",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Gujrat",
    url: "https://uog.edu.pk/",
  },
  knowsAbout: [
    "Web development",
    "Next.js",
    "React",
    "Node.js",
    "MERN stack",
    "Flask",
    "Python",
    "JavaScript",
    "Tailwind CSS",
    "Machine learning",
    "Computer vision",
    "AI integration",
  ],
  sameAs: SOCIAL_PROFILES,
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: `${SITE_NAME} - Portfolio`,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#person` },
};

const profilePage = {
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profile`,
  url: SITE_URL,
  name: `${SITE_NAME} - Portfolio`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#person` },
  mainEntity: { "@id": `${SITE_URL}/#person` },
};

const projects = {
  "@type": "ItemList",
  "@id": `${SITE_URL}/#projects`,
  name: `Projects by ${SITE_NAME}`,
  itemListElement: projectCatalog.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      url: hasProjectPage(project.id) ? `${SITE_URL}/projects/${project.id}` : project.link,
      sameAs: project.link,
      keywords: project.tags.join(", "),
      creator: { "@id": `${SITE_URL}/#person` },
    },
  })),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [person, website, profilePage, projects],
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
