const db_setup = require("../data/db_setup")

module.exports = async (client, ready) => {
    // Set the bot's online/idle/dnd/invisible status
    client.user.setStatus("online");
    // Make the bot change its status
    client.user.setActivity(`Aplistia Bot: Try ${client.config.prefix}help`, { type: 'PLAYING' })
        .then(presence => client.logger.log(`Activity set to ${presence.game ? presence.game.name : 'help message'}.`, "ready"))
        .catch(console.error);
    
    db_setup.run(client);
    // Print a startup message
    client.logger.log(`${client.user.tag}, ready to serve!`, "ready");
};