import type { BlocksContent } from "@strapi/blocks-react-renderer";

interface CatPhoto {
  url: string;
  alt: string;
}

interface SocialSkills {
  isDogFriendly: string;
  isChildrenFriendly: string;
  isCatFriendly: string;
}

interface Sickness {
  name: string;
  link?: string | null;
}

interface Cat {
  documentId: string;
  name: string;
  description?: BlocksContent | null;
  adopted: boolean;
  photos?: CatPhoto[] | null;
  socialSkills: SocialSkills;
  gender: string;
  age: string;
  robe: string;
  sicknesses?: Sickness[] | null;
}

export type { Cat };
