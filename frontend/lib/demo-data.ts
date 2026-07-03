import { UserProfile } from "./api";

export const DEMO_PROFILE: UserProfile = {
  personal_info: {
    name: "Alex Demo",
    age: 20,
    location: "San Francisco, CA",
    bio: "Computer Science student passionate about AI and Sustainability.",
  },
  academic_history: {
    subjects: ["Computer Science", "Linear Algebra", "Environmental Science", "Ethics"],
    grades_summary: "3.8 GPA, Strong in Math/CS",
    strengths: ["Programming", "Logic", "Systems Thinking"],
    weaknesses: ["Public Speaking", "Chemistry"],
    favorite_subjects: ["AI/ML", "Physics"],
  },
  interests: ["Robotics", "Renewable Energy", "Sci-Fi Literature", "Hackathons"],
  hobbies: ["Building Drones", "Hiking", "Reading"],
  raw_resume_text: "Built a solar-powered drone. Interned at specific local startup. President of the Robotics Club.",
  raw_dreams_text: "I want to use technology to solve climate change problems.",
  user_stated_values: {
    money_importance: 6,
    impact_importance: 10,
    stability_importance: 5,
    creativity_importance: 8,
    work_life_balance: 7,
  },
  
  // Agent 1: Analysis
  analysis_result: {
    core_strengths: ["Systems Architecture", "Strategic Foresight", "Ethical Reasoning", "Rapid Prototyping"],
    weak_areas: ["Delegation", "Public Speaking"],
    learning_style: "Project-Based / Kinesthetic",
    cognitive_profile: "Analytical-Creative Hybrid. Excels at synthesizing complex technical systems with human values.",
    motivation_drivers: ["Solving 'Unsolvable' Problems", "Tangible Real-World Impact", "Autonomy"],
    risk_profile: "Calculated Risk-Taker. Willing to bet on new tech but tests rigorously.",
    summary_insights: "Alex is a builder who cares deeply about the 'why'. They are not just a coder, but a product thinker.",
    natural_language_explanation: "Alex, your profile enables you to bridge the gap between deep tech (AI/Robotics) and human needs (Sustainability). You are a 'Visionary Architect'.",
    top_career_matches: ["Climate Tech Robotics Engineer", "AI Ethics Officer", "Smart City Systems Architect"]
  },

  // Agent 2: Simulations
  simulations: [
    {
      career_path: "Climate Tech Robotics Engineer",
      yearly_timeline: [
        { year: 1, title: "Junior Robotics Engineer", key_achievements: ["Shipped first drone prototype"], skills_acquired: ["ROS2", "PCB Design"], salary_range: "$90k - $110k", stress_level: 6, satisfaction_score: 85 },
        { year: 2, title: "Robotics Engineer II", key_achievements: ["Led sensor integration team"], skills_acquired: ["Team Lead", "Embedded AI"], salary_range: "$110k - $130k", stress_level: 7, satisfaction_score: 88 },
        { year: 3, title: "Senior Engineer", key_achievements: ["Patent filed for solar efficiency"], skills_acquired: ["System Architecture"], salary_range: "$140k+", stress_level: 7, satisfaction_score: 92 },
        { year: 4, title: "Tech Lead", key_achievements: ["Deployed fleet to 3 countries"], skills_acquired: ["Stakeholder Mgmt"], salary_range: "$160k+", stress_level: 8, satisfaction_score: 90 },
        { year: 5, title: "Principle Architect", key_achievements: ["Industry Award for Innovation"], skills_acquired: ["Strategic Vision"], salary_range: "$180k+", stress_level: 8, satisfaction_score: 95 }
      ],
      skills_acquired: ["ROS2", "Embedded Systems", "Leadership"],
      salary_trajectory: "Strong Growth ($90k -> $180k)",
      stress_level: "Medium",
      lifestyle: "Dynamic, mix of lab and field work.",
      market_demand: "Very High (Green Tech Boom)",
      failure_risk: "Low-Medium (Startup Volatility)",
      satisfaction_score: 92,
      final_outcome_summary: "A highly fulfilling path leading to tangible impact and technical mastery."
    },
    {
      career_path: "AI Ethics Officer",
      yearly_timeline: [
         { year: 1, title: "Policy Analyst", key_achievements: ["Drafted internal AI guidelines"], skills_acquired: ["Tech Policy"], salary_range: "$80k - $100k", stress_level: 4, satisfaction_score: 70 },
         { year: 5, title: "Director of AI Safety", key_achievements: ["Global Standard Committee"], skills_acquired: ["Regulatory Strategy"], salary_range: "$150k+", stress_level: 6, satisfaction_score: 80 }
      ],
      skills_acquired: ["Policy", "Writing", "Auditing"],
      salary_trajectory: "Moderate ($80k -> $150k)",
      stress_level: "Low",
      lifestyle: "Office-based, frequent travel for conferences.",
      market_demand: "Growing",
      failure_risk: "Low (Corporate Stability)",
      satisfaction_score: 75,
      final_outcome_summary: "Stable and intellectual, but fewer opportunities to 'build' things."
    },
    {
      career_path: "Smart City Systems Architect",
      yearly_timeline: [
         { year: 1, title: "Urban Data Analyst", key_achievements: [" mapped traffic patterns"], skills_acquired: ["GIS", "Big Data"], salary_range: "$85k", stress_level: 5, satisfaction_score: 75 },
         { year: 5, title: "City CTO", key_achievements: ["Smart Grid Implementation"], skills_acquired: ["Public Sector Nav"], salary_range: "$140k", stress_level: 9, satisfaction_score: 85 }
      ],
      skills_acquired: ["Urban Planning", "IoT", "GovTech"],
      salary_trajectory: "Steady",
      stress_level: "High (Bureaucracy)",
      lifestyle: "City Hall meetings, site visits.",
      market_demand: "High",
      failure_risk: "Medium (Political dependencies)",
      satisfaction_score: 82,
      final_outcome_summary: "High impact but potentially frustrating pace of change."
    }
  ],

  simulations_comparison_text: "Robotics offers the best balance of hands-on building and direct impact. Ethics is safer but less creative. Smart City is impactful but bureaucratic.",
  
  // Agent 3: Ikigai
  ikigai_evaluation: {
    what_you_love: ["Building Drones", "Solving Climate Problems", "Autonomy"],
    what_you_are_good_at: ["Systems Architecture", "Rapid Prototyping", "Math/CS"],
    what_pays_well: ["Robotics Engineering", "AI Development", "Tech Leadership"],
    what_world_needs: ["Sustainable Tech", "Clean Energy Solutions", "Efficient Infrastructure"],
    ikigai_zone: "Sustainable Robotics Innovation",
    top_3_paths: ["Climate Tech Robotics Engineer", "Smart City Systems Architect", "AI Ethics Officer"],
    primary_recommendation: "Climate Tech Robotics Engineer",
    reasoning_summary: "This path perfectly intersects your love for building (Robotics), your skill in Systems Thinking, the high market demand for Green Tech, and the critical global need for climate solutions."
  },

  // Agent 4: Plan
  final_roadmap: {
    year_goal: "Build a portfolio of 3 sustainable robotics projects and land a Junior Engineer role at a Climate Tech firm.",
    monthly_plan: [
      { month: "Month 1", focus: "Foundation Refresh", skills: ["Python Advanced", "Linear Algebra Review"], projects: [], milestones: ["Complete CS refresher course"] },
      { month: "Month 2", focus: "Hardware Basics", skills: ["Arduino/Raspberry Pi", "Circuit Design"], projects: ["Smart Plant Monitor"], milestones: [] },
      { month: "Month 3", focus: "Drone Mechanics", skills: ["Aerodynamics basics", "Motor control"], projects: ["Mini-Drone Assembly"], milestones: ["Drone First Flight"] },
      { month: "Month 4", focus: "Software for Robotics", skills: ["ROS2 Basics", "Sensor Fusion"], projects: [], milestones: ["ROS2 Certification"] },
      { month: "Month 6", focus: "Major Project", skills: ["Computer Vision"], projects: ["Solar Inspection Drone"], milestones: ["Prototype Demo Video"] },
      { month: "Month 12", focus: "Career Launch", skills: ["Interview Prep"], projects: [], milestones: ["Offer Accepted"] }
    ],
    weekly_structure: "Mon/Wed: 2h Theory (Online Courses)\nTue/Thu: 3h Lab/Build Time\nSat: Hackathon or Deep Work session\nSun: Review & Rest",
    final_advice: "Focus on 'Show, Don't Tell'. Your portfolio of physical devices will matter more than your GPA. Join a hardware hackathon ASAP."
  }
};
