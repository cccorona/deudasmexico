const path = require("path");
const fs = require("fs");
const { spawnSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const frontendDir = path.join(rootDir, "frontend");
const buildDir = path.join(frontendDir, "build");

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dest, name));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log("Building frontend...");
const buildResult = spawnSync("npm", ["run", "build"], {
  cwd: frontendDir,
  stdio: "inherit",
  shell: true,
});
if (buildResult.status !== 0) {
  process.exit(1);
}

if (!fs.existsSync(buildDir)) {
  console.error("Build output not found at", buildDir);
  process.exit(1);
}

console.log("Copying build to root...");
for (const name of fs.readdirSync(buildDir)) {
  const src = path.join(buildDir, name);
  const dest = path.join(rootDir, name);
  copyRecursive(src, dest);
  console.log("  ", name);
}
console.log("Done. Commit index.html and static/ then push to deploy.");
