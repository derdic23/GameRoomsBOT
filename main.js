const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events, ActivityType } = require('discord.js');

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

const prefix = 'GR';

// Učitavanje svih komandi iz foldera commands/
bot.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
for (const file of fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))) {
    const command = require(path.join(commandsPath, file));
    bot.commands.set(command.name.toLowerCase(), command);
}

bot.once(Events.ClientReady, () => {
    console.log('Bot je spreman za poletanje!');
    bot.user.setActivity('GameRooms | Official Discord Server', { type: ActivityType.Watching });
});

bot.on(Events.MessageCreate, async message => {
    if (message.author.bot || !message.inGuild()) return;
    if (!message.content.startsWith(prefix)) return;

    // Radi i "GRping" i "GR ping"
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Došlo je do greške pri izvršavanju komande.').catch(console.error);
    }
});

bot.on(Events.GuildMemberAdd, member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === '『✨』join');
    if (!channel) return;

    channel.send(`Velkam to maj kendi šop, ${member}! Pročitaj pravila!`).catch(console.error);
});

if (!process.env.TOKEN) {
    console.error('Nedostaje TOKEN environment varijabla!');
    process.exit(1);
}

bot.login(process.env.TOKEN);
