// import path from "path";
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     proxy: {
//       // Add the proxy middleware to the Vite server
//       "/api/enime": {
//         target: "https://api.enime.moe",
//         changeOrigin: true,
//         secure: false,
//         ws: true,
//         rewrite: (path) => path.replace(/^\/api\/enime/, ""),
//       },
//     },
//   },
// });

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default ({ command }) => {
  const isDevelopment = command === "serve";

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: isDevelopment
        ? {
            "/api/enime": {
              target: "https://api.enime.moe",
              changeOrigin: true,
              secure: false,
              ws: true,
              rewrite: (path) => path.replace(/^\/api\/enime/, ""),
            },
          }
        : {},
    },
  });
};
