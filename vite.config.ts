import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // https 환경에서 공유하기 기능 확인 위함
  server: {
    allowedHosts: [".loca.lt", ".trycloudflare.com"],
  },
  preview: {
    allowedHosts: [".loca.lt", ".trycloudflare.com"],
  },
});
