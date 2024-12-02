import type { Schema, Struct } from "@strapi/strapi";

export interface CatFieldSocialCat extends Struct.ComponentSchema {
  collectionName: "components_cat_field_social_cats";
  info: {
    description: "";
    displayName: "SocialCat";
  };
  attributes: {
    isCatFriendly: Schema.Attribute.Enumeration<["yes", "no", "maybe"]> &
      Schema.Attribute.DefaultTo<"maybe">;
    isChildrenFriendly: Schema.Attribute.Enumeration<["yes", "no", "maybe"]> &
      Schema.Attribute.DefaultTo<"maybe">;
    isDogFriendly: Schema.Attribute.Enumeration<["yes", "no", "maybe"]> &
      Schema.Attribute.DefaultTo<"maybe">;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "cat-field.social-cat": CatFieldSocialCat;
    }
  }
}
