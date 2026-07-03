from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import UserProfile

from agents.profile_analyzer import analyze_profile
from agents.future_simulator import batch_simulate
from agents.ikigai_reasoner import reson_ikigai
from agents.planner import generate_plan

app = FastAPI(title="Pathfinder AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "system": "Pathfinder AI v2"}

# --- Continuity-Based Endpoints ---
# All endpoints accept the current UserProfile state and return the updated state.

@app.post("/api/analyze-profile", response_model=UserProfile)
async def api_analyze_profile(profile: UserProfile):
    """Step 1: Analyzes raw input and populates analysis_result"""
    try:
        return analyze_profile(profile)
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/simulate-futures", response_model=UserProfile)
async def api_simulate_futures(profile: UserProfile):
    """Step 2: Reads analysis_result and populates simulations"""
    try:
        # Defaults if not present
        if not profile.analysis_result:
             raise HTTPException(status_code=400, detail="Profile not analyzed yet.")
             
        paths = profile.analysis_result.top_career_matches
        return batch_simulate(profile, paths)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/reason-ikigai", response_model=UserProfile)
async def api_reason_ikigai(profile: UserProfile):
    """Step 3: Reads simulations and populates ikigai_evaluation"""
    try:
        return reson_ikigai(profile)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-plan", response_model=UserProfile)
async def api_generate_plan(profile: UserProfile):
    """Step 4: Reads ikigai_evaluation and populates final_roadmap"""
    try:
        return generate_plan(profile)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
