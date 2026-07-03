# Pathfinder AI

Pathfinder AI uses advanced AI reasoning to analyze your strengths, simulate potential 5-year career trajectories, find your Ikigai (the intersection of what you love, what you're good at, what the world needs, and what you can be paid for), and map out a 12-month actionable roadmap to get there.

---

## Workspace Structure

- **`/backend`**: Python FastAPI server for career analysis and simulations.
- **`/frontend`**: React and Next.js user-interface for step-by-step career path discovery.

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v18+ recommended)
- **Python** (v3.10+)

---

## 1. Running the Backend (API Server)

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Make sure you have python dependencies installed:

   ```bash
   pip install -r requirements.txt
   ```

3. Set up your Gemini API Key in the `.env` file. You can create it by copying the template:

   ```bash
   cp .env.example .env
   ```

   Then open `.env` and set your API key:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Create the local
   .env
   File: Copy the
   backend/.env.example
   template file and rename it to
   backend/.env
   :

4. Launch the Uvicorn server:
   ```bash
   python main.py
   ```
   The backend API will be running at `http://localhost:8000`.

---

## 2. Running the Frontend (Next.js Application)

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the Node.js packages:

   ```bash
   npm install
   ```

3. Run the Next.js development server:
   ```bash
   npm run dev
   ```
   The website will be online at `http://localhost:3000`.

---

## 3. Workflow & Verification

Once both servers are running:

- Open `http://localhost:3000` in your web browser.
- You can fill out your profile details or click **Launch Demo Mode** to preview a pre-filled profile roadmap.
