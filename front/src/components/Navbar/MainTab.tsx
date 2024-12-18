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
        className={`group whitespace-nowrap pl-4 text-lg font-semibold md:cursor-pointer md:select-none`}
      >
        <div className="flex items-center text-[16px] font-bold lg:text-[20px]">
          <span>{data.name.toUpperCase()}</span>
          <img
            className="ml-2 size-3 lg:size-4"
            src="/icons/down_arrow.svg"
            alt=""
          />
        </div>
        <SubTab data={data.tabs}></SubTab>
      </div>
    </>
  );
};

export default MainTab;
