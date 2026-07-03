export interface PersonalInfo {
  name: string;
  age?: number;
  location?: string;
  bio?: string;
}

export interface AcademicHistory {
  subjects: string[];
  grades_summary: string;
  strengths: string[];
  weaknesses: string[];
  favorite_subjects: string[];
}

export interface Values {
  money_importance: number;
  impact_importance: number;
  stability_importance: number;
  creativity_importance: number;
  work_life_balance: number;
}

export interface AnalysisResult {
  core_strengths: string[];
  weak_areas: string[];
  learning_style: string;
  cognitive_profile: string;
  motivation_drivers: string[];
  risk_profile: string;
  summary_insights: string;
  natural_language_explanation: string;
  top_career_matches: string[];
}

export interface YearSimulation {
  year: number;
  title: string;
  key_achievements: string[];
  skills_acquired: string[];
  salary_range: string;
  stress_level: number;
  satisfaction_score: number;
}

export interface SimulationResult {
  career_path: string;
  yearly_timeline: YearSimulation[];
  skills_acquired: string[];
  salary_trajectory: string;
  stress_level: string;
  lifestyle: string;
  market_demand: string;
  failure_risk: string;
  satisfaction_score: number;
  final_outcome_summary: string;
}

export interface IkigaiResult {
  what_you_love: string[];
  what_you_are_good_at: string[];
  what_pays_well: string[];
  what_world_needs: string[];
  ikigai_zone: string;
  top_3_paths: string[];
  primary_recommendation: string;
  reasoning_summary: string;
}

export interface MonthlyPlanItem {
  month: string;
  focus: string;
  skills: string[];
  projects: string[];
  milestones: string[];
}

export interface ActionPlan {
  year_goal: string;
  monthly_plan: MonthlyPlanItem[];
  weekly_structure: string;
  final_advice: string;
}

export interface UserProfile {
  personal_info: PersonalInfo;
  academic_history: AcademicHistory;
  interests: string[];
  hobbies: string[];
  raw_resume_text: string;
  raw_dreams_text: string;
  user_stated_values?: Values;
  
  analysis_result?: AnalysisResult;
  simulations: SimulationResult[];
  simulations_comparison_text?: string;
  ikigai_evaluation?: IkigaiResult;
  final_roadmap?: ActionPlan;
}

// API Functions - All take and return the full UserProfile

const API_BASE = "http://localhost:8000/api";

export async function analyzeProfile(profile: UserProfile): Promise<UserProfile> {
  // Sanitize profile to remove state from previous runs to avoid backend validation errors
  const payload = {
    ...profile,
    analysis_result: undefined, // Send undefined to omit from JSON or null if backend accepts it
    simulations: [], 
    ikigai_evaluation: undefined,
    final_roadmap: undefined
  };

  const res = await fetch(`${API_BASE}/analyze-profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Analysis failed");
  return res.json();
}

export async function simulateFutures(profile: UserProfile): Promise<UserProfile> {
  const res = await fetch(`${API_BASE}/simulate-futures`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error("Simulation failed");
  return res.json();
}

export async function reasonIkigai(profile: UserProfile): Promise<UserProfile> {
  const res = await fetch(`${API_BASE}/reason-ikigai`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error("Ikigai reasoning failed");
  return res.json();
}

export async function generatePlan(profile: UserProfile): Promise<UserProfile> {
  const res = await fetch(`${API_BASE}/generate-plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error("Planning failed");
  return res.json();
}
