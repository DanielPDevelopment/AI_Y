import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      'assets': path.resolve(__dirname, 'src/assets'),
      'components': path.resolve(__dirname, 'src/components'),
      'contexts': path.resolve(__dirname, 'src/contexts'),
      'helpers': path.resolve(__dirname, 'src/helpers'),
      'hooks': path.resolve(__dirname, 'src/hooks'),
      'views': path.resolve(__dirname, 'src/views'),
    },
  },
})