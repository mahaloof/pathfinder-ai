"use client";

import { useApp } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { generatePlan } from "@/lib/api";

export default function IkigaiPage() {
  const { profile, setProfile, setCurrentStep, setIsLoading, isLoading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!profile.ikigai_evaluation) router.push("/simulator");
    setCurrentStep(4);
  }, [setCurrentStep, profile.ikigai_evaluation, router]);

  const handleNext = async () => {
    // Demo Mode Check
    if (profile.final_roadmap) {
        setCurrentStep(5);
        router.push("/roadmap");
        return;
    }

    setIsLoading(true);
    try {
      const updatedProfile = await generatePlan(profile);
      setProfile(updatedProfile);
      setCurrentStep(5);
      router.push("/roadmap");
    } catch (e) {
        alert("Planning failed.");
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  };

  if(!profile.ikigai_evaluation) return null;
  const ikigai = profile.ikigai_evaluation;

  if (isLoading) return (
    <div className="loading-overlay">
        <div className="spinner"></div>
        <p>Creating your 12-Month Master Plan...</p>
    </div>
  );

  return (
    <div className="section-fade max-w-5xl mx-auto">
      <h2 className="text-center mb-8">Your Ikigai (Reason for Being)</h2>
      
      {/* Central Hero Section */}
      <div className="card bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-10">
          <p className="opacity-80 uppercase tracking-widest text-sm mb-2">Optimal Path Found</p>
          <h1 className="text-white text-4xl font-extrabold mb-4">{ikigai.primary_recommendation}</h1>
          <p className="max-w-2xl mx-auto text-blue-100 text-lg">{ikigai.ikigai_zone}</p>
      </div>

      <div className="card">
          <h3 className="mb-4 text-center">Why this path?</h3>
          <p className="text-center max-w-3xl mx-auto text-slate-700">{ikigai.reasoning_summary}</p>
      </div>

      {/* The 4 Circles Breakdown - Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card bg-pink-50 border-pink-100">
              <h3 className="text-pink-600 text-center">❤️ What You Love</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-slate-700">
                  {ikigai.what_you_love.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
          </div>
          <div className="card bg-purple-50 border-purple-100">
              <h3 className="text-purple-600 text-center">🌟 What You're Good At</h3>
               <ul className="list-disc pl-5 mt-2 text-sm text-slate-700">
                  {ikigai.what_you_are_good_at.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
          </div>
          <div className="card bg-green-50 border-green-100">
              <h3 className="text-green-600 text-center">💰 What Pays Well</h3>
               <ul className="list-disc pl-5 mt-2 text-sm text-slate-700">
                  {ikigai.what_pays_well.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
          </div>
          <div className="card bg-teal-50 border-teal-100">
              <h3 className="text-teal-600 text-center">🌍 What The World Needs</h3>
               <ul className="list-disc pl-5 mt-2 text-sm text-slate-700">
                  {ikigai.what_world_needs.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
          </div>
      </div>
      
      <div className="text-center mt-8">
          <button onClick={handleNext} className="btn btn-primary px-8 py-3">
              Generate 1-Year Roadmap →
          </button>
      </div>
    </div>
  );
}
