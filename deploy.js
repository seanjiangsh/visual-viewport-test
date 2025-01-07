// filepath: /d:/Dev-Workspace/HTML-workspace/Practice/visual-viewport-test/deploy.js
const fs = require("fs-extra");
const path = require("path");

async function deploy() {
  const vanillaDist = path.join(__dirname, "packages", "vanilla-spa", "dist");
  const reactDist = path.join(__dirname, "packages", "react-spa", "dist");
  const distDir = path.join(__dirname, "dist");

  // Ensure dist directories exist
  await fs.ensureDir(path.join(distDir, "vanilla"));
  await fs.ensureDir(path.join(distDir, "react"));

  // Move vanilla-spa build files
  await fs.copy(vanillaDist, path.join(distDir, "vanilla"));

  // Move react-spa build files
  await fs.copy(reactDist, path.join(distDir, "react"));

  console.log("Build files moved successfully.");
}

deploy().catch((err) => {
  console.error(err);
  process.exit(1);
});
