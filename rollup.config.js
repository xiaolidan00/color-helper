import {nodeResolve} from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import strip from "@rollup/plugin-strip";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

const plugins = [
  nodeResolve(),
  typescript({
    tsconfig: "./tsconfig.json"
  }),
  babel(),

  commonjs({
    exclude: ["node_modules/**", "node_modules/**/*"]
  }),
  // 压缩代码
  terser(),
  // 剔除debugger、assert.equal和 console.log 类似的函数
  strip({
    labels: ["unittest"]
  })
];

export default [
  {
    input: `./src/index.ts`,
    output: [
      {
        format: "cjs",
        file: `dist/index.cjs.js`
      },
      {
        format: "es",
        file: `dist/index.es.js`
      },
      {
        format: "umd",
        file: `dist/index.umd.js`,
        name: "XCOLOR_HELPER"
      }
    ],
    plugins
  }
];
