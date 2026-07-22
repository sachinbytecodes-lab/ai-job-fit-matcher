# API.md — AI Job-Fit Matcher (v1.0 Endpoint Design)

No implementation yet — this is the contract every endpoint will follow starting Day 3-6.

All endpoints are Next.js API Routes. All routes except NextAuth's own are protected — they require a valid session, checked server-side via `getServerSession`.

---

## 1. `GET / POST /api/auth/[...nextauth]`

**Purpose:** Handles the entire Google OAuth sign-in/sign-out/session lifecycle via NextAuth.js — not hand-written, but documented for completeness.

- **Request:** Managed internally by NextAuth (redirects, callbacks)
- **Response:** Session cookie set; redirects to configured pages
- **Authentication:** N/A (this endpoint establishes it)
- **Validation:** Handled by NextAuth + Google
- **Error cases:** OAuth denial → redirected back to landing page with no session created

---

## 2. `POST /api/analyze`

**Purpose:** Core feature endpoint. Accepts a resume file + job description, extracts text, runs the AI analysis, saves the result, and returns its id.

### Request
- **Content-Type:** `multipart/form-data`
- **Fields:**
  | Field | Type | Required |
  |---|---|---|
  | `resume` | File (.pdf or .docx, max 5MB) | ✅ |
  | `jobDescription` | String (min 50 characters) | ✅ |

### Response — `201 Created`
```json
{
  "success": true,
  "analysisId": "665f1c2e8b1a4a0012ab34cd"
}
```

### Authentication
Required. Rejects with `401` if no valid session.

### Validation
- File type must be `.pdf` or `.docx` — else `400`
- File size must be ≤ 5MB — else `400`
- `jobDescription` must be present and ≥ 50 characters — else `400`
- If resume text extraction yields empty/near-empty text — `422` (unprocessable)

### Error Cases
| Status | Case |
|---|---|
| `400` | Missing file, wrong file type, oversized file, JD too short |
| `401` | Not signed in |
| `422` | File uploaded but text extraction failed or returned empty content |
| `502` | AI API call failed or timed out after retry |
| `500` | Unexpected server error (DB write failure, etc.) |

---

## 3. `GET /api/analyses`

**Purpose:** Fetch the signed-in user's full analysis history for the dashboard.

### Request
No body. `userId` is derived from the server-side session — never accepted as a query param, to prevent one user from requesting another's data.

### Response — `200 OK`
```json
{
  "analyses": [
    {
      "_id": "665f1c2e8b1a4a0012ab34cd",
      "jobTitleSnippet": "Senior Backend Engineer at Acme Corp...",
      "fitScore": 78,
      "atsScore": 65,
      "createdAt": "2026-07-20T10:15:00.000Z"
    }
  ]
}
```
Returns only summary fields needed for the dashboard list — not the full resume/JD text (kept lightweight).

### Authentication
Required. `401` if no session.

### Validation
None required (no input beyond the session).

### Error Cases
| Status | Case |
|---|---|
| `401` | Not signed in |
| `500` | Database read failure |

---

## 4. `GET /api/analyses/:id`

**Purpose:** Fetch one full analysis record for the results page.

### Request
- **Path param:** `id` (MongoDB ObjectId)

### Response — `200 OK`
```json
{
  "_id": "665f1c2e8b1a4a0012ab34cd",
  "jobDescription": "Full JD text...",
  "resumeFileName": "resume_sachin.pdf",
  "fitScore": 78,
  "matchingSkills": ["React", "Node.js", "REST APIs"],
  "missingSkills": ["GraphQL", "Docker"],
  "suggestions": [
    "Add 'GraphQL' explicitly if you've used it in any project",
    "Mention containerization experience if applicable"
  ],
  "atsScore": 65,
  "atsMissingKeywords": ["CI/CD", "Agile"],
  "atsSectionChecks": {
    "contactInfo": true,
    "experience": true,
    "education": true,
    "skills": false
  },
  "atsFormattingFeedback": ["Avoid multi-column layout — some ATS parsers misread column order"],
  "createdAt": "2026-07-20T10:15:00.000Z"
}
```

### Authentication
Required. `401` if no session.

### Validation
- `id` must be a valid MongoDB ObjectId format — else `400`
- The record's `userId` must match the session's user — else `403` (not `404`, so we don't leak existence, but `403` is acceptable here since this is a personal-data app, not a security-sensitive multi-tenant system)

### Error Cases
| Status | Case |
|---|---|
| `400` | Malformed `id` |
| `401` | Not signed in |
| `403` | Record exists but belongs to a different user |
| `404` | Record does not exist |
| `500` | Database read failure |

---

## Endpoint Summary Table

| Method | Path | Purpose | Auth Required |
|---|---|---|---|
| `GET/POST` | `/api/auth/[...nextauth]` | Sign-in/out lifecycle | N/A |
| `POST` | `/api/analyze` | Upload + analyze + save | ✅ |
| `GET` | `/api/analyses` | Fetch history (dashboard) | ✅ |
| `GET` | `/api/analyses/:id` | Fetch single analysis (results page) | ✅ |

**This is the complete v1.0 API surface** — matches the PRD's functional requirements exactly, with no extra or missing endpoints. No batch endpoints, no job-fetching endpoints (correctly deferred to Future Scope).
