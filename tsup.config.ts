import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  minify: false,
  splitting: false,
  sourcemap: true,
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  shims: true,
  external: ["pyodide"],
  noExternal: ["@jupyterlite/pyodide-kernel"],
  loader: {
    ".whl": "file",
  },
});
