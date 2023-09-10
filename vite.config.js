import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Add the proxy middleware to the Vite server
      // "/api/mal": {
      //   target: "https://api.malsync.moe/mal/anime/",
      //   changeOrigin: true,
      //   secure: false,
      //   ws: true,
      //   rewrite: (path) => path.replace(/^\/api\/mal/, ""),
      // },
      "/source": {
        target: "https://ec.netmagcdn.com:2228",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/source/, ""),
      },
    },
  },
});
