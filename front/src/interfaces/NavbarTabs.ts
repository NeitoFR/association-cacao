import type { Tab } from "./Tabs";

interface NavbarTab {
  name: string;
  icon?: string;
  tabs: Tab[];
}

export type { NavbarTab };
