import React from "react";
import type { Tab } from "../interfaces/tab";

const tabs: Tab[] = [
  { name: "Accueil", href: "/" },
  { name: "Nos Chats", href: "/nos-chats" },
];
console.log(tabs);
console.log(process.env.STRAPI_URL);

const Navbar: React.FC = () => {
  return (
    <nav className="h-16 bg-orange-300 flex items-center">
      {/* <img
        className="h-12 w-12 ml-10"
        src={`${process.env.REACT_APP_STRAPI_URL}/uploads/Logo_d_811c852867.png`}
        alt="Logo"
      />
      {tabs.map((tab) => (
        <a
          key={tab.name}
          href={tab.href}
          className="ml-4 text-lg text-gray-800"
        >
          {tab.name}
        </a>
      ))}
      <div className="bg-lime-100 flex-grow h-full"></div> */}
    </nav>
  );
};

export default Navbar;
