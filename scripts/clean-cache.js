#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const DIRS_TO_CLEAN = [".next", ".turbo", ".next/cache", ".next/dev"];

const SUBDIRS_TO_CLEAN = [".next", ".turbo", ".vite"];

function cleanDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`Removed: ${dirPath}`);
    } catch (err) {
      console.error(`Failed to remove ${dirPath}:`, err.message);
    }
  }
}

// Clean root directories
DIRS_TO_CLEAN.forEach(cleanDirectory);

// Clean app subdirectories (apps/docs, apps/web, etc.)
if (fs.existsSync("apps")) {
  const apps = fs.readdirSync("apps");
  apps.forEach((app) => {
    const appPath = path.join("apps", app);
    if (fs.lstatSync(appPath).isDirectory()) {
      SUBDIRS_TO_CLEAN.forEach((dir) => {
        const fullPath = path.join(appPath, dir);
        cleanDirectory(fullPath);
      });
    }
  });
}

// Clean packages subdirectories
if (fs.existsSync("packages")) {
  const packages = fs.readdirSync("packages");
  packages.forEach((pkg) => {
    const pkgPath = path.join("packages", pkg);
    if (fs.lstatSync(pkgPath).isDirectory()) {
      SUBDIRS_TO_CLEAN.forEach((dir) => {
        const fullPath = path.join(pkgPath, dir);
        cleanDirectory(fullPath);
      });
    }
  });
}

console.log("\nCache directories cleaned successfully!");
