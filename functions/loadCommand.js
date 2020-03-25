// Loads commands, including all aliases and help text
exports.run = (client, commandName) => {
    try {
        const props = require(`../commands/${commandName}`);
        if (props.init) {
            props.init(client);
        }
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
        return false;
    } catch (e) {
        return `Unable to load command ${commandName}: ${e}`;
    }
};