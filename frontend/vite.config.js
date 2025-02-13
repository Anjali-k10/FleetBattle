

// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     react()
//   ],
// })


import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Load environment variables
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [
          tailwindcss(),
          react()
        ],
    server: {
      port: 5173, // Change if needed
    },
    define: {
      "process.env": process.env, // Enable process.env usage
    },
    envPrefix: "VITE_", // Ensures only VITE_ variables are used
  };
});
