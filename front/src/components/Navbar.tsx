import { useState, useEffect } from "react";
import type { Tab } from "../interfaces/tab";
import "./Navbar.css";

const tabs: Tab[] = [
  { name: "Accueil", href: "/" },
  { name: "Nos Chats", href: "/nos-chats" },
  { name: "Une autre page", href: "/nos-chats" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log("isMenuOpen", isMenuOpen);
  }, [isMenuOpen]);

  return (
    <nav
      className={`navbar bg-orange-300 flex flex-col overflow-hidden ${isMenuOpen ? "expanded" : ""}`}
    >
      <div className="flex h-16 w-full items-center">
        <img
          className="h-12 w-12 md:ml-10 ml-4"
          src={`${import.meta.env.PUBLIC_STRAPI_URL}/uploads/logo_d.png`}
          alt="Logo"
        />
        <div
          className={`opacity-100 duration-300 h-16 hidden md:flex md:items-center ${isMenuOpen ? "opacity-0" : ""}`}
        >
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className="ml-4 text-lg text-gray-800"
            >
              {tab.name}
            </a>
          ))}
        </div>
        <div className="flex-grow h-full"></div>
        <button
          className={`hamburger md:hidden flex flex-col justify-center items-center bg-transparent h-16 w-16 space-y-1 shrink-0 ${isMenuOpen ? "active" : ""} `}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <span key={i} />
            ))}
        </button>
      </div>
      <div
        className={`flex flex-col opacity-0 duration-300 overflow-y-auto ${isMenuOpen ? "opacity-100" : ""}`}
      >
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            className="pl-8 py-4 h-16 botext-lg text-gray-800 text-xl border-b-2 border-b-orange-100 hover:bg-orange-400 duration-200"
          >
            {tab.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
