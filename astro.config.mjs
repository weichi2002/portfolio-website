import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://weichi2002.github.io',
  base: '/portfolio-website/',
  vite: {
    plugins: [tailwindcss()],
  },
});
