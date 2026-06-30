import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Bash Squad marketing site — React + Vite, no router (single landing page).
export default defineConfig({
  plugins: [react()],
  server: { open: true },
});
