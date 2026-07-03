import json
from typing import List
from models import UserProfile, SimulationResult, YearSimulation
from utils import get_model

def batch_simulate(user_profile: UserProfile, paths: List[str]) -> UserProfile:
    model = get_model()
    
    if not user_profile.analysis_result:
        raise ValueError("Profile analysis missing. Run Agent 1 first.")
    
    analysis = user_profile.analysis_result
    
    prompt = f"""
    You are a long-horizon career outcome simulator.
    
    Student Profile:
    - Core Strengths: {analysis.core_strengths}
    - Cognitive Profile: {analysis.cognitive_profile}
    - Values: {analysis.derived_values.dict()}
    - Risk Profile: {analysis.risk_profile}
    - Weak Areas: {analysis.weak_areas}
    
    Target Career Paths: {paths}
    
    Task:
    For EACH path, simulate a realistic 5-year trajectory.
    1. Year-by-year progression (Progression, Roles, Achievements)
    2. Skills acquired
    3. Salary growth (relative)
    4. Stress level (Low/Medium/High)
    5. Lifestyle quality
    6. Market demand
    7. Failure risk
    8. Satisfaction score (1-10)
    
    ALSO: Generate a "comparison_text" that compares all paths and offers a natural language explanation to the student.
    
    Output JSON schema:
    {{
      "simulations": [
          {{
            "career_path": "Path Name",
            "yearly_timeline": [
                {{
                    "year": 1,
                    "title": "...",
                    "key_achievements": ["..."],
                    "skills_acquired": ["..."],
                    "salary_range": "...",
                    "stress_level": 5,
                    "satisfaction_score": 7
                }}
            ],
            "skills_acquired": ["..."],
            "salary_trajectory": "...",
            "stress_level": "High",
            "lifestyle": "...",
            "market_demand": "...",
            "failure_risk": "...",
            "satisfaction_score": 8,
            "final_outcome_summary": "..."
          }}
      ],
      "comparison_text": "Detailed comparison and explanation..."
    }}
    """
    
    response = model.generate_content(
        prompt,
        generation_config={"response_mime_type": "application/json"}
    )
    
    try:
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:-3]
        data = json.loads(text)
        
        sim_results = []
        for sim_data in data["simulations"]:
            # Map for compatibility
            sim_data["trajectory"] = sim_data["yearly_timeline"]
            sim_data["final_outcome"] = sim_data["final_outcome_summary"]
            sim_data["failure_risk_analysis"] = sim_data["failure_risk"]
            sim_data["lifestyle_description"] = sim_data["lifestyle"]
            
            sim_results.append(SimulationResult(**sim_data))
            
        user_profile.simulations = sim_results
        user_profile.simulations_comparison_text = data.get("comparison_text", "")
        
        return user_profile
        
    except Exception as e:
        print(f"Error simulating future: {e}")
        # print(f"Raw response: {response.text}")
        raise e
