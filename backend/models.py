from pydantic import BaseModel, Field
from typing import List, Optional, Dict

# --- Core Data Structures ---

class PersonalInfo(BaseModel):
    name: str = "Student"
    age: Optional[int] = None
    location: Optional[str] = None
    bio: Optional[str] = None

class AcademicHistory(BaseModel):
    subjects: List[str] = []
    grades_summary: str = ""
    strengths: List[str] = []
    weaknesses: List[str] = []
    favorite_subjects: List[str] = []

class Values(BaseModel):
    money_importance: int = Field(default=5, ge=1, le=10, description="Importance of high salary")
    impact_importance: int = Field(default=5, ge=1, le=10, description="Importance of social impact")
    stability_importance: int = Field(default=5, ge=1, le=10, description="Importance of job security")
    creativity_importance: int = Field(default=5, ge=1, le=10, description="Importance of creative freedom")
    work_life_balance: int = Field(default=5, ge=1, le=10, description="Importance of free time")

class CareerPreferences(BaseModel):
    preferred_industries: List[str] = []
    remote_work: bool = True
    willing_to_relocate: bool = False
    startup_vs_corporate: str = "Neutral"

# --- Agent Outputs ---

class Skill(BaseModel):
    name: str
    level: str = Field(description="Beginner, Intermediate, Advanced, Expert")

class AnalysisResult(BaseModel):
    """Output of Agent 1: Profile Analyzer"""
    core_strengths: List[str]
    weak_areas: List[str]
    learning_style: str
    cognitive_profile: str
    motivation_drivers: List[str]
    risk_profile: str
    summary_insights: str
    natural_language_explanation: str

    # Keep these for compatibility with other agents or map them in logic
    core_skills: List[Skill] = [] 
    derived_values: Values = Values()
    top_career_matches: List[str] = []

class YearSimulation(BaseModel):
    year: int
    title: str
    key_achievements: List[str]
    skills_acquired: List[str]
    salary_range: str
    stress_level: int = Field(ge=1, le=10)
    satisfaction_score: int = Field(ge=1, le=10)

class SimulationResult(BaseModel):
    """Output of Agent 2: Future Simulator (one per path)"""
    career_path: str
    yearly_timeline: List[YearSimulation]
    skills_acquired: List[str]
    salary_trajectory: str
    stress_level: str
    lifestyle: str
    market_demand: str
    failure_risk: str
    satisfaction_score: int = Field(ge=0, le=100)
    final_outcome_summary: str
    
    # Backwards compatibility / Mapping
    final_outcome: str = "" # Mapped from final_outcome_summary
    failure_risk_analysis: str = "" # Mapped from failure_risk
    lifestyle_description: str = "" # Mapped from lifestyle
    trajectory: List[YearSimulation] = [] # Mapped from yearly_timeline

class IkigaiDimension(BaseModel):
    dimension: str = Field(description="Love, Good At, Paid For, World Needs")
    score: int = Field(ge=1, le=10)
    reasoning: str

class IkigaiAnalysis(BaseModel):
    career_path: str
    dimensions: List[IkigaiDimension]
    total_ikigai_score: int
    intersection_zone_analysis: str

class IkigaiResult(BaseModel):
    """Output of Agent 3: Ikigai Reasoner"""
    what_you_love: List[str]
    what_you_are_good_at: List[str]
    what_pays_well: List[str]
    what_world_needs: List[str]
    ikigai_zone: str
    top_3_paths: List[str]
    primary_recommendation: str
    reasoning_summary: str
    
    # Backwards compatibility (Optional/Mapped)
    top_recommendation: Optional[IkigaiAnalysis] = None
    alternatives: List[IkigaiAnalysis] = []

class MonthlyPlanItem(BaseModel):
    month: str
    focus: str
    skills: List[str]
    projects: List[str]
    milestones: List[str]

class ActionPlan(BaseModel):
    """Output of Agent 4: Planner"""
    year_goal: str
    monthly_plan: List[MonthlyPlanItem]
    weekly_structure: str
    final_advice: str
    
    # Backwards compatibility
    roadmap_overview: str = "" # Mapped from year_goal
    weekly_study_plan: str = "" # Mapped from weekly_structure
    monthly_roadmap: List[MonthlyPlanItem] = [] # Mapped from monthly_plan
    project_suggestions: List[str] = [] # Mapped from projects
    internship_strategy: str = "" # Mapped from advice

# --- Unified User Profile (The Source of Truth) ---

class UserProfile(BaseModel):
    # Raw Inputs
    personal_info: PersonalInfo
    academic_history: AcademicHistory
    interests: List[str] = []
    hobbies: List[str] = []
    raw_resume_text: str = ""
    raw_dreams_text: str = ""
    user_stated_values: Optional[Values] = None
    
    # Agent Outputs (State)
    analysis_result: Optional[AnalysisResult] = None
    simulations: List[SimulationResult] = []
    simulations_comparison_text: str = "" # Agent 2 Comparison
    ikigai_evaluation: Optional[IkigaiResult] = None
    final_roadmap: Optional[ActionPlan] = None
