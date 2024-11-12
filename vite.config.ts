import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import env from 'vite-plugin-env-compatible'
// https://vitejs.dev/config/
export default defineConfig({
  envPrefix:"BACKEND_",
  plugins: [
    react(),
    env()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
