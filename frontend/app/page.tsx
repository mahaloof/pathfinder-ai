"use client";

import { useApp } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DEMO_PROFILE } from "@/lib/demo-data"; // Import Demo Data

export default function Home() {
  const { setCurrentStep, setProfile, profile } = useApp();
  const router = useRouter();

  useEffect(() => {
    setCurrentStep(0);
  }, [setCurrentStep]);

  const startJourney = () => {
    // Reset to empty if needed, or keep existing. For now just go to profile.
    // If we wanted to clear: setProfile(initialProfile); 
    setCurrentStep(1);
    router.push("/profile");
  };

  const launchDemo = () => {
      // Load full demo profile
      setProfile(DEMO_PROFILE);
      // Jump to analysis (Step 2)
      setCurrentStep(2);
      router.push("/analysis");
  };

  return (
    <div className="section-fade text-center max-w-2xl mx-auto mt-12">
      <div className="card">
        <h2 className="text-2xl mb-4">Discover Your Optimal Life Path</h2>
        <p className="text-lg text-slate-600 mb-8">
          Pathfinder AI uses advanced reasoning to analyze your strengths, simulate potential futures, 
          and find your Ikigai—the intersection of what you love, what you're good at, 
          what the world needs, and what pays well.
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-left mb-8 text-sm text-slate-500">
           <div className="p-4 bg-slate-50 rounded-lg">
             <strong>1. Analyze</strong><br/>Deep psychological & skill profiling
           </div>
           <div className="p-4 bg-slate-50 rounded-lg">
             <strong>2. Simulate</strong><br/>Project 5-year career trajectories
           </div>
           <div className="p-4 bg-slate-50 rounded-lg">
             <strong>3. Reason</strong><br/>Find your Ikigai intersection
           </div>
           <div className="p-4 bg-slate-50 rounded-lg">
             <strong>4. Plan</strong><br/>Generate a 12-month roadmap
           </div>
        </div>

        <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <button onClick={startJourney} className="btn btn-primary text-lg px-8 py-3">
            Start My Journey
            </button>
            <button onClick={launchDemo} className="btn btn-outline text-lg px-8 py-3 border-dashed">
            ⚡ Launch Demo Mode
            </button>
        </div>
        <p className="text-xs text-slate-400 mt-4">*Demo Mode pre-fills data for Hackathon Judging</p>
      </div>
    </div>
  );
}
