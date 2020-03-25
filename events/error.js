const {admins} = require("../config.json");

module.exports = async (client, e) => {
    if (client.users.get(admins[0])) {
        await client.users.get(admins[0]).send("ERROR:\n" + e.message);
        // await client.users.get(admins[0]).send(e.toString());
    }
    await client.logger.error(`An error event was sent by Discord.js: \n${JSON.stringify(e)}`);
    console.error(e);
    console.log(e);
    await client.destroy();
    process.exit(1);
};
