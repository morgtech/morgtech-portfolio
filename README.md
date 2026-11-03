# Godwill Morgan Lekwa — Morgtech + ELYON Tech Solutions

A responsive personal professional portfolio with a Gemini-powered FlowPilot AI demonstration and a separate Ventures section for Morgtech and ELYON Tech Solutions.

## Portfolio structure

- Home and professional introduction
- About and technical skills
- Projects: FlowPilot AI, OPPDISCO, SurePriceNG and Electricity Outage Predictor
- Professional experience: telecommunications engineering and AI data/LLM evaluation
- Training and ongoing learning
- Ventures: Morgtech (personal technology brand) and ELYON Tech Solutions (company identity)
- Contact (add your professional email before publishing)

Project stages are labelled as working demo, in development, or research. Do not describe a concept as a completed production product.

## Requirements

- Node.js 20 or newer
- Google AI Studio API key for live FlowPilot responses (free-tier access and quotas depend on Google's current model availability and terms)

## Configure Gemini locally

1. Create an API key at https://aistudio.google.com/apikey
2. Copy `.env.example` to `.env` in the project root.
3. Add your key to `.env`:

   ```env
   GEMINI_API_KEY=your_real_key
   GEMINI_MODEL=gemini-2.5-flash
   PORT=3001
   ```

4. Install dependencies: `npm install`
5. Run locally: `npm run dev`
6. Open http://localhost:5173

Keep `.env` private. Never place the API key in frontend code, a `VITE_` variable, screenshots, or a public GitHub repository. The `.gitignore` excludes `.env`.

Without a Gemini key, the portfolio still loads; FlowPilot will report that its API is not configured.

## Deploy the complete app to Render

This project contains both a Vite frontend and an Express API. Deploy them together as **one Render Web Service**, not as a Static Site, so FlowPilot's `/api` routes work on the same public domain.

1. Push the contents of this project folder to a GitHub repository. The `package.json` must be at the repository root.
2. In Render, choose **New → Web Service** and connect that GitHub repository.
3. Configure:
   - Runtime: `Node`
   - Root Directory: leave blank if `package.json` is at the repository root
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Instance: Free is suitable for an initial demonstration, subject to Render's current limits
4. In Render → Environment, add:
   - `NODE_ENV` = `production`
   - `GEMINI_API_KEY` = your private Gemini API key
   - `GEMINI_MODEL` = `gemini-2.5-flash` (change this if Google no longer lists it for your API project)
   - Do not manually set `PORT`; Render provides it.
5. Deploy. The Express server serves the built `dist` frontend and the `/api` endpoints from the same origin.
6. Test the public site and FlowPilot. Check `/api/health` if the assistant does not connect.

Render can automatically redeploy when you push changes to the connected Git branch. Free web services may spin down after inactivity, so the first visit after idle time can be slower. See https://render.com/docs/your-first-deploy and https://render.com/docs/web-services.

## Before making the portfolio public

- Replace `YOUR_EMAIL@example.com` in `src/main.jsx` with your real professional email.
- Review all experience, training and project-stage wording for accuracy.
- Add links to repositories or live demos only when those resources are genuinely public and ready.
- Verify ELYON Tech Solutions' public-facing company description and any claims about services before publishing.
- FlowPilot currently drafts and analyses text. It does not send messages, access customer systems, update CRMs or execute external actions.

## Security and privacy

The Gemini API key is read only by the server. FlowPilot sends the submitted prompt to Google's Gemini API. Do not submit passwords, OTPs, payment-card data, confidential customer information or other sensitive personal data. The application does not save chat history. The included in-memory request throttle is a basic demo safeguard, not production-grade abuse prevention; add persistent rate limiting, monitoring and spending controls before promoting it to broad public use.
