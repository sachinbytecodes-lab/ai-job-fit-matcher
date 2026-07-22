# ARCHITECTURE.md — AI Job-Fit Matcher

## 1. Component Diagram

```mermaid
graph TB
    subgraph Client["Browser (User)"]
        UI[Next.js Pages<br/>Landing / Dashboard / Analyze / Results]
    end

    subgraph Vercel["Vercel — Hosting"]
        NextApp[Next.js App<br/>Frontend + API Routes]
        AuthRoute["/api/auth/[...nextauth]"]
        AnalyzeRoute["/api/analyze"]
        AnalysesRoute["/api/analyses"]
    end

    subgraph External["External Services (Free Tier)"]
        Google[Google OAuth<br/>Sign-In]
        Gemini[Google Gemini API<br/>AI Analysis Engine]
        Atlas[(MongoDB Atlas<br/>Free M0 Cluster)]
    end

    UI -->|HTTPS requests| NextApp
    NextApp --> AuthRoute
    NextApp --> AnalyzeRoute
    NextApp --> AnalysesRoute

    AuthRoute -->|OAuth handshake| Google
    AnalyzeRoute -->|resume + JD text| Gemini
    AnalyzeRoute -->|save analysis| Atlas
    AnalysesRoute -->|read history| Atlas

    Gemini -->|structured JSON| AnalyzeRoute
    Atlas -->|documents| AnalysesRoute
```

**Notes:**
- Frontend and backend are the same deployed unit (Next.js on Vercel) — no separate backend hosting.
- All three external dependencies (Google OAuth, Gemini API, MongoDB Atlas) are free-tier cloud services; nothing is self-hosted.

---

## 2. Data Flow — Core Analysis Feature

```mermaid
flowchart LR
    A[User uploads resume<br/>+ pastes job description] --> B[Client-side validation<br/>file type / size / JD length]
    B --> C["POST /api/analyze<br/>(multipart form-data)"]
    C --> D[Extract text from resume<br/>pdf-parse or mammoth]
    D --> E[Build AI prompt<br/>resume text + JD text]
    E --> F[Call Gemini API]
    F --> G[Parse + validate<br/>structured JSON response]
    G --> H[Save Analysis document<br/>to MongoDB, linked to userId]
    H --> I[Return analysis _id to client]
    I --> J[Redirect to /results/id]
    J --> K[Fetch saved analysis<br/>GET /api/analyses/id]
    K --> L[Render Fit Score + ATS Report]
```

---

## 3. Request Lifecycle — Authenticated Page Load

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant N as Next.js App (Vercel)
    participant G as Google OAuth
    participant DB as MongoDB Atlas

    U->>N: GET /dashboard
    N->>N: Check session (NextAuth)
    alt No session
        N-->>U: Redirect to "/" (landing)
        U->>N: Click "Sign in with Google"
        N->>G: Redirect to Google consent screen
        G-->>N: OAuth callback with tokens
        N->>N: Create session
        N-->>U: Redirect to /dashboard
    end
    U->>N: GET /dashboard (with session)
    N->>DB: Query analyses where userId = session.user.id
    DB-->>N: Return list of analyses
    N-->>U: Render dashboard with history
```

---

## 4. AI Interaction Detail

```mermaid
flowchart TD
    A[resumeText + jobDescriptionText] --> B[Construct single structured prompt<br/>Role: expert recruiter + ATS system<br/>Instruction: return ONLY valid JSON]
    B --> C[Gemini API call<br/>gemini-1.5-flash]
    C --> D{Valid JSON?}
    D -->|Yes| E[Use as-is]
    D -->|Malformed| F[Strip markdown fences /<br/>extract JSON block via regex]
    F --> G{Valid now?}
    G -->|Yes| E
    G -->|No| H[Return safe fallback structure<br/>+ friendly error to user]
    E --> I[Validate required keys exist<br/>default missing arrays to empty]
    I --> J[Return structured result]
```

**Single AI call produces both outputs** (Job-Fit Analysis + ATS Report) to minimize latency and free-tier API usage — this was a deliberate Day 1 decision, confirmed still correct.

---

## 5. External Services Summary

| Service | Purpose | Free Tier Limit Awareness |
|---|---|---|
| Google Cloud Console (OAuth) | Sign-in identity | Free, no practical limit for this scale |
| Google Gemini API | AI Job-Fit + ATS analysis | Free tier has per-minute/per-day request caps — acceptable for demo/dev use, noted as a scaling risk for Future Scope |
| MongoDB Atlas | Persistent storage (users' analyses) | M0 free cluster: 512MB storage — far more than v1.0 needs |
| Vercel | Hosting (frontend + serverless API) | Free Hobby tier: sufficient for a personal/demo-scale app |

---

## 6. Deployment Topology

```mermaid
graph LR
    GH[GitHub Repo<br/>main branch] -->|auto-deploy on push| VC[Vercel Project]
    VC -->|serves| Prod[Production URL<br/>*.vercel.app]
    VC -->|env vars injected at runtime| Secrets[GOOGLE_CLIENT_ID/SECRET<br/>NEXTAUTH_SECRET<br/>MONGODB_URI<br/>GEMINI_API_KEY]
```

No changes to this topology are anticipated between now and Day 7 deployment.
