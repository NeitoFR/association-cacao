import React from "react";
import "./style.css";
import type { Tab } from "../../interfaces/Tabs";

interface SubTabProps {
  data: Tab[];
}

const SubTab: React.FC<SubTabProps> = ({ data }) => {
  return (
    <div
      className={`flex flex-col font-normal md:absolute md:left-0 md:top-[100%] md:max-h-0 md:min-w-full md:overflow-hidden md:bg-navbar md:pl-0 md:opacity-0 md:transition-all md:duration-300 md:group-hover:visible md:group-hover:max-h-[300px] md:group-hover:opacity-100`}
    >
      {data.map((tab, i) => (
        <a
          key={i}
          className="px-4 hover:bg-orange-200 md:block md:truncate md:whitespace-nowrap md:py-2"
          href={tab.href}
          role="menuitem"
        >
          {tab.name}
        </a>
      ))}
    </div>
  );
};

export default SubTab;
