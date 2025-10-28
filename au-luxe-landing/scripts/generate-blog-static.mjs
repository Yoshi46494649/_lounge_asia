import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

const BLOG_SLUGS = [
  "brisbane-asian-meetup-guide-2025",
  "asian-dating-brisbane-complete-guide",
  "speed-dating-asian-singles-brisbane",
  "best-brisbane-spots-asian-community",
  "melbourne-asian-scene-guide",
  "tips-making-friends-asian-community",
];

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");

if (!existsSync(indexPath)) {
  console.warn("[postbuild] dist/index.html not found – skipping static blog generation.");
  process.exit(0);
}

const indexHtml = readFileSync(indexPath, "utf-8");

const adjustAssetPaths = (html, depth) => {
  if (depth <= 0) {
    return html;
  }
  const prefix = "../".repeat(depth);
  return html.replace(/((?:src|href)=)"\.\/assets\//g, `$1"${prefix}assets/`);
};

const writeHtml = (relativeDir, depth) => {
  const targetDir = path.join(distDir, relativeDir);
  mkdirSync(targetDir, { recursive: true });
  const adjustedHtml = adjustAssetPaths(indexHtml, depth);
  writeFileSync(path.join(targetDir, "index.html"), adjustedHtml, "utf-8");
};

// Blog landing page (/speed-dating/lp/blog/)
writeHtml("blog", 1);

// Individual blog posts (/speed-dating/lp/blog/:slug/)
BLOG_SLUGS.forEach((slug) => {
  writeHtml(path.join("blog", slug), 2);
});

console.log("[postbuild] Generated static blog entry points in dist/");
