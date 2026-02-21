export type CertificateCatalogItem = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  type: 'education' | 'certification';
  link: string;
};

export type CertificateRecord = Partial<CertificateCatalogItem> & {
  _id?: string;
  date?: string | Date;
};

export const certificateCatalog: CertificateCatalogItem[] = [
  {
    id: 'bs-computer-science',
    title: 'BS Computer Science',
    issuer: 'University of Gujrat',
    date: '2024-01-01',
    description:
      'Graduated with honors, specializing in AI and Data Science. Completed capstone project on Neural Networks.',
    type: 'education',
    link: 'https://uog.edu.pk/'
  },
  {
    id: 'react-certification',
    title: 'React.js Certification',
    issuer: 'LinkedIn Learning',
    date: '2024-01-01',
    description:
      'Advanced concepts including Hooks, Context API, and performance optimization for modern web apps.',
    type: 'certification',
    link:
      'https://www.linkedin.com/learning/certificates/1a0836280fccd3487fca28edce2c52e949f9ef82b18196d88f849851b1f49b45?trk=share_certificate'
  },
  {
    id: 'node-certification',
    title: 'Node.js Certification',
    issuer: 'LinkedIn Learning',
    date: '2024-01-01',
    description:
      'Backend development mastery covering event-driven architecture, streams, and RESTful API design.',
    type: 'certification',
    link:
      'https://www.linkedin.com/learning/certificates/ebfda41df6410f97ba15f155c1ffed28e257c0c96a4464c5e9df05871deb17e3?trk=share_certificate'
  },
  {
    id: 'php-mysql-certification',
    title: 'PHP & MySQL Certification',
    issuer: 'LinkedIn Learning',
    date: '2024-01-01',
    description:
      'Comprehensive guide to server-side scripting and database management for dynamic websites.',
    type: 'certification',
    link:
      'https://www.linkedin.com/learning/certificates/6e4138cd0737cc95f6ce73d8ef23dba53c961800fa01c9db09713d5fb490b117?trk=share_certificate'
  },
  {
    id: 'flask-certification',
    title: 'Flask Certification',
    issuer: 'LinkedIn Learning',
    date: '2024-01-01',
    description: 'Building scalable web applications with Python using the Flask microframework.',
    type: 'certification',
    link:
      'https://www.linkedin.com/learning/certificates/be3e2b2fbc3d16964905a846e9cade13a597934822560141bff571b96a2c13aa?trk=share_certificate'
  },
  {
    id: 'machine-learning-certification',
    title: 'Machine Learning Certification',
    issuer: 'Great Learning',
    date: '2023-01-01',
    description:
      'Intensive course covering supervised/unsupervised learning, neural networks, and deep learning architectures.',
    type: 'certification',
    link: 'https://www.mygreatlearning.com/certificate/FPMZDTXL'
  }
];

const isNonEmpty = (value?: string) => typeof value === 'string' && value.trim().length > 0;

const normalizeDate = (value?: string | Date) => {
  if (!value) return undefined;
  const dateValue = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(dateValue.getTime())) return undefined;
  return dateValue.toISOString();
};

export const mergeCertificates = (incoming?: CertificateRecord[]): CertificateCatalogItem[] => {
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return certificateCatalog;
  }

  const mergedCatalog = certificateCatalog.map((catalogItem) => {
    const match = incoming.find(
      (certificate) =>
        certificate.link === catalogItem.link || certificate.title === catalogItem.title
    );

    if (!match) {
      return catalogItem;
    }

    return {
      ...catalogItem,
      ...match,
      title: isNonEmpty(match.title) ? match.title!.trim() : catalogItem.title,
      issuer: isNonEmpty(match.issuer) ? match.issuer!.trim() : catalogItem.issuer,
      description: isNonEmpty(match.description) ? match.description!.trim() : catalogItem.description,
      link: isNonEmpty(match.link) ? match.link!.trim() : catalogItem.link,
      date: normalizeDate(match.date) ?? catalogItem.date,
      type: match.type === 'education' || match.type === 'certification' ? match.type : catalogItem.type
    };
  });

  const extraCertificates = incoming
    .filter((certificate) => {
      const existsInCatalog = certificateCatalog.some(
        (catalogItem) =>
          catalogItem.link === certificate.link || catalogItem.title === certificate.title
      );
      return !existsInCatalog && isNonEmpty(certificate.title) && isNonEmpty(certificate.issuer);
    })
    .map((certificate, index) => ({
      id: certificate.id ?? certificate._id ?? `extra-${index}`,
      title: certificate.title!.trim(),
      issuer: certificate.issuer!.trim(),
      date: normalizeDate(certificate.date) ?? new Date().toISOString(),
      description: isNonEmpty(certificate.description)
        ? certificate.description!.trim()
        : 'Certificate details coming soon.',
      type:
        certificate.type === 'education' || certificate.type === 'certification'
          ? certificate.type
          : 'certification',
      link: isNonEmpty(certificate.link) ? certificate.link!.trim() : '#'
    }));

  return [...mergedCatalog, ...extraCertificates];
};
