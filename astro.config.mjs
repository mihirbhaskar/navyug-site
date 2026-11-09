// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Keep source whitespace so inline links in prose don't lose their surrounding spaces.
  compressHTML: false,
});
