import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const sharedPlugins = [
  peerDepsExternal(),
  resolve({ extensions: ['.ts', '.tsx'] }),
  commonjs(),
];

export default [
  // Main entry
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.cjs.js', format: 'cjs', sourcemap: true, exports: 'named' },
      { file: 'dist/index.esm.js', format: 'esm', sourcemap: true, exports: 'named' },
    ],
    plugins: [
      ...sharedPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        rootDir: 'src',
      }),
    ],
    external: ['react', 'react-dom', '@flexmonster/flexmonster', '@flexmonster/react'],
  },
  // Next.js entry — declarations already emitted by the main entry above
  {
    input: 'src/next/index.ts',
    output: [
      { file: 'dist/next/index.cjs.js', format: 'cjs', sourcemap: true, exports: 'named' },
      { file: 'dist/next/index.esm.js', format: 'esm', sourcemap: true, exports: 'named' },
    ],
    plugins: [
      ...sharedPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationDir: undefined,
      }),
    ],
    external: [
      'react', 'react-dom',
      '@flexmonster/flexmonster', '@flexmonster/react',
      'next', 'next/dynamic',
    ],
  },
];
