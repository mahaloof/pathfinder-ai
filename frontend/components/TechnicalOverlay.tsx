"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/lib/store";

export default function TechnicalOverlay() {
  const { currentStep, isLoading } = useApp();
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [showGeminiInfo, setShowGeminiInfo] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Simulate logs based on step
  useEffect(() => {
    if (isLoading) {
      if (currentStep === 1) setLogs(p => [...p, "> Agent 1 (Profile Analyzer): Reading transcripts...", "> Agent 1: Inferring cognitive traits..."]);
      if (currentStep === 2) setLogs(p => [...p, "> Agent 2 (Future Simulator): Simulating Path A (Year 1-5)...", "> Agent 2: Simulating Path B...", "> Agent 2: Calculating failure risks..."]);
      if (currentStep === 3) setLogs(p => [...p, "> Agent 3 (Ikigai Reasoner): Mapping Interest Graph...", "> Agent 3: Finding intersections..."]);
      if (currentStep === 4) setLogs(p => [...p, "> Agent 4 (Planner): Backcasting from goal...", "> Agent 4: Generating monthly milestones..."]);
    }
  }, [currentStep, isLoading]);

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-4 right-4 flex gap-2 z-[100] pointer-events-auto">
        <button 
          onClick={() => setShowArchitecture(!showArchitecture)}
          className="bg-slate-800 text-white px-3 py-2 rounded-lg text-sm font-mono hover:bg-slate-700 shadow-lg"
        >
          ⚙️ Architecture
        </button>
        <button 
          onClick={() => setShowGeminiInfo(!showGeminiInfo)}
          className="bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-mono hover:bg-purple-600 shadow-lg"
        >
          ✨ Gemini 3 Power
        </button>
      </div>

      {/* Logging Panel (Bottom Left) */}
      <div className="fixed bottom-4 left-4 w-96 max-h-48 bg-black/80 text-green-400 font-mono text-xs p-4 rounded-lg overflow-y-auto pointer-events-none z-40">
        <div className="border-b border-green-800 mb-2 pb-1 text-green-600">SYSTEM LOGS</div>
        {logs.slice(-6).map((log, i) => (
          <div key={i} className="mb-1">{log}</div>
        ))}
        {isLoading && <div className="animate-pulse">_</div>}
      </div>

      {/* Architecture Modal */}
      {showArchitecture && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">System Architecture</h2>
              <button onClick={() => setShowArchitecture(false)} className="text-2xl">&times;</button>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6">
                {/* SVG Visualization of Agents */}
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center text-center text-sm">
                    <div className="p-4 bg-blue-100 rounded border border-blue-300 w-full">
                        <strong>User Input</strong><br/>(Raw Text)
                    </div>
                    <div className="text-2xl">⬇️</div>
                    <div className="p-4 bg-orange-100 rounded border border-orange-300 w-full relative">
                        <strong>Agent 1: Analyzer</strong>
                        <br/><span className="text-xs text-slate-500">Deep Profile Extraction</span>
                    </div>
                    <div className="text-2xl">⬇️</div>
                    <div className="p-4 bg-green-100 rounded border border-green-300 w-full relative">
                        <strong>Agent 2: Simulator</strong>
                        <br/><span className="text-xs text-slate-500">Parallel Future Simulation</span>
                    </div>
                    <div className="text-2xl">⬇️</div>
                    <div className="p-4 bg-purple-100 rounded border border-purple-300 w-full relative">
                        <strong>Agent 3: Reasoner</strong>
                        <br/><span className="text-xs text-slate-500">Ikigai Intersection Logic</span>
                    </div>
                    <div className="text-2xl">⬇️</div>
                    <div className="p-4 bg-red-100 rounded border border-red-300 w-full relative">
                        <strong>Agent 4: Planner</strong>
                        <br/><span className="text-xs text-slate-500">Strategic Backcasting</span>
                    </div>
                </div>
            </div>
            <p className="text-slate-600">
                The system uses a sequential multi-agent chain where each agent enriches the shared 
                <strong> State Object (UserProfile)</strong>. This ensures context continuity without huge token overheads.
            </p>
          </div>
        </div>
      )}

      {/* Gemini 3 Info Modal */}
      {showGeminiInfo && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-700">Powered by Gemini 3</h2>
              <button onClick={() => setShowGeminiInfo(false)} className="text-2xl">&times;</button>
            </div>
            
            <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded border-l-4 border-purple-500">
                    <h3 className="font-bold mb-1">🧠 Long Context Reasoning</h3>
                    <p className="text-sm text-slate-600">
                        Gemini 3 analyzes the <strong>entirety</strong> of user transcripts, resumes, and dreams in one pass to build a deep psychological profile, spotting patterns humans might miss.
                    </p>
                </div>
                <div className="p-4 bg-slate-50 rounded border-l-4 border-purple-500">
                    <h3 className="font-bold mb-1">🤖 Multi-Agent Orchestration</h3>
                    <p className="text-sm text-slate-600">
                        Specialized agents (Analyst, Simulator, Reasoner) hand off structured data. Agent 2 (Simulator) runs parallel simulations of 5-year futures effectively <strong>"dreaming"</strong> scenarios.
                    </p>
                </div>
                <div className="p-4 bg-slate-50 rounded border-l-4 border-purple-500">
                    <h3 className="font-bold mb-1">🔮 Future Simulation</h3>
                    <p className="text-sm text-slate-600">
                       Using predictive modeling, the system simulates career trajectories including salary growth, stress levels, and market demand changes over a decade.
                    </p>
                </div>
                 <div className="p-4 bg-slate-50 rounded border-l-4 border-purple-500">
                    <h3 className="font-bold mb-1">📋 Structured Planning</h3>
                    <p className="text-sm text-slate-600">
                       The final Planner Agent "backcasts" from the successful future to create a concrete month-by-month roadmap for the user.
                    </p>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
