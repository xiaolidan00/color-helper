import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import strip from '@rollup/plugin-strip';
import commonjs from '@rollup/plugin-commonjs';
const moduleName = 'ColorHelper';
import typescript from '@rollup/plugin-typescript';
export default {
  input: `./src/parseColor.ts`,
  output: [
    {
      format: 'cjs',
      file: `dist/${moduleName}.cjs.js`
    },
    {
      format: 'es',
      file: `dist/${moduleName}.es.js`
    },
    {
      format: 'umd',
      file: `dist/${moduleName}.umd.js`,
      name: moduleName
    }
  ],
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false
    }),
    babel(),

    commonjs({
      exclude: ['node_modules/**', 'node_modules/**/*']
    }),
    // 压缩代码
    terser(),
    // 剔除debugger、assert.equal和 console.log 类似的函数
    strip({
      labels: ['unittest']
    })
  ]
};
