import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.BASE,
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: "reviews",
        filename: "remoteEntry.js",
        exposes: {
          "./reviews": "./src/App.tsx",
        },
        shared: ["react", "react-dom"],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
