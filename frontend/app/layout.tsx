"use client";

import "./globals.css";
import { AppProvider, useApp } from "@/lib/store";
import { Inter } from 'next/font/google';

import TechnicalOverlay from "@/components/TechnicalOverlay";

const inter = Inter({ subsets: ['latin'] });

function ProgressBar() {
  const { currentStep } = useApp();
  const steps = ["Start", "Profile", "Analysis", "Simulation", "Ikigai", "Roadmap"];
  
  return (
    <div className="step-indicator">
      {steps.map((label, idx) => (
        <div 
          key={idx} 
          className={`step-dot ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
          title={label}
        />
      ))}
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <div className="container">
             <header className="py-8">
               <h1 className="text-3xl font-bold text-center text-slate-800">PATHFINDER AI</h1>
               <ProgressBar />
             </header>
             <main>{children}</main>
             <TechnicalOverlay />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
