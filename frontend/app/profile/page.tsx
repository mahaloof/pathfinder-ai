"use client";

import { useApp } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { analyzeProfile, Values } from "@/lib/api";

export default function ProfilePage() {
  const { profile, setProfile, setCurrentStep, setIsLoading, isLoading } = useApp();
  const router = useRouter();

  // Local state for list inputs to avoid cursor jumping
  const [subjectsInput, setSubjectsInput] = useState("");
  const [strengthsInput, setStrengthsInput] = useState("");
  const [weaknessesInput, setWeaknessesInput] = useState("");
  const [interestsInput, setInterestsInput] = useState("");

  useEffect(() => { 
      setCurrentStep(1); 
      // Initialize local state from profile on mount
      if (profile) {
        setSubjectsInput(profile.academic_history.subjects.join(", "));
        setStrengthsInput(profile.academic_history.strengths.join(", "));
        setWeaknessesInput(profile.academic_history.weaknesses.join(", "));
        setInterestsInput(profile.interests.join(", "));
      }
  }, [setCurrentStep, profile]);

  // Helper to split string into array
  const parseList = (str: string) => str.split(",").map(s => s.trim()).filter(Boolean);

  const handleBlur = (field: string, value: string) => {
      // Update global profile on blur
      if (field === 'subjects') {
          setProfile({
              ...profile,
              academic_history: { ...profile.academic_history, subjects: parseList(value) }
          });
      } else if (field === 'strengths') {
          setProfile({
              ...profile,
              academic_history: { ...profile.academic_history, strengths: parseList(value) }
          });
      } else if (field === 'weaknesses') {
          setProfile({
              ...profile,
              academic_history: { ...profile.academic_history, weaknesses: parseList(value) }
          });
      } else if (field === 'interests') {
          setProfile({ ...profile, interests: parseList(value) });
      }
  };

  const handleChange = (section: keyof typeof profile, field: string, value: any) => {
    const sectionData = profile[section] as any || {}; 
    setProfile({
        ...profile,
        [section]: {
            ...sectionData,
            [field]: value
        }
    });
  };

  const handleSimpleChange = (field: string, value: any) => {
      setProfile({ ...profile, [field]: value });
  };
  
  const handleValuesChange = (field: string, value: number) => {
      setProfile({
          ...profile,
          user_stated_values: {
              ...profile.user_stated_values as Values, // Cast to verify
              [field]: value
          }
      });
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Ensure local state is synced before sending (in case they didn't blur)
      const p = { ...profile };
      p.academic_history.subjects = parseList(subjectsInput);
      p.academic_history.strengths = parseList(strengthsInput);
      p.academic_history.weaknesses = parseList(weaknessesInput);
      p.interests = parseList(interestsInput);
      
      const updatedProfile = await analyzeProfile(p);
      setProfile(updatedProfile);
      setCurrentStep(2);
      router.push("/analysis");
    } catch (error) {
      alert("Analysis failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return (
      <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Analyze Profile...</p>
      </div>
  );

  return (
    <div className="section-fade max-w-3xl mx-auto">
      <h2 className="text-center">Tell Us About Yourself</h2>
      
      <div className="card">
        <h3>Personal Info</h3>
        <input 
            type="text" 
            placeholder="Your Name" 
            value={profile.personal_info.name}
            onChange={(e) => handleChange('personal_info', 'name', e.target.value)}
        />
        <textarea 
            placeholder="Short Bio / Background" 
            rows={3}
            value={profile.personal_info.bio || ""}
            onChange={(e) => handleChange('personal_info', 'bio', e.target.value)}
        />
      </div>

      <div className="card">
        <h3>Academic History</h3>
        <label>Recent Subjects (Year 11/12 or University)</label>
        <input 
            type="text" 
            placeholder="e.g., Math, Physics, Art, History"
            value={subjectsInput}
            onChange={(e) => setSubjectsInput(e.target.value)}
            onBlur={(e) => handleBlur('subjects', e.target.value)}
        />
        <label>Grades Summary</label>
        <input 
             type="text" 
             placeholder="e.g., Mostly As, B average, High Distinction" 
             value={profile.academic_history.grades_summary}
             onChange={(e) => handleChange('academic_history', 'grades_summary', e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label>Strong Subjects</label>
                <input 
                    type="text" 
                    value={strengthsInput}
                    onChange={(e) => setStrengthsInput(e.target.value)}
                    onBlur={(e) => handleBlur('strengths', e.target.value)}
                />
            </div>
             <div>
                <label>Challenging Subjects</label>
                <input 
                    type="text" 
                    value={weaknessesInput}
                    onChange={(e) => setWeaknessesInput(e.target.value)}
                    onBlur={(e) => handleBlur('weaknesses', e.target.value)}
                />
            </div>
        </div>
      </div>

      <div className="card">
         <h3>Interests & Aspirations</h3>
         <label>Hobbies & Interests</label>
          <input 
             type="text" 
             placeholder="Gaming, Reading Sci-Fi, Coding, Basketball..." 
             value={interestsInput}
             onChange={(e) => setInterestsInput(e.target.value)}
             onBlur={(e) => handleBlur('interests', e.target.value)}
          />
         <label>Dreams & Goals (Resume Text)</label>
         <textarea 
            rows={4} 
            placeholder="Paste your Resume summary or describe your dream career..."
            value={profile.raw_resume_text}
            onChange={(e) => handleSimpleChange('raw_resume_text', e.target.value)}
         />
      </div>

      <div className="card">
          <h3>Your Values (1-10)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                  {k: 'money_importance', l: 'Money & Wealth'},
                  {k: 'impact_importance', l: 'Social Impact'},
                  {k: 'stability_importance', l: 'Stability & Security'},
                  {k: 'creativity_importance', l: 'Creativity'},
                  {k: 'work_life_balance', l: 'Work-Life Balance'},
              ].map(v => (
                  <div key={v.k}>
                      <label className="flex justify-between">
                          <span>{v.l}</span>
                          <span className="font-bold text-accent">{profile.user_stated_values![v.k as keyof Values]}</span>
                      </label>
                      <input 
                        type="range" min="1" max="10" 
                        value={profile.user_stated_values![v.k as keyof Values]}
                        onChange={(e) => handleValuesChange(v.k, parseInt(e.target.value))}
                      />
                  </div>
              ))}
          </div>
      </div>

      <div className="text-center">
          <button onClick={handleSubmit} className="btn btn-primary px-12 py-4 text-xl">
              Analyze Profile →
          </button>
      </div>
    </div>
  );
}
