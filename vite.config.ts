import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "reviews",
      filename: "remoteEntry.js",
      exposes: {
        "./reviews": "./src/App.tsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
