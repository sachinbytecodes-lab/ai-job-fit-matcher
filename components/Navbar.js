"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const initials = session?.user?.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-sm border-b border-[var(--color-border)]">
      <a href="/dashboard" className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-[var(--color-primary)] text-white text-sm font-bold flex items-center justify-center">
          J
        </span>
        <span className="text-lg font-bold text-[var(--color-primary)]">
          AI Job-Fit Matcher
        </span>
      </a>

      <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
        <a href="/dashboard" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
          Dashboard
        </a>
        <a href="/analyze" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
          New Analysis
        </a>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          aria-label={session?.user?.name ? `Sign out of ${session.user.name}'s account` : "Sign out"}
          title="Sign out"
          className="w-8 h-8 rounded-full bg-[var(--color-accent)] text-white text-xs font-semibold hover:opacity-90"
        >
          {initials}
        </button>
      </div>

      <button
        className="sm:hidden text-[var(--color-text)]"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {menuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 sm:hidden bg-white border-b border-[var(--color-border)] flex flex-col p-4 gap-3 shadow-md">
          <a href="/dashboard" className="text-[var(--color-text)] font-medium">Dashboard</a>
          <a href="/analyze" className="text-[var(--color-text)] font-medium">New Analysis</a>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-left text-red-600 font-medium"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}