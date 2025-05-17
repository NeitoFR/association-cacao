// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      "STRAPI_API_TOKEN": {
        type: "string",
        context: "server",
        access: "secret"
      },
      "PUBLIC_STRAPI_URL": {
        type: "string",
        context: "server",
        access: "public"
      },
    },
  },
  site: "https://cacao.neitosden.fr",
  integrations: [react(), tailwind()],
  experimental: {},
  vite: {
    server: {
      watch: { usePolling: true },
    },
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
