"use client";

import Link from "next/link";
import { ShieldCheck, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

const links = [
  {
    href: "/quiz",
    label: "Quiz",
    icon: "🎮",
  },
  {
    href: "/photo",
    label: "Photos",
    icon: "📸",
  },
  {
    href: "/conversations",
    label: "Conversations",
    icon: "💬",
  },
  {
    href: "/analyse",
    label: "Analyse IA",
    icon: "🤖",
  },
  {
    href: "/conseils",
    label: "Conseils",
    icon: "💡",
  },
  {
    href: "/progression",
    label: "Progression",
    icon: "🏆",
  },
];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-black tracking-tight"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <ShieldCheck size={21} />
          </span>

          <span>
            Avant de <span className="text-indigo-600">Poster</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-white dark:text-slate-300"
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl p-2 md:hidden"
          aria-label="Ouvrir le menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}