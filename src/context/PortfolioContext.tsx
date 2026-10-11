import React, { createContext, useContext, useState, useEffect } from 'react';
import { PORTFOLIO_DATA, ResearchProject, WorkExperienceItem, EducationItem, ReferenceItem, PersonalInterestItem, LanguageProficiency, CertificationItem, ExtraCurricularItem, AffiliationItem } from '../data/portfolioData';

export interface PortfolioData {
  profile: typeof PORTFOLIO_DATA.profile & { customCvUrl?: string; customCvName?: string };
  coreCompetencies: string[];
  softSkills: string[];
  computerLiteracy: string[];
  education: EducationItem[];
  researchProjects: ResearchProject[];
  certifications: CertificationItem[];
  workExperience: WorkExperienceItem[];
  entrepreneurialExperience: WorkExperienceItem[];
  extraCurricular: ExtraCurricularItem[];
  affiliations: AffiliationItem[];
  personalDetails: typeof PORTFOLIO_DATA.personalDetails;
  languages: LanguageProficiency[];
  personalInterests: PersonalInterestItem[];
  references: ReferenceItem[];
  sectionTitles: typeof PORTFOLIO_DATA.sectionTitles;
}

interface PortfolioContextType {
  data: PortfolioData;
  updateProfile: (profile: Partial<PortfolioData['profile']>) => void;
  updateCoreCompetencies: (competencies: string[]) => void;
  updateSoftSkills: (skills: string[]) => void;
  updateComputerLiteracy: (tools: string[]) => void;
  updateEducation: (education: EducationItem[]) => void;
  updateResearchProjects: (projects: ResearchProject[]) => void;
  updateCertifications: (certs: CertificationItem[]) => void;
  updateWorkExperience: (work: WorkExperienceItem[]) => void;
  updateEntrepreneurial: (ent: WorkExperienceItem[]) => void;
  updateExtraCurricular: (extra: ExtraCurricularItem[]) => void;
  updateAffiliations: (aff: AffiliationItem[]) => void;
  updatePersonalDetails: (details: Partial<PortfolioData['personalDetails']>) => void;
  updateLanguages: (languages: LanguageProficiency[]) => void;
  updatePersonalInterests: (interests: PersonalInterestItem[]) => void;
  updateReferences: (references: ReferenceItem[]) => void;
  updateSectionTitles: (titles: Partial<typeof PORTFOLIO_DATA.sectionTitles>) => void;
  resetToDefault: () => void;
}

const STORAGE_KEY = 'lubna_portfolio_data_v1';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Automatically migrate headline, subtitle, whatsapp, instagram if they had old defaults
        const mergedProfile = { ...PORTFOLIO_DATA.profile, ...(parsed.profile || {}) };
        if (mergedProfile.headline === 'B.Pharm Student | Pharmaceutical Research, Drug Information & Medical Writing') {
          mergedProfile.headline = PORTFOLIO_DATA.profile.headline;
        }
        if (mergedProfile.subtitle === '4th-Year B.Pharm Student' || !mergedProfile.subtitle) {
          mergedProfile.subtitle = 'Pharmacy Student';
        }
        if (mergedProfile.whatsapp === '+8801339591307' || mergedProfile.whatsapp === '+88 0133 95 91 307') {
          mergedProfile.whatsapp = '+880 1537-720007';
          mergedProfile.whatsappUrl = 'https://wa.me/8801537720007';
        }
        if (mergedProfile.instagramUrl === 'https://www.instagram.com/' || !mergedProfile.instagramUrl) {
          mergedProfile.instagramUrl = 'https://www.instagram.com/thisisrufaida';
        }
        if (!mergedProfile.bloggerUrl) {
          mergedProfile.bloggerUrl = 'https://www.blogger.com';
        }
        if (!mergedProfile.customSocialLinks) {
          mergedProfile.customSocialLinks = [];
        }

        const mergedSectionTitles = { ...PORTFOLIO_DATA.sectionTitles, ...(parsed.sectionTitles || {}) };
        if (mergedSectionTitles.about === 'Beyond the Laboratory & Profile') {
          mergedSectionTitles.about = 'Personal Passions & Creative Pursuits';
        }

        return {
          ...PORTFOLIO_DATA,
          ...parsed,
          profile: mergedProfile,
          languages: parsed.languages && parsed.languages.length > 0 ? parsed.languages : PORTFOLIO_DATA.languages,
          sectionTitles: mergedSectionTitles,
        };
      }
    } catch (e) {
      console.error('Failed to load portfolio data from localStorage', e);
    }
    return PORTFOLIO_DATA as PortfolioData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio data to localStorage', e);
    }
  }, [data]);

  const updateProfile = (profileUpdate: Partial<PortfolioData['profile']>) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profileUpdate }
    }));
  };

  const updateCoreCompetencies = (coreCompetencies: string[]) => {
    setData(prev => ({ ...prev, coreCompetencies }));
  };

  const updateSoftSkills = (softSkills: string[]) => {
    setData(prev => ({ ...prev, softSkills }));
  };

  const updateComputerLiteracy = (computerLiteracy: string[]) => {
    setData(prev => ({ ...prev, computerLiteracy }));
  };

  const updateEducation = (education: EducationItem[]) => {
    setData(prev => ({ ...prev, education }));
  };

  const updateResearchProjects = (researchProjects: ResearchProject[]) => {
    setData(prev => ({ ...prev, researchProjects }));
  };

  const updateCertifications = (certifications: { title: string; issuer: string; year: string }[]) => {
    setData(prev => ({ ...prev, certifications }));
  };

  const updateWorkExperience = (workExperience: WorkExperienceItem[]) => {
    setData(prev => ({ ...prev, workExperience }));
  };

  const updateEntrepreneurial = (entrepreneurialExperience: WorkExperienceItem[]) => {
    setData(prev => ({ ...prev, entrepreneurialExperience }));
  };

  const updateExtraCurricular = (extraCurricular: ExtraCurricularItem[]) => {
    setData(prev => ({ ...prev, extraCurricular }));
  };

  const updateAffiliations = (affiliations: AffiliationItem[]) => {
    setData(prev => ({ ...prev, affiliations }));
  };

  const updatePersonalDetails = (personalDetailsUpdate: Partial<PortfolioData['personalDetails']>) => {
    setData(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, ...personalDetailsUpdate }
    }));
  };

  const updateLanguages = (languages: LanguageProficiency[]) => {
    setData(prev => ({ ...prev, languages }));
  };

  const updatePersonalInterests = (personalInterests: PersonalInterestItem[]) => {
    setData(prev => ({ ...prev, personalInterests }));
  };

  const updateReferences = (references: ReferenceItem[]) => {
    setData(prev => ({ ...prev, references }));
  };

  const updateSectionTitles = (titlesUpdate: Partial<typeof PORTFOLIO_DATA.sectionTitles>) => {
    setData(prev => ({
      ...prev,
      sectionTitles: { ...prev.sectionTitles, ...titlesUpdate }
    }));
  };

  const resetToDefault = () => {
    setData(PORTFOLIO_DATA as PortfolioData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateProfile,
        updateCoreCompetencies,
        updateSoftSkills,
        updateComputerLiteracy,
        updateEducation,
        updateResearchProjects,
        updateCertifications,
        updateWorkExperience,
        updateEntrepreneurial,
        updateExtraCurricular,
        updateAffiliations,
        updatePersonalDetails,
        updateLanguages,
        updatePersonalInterests,
        updateReferences,
        updateSectionTitles,
        resetToDefault,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
