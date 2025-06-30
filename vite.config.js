import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // 💥 This is the magic fix
  plugins: [react()],
});
