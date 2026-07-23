"use client";

import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const initials = session?.user?.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <span className="text-xl font-bold text-[var(--color-primary)]">
        AI Job-Fit Matcher
      </span>
      <div className="flex items-center gap-6 text-sm font-medium">
        <a href="/dashboard" className="hover:text-[var(--color-primary)]">
          Dashboard
        </a>
        <a href="/analyze" className="hover:text-[var(--color-primary)]">
          New Analysis
        </a>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          title="Sign out"
          className="w-8 h-8 rounded-full bg-[var(--color-accent)] text-white text-xs"
        >
          {initials}
        </button>
      </div>
    </nav>
  );
}