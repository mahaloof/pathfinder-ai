import json
from models import UserProfile, ActionPlan, MonthlyPlanItem
from utils import get_model

def generate_plan(user_profile: UserProfile, goal_override: str = None) -> UserProfile:
    model = get_model()
    
    if not user_profile.ikigai_evaluation:
        raise ValueError("Ikigai evaluation missing. Run Agent 3 first.")
        
    optimal_path = user_profile.ikigai_evaluation.primary_recommendation
    reasoning = user_profile.ikigai_evaluation.reasoning_summary
    
    # Use context from previous agents
    context = f"""
    Target Path: {optimal_path}
    Reasoning for Selection: {reasoning}
    Goal: {goal_override or "Achieve proficiency and enter this field within 12 months"}
    Existing Skills: {[s.name for s in user_profile.analysis_result.core_skills]}
    Learning Style: {user_profile.analysis_result.learning_style}
    Cognitive Profile: {user_profile.analysis_result.cognitive_profile}
    """
    
    prompt = f"""
    You are a strategic academic and career planner.
    
    Context:
    {context}
    
    Task:
    Create a 12-month roadmap divided by month to achieve the goal.
    Include:
    1. Monthly goals & focus.
    2. Skills to learn in order.
    3. Projects to build.
    4. Internship/Experience plan.
    5. Weekly study structure (Hours/Routine).
    
    Output JSON schema:
    {{
      "year_goal": "...",
        "monthly_plan": [
        {{
          "month": "Month 1",
          "focus": "...",
          "skills": ["..."],
          "projects": ["..."],
          "milestones": ["..."]
        }}
      ],
      "weekly_structure": "...",
      "final_advice": "..."
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
        
        # Mappers for backward compatibility
        data["roadmap_overview"] = data["year_goal"]
        data["weekly_study_plan"] = data["weekly_structure"]
        data["project_suggestions"] = []
        data["monthly_roadmap"] = [] # Legacy field, kept empty
        
        for item in data.get("monthly_plan", []):
            # Aggregate projects
            data["project_suggestions"].extend(item.get("projects", []))

        data["internship_strategy"] = data["final_advice"]

        plan = ActionPlan(**data)
        user_profile.final_roadmap = plan
        return user_profile
        
    except Exception as e:
        print(f"Error generating plan: {e}")
        # print(f"Raw response: {response.text}")
        raise e
