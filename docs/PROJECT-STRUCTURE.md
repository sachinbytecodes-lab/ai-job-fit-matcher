# PROJECT-STRUCTURE.md — AI Job-Fit Matcher (Updated Day 3)

## Current Folder Structure (as of end of Day 3)

```
ai-job-fit-matcher/
├── app/
│   ├── page.js                        # Landing page ("/") — real Google sign-in wired
│   ├── layout.js                      # Root layout — wraps app in AuthProvider
│   ├── globals.css                    # Tailwind v4 + custom theme variables
│   ├── favicon.ico
│   ├── dashboard/
│   │   └── page.js                    # Dashboard ("/dashboard") — mock history list
│   ├── analyze/
│   │   └── page.js                    # Analyze ("/analyze") — mock upload + JD form
│   ├── results/
│   │   └── [id]/
│   │       └── page.js                # Results ("/results/:id") — mock analysis view
│   └── api/
│       └── auth/
│           └── [...nextauth]/
│               └── route.js           # NextAuth config — Google provider (LIVE)
├── components/
│   ├── Navbar.js                      # Shared nav — real auth-aware (signOut wired)
│   └── AuthProvider.js                # Client-side SessionProvider wrapper
├── lib/
│   └── mongodb.js                     # Cached DB connection helper (written, not yet called)
├── models/
│   └── Analysis.js                    # Mongoose schema (written, not yet used)
├── docs/
│   ├── AI_Job-Fit_Matcher_PRD.docx
│   ├── Implementation_Blueprint_Day2-10.md
│   ├── AI_Job-Fit_Matcher_Pitch_Deck.pptx
│   ├── ARCHITECTURE.md
│   ├── SCHEMA.md
│   ├── API.md
│   ├── UI-WIREFRAMES.md
│   ├── PROJECT-STRUCTURE.md            (this file)
│   ├── SETUP.md
│   ├── ENVIRONMENT.md
│   └── DAY3-SUMMARY.md
├── public/                             # Static assets (Next.js default: SVGs etc.)
├── .env.local                          # gitignored — all 6 variables filled
├── .gitignore
├── package.json                        # name corrected to "ai-job-fit-matcher"
└── README.md
```

## What Changed Since Day 2's Version

| Change | Reason |
|---|---|
| Added `app/api/auth/[...nextauth]/route.js` | Real NextAuth Google provider config — not in Day 2's plan since that was still skeleton-only |
| Added `components/AuthProvider.js` | Needed to isolate the client-only `SessionProvider` from the server-rendered root layout |
| `app/api/analyze/route.js` and `app/api/analyses/` **not yet created** | Correctly deferred — these require the AI engine (Day 5) and are scheduled per the Blueprint's original Day 3/Day 6 sections, now Day 4/Day 6 on our shifted calendar |
| `lib/mongodb.js` and `models/Analysis.js` created but **not yet called from any route** | Scaffolded today as planned; will be wired into `/api/analyze` on Day 4 |

## Folder Responsibilities (Unchanged from Day 2)

See Day 2's original `PROJECT-STRUCTURE.md` for full folder-purpose rationale — still accurate. No structural philosophy changes, only the expected incremental addition of real files as each day's features are built.

**No further changes needed to this structure for Day 4** — it can proceed immediately using the files already scaffolded today.
