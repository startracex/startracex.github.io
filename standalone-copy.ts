import { copyFile, mkdir, readdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "sharekit/path";

const copyDir = async (src, dest) => {
  if (!existsSync(dest)) {
    await mkdir(dest, { recursive: true });
  }

  const dirs = await readdir(src, { withFileTypes: true });

  await Promise.all(
    dirs.map(async (item) => {
      const srcPath = join(src, item.name);
      const destPath = join(dest, item.name);

      if (item.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await copyFile(srcPath, destPath);
      }
    }),
  );
};

Promise.all([copyDir("public", ".next/standalone/public"), copyDir(".next/static", ".next/standalone/.next/static")]);
