# ENVIRONMENT.md — AI Job-Fit Matcher

All environment variables, external tools, and configuration required to run this project. `.env.local` is gitignored and must be created manually — this file is the reference for what goes in it.

## Environment Variables

| Variable | Purpose | Where to Get It |
|---|---|---|
| `GOOGLE_CLIENT_ID` | Identifies our app to Google OAuth | Google Cloud Console → APIs & Services → Credentials → OAuth client |
| `GOOGLE_CLIENT_SECRET` | Authenticates our app to Google OAuth (keep secret) | Same as above |
| `NEXTAUTH_SECRET` | Encrypts NextAuth session tokens | Generate locally: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Base URL NextAuth uses for callbacks | `http://localhost:3000` in dev; production URL after Day 7 deploy |
| `MONGODB_URI` | Connection string to our MongoDB Atlas cluster | MongoDB Atlas → Cluster → Connect → Drivers |
| `GEMINI_API_KEY` | Auth key for Google Gemini AI API calls | Google AI Studio → https://aistudio.google.com/apikey |

## External Services Configured Today

| Service | What Was Set Up |
|---|---|
| Google Cloud Console | New project `ai-job-fit-matcher`; OAuth consent screen (External, app name "AI Job-Fit Matcher"); OAuth Client ID with redirect URI `http://localhost:3000/api/auth/callback/google` |
| MongoDB Atlas | Free M0 cluster named `job-fit-matcher`, region Mumbai (ap-south-1); database user created; network access allows current IP + `0.0.0.0/0` (for future Vercel deployment) |
| Google AI Studio | Gemini API key generated (not yet used in code — scheduled for Day 5) |

## Configuration Files

| File | Purpose |
|---|---|
| `next.config.mjs` | Next.js configuration (default, unmodified) |
| `tailwind` config (via `globals.css` `@import "tailwindcss"`) | Tailwind v4 setup; custom theme variables defined in `:root` |
| `.gitignore` | Excludes `.env.local`, `node_modules`, `.next` from version control |
| `jsconfig.json` | Enables the `@/` import alias (e.g., `@/components/Navbar`) |

## Important: Tailwind v4 Syntax Note

This project uses Tailwind CSS v4. Custom CSS variables referenced in class names **must** use `var()`:

```
✅ Correct:   className="text-[var(--color-primary)]"
❌ Incorrect: className="text-[--color-primary]"
```

This was discovered and fixed during Day 3 setup — see `DAY3-SUMMARY.md` for details.

## Security Notes

- `.env.local` must never be committed — verified gitignored on Day 2 and confirmed still excluded today.
- `GOOGLE_CLIENT_ID` is not sensitive (visible in browser network requests), but `GOOGLE_CLIENT_SECRET` and `GEMINI_API_KEY` must remain private.
- MongoDB Atlas network access currently allows `0.0.0.0/0` (any IP) — acceptable because the database user's password is still required; this will be revisited if the project ever needs tighter security.
