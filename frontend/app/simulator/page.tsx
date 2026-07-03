"use client";

import { useApp } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { reasonIkigai } from "@/lib/api";

export default function SimulatorPage() {
  const { profile, setProfile, setCurrentStep, setIsLoading, isLoading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (profile.simulations.length === 0) router.push("/analysis");
    setCurrentStep(3);
  }, [setCurrentStep, profile.simulations, router]);

  const handleNext = async () => {
    // Demo Mode Check
    if (profile.ikigai_evaluation) {
        setCurrentStep(4);
        router.push("/ikigai");
        return;
    }

    setIsLoading(true);
    try {
      const updatedProfile = await reasonIkigai(profile);
      setProfile(updatedProfile);
      setCurrentStep(4);
      router.push("/ikigai");
    } catch (e) {
      alert("Ikigai reasoning failed.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if(!profile.simulations.length) return null;

  if (isLoading) return (
    <div className="loading-overlay">
        <div className="spinner"></div>
        <p>Finding your Ikigai Intersection...</p>
    </div>
  );

  return (
    <div className="section-fade max-w-6xl mx-auto">
      <h2 className="text-center mb-8">Future Trajectories (5 Years)</h2>
      
      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {profile.simulations.map((sim, idx) => (
          <div key={idx} className="card relative overflow-hidden group hover:border-blue-400">
            <h3 className="text-xl font-bold text-center mb-4 min-h-[3rem] flex items-center justify-center">
                {sim.career_path}
            </h3>
            
            <div className="space-y-4 text-sm">
                <div>
                    <span className="block font-semibold text-slate-500">Satisfaction</span>
                    <div className="w-full bg-slate-200 h-2 rounded mt-1">
                        <div className="bg-green-500 h-2 rounded" style={{width: `${sim.satisfaction_score}%`}}></div>
                    </div>
                    <span className="text-xs text-right block">{sim.satisfaction_score}/100</span>
                </div>
                
                <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Salary Trend</span>
                    <span className="font-medium text-right">{sim.salary_trajectory}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Stress</span>
                    <span className={`font-medium ${sim.stress_level === 'High' ? 'text-red-500' : 'text-green-600'}`}>
                        {sim.stress_level}
                    </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Demand</span>
                    <span className="font-medium">{sim.market_demand}</span>
                </div>
                 <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">Risk</span>
                    <span className="font-medium text-orange-600">{sim.failure_risk}</span>
                </div>
                
                <div className="bg-slate-50 p-3 rounded text-xs text-slate-600 italic">
                    {sim.final_outcome_summary}
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Timeline Tabs or Sections */}
      <div className="card">
          <h3>Year-by-Year Breakdown</h3>
          <div className="overflow-x-auto">
              {profile.simulations.map((sim, idx) => (
                  <div key={idx} className="mb-8 last:mb-0">
                      <h4 className="font-bold text-lg mb-2 text-accent">Pathway: {sim.career_path}</h4>
                      <table className="w-full text-sm text-left">
                          <thead>
                              <tr className="bg-slate-100 text-slate-600">
                                  <th className="p-2 rounded-l">Year</th>
                                  <th className="p-2">Role</th>
                                  <th className="p-2">Key Skills</th>
                                  <th className="p-2 rounded-r">Lifestyle</th>
                              </tr>
                          </thead>
                          <tbody>
                              {sim.yearly_timeline.map((year, yIdx) => (
                                  <tr key={yIdx} className="border-b last:border-0 hover:bg-slate-50">
                                      <td className="p-2 font-bold">Y{year.year}</td>
                                      <td className="p-2">{year.title}</td>
                                      <td className="p-2">{year.skills_acquired.slice(0,2).join(", ")}</td>
                                      <td className="p-2 text-slate-500">{sim.lifestyle}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              ))}
          </div>
      </div>

      <div className="text-center">
         <button onClick={handleNext} className="btn btn-primary px-8 py-3">
             Find My Ikigai →
         </button>
      </div>
    </div>
  );
}
