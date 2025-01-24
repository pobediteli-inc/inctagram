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
