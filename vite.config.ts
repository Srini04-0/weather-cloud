import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // allows external access (needed for Render)
    port: 8080,
    allowedHosts: ["weather-cloud-l16f.onrender.com"], // ✅ your Render domain
  },
});

