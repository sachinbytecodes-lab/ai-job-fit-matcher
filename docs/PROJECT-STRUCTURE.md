# PROJECT-STRUCTURE.md — AI Job-Fit Matcher

## Final Folder Structure (target state by Day 6)

```
ai-job-fit-matcher/
├── app/
│   ├── page.js                        # Landing page ("/")
│   ├── layout.js                      # Root layout — wraps app in SessionProvider
│   ├── globals.css                    # Tailwind base + global styles
│   ├── dashboard/
│   │   └── page.js                    # Dashboard ("/dashboard") — history list
│   ├── analyze/
│   │   └── page.js                    # Analyze ("/analyze") — upload + JD form
│   ├── results/
│   │   └── [id]/
│   │       └── page.js                # Results ("/results/:id") — single analysis view
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.js           # NextAuth config (Google provider)
│       ├── analyze/
│       │   └── route.js               # POST — parse, analyze, save
│       └── analyses/
│           ├── route.js               # GET — list current user's analyses
│           └── [id]/
│               └── route.js           # GET — fetch single analysis
├── components/
│   ├── Navbar.js                      # Shared nav — auth-aware
│   ├── UploadForm.js                  # Resume upload + JD textarea + submit
│   ├── ResultCard.js                  # Fit score + skills + suggestions
│   ├── FitScoreGauge.js               # Visual score indicator
│   ├── ATSReportPanel.js              # ATS score, keywords, section checks
│   ├── DashboardList.js               # Maps history into summary cards
│   ├── LoadingState.js                # Shared loading UI
│   └── EmptyState.js                  # Shared empty-state UI
├── lib/
│   ├── mongodb.js                     # Cached DB connection helper
│   ├── parseResume.js                 # PDF/DOCX → plain text
│   └── aiPrompt.js                    # Gemini prompt construction + response parsing
├── models/
│   └── Analysis.js                    # Mongoose schema (see SCHEMA.md)
├── docs/
│   ├── PRD.docx
│   ├── Implementation_Blueprint_Day2-10.md
│   ├── Pitch_Deck.pptx
│   ├── ARCHITECTURE.md
│   ├── SCHEMA.md
│   ├── API.md
│   ├── UI-WIREFRAMES.md
│   └── PROJECT-STRUCTURE.md
├── .env.local                         # API keys & secrets — gitignored, never committed
├── .gitignore
├── package.json
└── README.md
```

## Folder Responsibilities

| Folder | Responsibility |
|---|---|
| `app/` | Every user-facing page and every API route — Next.js App Router convention. Folder nesting directly maps to URL structure (e.g., `app/dashboard/page.js` → `/dashboard`). |
| `app/api/` | All backend logic lives here as serverless functions — no separate backend project needed. |
| `components/` | Reusable, presentation-focused UI pieces. Pages import and compose these — pages themselves stay thin. |
| `lib/` | Pure backend helper logic with no UI — database connection, file parsing, AI prompt/response handling. Kept separate from `models/` because these are *functions*, not *data shape definitions*. |
| `models/` | Mongoose schema definitions only — the "shape of our data," independent of how it's used. |
| `docs/` | All planning and design artifacts from Day 1–2 onward, version-controlled alongside the code so any future session (or reviewer) has full context without leaving the repo. |

## Why This Structure Was Chosen

- **Matches Next.js App Router conventions exactly** — no custom routing logic needed, reducing setup complexity for a first-time deployer.
- **Clear separation of concerns**: `app/` (routes) vs `components/` (reusable UI) vs `lib/` (backend logic) vs `models/` (data shape) — makes it obvious where new code belongs on any given day, so Days 3–9 never require re-deciding "where does this go?"
- **`docs/` inside the repo** (not a separate folder outside version control) ensures the PRD, Blueprint, and today's design docs travel with the code — useful for portfolio reviewers and for continuity between daily AI sessions.
- **No premature abstraction** — no `services/`, `utils/`, `hooks/`, or `types/` folders yet, since v1.0's scope doesn't need them. If Day 8 polish reveals a genuine need (e.g., a shared `formatDate` helper used in 3+ places), a lightweight `lib/utils.js` can be added then — not before.

This structure requires **no changes to the Implementation Blueprint** — Day 3 onward can proceed exactly as written, now with exact file paths confirmed.
