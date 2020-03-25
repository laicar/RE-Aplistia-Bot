exports.run = (client) => {
    const fs = require("fs");
    const moment = require("moment");
    // Make sure we don't overwrite another backup, although that would be really hard to do
    if (fs.existsSync(`./data/backups/edward_${moment().format("Y-MM-DD-HH-mm-ss")}.sqlite`)) return false;
    // Make the backup
    fs.copyFile('./data/edward.sqlite', `./data/backups/edward_${moment().format("Y-MM-DD-HH-mm-ss")}.sqlite`, (err) => {
        if (err) throw err;
    });
};