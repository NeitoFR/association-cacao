import React, { useState, useEffect } from "react";
import "./style.css";
import type { NavbarTab } from "../../interfaces/NavbarTabs.ts";
import SubTab from "./SubTab.tsx";

interface MainTabProps {
  data: NavbarTab;
}

const MainTab: React.FC<MainTabProps> = ({ data }) => {
  return (
    <>
      <div
        // className={`group relative md:flex md:h-full md:cursor-pointer md:select-none md:items-center md:px-4 md:text-lg md:font-normal`}
        className={`group whitespace-nowrap pl-4 text-lg font-semibold md:relative md:flex md:h-full md:cursor-pointer md:select-none md:items-center md:px-4 md:text-lg md:font-normal`}
      >
        {data.name}
        <SubTab data={data.tabs}></SubTab>
      </div>
    </>
  );
};

export default MainTab;
