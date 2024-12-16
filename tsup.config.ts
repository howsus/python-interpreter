import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/sandbox.worker.ts"],
  minify: false,
  splitting: true,
  sourcemap: true,
  silent: true,
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
