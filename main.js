const Discord = require('discord.js');
const bot = new Discord.Client();
 
const prefix = 'GR';

var version = 'v1.0.1beta';

bot.on('ready', () => {
    console.log('Bot je spreman za poletanje!');
    bot.user.setActivity('GameRooms | Official Discord Server',{ type: 'WATCHING'}).catch(console.error);
})

bot.on('message' , message =>{

    let args = message.content.substring(prefix.length).split(" ");

    switch(args[0]){
        case 'ping':
            message.channel.send('Pong!')
            break;
        case 'Pozdrav':
            message.reply('pozdrav druže!')
            break;
        case 'info': 
            if(args[1] === 'version'){
                message.channel.send(version)
            }else{
                message.channel.send('Invalid Arguments')
            }
            break;
        case 'clear':
            if(!args[1]) return message.reply('greška! Molim te da redefinišeš drugi arguiment.')
                message.channel.bulkDelete(args[1]);
            break;
        
            }      
    }
    
);

bot.on('guildMemberAdd', member =>{
    const channel = member.guild.channels.cache.find(channel => channel.name === "『✨』join");
    if(!channel) return;

    channel.send(`Velkam to maj kendi šop, ${member}! Pročitaj pravila!`)
});

bot.login(procces.env.TOKEN);
