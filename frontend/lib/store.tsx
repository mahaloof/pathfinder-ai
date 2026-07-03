"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, PersonalInfo, AcademicHistory, Values } from "./api";

// Initial Empty State
const initialProfile: UserProfile = {
  personal_info: { name: "Student" },
  academic_history: {
    subjects: [],
    grades_summary: "",
    strengths: [],
    weaknesses: [],
    favorite_subjects: [],
  },
  interests: [],
  hobbies: [],
  raw_resume_text: "",
  raw_dreams_text: "",
  user_stated_values: {
    money_importance: 5,
    impact_importance: 5,
    stability_importance: 5,
    creativity_importance: 5,
    work_life_balance: 5,
  },
  simulations: [],
};

interface AppContextType {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  currentStep: number;
  setCurrentStep: (s: number) => void;
  isLoading: boolean;
  setIsLoading: (l: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [currentStep, setCurrentStep] = useState(0); // 0=Intro, 1=Input, 2=Analysis, 3=Sim, 4=Ikigai, 5=Plan
  const [isLoading, setIsLoading] = useState(false);

  // Load from localStorage on mount (optional persistence)
  useEffect(() => {
    const saved = localStorage.getItem("pathfinder_profile");
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) { console.error("Failed to load profile", e) }
    }
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem("pathfinder_profile", JSON.stringify(profile));
  }, [profile]);

  return (
    <AppContext.Provider value={{ profile, setProfile, currentStep, setCurrentStep, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
