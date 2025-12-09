#!/usr/bin/env node
const { showBanner } = require('./core/banner');
const { mainMenuPrompt } = require('./prompts/mainMenu');
const { handleMenu } = require('./appInstaller');

(async () => {
    await showBanner();
    const choice = await mainMenuPrompt();
    await handleMenu(choice);
})();
