import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/*'],
    exclude: ['test/config.ts', 'test/browser/*'],
    coverage: {
      reporter: ['json', 'text', 'html'],
    },
  },
});
