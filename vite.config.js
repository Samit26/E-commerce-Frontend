import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    allowedHosts: ['5330-2409-40c1-2012-8c26-48d1-2099-1aba-8e88.ngrok-free.app']
  },
  plugins: [react()],
});