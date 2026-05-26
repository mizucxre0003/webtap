import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const source = resolve(root, "niche/stroy");
const target = resolve(root, "public/niche/stroy");
const publicNicheRoot = resolve(root, "public/niche");

if (!existsSync(source)) {
  throw new Error(`Source directory does not exist: ${source}`);
}

if (!target.startsWith(publicNicheRoot)) {
  throw new Error(`Refusing to copy outside public/niche: ${target}`);
}

rmSync(target, { recursive: true, force: true });
cpSync(source, target, {
  recursive: true,
  filter: (path) => {
    const relativePath = path.slice(source.length).replaceAll("\\", "/").replace(/^\/+/, "");
    if (!relativePath) return true;

    return (
      relativePath === "index.html" ||
      relativePath === "assets" ||
      relativePath.startsWith("assets/") ||
      relativePath === "css" ||
      relativePath.startsWith("css/") ||
      relativePath === "js" ||
      relativePath.startsWith("js/")
    );
  },
});

console.log(`Copied ${source} -> ${target}`);
