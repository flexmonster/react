import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { copyFileSync, mkdirSync } from 'fs';

// Plugin to copy TypeScript definitions
const copyTypescriptDefinitions = () => ({
  name: 'copy-typescript-definitions',
  closeBundle() {
    try {
      mkdirSync('dist/next', { recursive: true });
      copyFileSync('src/index.d.ts', 'dist/index.d.ts');
      copyFileSync('src/next/index.d.ts', 'dist/next/index.d.ts');
      console.log('✓ Copied TypeScript definitions');
    } catch (err) {
      console.error('✗ Failed to copy TypeScript definitions:', err.message);
    }
  }
});

const sharedPlugins = [
  peerDepsExternal(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx'],
    presets: ['@babel/preset-env', '@babel/preset-react']
  }),
  resolve({ extensions: ['.js', '.jsx'] }),
  commonjs(),
];

export default [
  // Main entry: "react-package"
  {
    input: 'src/index.js',
    output: [
      { file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true, exports: 'named' },
      { file: 'dist/index.esm.js', format: 'esm', sourcemap: true, exports: 'named' },
    ],
    plugins: [...sharedPlugins, copyTypescriptDefinitions()],
    external: ['react', 'react-dom', 'prop-types', '@flexmonster/flexmonster', '@flexmonster/react'],
  },
  // Next.js entry: "react-package/next"
  {
    input: 'src/next/index.js',
    output: [
      { file: 'dist/next/index.cjs.js', format: 'cjs', sourcemap: true, exports: 'named' },
      { file: 'dist/next/index.esm.js', format: 'esm', sourcemap: true, exports: 'named' },
    ],
    plugins: [...sharedPlugins],
    external: [
      'react', 'react-dom', 'prop-types',
      '@flexmonster/flexmonster', '@flexmonster/react',// important: treat your own root package as external so next/ doesn't re-bundle it
      'next', 'next/dynamic'
    ],
  },
];
