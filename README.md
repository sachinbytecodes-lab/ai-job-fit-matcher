# AI Job-Fit Matcher

Know your fit before you apply. Upload your resume, paste a job description, and get an instant AI-powered fit score, skill gap analysis, and ATS compatibility report.

**Live app:** https://ai-job-fit-matcher-bay.vercel.app

Built as part of the AB Talks 60-Day Claude AI Challenge — a 10-day capstone project built end-to-end with Claude.

## Features

- **Google Sign-In** — secure authentication, no passwords stored
- **Resume Upload** — supports PDF and DOCX
- **AI Job-Fit Analysis** — fit score, matching skills, missing skills, and actionable suggestions powered by Google Gemini
- **ATS Compatibility Report** — ATS score, missing keywords, section checks, and formatting feedback
- **Analysis History** — every analysis is saved and revisitable from a personal dashboard
- **Fully responsive**, accessible UI

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Authentication | NextAuth.js (Google OAuth) |
| Database | MongoDB Atlas |
| AI | Google Gemini API (free tier) |
| File Parsing | pdf-parse, mammoth |
| Hosting | Vercel |

100% built on free-tier services — no paid APIs or subscriptions required to run this project.

## Getting Started Locally

### Prerequisites
- Node.js v18 or higher
- A MongoDB Atlas account (free tier)
- A Google Cloud project with OAuth credentials
- A Google Gemini API key (free, from Google AI Studio)

### Installation

```bash
git clone https://github.com/sachinbytecodes-lab/ai-job-fit-matcher.git
cd ai-job-fit-matcher
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=
GEMINI_API_KEY=

See `docs/ENVIRONMENT.md` for details on obtaining each value.

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Project Documentation

Full planning, design, and daily build documentation is available in [`/docs`](./docs), including the original PRD, architecture diagrams, database schema, API design, and a day-by-day build log.

## License

MIT — see [LICENSE](./LICENSE) for details.