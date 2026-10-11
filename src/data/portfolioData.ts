export interface ResearchProject {
  id: string;
  title: string;
  role: string;
  status: string;
  institution?: string;
  description: string;
  highlights: string[];
  scientificDetails: string;
  image: string;
}

export interface WorkExperienceItem {
  role: string;
  organization: string;
  organizationUrl?: string;
  period: string;
  location: string;
  points: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  organizationUrl?: string;
  points?: string[];
}

export interface ExtraCurricularItem {
  role: string;
  organization: string;
  organizationUrl?: string;
  period: string;
  points: string[];
}

export interface EducationItem {
  discipline: string;
  institution: string;
  yearStatus: string;
  result: string;
  badge?: string;
}

export interface ReferenceItem {
  name: string;
  institution: string;
  title: string;
  phone: string;
  email: string;
}

export interface CustomSocialLink {
  id: string;
  platform: string;
  url: string;
  icon?: string;
}

export interface PersonalInterestItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  shortDesc: string;
  detailedDesc: string;
  keywords: string[];
}

export interface LanguageProficiency {
  id: string;
  language: string;
  level: string;
  percentage: number;
  description?: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Lubna Akter',
    headline: 'Clinical Pharmacy | Pharmaceutical Research & Pharmacology | Medical Writing & Drug Information | Healthcare',
    subtitle: 'Pharmacy Student',
    photoUrl: '/Lubna-Akter-Pharmacist-Profile-Photo.png',
    location: 'Gulshan, Vatara, Dhaka, Bangladesh',
    mapQuery: 'Vatara, Gulshan, Dhaka, Bangladesh',
    phone: '+88 0153 77 20 007',
    whatsapp: '+880 1537-720007',
    whatsappUrl: 'https://wa.me/8801537720007',
    email: 'heyitslubnaakter@gmail.com',
    linkedin: 'linkedin.com/in/heyitslubnaakter',
    linkedinUrl: 'https://www.linkedin.com/in/heyitslubnaakter',
    facebookUrl: 'https://www.facebook.com/thisisrufaida',
    instagramUrl: 'https://www.instagram.com/thisisrufaida',
    bloggerUrl: 'https://www.blogger.com',
    customSocialLinks: [] as CustomSocialLink[],
    footerBadgeText: 'Lubna Akter Portfolio',
    footerRightsText: 'All rights reserved.',
    summary:
      'Pharmacy student with hands-on exposure to pharmacology, drug information analysis, and laboratory-based pharmaceutical research, complemented by practical experience in medical writing and healthcare content development. Skilled in data interpretation, quality-focused documentation, and cross-functional collaboration, with strong attention to detail. Seeking an entry-level role in pharmaceutical research, drug information, or healthcare communication to apply analytical and communication skills toward evidence-based outcomes.',
  },

  coreCompetencies: [
    'Pharmacology & Pharmacotherapy',
    'Prescription & Dispensing Support',
    'Pharmaceutical & Laboratory Research',
    'Medical Writing & Healthcare Content Development',
    'Attention to Detail & Accuracy',
    'Drug Information & Interaction Analysis',
    'Patient Counseling & Communication',
    'GMP/GLP & Quality Standards Awareness',
    'Pharma Market & Data Analysis',
    'Critical Thinking & Problem-Solving',
  ],

  softSkills: [
    'Leadership & Team Motivation',
    'Cross-Functional Collaboration',
    'Ethical Judgment & Regulatory Compliance Mindset',
    'Adaptability & Quick Learning',
    'Negotiation & Persuasive Communication',
    'Influencing & Stakeholder Engagement',
    'Time Management & Multitasking',
    'Patient-Centered Empathy & Confidentiality',
  ],

  computerLiteracy: [
    'MS Office Suite (Word, Excel, PowerPoint)',
    'PubMed & Google Scholar Literature Search',
    'SPSS & Excel-Based Statistical Analysis',
    'AI Tools (ChatGPT, Claude)',
    'Reference Management (Mendeley)',
    'ChemDraw (Chemical Structure Drawing)',
  ],

  // Complete educational qualifications from the official uploaded document
  education: [
    {
      discipline: 'B. Pharm (Bachelor of Pharmacy)',
      institution: 'University of Information Technology & Sciences (UITS)',
      yearStatus: '4th Year (In Progress) | Dhaka, Bangladesh',
      result: '3.37 / 4.00',
      badge: 'In Progress (4th Year)',
    },
    {
      discipline: 'HSC - Science (Higher Secondary)',
      institution: 'Govt. Kalachandpur High School and College',
      yearStatus: '2021 | Dhaka, Bangladesh',
      result: '5.00 / 5.00',
      badge: 'GPA 5.00',
    },
    {
      discipline: 'SSC - Science (Secondary School)',
      institution: 'Khilbarirtek Islamia High School',
      yearStatus: '2019 | Dhaka, Bangladesh',
      result: '4.56 / 5.00',
      badge: 'GPA 4.56',
    },
    {
      discipline: 'Junior School Certificate (JSC)',
      institution: 'Khilbarirtek Islamia High School',
      yearStatus: '2016 | Dhaka, Bangladesh',
      result: '5.00 / 5.00',
      badge: 'GPA 5.00',
    },
    {
      discipline: 'Primary School Certificate (PSC)',
      institution: 'Khilbarirtek Islamia High School',
      yearStatus: '2013 | Dhaka, Bangladesh',
      result: '5.00 / 5.00',
      badge: 'GPA 5.00',
    },
  ],

  researchProjects: [
    {
      id: 'commelina',
      title: 'Evaluation of Anti-Inflammatory Activity of Methanolic and Ethanolic Extracts of Commelina erecta by Protein Denaturation and HRBC Membrane Stabilization Assays (Ongoing)',
      role: 'Co-Researcher',
      status: 'Running Research Project',
      institution: 'University of Information Technology & Sciences',
      description:
        'Evaluating anti-inflammatory activity of Commelina erecta extracts via protein denaturation and HRBC membrane stabilization assays.',
      highlights: [
        'Methanolic & ethanolic botanical extraction protocols',
        'In vitro protein denaturation inhibition assay',
        'HRBC membrane stabilization assessment for anti-inflammatory efficacy',
      ],
      scientificDetails:
        'Commelina erecta contains phytochemical flavonoids and polyphenols. The research quantifies inhibition of heat-induced protein denaturation and membrane stabilization of erythrocyte membranes to explore potential natural anti-inflammatory therapeutic leads.',
      image: '/src/assets/images/research_commelina_extract_1791679179876.jpg',
    },
    {
      id: 'hepatitis',
      title: 'Efficacy of Entecavir vs. Lamivudine in Chronic Hepatitis B (Poster Presentation)',
      role: 'Co-Author',
      status: 'Ranked Top 3 at a Pharma Presentation Competition',
      institution: 'Pharma Presentation Competition',
      description:
        'Compared antiviral efficacy of Entecavir and Lamivudine in chronic Hepatitis B, with a focus on public health impact in Bangladesh.',
      highlights: [
        'Comparative virological suppression analysis of nucleoside/nucleotide analogues',
        'Assessment of genotypic resistance barrier (YMDD motif mutations)',
        'Epidemiological cost-benefit and accessibility in Bangladesh',
      ],
      scientificDetails:
        'Entecavir demonstrates a superior genetic resistance barrier and long-term viral load suppression compared to Lamivudine, highlighting the imperative for updated therapeutic guidelines and accessible antiretroviral options in regional clinical practice.',
      image: '/src/assets/images/poster_hepatitis_antiviral_1791679192469.jpg',
    },
  ] as ResearchProject[],

  certifications: [
    {
      title: 'Computer Aided Drug and Vaccine Design',
      issuer: 'BioPC',
      year: '2024',
    },
    {
      title: 'The Medicine Concept Course (10th Batch)',
      issuer: 'Clear Concept',
      year: 'Course Certification',
    },
  ],

  workExperience: [
    {
      role: 'Education Byte Builder',
      organization: 'Pharma Insights',
      period: 'Jan 2026 - Feb 2026',
      location: 'Dhaka, Bangladesh',
      points: [
        'Produced research-backed content that strengthened platform credibility.',
        'Simplified complex pharma concepts into clear, engaging content.',
        'Researched pharmacy and healthcare topics to ensure content accuracy.',
        'Supported structured editorial planning and monthly scheduling.',
      ],
    },
    {
      role: 'Branch In-Charge',
      organization: 'Emaan',
      period: 'May 2023 - Jul 2023',
      location: 'Dhaka, Bangladesh',
      points: [
        'Promoted to Branch In-Charge within one month for outstanding performance.',
        'Grew branch sales by up to 20% through strong customer engagement.',
        'Managed daily branch operations and supervised sales team performance.',
        'Boosted customer retention through improved service delivery.',
      ],
    },
  ],

  entrepreneurialExperience: [
    {
      role: 'Co-Founder',
      organization: 'Neymat Home Décor',
      period: 'Apr 2026 - Present',
      location: 'Dhaka, Bangladesh',
      points: [
        'Co-founded an early-stage home décor brand, building it from the ground up primarily through social media-based sales and marketing.',
        'Grew order volume by nearly 20% since launch by managing sourcing, inventory, and customer engagement end-to-end.',
      ],
    },
  ],

  extraCurricular: [
    {
      role: 'Member',
      organization: 'Bangladesh Girls Guide',
      period: 'Leadership & Community',
      points: [
        'Completed leadership and first-aid training, and took part in school health-awareness drives, tree-plantation campaigns, and community-service camps, building teamwork, discipline, and public-speaking skills.',
      ],
    },
  ],

  // Personal Particulars from CV (Birth year strictly omitted as requested)
  personalDetails: {
    nationality: 'Bangladeshi',
    bloodGroup: 'A+',
    languages: 'Bengali (Native), English (Fluent)',
  },

  // Interactive Language Proficiency (Professional English 70%, Bengali 100%)
  languages: [
    {
      id: 'bn',
      language: 'Bengali (বাংলা)',
      level: 'Native / First Language',
      percentage: 100,
      description: 'Mother tongue, fully bilingual in academic, clinical, and interpersonal communication.',
    },
    {
      id: 'en',
      language: 'English',
      level: 'Professional Working Proficiency',
      percentage: 70,
      description: 'Primary medium for pharmaceutical literature review, medical writing, and clinical reports.',
    },
  ] as LanguageProficiency[],

  // Previous Personal Interests structure preferred by user:
  // Wanderlust (Travel) • Otaku (Anime & K-Dramas) • Glam (Makeup Artistry & Skincare) • Aesthetic Journaling • Foodie (Culinary Exploration)
  personalInterests: [
    {
      id: 'travel',
      title: 'Wanderlust (Travel)',
      category: 'Exploration & Perspective',
      icon: 'Compass',
      shortDesc: 'Exploring scenic landscapes, coastal serenity, and cultural heritage.',
      detailedDesc:
        'Passionate about scenic journeys, discovering local heritage sites, ocean coastlines, and diverse traditions that broaden horizons and foster adaptability.',
      keywords: ['Ocean coasts', 'Cultural heritage', 'Nature trails', 'Scenic photography'],
    },
    {
      id: 'otaku',
      title: 'Otaku (Anime & K-Dramas)',
      category: 'Narrative & Media Arts',
      icon: 'Tv',
      shortDesc: 'Romantic comedy K-dramas, ocean aesthetics, and character-driven anime.',
      detailedDesc:
        'Avid enthusiast of romantic comedies, immersive ocean-themed and slice-of-life anime series, appreciating expressive narrative arcs, visual direction, and emotional musical scores.',
      keywords: ['Rom-com K-Dramas', 'Studio visuals', 'Soundtracks', 'Storytelling'],
    },
    {
      id: 'glam',
      title: 'Glam (Makeup Artistry & Skincare)',
      category: 'Cosmetic Art & Formulations',
      icon: 'Sparkles',
      shortDesc: 'Certified makeup artist specializing in eye makeup styling and cosmetic science.',
      detailedDesc:
        'Certified makeup artist focusing on precision eye styling, graphic liner techniques, color theory, and evaluating cosmetic formulations with pharmaceutical skin-safety awareness.',
      keywords: ['Eye artistry', 'Blending precision', 'Color theory', 'Dermatological care'],
    },
    {
      id: 'journaling',
      title: 'Aesthetic Journaling',
      category: 'Creative Expression & Reflection',
      icon: 'BookOpen',
      shortDesc: 'Curating reflections on fashion, culinary journeys, travel, and pharma concepts.',
      detailedDesc:
        'Analog and digital journaling documenting daily reflections, fashion styling, travel diaries, culinary reviews, and conceptual pharmaceutical study notes with artistic layouts.',
      keywords: ['Creative layouts', 'Fashion notes', 'Pharma insights', 'Visual memory'],
    },
    {
      id: 'foodie',
      title: 'Foodie (Culinary Exploration)',
      category: 'Culinary Arts & Food Chemistry',
      icon: 'Utensils',
      shortDesc: 'Exploring traditional culinary recipes, fusion flavors, and food chemistry.',
      detailedDesc:
        'Enthusiastic about heritage Bangladeshi dishes, experimental fusion cuisine, and investigating the molecular food chemistry behind flavors, spices, and bioavailability.',
      keywords: ['Heritage recipes', 'Spice chemistry', 'Fusion cooking', 'Flavor science'],
    },
  ] as PersonalInterestItem[],

  references: [
    {
      name: 'Dr. Md. Mofazzal Hossain',
      institution: 'University of Information Technology & Sciences',
      title: 'Associate Professor & Head, PhD in Medicinal Chemistry',
      phone: '+880 9678008487 Ext-309',
      email: 'mofazzal.hossain@uits.ac.bd',
    },
    {
      name: 'Md. Al Amin',
      institution: 'University of Information Technology & Sciences',
      title: 'Lecturer, Master of Pharmacy (Thesis), University of Rajshahi',
      phone: '+880 9678008487 Ext-310',
      email: 'md.alamin869@uits.edu.bd',
    },
  ],

  sectionTitles: {
    research: 'Pharmaceutical Research & Presentations',
    skills: 'Skills & Technical Knowledge',
    experience: 'Work Experience & Leadership',
    education: 'Academic Background',
    languages: 'Language Proficiency',
    about: 'Personal Passions & Creative Pursuits',
    references: 'Academic & Professional References',
    contact: 'Contact & Collaboration',
  },
};
