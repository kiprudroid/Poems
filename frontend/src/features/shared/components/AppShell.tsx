import { Feather } from "lucide-react";
import type { ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/features/shared/lib/cn";

interface AppShellProps {
  children: ReactNode;
}

const links = [
  { to: "/", label: "Reading Room" },
  { to: "/poets", label: "Poets" },
] as const;

export const AppShell = ({ children }: AppShellProps): ReactNode => {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-parchment-300 bg-parchment-100/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-parchment-100">
              <Feather size={17} strokeWidth={1.8} />
            </span>
            <span className="font-display text-2xl font-semibold tracking-wide">
              Poet&rsquo;s Corner
            </span>
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                aria-current={
                  location.pathname === link.to ? "page" : undefined
                }
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-4 py-2 font-display text-lg font-semibold tracking-wide transition-colors",
                    isActive
                      ? "bg-ink-900 text-parchment-100"
                      : "text-ink-600 hover:bg-parchment-200 hover:text-ink-900",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10">
        {children}
      </main>
      <footer className="border-t border-parchment-300">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-1 px-5 py-8 text-center">
          <p className="font-display text-lg text-ink-600 italic">
            &ldquo;Poetry is the spontaneous overflow of powerful
            feelings.&rdquo;
          </p>
          <p className="text-sm text-ink-500">
            Verses from PoetryDB, in the public domain · Crafted by Shadrack
            Kipruto
          </p>
        </div>
      </footer>
    </div>
  );
};
