# Godwill Morgan Lekwa | Morgtech

**Computer Engineer · AI & LLM Evaluation · Telecommunications · Software & AI Automation**

Welcome to my professional portfolio repository.

This project showcases my technical background, professional experience, learning journey, and selected technology projects. It also features **FlowPilot AI**, an AI-powered text assistant integrated with the Groq API.

My work combines telecommunications engineering, AI data evaluation, emerging software technologies, and practical digital solutions.

## Live Portfolio

- **Website:** https://morgtech-portfolio.onrender.com/
- **GitHub:** https://github.com/morgtech

## About This Portfolio

The portfolio is designed to present my professional profile and demonstrate selected projects, technical capabilities, and areas of ongoing development.

### What's Included

- **Professional Profile:** Background, experience, and career interests.
- **Technical Skills:** Telecommunications, RF engineering, AI evaluation, and software technologies.
- **Professional Experience:** Telecommunications engineering and AI data/LLM evaluation.
- **Projects:** Selected technology projects and prototypes.
- **Training & Development:** Technical certifications, courses, and ongoing learning.
- **Ventures:** Morgtech and ELYON Tech Solutions.
- **Contact:** Professional contact information.

## Featured Projects

| Project | Description |
|---|---|
| FlowPilot AI | AI-powered text assistant using the Groq API. |
| OPPDISCO | Career and opportunity discovery platform concept. |
| SurePriceNG | Price comparison and local business discovery platform concept. |
| Electricity Outage Predictor | Electricity outage prediction and analysis project. |

Project descriptions reflect their actual development stages. Concepts, prototypes, and working demonstrations are not presented as completed production products.

## Technology Stack

- **Frontend:** React 18, Vite 6
- **Backend:** Node.js, Express
- **AI Integration:** Groq API
- **Languages:** JavaScript, HTML, CSS, Python
- **Deployment:** Render
- **Version Control:** Git and GitHub

## Running Locally

### Requirements

- Node.js 20 or newer
- npm
- A Groq API key for live FlowPilot AI responses

### 1. Clone the repository

```bash
git clone https://github.com/morgtech/morgtech-portfolio.git
cd morgtech-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` in the project root.

Add your Groq API key and configuration:

```env
PORT=3001
NODE_ENV=development
AI_PROVIDER=groq
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=openai/gpt-oss-120b
```

Get an API key from the [Groq Console](https://console.groq.com/keys).

### 4. Start the application

```bash
npm run dev
```

Open the local address displayed in your terminal.

**Security:** Keep your `.env` file private. Never commit API keys or expose them in frontend code, screenshots, or public repositories.

## Deployment

The application uses a React/Vite frontend and an Express backend. Both are deployed together as a single Render Web Service.

The repository includes a `render.yaml` configuration for deployment.

To deploy:

1. Push the project to GitHub.
2. Connect the repository to Render.
3. Create or configure a Web Service using the repository's Render configuration.
4. Add your private `GROQ_API_KEY` in Render's environment settings.
5. Deploy the application.

Render supplies the production `PORT` automatically.

For deployment documentation, visit:

- [Render Web Services](https://render.com/docs/web-services)
- [Render Blueprint Configuration](https://render.com/docs/blueprint-spec)

## Security & Privacy

FlowPilot uses a server-side API integration. The Groq API key is not intended to be exposed to the browser.

Avoid submitting passwords, OTPs, payment information, confidential business records, or other sensitive personal information.

The project is a demonstration and portfolio application. Its safeguards should not be treated as a substitute for production-grade security, monitoring, and abuse prevention.

## About Morgtech & ELYON Tech Solutions

**Morgtech** is my personal technology brand, focused on technology, digital solutions, AI, and practical innovation.

**ELYON Tech Solutions** is my approved company identity, established around the development of accessible technology and digital solutions.

## Connect

- **GitHub:** [@morgtech](https://github.com/morgtech)
- **Portfolio:** [morgtech-portfolio.onrender.com](https://morgtech-portfolio.onrender.com/)

---

*Built and maintained by Godwill Morgan Lekwa.*