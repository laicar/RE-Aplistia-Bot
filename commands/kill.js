exports.run = async (client, message, args, userData) => {
    //var busy = await client.sql.all("SELECT * FROM sav_users WHERE busy != 0;");
    //if (busy.length > 0) return message.channel.send("I don't particularly feel like taking a forced nap right now. Perhaps try again later.");
    await message.channel.send("I don't feel so good, Ms Eclogia.");
    await client.destroy();
    client.sql.close();
    process.exit();
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    privateOnly: false,
    requireAccount: false,
    requireAdmin: true,
    aliases: ["k", "goodnight"]
};

exports.help = {
    name: "kill",
    category: "Administration",
    description: "Shuts down the bot safely.",
    usage: "kill",
    wiki: "N/A"
};