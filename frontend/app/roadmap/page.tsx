"use client";

import { useApp } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoadmapPage() {
  const { profile, setCurrentStep } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!profile.final_roadmap) router.push("/ikigai");
    setCurrentStep(5);
  }, [setCurrentStep, profile.final_roadmap, router]);

  if(!profile.final_roadmap) return null;
  const plan = profile.final_roadmap;

  return (
    <div className="section-fade max-w-5xl mx-auto">
      <div className="text-center mb-10">
           <h2 className="mb-2">Your 12-Month Action Plan</h2>
           <p className="text-xl text-accent font-semibold">{plan.year_goal}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Timeline */}
          <div className="lg:col-span-2 space-y-6">
              {plan.monthly_plan.map((month, i) => (
                  <div key={i} className="card flex flex-col md:flex-row gap-6 items-start border-l-4 border-l-accent">
                      <div className="md:w-32 flex-shrink-0">
                          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block">Month</span>
                          <span className="text-2xl font-bold text-slate-800">{month.month}</span>
                      </div>
                      <div className="flex-grow">
                          <h4 className="text-xl font-bold mb-2">{month.focus}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                              <div>
                                  <strong className="block text-slate-500 mb-1">Skills to Learn</strong>
                                  <ul className="list-disc pl-4 text-slate-700">
                                      {month.skills.map((s, k) => <li key={k}>{s}</li>)}
                                  </ul>
                              </div>
                              <div>
                                 <strong className="block text-slate-500 mb-1">Projects / Milestones</strong>
                                  <ul className="list-disc pl-4 text-slate-700">
                                      {month.projects.map((s, k) => <li key={k}>{s}</li>)}
                                      {month.milestones.map((s, k) => <li key={k}>{s}</li>)}
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
              <div className="card bg-orange-50 border-orange-100">
                  <h3 className="text-orange-800">Weekly Routine</h3>
                  <div className="whitespace-pre-wrap text-sm text-slate-700">
                      {plan.weekly_structure}
                  </div>
              </div>
              
              <div className="card bg-blue-50 border-blue-100">
                  <h3 className="text-blue-800">Final Strategic Advice</h3>
                  <p className="text-sm text-slate-700">
                      {plan.final_advice}
                  </p>
              </div>

               <div className="card text-center">
                  <h3>Ready to Begin?</h3>
                  <button onClick={() => window.print()} className="btn btn-outline w-full mb-2">
                      Print Roadmap
                  </button>
                  <button onClick={() => window.location.href='/'} className="btn btn-primary w-full">
                      Start New Analysis
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
}
