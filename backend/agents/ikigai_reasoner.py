import json
from models import UserProfile, IkigaiResult, IkigaiAnalysis
from utils import get_model

def reson_ikigai(user_profile: UserProfile) -> UserProfile:
    model = get_model()
    
    if not user_profile.simulations:
        raise ValueError("Simulations missing. Run Agent 2 first.")
    
    # Summarize simulations for prompt
    sim_summaries = []
    for sim in user_profile.simulations:
        sim_summaries.append(f"""
        Path: {sim.career_path}
        Outcome: {sim.final_outcome_summary}
        Skills Gained: {sim.skills_acquired}
        Salary: {sim.salary_trajectory}
        Satisfaction: {sim.satisfaction_score}
        """)
        
    analysis = user_profile.analysis_result
    
    prompt = f"""
    You are a life-path reasoning engine that identifies a student’s optimal zone of success.
    
    Student Profile:
    - Strengths: {analysis.core_strengths}
    - Interests: {user_profile.interests}
    - Values: {analysis.derived_values.dict()}
    
    Future Simulations (Outcomes):
    {json.dumps(sim_summaries, indent=2)}
    
    Tasks:
    1. Identify 'What the user LOVES' (Passions).
    2. Identify 'What the user is GOOD AT' (Strengths/Skills).
    3. Identify 'What PAYS WELL' (Market demand/Salary).
    4. Identify 'What the WORLD NEEDS' (Impact/Relevance).
    
    5. Find the INTERSECTION ZONE (Ikigai).
    6. Rank the Top 3 optimal paths.
    7. Select the ONE primary recommendation.
    
    8. Reason deeply: Why this path? (Strength alignment, Market alignment, Long-term satisfaction).
    
    Output JSON schema:
    {{
        "what_you_love": ["..."],
        "what_you_are_good_at": ["..."],
        "what_pays_well": ["..."],
        "what_world_needs": ["..."],
        "ikigai_zone": "Name/Description of the intersection",
        "top_3_paths": ["Path A", "Path B", "Path C"],
        "primary_recommendation": "The Winner",
        "reasoning_summary": "Detailed explanation..."
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
        
        result = IkigaiResult(**data)
        
        # Helper: Create a dummy IkigaiAnalysis object for the 'top_recommendation' 
        # field if needed by Planner agent to maintain backwards compat, 
        # OR we just update planner to read 'primary_recommendation'.
        # For now, we update the object, but let's just make sure Planner knows where to look.
        
        user_profile.ikigai_evaluation = result
        return user_profile
        
    except Exception as e:
        print(f"Error parsing ikigai: {e}")
        raise e
