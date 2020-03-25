exports.run = (client, message, args, userData) => {
    var text = args.join(" ");
    // RE server
    //client.guilds.get("153767654270697473").channels.get("459144307509690368").send(text);
    // French Vamps' bot-chan
    client.guilds.get("614881371609104386").channels.get("644304922631733248").send(text);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    privateOnly: false,
    requireAccount: false,
    requireAdmin: true,
    aliases: ["announcement"]
};

exports.help = {
    name: "announce",
    category: "Administration",
    description: "Posts a message from Edward to server-announcements.",
    usage: "announce <message>",
    wiki: "N/A"
};