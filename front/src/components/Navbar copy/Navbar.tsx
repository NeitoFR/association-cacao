import { useState, useEffect } from "react";
import type { Tab } from "../../interfaces/NavbarTabs";
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
      className={`navbar flex flex-col overflow-hidden bg-orange-300 ${isMenuOpen ? "expanded" : ""}`}
    >
      <div className="flex h-16 w-full items-center">
        <img
          className="ml-4 h-12 w-12 md:ml-10"
          src={`${import.meta.env.PUBLIC_STRAPI_URL}/uploads/logo_d.png`}
          alt="Logo"
        />
        <div
          className={`hidden h-16 opacity-100 duration-300 md:flex md:items-center ${isMenuOpen ? "opacity-0" : ""}`}
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
        <div className="h-full flex-grow"></div>
        <button
          className={`hamburger flex h-16 w-16 shrink-0 flex-col items-center justify-center space-y-1 bg-transparent md:hidden ${isMenuOpen ? "active" : ""} `}
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
        className={`flex flex-col overflow-y-auto opacity-0 duration-300 ${isMenuOpen ? "opacity-100" : ""}`}
      >
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            className="h-16 border-b-2 border-b-orange-100 py-4 pl-8 text-xl text-gray-800 duration-200 hover:bg-orange-400"
          >
            {tab.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
