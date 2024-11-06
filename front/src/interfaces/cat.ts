import type { BlocksContent } from "@strapi/blocks-react-renderer";

interface CatPhoto {
  url: string;
  alt: string;
}

interface CatTag {
  name: string;
}
interface Cat {
  name: string;
  description: BlocksContent;
  adopted: boolean;
  tags: CatTag[];
  photos: CatPhoto[];
}

export type { CatPhoto, Cat, CatTag };
