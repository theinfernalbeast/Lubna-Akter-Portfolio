import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  X, User, Award, BookOpen, Briefcase, GraduationCap, Heart, 
  Settings, Save, RotateCcw, Download, Upload, Plus, Trash2, CheckCircle2, Lock, Image as ImageIcon, Type, UserCheck, Languages 
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { data, updateProfile, updateCoreCompetencies, updateSoftSkills, updateComputerLiteracy, 
          updateEducation, updateResearchProjects, updateCertifications, updateWorkExperience, 
          updateEntrepreneurial, updateExtraCurricular, updatePersonalDetails, updateLanguages, updatePersonalInterests, 
          updateReferences, updateSectionTitles, resetToDefault } = usePortfolio();
  
  const { isClinical } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'education' | 'research' | 'experience' | 'languages' | 'interests' | 'references' | 'titles' | 'settings'>('profile');
  const [successMessage, setSuccessMessage] = useState('');

  // Local editing states
  const [profile, setProfile] = useState(data.profile);
  const [coreComps, setCoreComps] = useState([...data.coreCompetencies]);
  const [softSkills, setSoftSkills] = useState([...data.softSkills]);
  const [computerTools, setComputerTools] = useState([...data.computerLiteracy]);
  const [education, setEducation] = useState([...data.education]);
  const [researchProjects, setResearchProjects] = useState([...data.researchProjects]);
  const [workExp, setWorkExp] = useState([...data.workExperience]);
  const [entExp, setEntExp] = useState([...data.entrepreneurialExperience]);
  const [personalDetails, setPersonalDetails] = useState({ ...data.personalDetails });
  const [languages, setLanguages] = useState([...(data.languages || [])]);
  const [interests, setInterests] = useState([...data.personalInterests]);
  const [references, setReferences] = useState([...data.references]);
  const [certs, setCerts] = useState([...data.certifications]);
  const [sectionTitles, setSectionTitles] = useState({ ...data.sectionTitles });

  // Password change state
  const [newAdminPwd, setNewAdminPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');

  if (!isOpen) return null;

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3500);
  };

  const handleSaveAll = () => {
    updateProfile(profile);
    updateCoreCompetencies(coreComps.filter(Boolean));
    updateSoftSkills(softSkills.filter(Boolean));
    updateComputerLiteracy(computerTools.filter(Boolean));
    updateEducation(education);
    updateResearchProjects(researchProjects);
    updateWorkExperience(workExp);
    updateEntrepreneurial(entExp);
    updatePersonalDetails(personalDetails);
    updateLanguages(languages);
    updatePersonalInterests(interests);
    updateReferences(references);
    updateCertifications(certs);
    updateSectionTitles(sectionTitles);
    showSuccess('Portfolio content updated and saved successfully!');
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `lubna_portfolio_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showSuccess('Portfolio JSON exported successfully!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.profile) {
            updateProfile(parsed.profile);
            if (parsed.coreCompetencies) updateCoreCompetencies(parsed.coreCompetencies);
            if (parsed.softSkills) updateSoftSkills(parsed.softSkills);
            if (parsed.computerLiteracy) updateComputerLiteracy(parsed.computerLiteracy);
            if (parsed.education) updateEducation(parsed.education);
            if (parsed.researchProjects) updateResearchProjects(parsed.researchProjects);
            if (parsed.certifications) updateCertifications(parsed.certifications);
            if (parsed.workExperience) updateWorkExperience(parsed.workExperience);
            if (parsed.entrepreneurialExperience) updateEntrepreneurial(parsed.entrepreneurialExperience);
            if (parsed.personalDetails) updatePersonalDetails(parsed.personalDetails);
            if (parsed.languages) updateLanguages(parsed.languages);
            if (parsed.personalInterests) updatePersonalInterests(parsed.personalInterests);
            if (parsed.references) updateReferences(parsed.references);
            
            setProfile(parsed.profile);
            if (parsed.coreCompetencies) setCoreComps([...parsed.coreCompetencies]);
            if (parsed.softSkills) setSoftSkills([...parsed.softSkills]);
            if (parsed.computerLiteracy) setComputerTools([...parsed.computerLiteracy]);
            if (parsed.education) setEducation([...parsed.education]);
            if (parsed.researchProjects) setResearchProjects([...parsed.researchProjects]);
            if (parsed.workExperience) setWorkExp([...parsed.workExperience]);
            if (parsed.entrepreneurialExperience) setEntExp([...parsed.entrepreneurialExperience]);
            if (parsed.personalDetails) setPersonalDetails({ ...parsed.personalDetails });
            if (parsed.languages) setLanguages([...parsed.languages]);
            if (parsed.personalInterests) setInterests([...parsed.personalInterests]);
            if (parsed.references) setReferences([...parsed.references]);
            if (parsed.certifications) setCerts([...parsed.certifications]);

            showSuccess('Portfolio data imported successfully!');
          } else {
            alert('Invalid portfolio backup file format.');
          }
        } catch (err) {
          alert('Error parsing JSON file.');
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className={`relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl border ${
        isClinical ? 'bg-white text-slate-800 border-purple-200' : 'bg-slate-900 text-slate-100 border-purple-900/50'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${isClinical ? 'border-purple-100 bg-purple-50/50' : 'border-purple-900/30 bg-purple-950/20'}`}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-500/30">
              <Settings className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif">Portfolio Content & Image Editor Dashboard</h2>
              <p className="text-xs text-purple-500 font-medium">Password Protected · Live CV & Image Customizer</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {successMessage && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" /> {successMessage}
              </span>
            )}
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-lg shadow-purple-600/30 hover:opacity-90 transition-all text-sm"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors ${isClinical ? 'border-slate-200 hover:bg-slate-100' : 'border-slate-700 hover:bg-slate-800'}`}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="sm:hidden flex items-center justify-center gap-1.5 text-xs font-semibold p-2 bg-emerald-500/10 text-emerald-500 border-b border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" /> {successMessage}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className={`flex overflow-x-auto gap-2 p-3 border-b scrollbar-none ${isClinical ? 'border-slate-100 bg-slate-50' : 'border-slate-800 bg-slate-950/50'}`}>
          {[
            { id: 'profile', label: 'Profile & Photos', icon: User },
            { id: 'skills', label: 'Skills & Competencies', icon: Award },
            { id: 'education', label: 'Education', icon: GraduationCap },
            { id: 'research', label: 'Research Projects & Images', icon: BookOpen },
            { id: 'experience', label: 'Work & Experience', icon: Briefcase },
            { id: 'languages', label: 'Languages', icon: Languages },
            { id: 'interests', label: 'Passions & Interests', icon: Heart },
            { id: 'references', label: 'Academic References', icon: UserCheck },
            { id: 'titles', label: 'Section Titles', icon: Type },
            { id: 'settings', label: 'Security & Backup', icon: Lock },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : isClinical
                    ? 'hover:bg-slate-200 text-slate-600'
                    : 'hover:bg-slate-800 text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2 border-purple-500/20">Profile & Image Customization</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Subtitle / Title</label>
                  <input
                    type="text"
                    value={profile.subtitle}
                    onChange={e => setProfile({ ...profile, subtitle: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Headline</label>
                  <input
                    type="text"
                    value={profile.headline}
                    onChange={e => setProfile({ ...profile, headline: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
                <div className="md:col-span-2 p-4 rounded-xl border bg-slate-950/60 border-purple-500/30">
                  <label className="block text-xs font-semibold mb-1 text-purple-400 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-purple-400" /> Upload Updated CV / Resume (PDF) from PC or Device
                  </label>
                  <p className="text-[11px] text-slate-400 mb-2">Whenever you update your CV, upload it here so visitors can download your latest CV instantly.</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const base64Str = event.target?.result as string;
                            setProfile({ ...profile, customCvUrl: base64Str, customCvName: file.name });
                            showSuccess(`CV "${file.name}" uploaded successfully!`);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                    />
                    {profile.customCvUrl && (
                      <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Latest CV Active ({profile.customCvName || 'Uploaded'})
                      </span>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-purple-500 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-purple-400" /> Profile Photo (Paste URL or Upload from PC)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={profile.photoUrl}
                      onChange={e => setProfile({ ...profile, photoUrl: e.target.value })}
                      placeholder="Enter image URL..."
                      className={`flex-1 p-3 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                    />
                    <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 cursor-pointer shrink-0">
                      <Upload className="w-4 h-4" /> Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const base64Str = event.target?.result as string;
                              setProfile({ ...profile, photoUrl: base64Str });
                              showSuccess('Profile photo uploaded from PC!');
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={e => setProfile({ ...profile, email: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Phone Number</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">WhatsApp Number</label>
                  <input
                    type="text"
                    value={profile.whatsapp}
                    onChange={e => setProfile({ ...profile, whatsapp: e.target.value, whatsappUrl: `https://wa.me/${e.target.value.replace(/[^0-9]/g, '')}` })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={e => setProfile({ ...profile, location: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">LinkedIn Text</label>
                  <input
                    type="text"
                    value={profile.linkedin}
                    onChange={e => setProfile({ ...profile, linkedin: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Facebook URL</label>
                  <input
                    type="text"
                    value={profile.facebookUrl}
                    onChange={e => setProfile({ ...profile, facebookUrl: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Instagram URL</label>
                  <input
                    type="text"
                    value={profile.instagramUrl}
                    onChange={e => setProfile({ ...profile, instagramUrl: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Google Blogger URL</label>
                  <input
                    type="text"
                    value={profile.bloggerUrl || ''}
                    onChange={e => setProfile({ ...profile, bloggerUrl: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">LinkedIn URL</label>
                  <input
                    type="text"
                    value={profile.linkedinUrl}
                    onChange={e => setProfile({ ...profile, linkedinUrl: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>

                {/* Additional Dynamic Social Media Links */}
                <div className="md:col-span-2 pt-3 border-t border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-semibold text-purple-400">Additional Social Media Links</h4>
                      <p className="text-xs text-slate-400">Add any other social channels (YouTube, GitHub, Medium, Threads, etc.)</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const current = profile.customSocialLinks || [];
                        setProfile({
                          ...profile,
                          customSocialLinks: [...current, { id: 'soc-' + Date.now(), platform: 'New Platform', url: 'https://' }]
                        });
                      }}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 font-medium cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Social Media Link
                    </button>
                  </div>

                  <div className="space-y-2">
                    {(profile.customSocialLinks || []).map((link, sIdx) => (
                      <div key={link.id || sIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Platform Name (e.g. YouTube)"
                          value={link.platform}
                          onChange={e => {
                            const updated = [...(profile.customSocialLinks || [])];
                            updated[sIdx] = { ...updated[sIdx], platform: e.target.value };
                            setProfile({ ...profile, customSocialLinks: updated });
                          }}
                          className={`w-1/3 p-2.5 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                        />
                        <input
                          type="text"
                          placeholder="URL (https://...)"
                          value={link.url}
                          onChange={e => {
                            const updated = [...(profile.customSocialLinks || [])];
                            updated[sIdx] = { ...updated[sIdx], url: e.target.value };
                            setProfile({ ...profile, customSocialLinks: updated });
                          }}
                          className={`flex-1 p-2.5 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (profile.customSocialLinks || []).filter((_, i) => i !== sIdx);
                            setProfile({ ...profile, customSocialLinks: updated });
                          }}
                          className="p-2.5 rounded-xl text-red-500 hover:bg-red-500/10 border border-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Professional Summary Bio</label>
                  <textarea
                    rows={4}
                    value={profile.summary}
                    onChange={e => setProfile({ ...profile, summary: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Core Pharmaceutical Competencies</h3>
                  <button
                    onClick={() => setCoreComps([...coreComps, 'New Competency'])}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Competency
                  </button>
                </div>
                <div className="space-y-2">
                  {coreComps.map((comp, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={comp}
                        onChange={e => {
                          const updated = [...coreComps];
                          updated[index] = e.target.value;
                          setCoreComps(updated);
                        }}
                        className={`flex-1 p-2.5 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                      />
                      <button
                        onClick={() => setCoreComps(coreComps.filter((_, i) => i !== index))}
                        className="p-2.5 rounded-xl text-red-500 hover:bg-red-500/10 border border-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Professional Soft Skills</h3>
                  <button
                    onClick={() => setSoftSkills([...softSkills, 'New Soft Skill'])}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Soft Skill
                  </button>
                </div>
                <div className="space-y-2">
                  {softSkills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={e => {
                          const updated = [...softSkills];
                          updated[index] = e.target.value;
                          setSoftSkills(updated);
                        }}
                        className={`flex-1 p-2.5 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                      />
                      <button
                        onClick={() => setSoftSkills(softSkills.filter((_, i) => i !== index))}
                        className="p-2.5 rounded-xl text-red-500 hover:bg-red-500/10 border border-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Computer Literacy & Research Tools</h3>
                  <button
                    onClick={() => setComputerTools([...computerTools, 'New Tool'])}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Tool
                  </button>
                </div>
                <div className="space-y-2">
                  {computerTools.map((tool, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={tool}
                        onChange={e => {
                          const updated = [...computerTools];
                          updated[index] = e.target.value;
                          setComputerTools(updated);
                        }}
                        className={`flex-1 p-2.5 rounded-xl border text-sm ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800 text-white'}`}
                      />
                      <button
                        onClick={() => setComputerTools(computerTools.filter((_, i) => i !== index))}
                        className="p-2.5 rounded-xl text-red-500 hover:bg-red-500/10 border border-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Educational Qualifications</h3>
                <button
                  onClick={() => setEducation([...education, { discipline: 'New Degree', institution: 'Institution Name', yearStatus: '2026', result: 'GPA 5.00', badge: 'GPA 5.00' }])}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Education
                </button>
              </div>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className={`p-4 rounded-xl border ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'} space-y-3 relative`}>
                    <button
                      onClick={() => setEducation(education.filter((_, i) => i !== index))}
                      className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-10">
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Discipline / Degree</label>
                        <input
                          type="text"
                          value={edu.discipline}
                          onChange={e => {
                            const updated = [...education];
                            updated[index].discipline = e.target.value;
                            setEducation(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Institution</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={e => {
                            const updated = [...education];
                            updated[index].institution = e.target.value;
                            setEducation(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Year / Status</label>
                        <input
                          type="text"
                          value={edu.yearStatus}
                          onChange={e => {
                            const updated = [...education];
                            updated[index].yearStatus = e.target.value;
                            setEducation(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Result / Grade</label>
                        <input
                          type="text"
                          value={edu.result}
                          onChange={e => {
                            const updated = [...education];
                            updated[index].result = e.target.value;
                            setEducation(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'research' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Research Projects & Image Customization</h3>
                <button
                  onClick={() => setResearchProjects([...researchProjects, { id: 'new-' + Date.now(), title: 'New Research Project', role: 'Researcher', status: 'Ongoing', institution: 'UITS', description: 'Description', highlights: ['Highlight 1'], scientificDetails: 'Scientific details', image: '' }])}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Project
                </button>
              </div>
              <div className="space-y-6">
                {researchProjects.map((proj, index) => (
                  <div key={proj.id || index} className={`p-4 rounded-xl border ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'} space-y-3 relative`}>
                    <button
                      onClick={() => setResearchProjects(researchProjects.filter((_, i) => i !== index))}
                      className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-10">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Project Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={e => {
                            const updated = [...researchProjects];
                            updated[index].title = e.target.value;
                            setResearchProjects(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold mb-1 text-purple-500 flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-purple-400" /> Research Project Image (Paste URL or Upload from Device)
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={proj.image}
                            onChange={e => {
                              const updated = [...researchProjects];
                              updated[index].image = e.target.value;
                              setResearchProjects(updated);
                            }}
                            placeholder="Enter image URL..."
                            className={`flex-1 p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                          />
                          <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 cursor-pointer shrink-0">
                            <Upload className="w-3.5 h-3.5" /> Upload Image
                            <input
                              type="file"
                              accept="image/*"
                              onChange={e => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    const base64Str = event.target?.result as string;
                                    const updated = [...researchProjects];
                                    updated[index].image = base64Str;
                                    setResearchProjects(updated);
                                    showSuccess('Project image uploaded from device!');
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Role</label>
                        <input
                          type="text"
                          value={proj.role}
                          onChange={e => {
                            const updated = [...researchProjects];
                            updated[index].role = e.target.value;
                            setResearchProjects(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Status</label>
                        <input
                          type="text"
                          value={proj.status}
                          onChange={e => {
                            const updated = [...researchProjects];
                            updated[index].status = e.target.value;
                            setResearchProjects(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Description</label>
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={e => {
                            const updated = [...researchProjects];
                            updated[index].description = e.target.value;
                            setResearchProjects(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Pharmacological & Scientific Context</label>
                        <textarea
                          rows={2}
                          value={proj.scientificDetails || ''}
                          onChange={e => {
                            const updated = [...researchProjects];
                            updated[index].scientificDetails = e.target.value;
                            setResearchProjects(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>
                      <div className="md:col-span-2 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold text-purple-500">Key Highlights (Bullet Points)</label>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...researchProjects];
                              updated[index].highlights = [...(updated[index].highlights || []), 'New analytical highlight'];
                              setResearchProjects(updated);
                            }}
                            className="text-[11px] px-2 py-0.5 rounded bg-purple-600/80 text-white hover:bg-purple-600 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> Add Highlight
                          </button>
                        </div>
                        {(proj.highlights || []).map((hl, hlIdx) => (
                          <div key={hlIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={hl}
                              onChange={e => {
                                const updated = [...researchProjects];
                                const currentHls = [...(updated[index].highlights || [])];
                                currentHls[hlIdx] = e.target.value;
                                updated[index].highlights = currentHls;
                                setResearchProjects(updated);
                              }}
                              className={`flex-1 p-2 rounded-lg border text-xs ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...researchProjects];
                                updated[index].highlights = (updated[index].highlights || []).filter((_, i) => i !== hlIdx);
                                setResearchProjects(updated);
                              }}
                              className="p-1.5 text-red-400 hover:bg-red-500/10 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-8">
              {/* 1. Work Experience */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-purple-400">Work Experience</h3>
                  <button
                    onClick={() => setWorkExp([...workExp, { role: 'New Role', organization: 'Company Name', period: '2026', location: 'Dhaka, Bangladesh', points: ['Key accomplishment point'] }])}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Experience
                  </button>
                </div>
                <div className="space-y-4">
                  {workExp.map((job, index) => (
                    <div key={index} className={`p-4 rounded-xl border ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'} space-y-3 relative`}>
                      <button
                        onClick={() => setWorkExp(workExp.filter((_, i) => i !== index))}
                        className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-10">
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-purple-500">Role</label>
                          <input
                            type="text"
                            value={job.role}
                            onChange={e => {
                              const updated = [...workExp];
                              updated[index].role = e.target.value;
                              setWorkExp(updated);
                            }}
                            className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-purple-500">Organization</label>
                          <input
                            type="text"
                            value={job.organization}
                            onChange={e => {
                              const updated = [...workExp];
                              updated[index].organization = e.target.value;
                              setWorkExp(updated);
                            }}
                            className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-purple-500">Period</label>
                          <input
                            type="text"
                            value={job.period}
                            onChange={e => {
                              const updated = [...workExp];
                              updated[index].period = e.target.value;
                              setWorkExp(updated);
                            }}
                            className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-purple-500">Location</label>
                          <input
                            type="text"
                            value={job.location}
                            onChange={e => {
                              const updated = [...workExp];
                              updated[index].location = e.target.value;
                              setWorkExp(updated);
                            }}
                            className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Entrepreneurial Experience */}
              <div className="pt-4 border-t border-purple-500/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-indigo-400">Entrepreneurial Ventures</h3>
                  <button
                    onClick={() => setEntExp([...entExp, { role: 'Co-Founder', organization: 'Brand Name', period: '2026 - Present', location: 'Dhaka, Bangladesh', points: ['Venture initiative'] }])}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Venture
                  </button>
                </div>
                <div className="space-y-4">
                  {entExp.map((ent, index) => (
                    <div key={index} className={`p-4 rounded-xl border ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'} space-y-3 relative`}>
                      <button
                        onClick={() => setEntExp(entExp.filter((_, i) => i !== index))}
                        className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-10">
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-indigo-400">Role</label>
                          <input
                            type="text"
                            value={ent.role}
                            onChange={e => {
                              const updated = [...entExp];
                              updated[index].role = e.target.value;
                              setEntExp(updated);
                            }}
                            className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-indigo-400">Venture Name</label>
                          <input
                            type="text"
                            value={ent.organization}
                            onChange={e => {
                              const updated = [...entExp];
                              updated[index].organization = e.target.value;
                              setEntExp(updated);
                            }}
                            className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Training & Certifications */}
              <div className="pt-4 border-t border-purple-500/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-pink-400">Courses & Certifications</h3>
                  <button
                    onClick={() => setCerts([...certs, { title: 'Course Certification', issuer: 'Issuer / Organization', year: '2026' }])}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Certification
                  </button>
                </div>
                <div className="space-y-4">
                  {certs.map((cert, index) => (
                    <div key={index} className={`p-4 rounded-xl border ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'} space-y-3 relative`}>
                      <button
                        onClick={() => setCerts(certs.filter((_, i) => i !== index))}
                        className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-10">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold mb-1 text-pink-400">Certification Title</label>
                          <input
                            type="text"
                            value={cert.title}
                            onChange={e => {
                              const updated = [...certs];
                              updated[index].title = e.target.value;
                              setCerts(updated);
                            }}
                            className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1 text-pink-400">Issuer / Organization</label>
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={e => {
                              const updated = [...certs];
                              updated[index].issuer = e.target.value;
                              setCerts(updated);
                            }}
                            className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'languages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Language Proficiency & Percentages</h3>
                  <p className="text-xs text-slate-400">Set the proficiency percentage and fluency level for each language.</p>
                </div>
                <button
                  onClick={() => setLanguages([...languages, { id: 'lang-' + Date.now(), language: '', level: '', percentage: 70, description: '' }])}
                  className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 font-medium cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Language
                </button>
              </div>

              <div className="space-y-4">
                {languages.map((item, index) => (
                  <div key={item.id || index} className={`p-4 rounded-xl border ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'} space-y-3 relative`}>
                    <div className="flex items-center justify-between pr-2">
                      <span className="text-xs font-mono font-bold text-purple-400">
                        Language #{index + 1}: {item.language || 'Untitled'} ({item.percentage}%)
                      </span>
                      <button
                        onClick={() => setLanguages(languages.filter((_, i) => i !== index))}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors"
                        title="Delete language"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Language Name</label>
                        <input
                          type="text"
                          value={item.language}
                          onChange={e => {
                            const updated = [...languages];
                            updated[index].language = e.target.value;
                            setLanguages(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Fluency Level</label>
                        <input
                          type="text"
                          value={item.level}
                          onChange={e => {
                            const updated = [...languages];
                            updated[index].level = e.target.value;
                            setLanguages(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>

                      <div className="md:col-span-2 p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-purple-300">
                            Proficiency Percentage: <span className="font-mono font-bold text-purple-200 text-sm">{item.percentage}%</span>
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={item.percentage}
                            onChange={e => {
                              const updated = [...languages];
                              const val = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                              updated[index].percentage = val;
                              setLanguages(updated);
                            }}
                            className={`w-20 p-1.5 rounded-lg border text-center font-mono text-xs ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                          />
                        </div>

                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={item.percentage}
                          onChange={e => {
                            const updated = [...languages];
                            updated[index].percentage = parseInt(e.target.value) || 0;
                            setLanguages(updated);
                          }}
                          className="w-full accent-purple-500 cursor-pointer"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Description</label>
                        <input
                          type="text"
                          value={item.description || ''}
                          onChange={e => {
                            const updated = [...languages];
                            updated[index].description = e.target.value;
                            setLanguages(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'interests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Personal Interests</h3>
                <button
                  onClick={() => setInterests([...interests, { id: 'new-' + Date.now(), title: 'New Interest', category: 'Category', icon: 'Compass', shortDesc: 'Short desc', detailedDesc: 'Detailed desc', keywords: ['Keyword'] }])}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Interest
                </button>
              </div>
              <div className="space-y-4">
                {interests.map((interest, index) => (
                  <div key={interest.id || index} className={`p-4 rounded-xl border ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'} space-y-3 relative`}>
                    <button
                      onClick={() => setInterests(interests.filter((_, i) => i !== index))}
                      className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-10">
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Title</label>
                        <input
                          type="text"
                          value={interest.title}
                          onChange={e => {
                            const updated = [...interests];
                            updated[index].title = e.target.value;
                            setInterests(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Category</label>
                        <input
                          type="text"
                          value={interest.category}
                          onChange={e => {
                            const updated = [...interests];
                            updated[index].category = e.target.value;
                            setInterests(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Icon Emblem</label>
                        <select
                          value={interest.icon}
                          onChange={e => {
                            const updated = [...interests];
                            updated[index].icon = e.target.value;
                            setInterests(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-700 text-white'}`}
                        >
                          <option value="Compass">Compass (Travel & Exploration)</option>
                          <option value="Tv">Tv (Anime, Dramas & Media)</option>
                          <option value="Sparkles">Sparkles (Cosmetics & Glam)</option>
                          <option value="BookOpen">BookOpen (Journaling & Notes)</option>
                          <option value="Utensils">Utensils (Food & Culinary)</option>
                          <option value="Heart">Heart (Passion & Wellness)</option>
                        </select>
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Short Summary</label>
                        <input
                          type="text"
                          value={interest.shortDesc}
                          onChange={e => {
                            const updated = [...interests];
                            updated[index].shortDesc = e.target.value;
                            setInterests(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Detailed Reflection / Perspective</label>
                        <textarea
                          rows={2}
                          value={interest.detailedDesc}
                          onChange={e => {
                            const updated = [...interests];
                            updated[index].detailedDesc = e.target.value;
                            setInterests(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'references' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Academic & Professional References</h3>
                  <p className="text-xs text-slate-400">Add or manage recommendation referees on your portfolio.</p>
                </div>
                <button
                  onClick={() => setReferences([...references, { name: '', institution: '', title: '', phone: '', email: '' }])}
                  className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 font-medium cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Reference
                </button>
              </div>

              <div className="space-y-4">
                {references.map((ref, index) => (
                  <div key={index} className={`p-4 rounded-xl border ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'} space-y-3 relative`}>
                    <div className="flex items-center justify-between pr-2">
                      <span className="text-xs font-mono font-bold text-purple-400">
                        Reference #{index + 1}
                      </span>
                      <button
                        onClick={() => setReferences(references.filter((_, i) => i !== index))}
                        className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors"
                        title="Delete reference"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Referee Name</label>
                        <input
                          type="text"
                          value={ref.name}
                          onChange={e => {
                            const updated = [...references];
                            updated[index].name = e.target.value;
                            setReferences(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Designation / Title</label>
                        <input
                          type="text"
                          value={ref.title}
                          onChange={e => {
                            const updated = [...references];
                            updated[index].title = e.target.value;
                            setReferences(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Institution / University</label>
                        <input
                          type="text"
                          value={ref.institution}
                          onChange={e => {
                            const updated = [...references];
                            updated[index].institution = e.target.value;
                            setReferences(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Phone Number</label>
                        <input
                          type="text"
                          value={ref.phone}
                          onChange={e => {
                            const updated = [...references];
                            updated[index].phone = e.target.value;
                            setReferences(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold mb-1 text-purple-500">Email Address</label>
                        <input
                          type="email"
                          value={ref.email}
                          onChange={e => {
                            const updated = [...references];
                            updated[index].email = e.target.value;
                            setReferences(updated);
                          }}
                          className={`w-full p-2.5 rounded-lg border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'titles' && (
            <div className="space-y-4 max-w-xl mx-auto py-4">
              <h3 className="text-lg font-semibold text-center">Customize Section Titles</h3>
              <p className="text-xs text-slate-400 text-center mb-4">Change the headings of each section on your portfolio website.</p>
              
              <div className={`p-6 rounded-2xl border space-y-4 ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Research Section Title</label>
                  <input
                    type="text"
                    value={sectionTitles.research}
                    onChange={e => setSectionTitles({ ...sectionTitles, research: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Skills Section Title</label>
                  <input
                    type="text"
                    value={sectionTitles.skills}
                    onChange={e => setSectionTitles({ ...sectionTitles, skills: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Experience Section Title</label>
                  <input
                    type="text"
                    value={sectionTitles.experience}
                    onChange={e => setSectionTitles({ ...sectionTitles, experience: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Education Section Title</label>
                  <input
                    type="text"
                    value={sectionTitles.education}
                    onChange={e => setSectionTitles({ ...sectionTitles, education: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Language Section Title</label>
                  <input
                    type="text"
                    value={sectionTitles.languages || ''}
                    onChange={e => setSectionTitles({ ...sectionTitles, languages: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">About / Passions Section Title</label>
                  <input
                    type="text"
                    value={sectionTitles.about}
                    onChange={e => setSectionTitles({ ...sectionTitles, about: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">References Section Title</label>
                  <input
                    type="text"
                    value={sectionTitles.references || ''}
                    onChange={e => setSectionTitles({ ...sectionTitles, references: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-purple-500">Contact Section Title</label>
                  <input
                    type="text"
                    value={sectionTitles.contact || ''}
                    onChange={e => setSectionTitles({ ...sectionTitles, contact: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-700 text-white'}`}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-xl mx-auto py-6">
              <h3 className="text-lg font-semibold text-center">Security & Password Protection</h3>
              
              <div className={`p-6 rounded-2xl border space-y-4 ${isClinical ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                <div>
                  <h4 className="font-medium text-sm mb-1">Change Admin Dashboard Password</h4>
                  <p className="text-xs text-slate-400 mb-3">Set a custom password to protect the content editor.</p>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={newAdminPwd}
                      onChange={e => setNewAdminPwd(e.target.value)}
                      placeholder="Enter new password..."
                      className={`flex-1 p-2.5 rounded-xl border text-sm ${isClinical ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800 text-white'}`}
                    />
                    <button
                      onClick={() => {
                        if (newAdminPwd.trim().length >= 4) {
                          localStorage.setItem('lubna_admin_pwd', newAdminPwd.trim());
                          setNewAdminPwd('');
                          showSuccess('Admin password updated successfully!');
                        } else {
                          alert('Password must be at least 4 characters long.');
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Export Backup JSON</h4>
                    <p className="text-xs text-slate-400">Download all your portfolio content and images.</p>
                  </div>
                  <button
                    onClick={handleExportJSON}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-700"
                  >
                    <Download className="w-4 h-4" /> Export
                  </button>
                </div>

                <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Import Backup JSON</h4>
                    <p className="text-xs text-slate-400">Restore your portfolio data from backup.</p>
                  </div>
                  <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 cursor-pointer">
                    <Upload className="w-4 h-4" /> Import
                    <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                  </label>
                </div>

                <div className="pt-4 border-t border-red-500/20 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm text-red-500">Reset to Default</h4>
                    <p className="text-xs text-slate-400">Restore official default portfolio content.</p>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to reset all data to default?')) {
                        resetToDefault();
                        setProfile(PORTFOLIO_DATA.profile);
                        setCoreComps([...PORTFOLIO_DATA.coreCompetencies]);
                        setSoftSkills([...PORTFOLIO_DATA.softSkills]);
                        setComputerTools([...PORTFOLIO_DATA.computerLiteracy]);
                        setEducation([...PORTFOLIO_DATA.education]);
                        setResearchProjects([...PORTFOLIO_DATA.researchProjects]);
                        setWorkExp([...PORTFOLIO_DATA.workExperience]);
                        setEntExp([...PORTFOLIO_DATA.entrepreneurialExperience]);
                        setPersonalDetails({ ...PORTFOLIO_DATA.personalDetails });
                        setInterests([...PORTFOLIO_DATA.personalInterests]);
                        setReferences([...PORTFOLIO_DATA.references]);
                        setCerts([...PORTFOLIO_DATA.certifications]);
                        showSuccess('Portfolio reset to default!');
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/10 text-red-500 border border-red-500/30 text-sm font-medium hover:bg-red-600 hover:text-white transition-all"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between p-4 border-t ${isClinical ? 'border-purple-100 bg-purple-50/30' : 'border-purple-900/30 bg-purple-950/10'}`}>
          <p className="text-xs text-purple-500 font-medium">Changes are stored locally in your browser storage instantly.</p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 text-white font-medium text-sm hover:bg-purple-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
