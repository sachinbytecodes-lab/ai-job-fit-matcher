# SETUP.md — AI Job-Fit Matcher

Complete installation and setup guide. Anyone (including a future you, or a reviewer) should be able to follow this to get the project running locally from scratch.

## Prerequisites

| Tool | Version Used | Why |
|---|---|---|
| Node.js | v25.8.1 (v18+ required) | JavaScript runtime for Next.js and npm |
| npm | v11.11.0 (bundled with Node) | Package manager |
| VS Code | Any recent version | Code editor |
| Git | Any recent version | Version control |

## VS Code Extensions (Recommended)

- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter

## 1. Clone the Repository

```bash
git clone https://github.com/sachinbytecodes-lab/ai-job-fit-matcher.git
cd ai-job-fit-matcher
```

## 2. Install Dependencies

```bash
npm install
```

This installs Next.js, React, Tailwind CSS, and our added packages: `mongoose`, `next-auth`, `pdf-parse`, `mammoth`, `@google/generative-ai`.

## 3. Set Up Environment Variables

Create a `.env.local` file in the project root (see `ENVIRONMENT.md` for full details on obtaining each value):

```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=
GEMINI_API_KEY=
```

## 4. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` — you should see the AI Job-Fit Matcher landing page.

## 5. Verify Core Functionality

- [ ] Landing page loads with navy blue styling
- [ ] Clicking "Sign in with Google" opens the real Google account picker
- [ ] After sign-in, you land on `/dashboard` with your avatar initial showing
- [ ] `/analyze` and `/results/1` pages render with mock data
- [ ] Sign-out (click avatar) returns you to `/`

## Common Setup Issues

| Issue | Fix |
|---|---|
| Tailwind custom colors not applying | Ensure `[var(--color-name)]` syntax is used, not `[--color-name]` (Tailwind v4 requirement) |
| `redirect_uri_mismatch` on sign-in | Confirm Google Cloud Console's Authorized redirect URI exactly matches `http://localhost:3000/api/auth/callback/google` |
| MongoDB connection errors | Confirm IP allowlist in Atlas includes your current IP or `0.0.0.0/0`, and password in `MONGODB_URI` has no unescaped special characters |
| Non-breaking space / invisible character errors | Avoid copy-pasting code with smart quotes/spaces from formatted sources; use `cat > file << 'EOF'` in terminal for clean writes |
