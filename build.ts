import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/index.ts"],
  outfile: "./dist/index.js",
  bundle: true,
  format: "esm",
  platform: "node",
  target: "es2020",
  minify: true,
  sourcemap: true,
  external: ["pyodide"],
  loader: {
    ".whl": "file",
  },
});
