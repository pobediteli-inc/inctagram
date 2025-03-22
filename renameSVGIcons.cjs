const fs = require("fs");
const { join } = require("path");
const fsp = fs.promises;

const dirIcons = "public/icons/svg";

// renaming .svg files
async function renameSVGIcons() {
  try {
    const files = await fsp.readdir(dirIcons);
    for (const file of files) {
      const newName = file.replace(/ /g, "-").replace("(", "").replace(")", "").toLowerCase();
      await fsp.rename(join(dirIcons, file), join(dirIcons, newName));
    }
    console.log("Files successfully renamed");
  } catch (error) {
    console.error("Error when renaming files:", error);
  }
}

void renameSVGIcons();

// pnpm dlx @svgr/cli "./src/assets/logo/*.svg" --out-dir ".\src\assets\svgComponents\" --icon --jsx-runtime automatic --typescript --ref --memo --replace-attr-values "#000=currentColor,#fff=currentColor" --svg-props "fill=currentColor"
