import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/*'],
    exclude: 'test/config.ts',
    coverage: {
      reporter: ['json', 'text', 'html'],
    },
  },
});
