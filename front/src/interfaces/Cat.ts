import type { BlocksContent } from "@strapi/blocks-react-renderer";

interface CatPhoto {
  url: string;
  alt: string;
}

interface CatSocialSkills {
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
  adopted: boolean;
  photos?: CatPhoto[] | null;
  socialSkills: CatSocialSkills;
  gender: string;
  age: string;
  robe: string;
  species?: string | null;
  sicknesses?: Sickness[] | null;
  fosterfamilyword?: string | null;
  sicknessandcare?: string | null;
  history?: string | null;
  temperandneed?: string | null;
}

export type { Cat, CatPhoto, CatSocialSkills };
