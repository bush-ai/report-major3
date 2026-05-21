import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import bushAiLogo from "@assets/bushAiLogo_1779324838107.png";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Awards", href: "#awards" },
  { label: "Teams", href: "#teams" },
  { label: "Players", href: "#players" },
  { label: "MVP", href: "#mvp" },
  { label: "Moments", href: "#moments" },
  { label: "Games", href: "#games" },
  { label: "Storylines", href: "#storylines" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(7,7,13,0.92)"
          : "rgba(7,7,13,0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(168,85,247,0.2)",
        boxShadow: scrolled ? "0 0 30px rgba(168,85,247,0.08)" : "none",
      }}
      data-testid="navbar"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#overview"
          onClick={(e) => handleNav(e, "#overview")}
          className="flex items-center gap-3 group"
          data-testid="nav-logo"
        >
          <img
            src={bushAiLogo}
            alt="BushAI"
            className="w-9 h-9 rounded-lg group-hover:scale-105 transition-transform"
          />
          <span
            className="font-bold text-sm tracking-wide hidden sm:block"
            style={{ color: "#f8fafc" }}
          >
            BushAI
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 hover:text-[#a855f7]"
              style={{ color: "#a1a1aa" }}
              data-testid={`nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-md transition-colors"
          style={{ color: "#a1a1aa" }}
          onClick={() => setMenuOpen(!menuOpen)}
          data-testid="nav-menu-toggle"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden border-t px-6 py-4 flex flex-col gap-1"
          style={{
            background: "rgba(7,7,13,0.97)",
            borderColor: "rgba(168,85,247,0.2)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="py-2.5 px-3 rounded-md text-sm font-medium transition-all hover:text-[#a855f7] hover:bg-[rgba(168,85,247,0.08)]"
              style={{ color: "#a1a1aa" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
