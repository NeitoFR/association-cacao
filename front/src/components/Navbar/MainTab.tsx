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
        <div className="flex items-center text-[20px] font-bold">
          <span>{data.name.toUpperCase()}</span>
          <img
            className="h-8 w-8"
            src={import.meta.env.PUBLIC_STRAPI_URL + "/uploads/down_arrow.svg"}
            alt=""
          />
        </div>
        <SubTab data={data.tabs}></SubTab>
      </div>
    </>
  );
};

export default MainTab;
