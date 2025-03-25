import React, { useState, useEffect } from "react";
import "./style.css";
import type { NavbarTab } from "../../interfaces/NavbarTabs.ts";
import MainTab from "./MainTab.tsx";

interface NavbarProps {
  tabs: NavbarTab[];
}

const Navbar: React.FC<NavbarProps> = ({ tabs }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // console.log(tabs);
  }, []);
  return (
    <>
      <nav
        className={`flex h-28 flex-col bg-navbar transition-all duration-300 ${isMenuOpen ? "h-64" : ""}`}
      >
        <div className="relative flex min-h-28 w-full items-center">
          <a className="ml-4 mr-6 h-16 w-16 lg:ml-6 lg:h-24 lg:w-24" href="/">
            <img
              src={`${import.meta.env.PUBLIC_STRAPI_URL}/uploads/logo_d.png`}
              alt="Logo"
            />
          </a>
          <div className="hidden h-28 md:absolute md:flex md:w-full md:flex-col md:items-center md:justify-end">
            <div className="mb-3 text-[26px] text-cacaoMeanings lg:text-[30px]">
              Club des Amis des Chats Abandonnés ou Orphelins
            </div>
            <div className="flex">
              {tabs.map((tab, i) => (
                <MainTab key={i} data={tab} />
              ))}
            </div>
          </div>
          <a
            className="absolute right-0 ml-4 mr-24 size-16 md:mr-6 md:size-20 lg:size-24"
            href="/"
          >
            <div className="dons flex h-full w-full items-center justify-center bg-cover bg-center text-center text-[12px] font-bold text-white md:text-[14px] lg:text-[17px]">
              FAIRE UN DON
            </div>
          </a>
          <button
            className={`hamburger absolute right-0 mr-4 flex h-16 w-16 shrink-0 flex-col items-center justify-center space-y-1 md:hidden ${isMenuOpen ? "active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <span
                  key={i}
                  className="relative h-[8%] w-1/2 rounded-full bg-orange-400 transition-all duration-300"
                />
              ))}
          </button>
        </div>
        <div
          className={`flex flex-col overflow-y-auto opacity-0 duration-300 md:hidden ${isMenuOpen ? "opacity-100" : ""}`}
        >
          {tabs.map((tab, i) => (
            <MainTab key={i} data={tab} />
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
