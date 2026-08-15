import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/kalyani706/neet.git', // Replace <YOUR-REPO-NAME> with your GitHub repository name
  server: {
    port: 3000,
  }
});