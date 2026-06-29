export type PracticeArea = {
  id: string;
  name: string;
  blurb: string;
  services: string[];
};

export const practiceAreas: PracticeArea[] = [
  {
    id: "criminal",
    name: "Criminal Law",
    blurb:
      "From bail and trial defence to quashing of FIRs and economic offences — strategic representation at every stage of a criminal matter.",
    services: [
      "Regular Bail",
      "Anticipatory Bail",
      "Interim Bail & Bail Cancellation",
      "Quashing of FIR (Section 482 CrPC / 528 BNSS)",
      "Trial Court Defence",
      "Sessions Trials",
      "Cheque Bounce Cases (Section 138 NI Act)",
      "Dowry & 498A IPC / 85 BNS Matters",
      "Domestic Violence (DV Act)",
      "POCSO Act Defence & Prosecution",
      "Narcotics & NDPS Act Matters",
      "White-Collar & Economic Offences",
      "Cyber Crime & IT Act Matters",
      "Juvenile Justice Proceedings",
      "Criminal Appeals & Revisions",
      "Criminal Writ Petitions",
    ],
  },
  {
    id: "civil",
    name: "Civil Litigation",
    blurb:
      "Property, contract, recovery, and injunction matters argued with meticulous preparation across the trial and appellate sides.",
    services: [
      "Property & Title Disputes",
      "Recovery of Money Suits",
      "Specific Performance of Contract",
      "Permanent & Temporary Injunctions",
      "Partition Suits",
      "Landlord–Tenant Disputes",
      "Eviction Proceedings",
      "Possession & Mesne Profits",
      "Suits for Declaration",
      "Damages & Compensation",
      "Defamation Suits",
      "Consumer Disputes (NCDRC, SCDRC, DCDRC)",
      "RERA Matters",
      "Civil Appeals, Revisions & Review",
      "Execution Petitions",
      "Arbitration & Section 34/37 Petitions",
    ],
  },
  {
    id: "matrimonial",
    name: "Matrimonial & Divorce",
    blurb:
      "Sensitive, dignified handling of family matters — divorce, maintenance, custody, and protection proceedings.",
    services: [
      "Divorce by Mutual Consent",
      "Contested Divorce",
      "Restitution of Conjugal Rights",
      "Judicial Separation",
      "Annulment of Marriage",
      "Maintenance under Section 125 CrPC / Section 144 BNSS",
      "Permanent Alimony",
      "Child Custody & Guardianship",
      "Visitation Rights",
      "Domestic Violence Act Proceedings",
      "Defence in 498A IPC / 85 BNS Cases",
      "Dowry Recovery (Stridhan)",
      "Court Marriage & Marriage Registration",
      "Inter-Faith & NRI Marriages",
      "Mediation & Settlement",
    ],
  },
  {
    id: "wills-succession",
    name: "Wills & Succession",
    blurb:
      "Drafting and contesting Wills, securing probate, and handling property succession with care and precision.",
    services: [
      "Drafting of Wills",
      "Registration of Wills",
      "Probate of Wills",
      "Letters of Administration",
      "Succession Certificate",
      "Legal Heir Certificate",
      "Mutation of Property",
      "Family Settlement Deeds",
      "Gift Deeds & Relinquishment Deeds",
      "Partition of Inherited Property",
      "Will Contests & Testamentary Suits",
      "Hindu, Muslim, Christian & Parsi Succession",
    ],
  },
  {
    id: "general",
    name: "General Litigation",
    blurb:
      "Writs, service matters, employment, and other civil/quasi-judicial proceedings before tribunals and high courts.",
    services: [
      "Writ Petitions (Article 226 & 32)",
      "Public Interest Litigation (PIL)",
      "Service & Employment Matters",
      "Labour Court & Industrial Tribunal Matters",
      "CAT (Central Administrative Tribunal)",
      "Income Tax Appeals",
      "GST Disputes",
      "Banking & Financial Disputes (DRT)",
      "Insurance Claims",
      "Motor Accident Claims (MACT)",
      "Contract Drafting & Vetting",
      "Notice Drafting & Replies",
      "Legal Opinions & Advisory",
    ],
  },
];

export type SearchResult = {
  area: PracticeArea;
  service: string;
};

export function searchPracticeAreas(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results: SearchResult[] = [];
  for (const area of practiceAreas) {
    for (const service of area.services) {
      if (service.toLowerCase().includes(q)) {
        results.push({ area, service });
      }
    }
  }
  return results;
}
