import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { copyFileSync } from 'fs';

// Plugin to copy TypeScript definitions
const copyTypescriptDefinitions = () => ({
  name: 'copy-typescript-definitions',
  writeBundle() {
    try {
      copyFileSync('src/index.d.ts', 'dist/index.d.ts');
      console.log('✓ Copied TypeScript definitions');
    } catch (err) {
      console.warn('⚠ Could not copy TypeScript definitions:', err.message);
    }
  }
});

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      exports: 'named'
    }
  ],
  plugins: [
    peerDepsExternal(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx'],
      presets: ['@babel/preset-env', '@babel/preset-react']
    }),
    resolve({
      extensions: ['.js', '.jsx']
    }),
    commonjs(),
    copyTypescriptDefinitions(),
    // terser() // Disabled for debugging
  ],
  external: ['react', 'react-dom', 'prop-types', '@flexmonster/flexmonster']
};
