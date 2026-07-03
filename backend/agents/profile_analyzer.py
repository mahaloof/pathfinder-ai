import json
from models import UserProfile, AnalysisResult, Skill
from utils import get_model

def analyze_profile(user_profile: UserProfile) -> UserProfile:
    model = get_model()
    
    # Construct rich context
    context = f"""
    Name: {user_profile.personal_info.name}
    Academic History: {user_profile.academic_history.dict()}
    Resume Text: {user_profile.raw_resume_text}
    Interests: {user_profile.interests}
    Hobbies: {user_profile.hobbies}
    Dreams & Aspirations: {user_profile.raw_dreams_text}
    Stated Values: {user_profile.user_stated_values.dict() if user_profile.user_stated_values else "Not provided"}
    """

    prompt = f"""
    You are a cognitive and academic analyst that deeply understands students.
    
    Input Profile:
    {context}
    
    Tasks:
    Infer the following based on the input:
    1. Core strengths (logical, creative, verbal, spatial, leadership, analytical, etc.)
    2. Weak areas or growth opportunities.
    3. Learning style (visual, practical, theoretical, fast/slow).
    4. Cognitive profile (how they think).
    5. Motivation drivers (what pushes them).
    6. Risk tolerance / Risk profile.
    7. Summary insights.
    
    ALSO: Generate a warm, encouraging "natural_language_explanation" addressing the student directly, explaining what you found.
    AND: Suggest 3 top career matches based on this profile.
    
    Output JSON schema:
    {{
        "core_strengths": ["..."],
        "weak_areas": ["..."],
        "learning_style": "...",
        "cognitive_profile": "...",
        "motivation_drivers": ["..."],
        "risk_profile": "...",
        "summary_insights": "...",
        "natural_language_explanation": "Hello [Name], ...",
        "top_career_matches": ["Match 1", "Match 2", "Match 3"],
        "core_skills": [{{"name": "Extracted Skill", "level": "Intermediate"}}]
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
        
        # Ensure compatibility with other agents by populating defaults if missing
        if "derived_values" not in data:
            # We can leave this empty or infer it; Pydantic default handles it
            pass 
            
        analysis = AnalysisResult(**data)
        user_profile.analysis_result = analysis
        return user_profile
        
    except Exception as e:
        print(f"Error parsing profile: {e}")
        # print(f"Raw response: {response.text}") # Debugging
        raise e
