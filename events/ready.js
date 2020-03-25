module.exports = async (client, ready) => {
    const moment = require("moment");
    // Set the bot's online/idle/dnd/invisible status
    client.user.setStatus("online");
    // Make the bot change its status
    /*
    client.user.setActivity(`RE Heroes: Try ${client.config.prefix}help`, { type: 'PLAYING' })
        .then(presence => client.logger.log(`Activity set to ${presence.game ? presence.game.name : 'nothing'}.`, "ready"))
        .catch(console.error);
    */
    // Print a startup message
    client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready"); 
};