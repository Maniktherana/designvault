import { exec } from "child_process";
import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["index.ts", "drizzle.config.ts", "schema.ts", "schemas/*.ts"],
  splitting: false,
  treeshake: true,
  clean: true,
  outDir: "dist",
  minify: true,
  dts: true,
  format: ["cjs", "esm"],
  onSuccess: async () => {
    exec("tsc --emitDeclarationOnly");
  },
  ...options,
}));
