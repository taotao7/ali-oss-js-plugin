const esbuild = require('esbuild');
esbuild.buildSync({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'iife',
  globalName: 'Utils',
  minify: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  platform: 'browser',
  outfile: 'dist/oss-plugin-min.js',
});

esbuild.buildSync({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'iife',
  globalName: 'Utils',
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  platform: 'browser',
  outfile: 'dist/oss-plugin.js',
});
