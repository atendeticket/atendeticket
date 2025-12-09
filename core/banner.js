const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

function showBanner() {
  try {
    const asciiPath = path.join(__dirname, ".ascii");
    const ascii = fs.readFileSync(asciiPath, "utf8");

    console.log(chalk.cyan(ascii));
  } catch (error) {
    console.error(chalk.red("Erro ao carregar o arquivo ascii.txt"));
    console.error(error.message);
  }
}

module.exports = { showBanner };
