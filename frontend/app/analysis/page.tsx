"use client";

import { useApp } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { simulateFutures } from "@/lib/api";

export default function AnalysisPage() {
  const { profile, setProfile, setCurrentStep, setIsLoading, isLoading } = useApp();
  const router = useRouter();

  useEffect(() => { 
      if (!profile.analysis_result) router.push("/profile");
      setCurrentStep(2); 
  }, [setCurrentStep, profile.analysis_result, router]);

  const handleSimulate = async () => {
    // Demo Mode / Already Simulated Check
    if (profile.simulations.length > 0) {
        setCurrentStep(3);
        router.push("/simulator");
        return;
    }

    setIsLoading(true);
    try {
      const updatedProfile = await simulateFutures(profile);
      setProfile(updatedProfile);
      setCurrentStep(3);
      router.push("/simulator");
    } catch (e) {
      alert("Simulation failed.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if(!profile.analysis_result) return null;
  const analysis = profile.analysis_result;

  if (isLoading) return (
    <div className="loading-overlay">
        <div className="spinner"></div>
        <p>Simulating 5-Year Futures...</p>
    </div>
  );

  return (
    <div className="section-fade max-w-4xl mx-auto">
      <div className="card text-center bg-blue-50 border-blue-100">
          <h2 className="text-2xl text-blue-800 mb-2">Hello, {profile.personal_info.name}</h2>
          <p className="italic text-lg text-blue-700">"{analysis.natural_language_explanation}"</p>
      </div>

      <div className="flex-grid">
          <div className="card">
              <h3>Core Strengths</h3>
              <ul className="list-disc pl-5">
                  {analysis.core_strengths.map((s,i) => <li key={i}>{s}</li>)}
              </ul>
          </div>
          <div className="card">
              <h3>Cognitive Profile</h3>
              <p>{analysis.cognitive_profile}</p>
              <h3 className="mt-4">Learning Style</h3>
              <p>{analysis.learning_style}</p>
          </div>
          <div className="card">
              <h3>Motivation Drivers</h3>
               <ul className="list-disc pl-5">
                  {analysis.motivation_drivers.map((s,i) => <li key={i}>{s}</li>)}
              </ul>
          </div>
          <div className="card">
              <h3>Weak Areas to Watch</h3>
              <ul className="list-disc pl-5 text-red-600">
                  {analysis.weak_areas.map((s,i) => <li key={i}>{s}</li>)}
              </ul>
          </div>
      </div>

      <div className="card bg-gray-900 text-white">
          <h3 className="text-white mb-4">Top Career Matches</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analysis.top_career_matches.map((m, i) => (
                  <div key={i} className="p-4 bg-gray-800 rounded border border-gray-700 text-center font-bold">
                      {m}
                  </div>
              ))}
          </div>
      </div>

      <div className="text-center mt-8">
          <p className="mb-4 text-slate-500">Ready to see where these paths lead?</p>
          <button onClick={handleSimulate} className="btn btn-primary px-8 py-3">
              Simulate Futures →
          </button>
      </div>
    </div>
  );
}
