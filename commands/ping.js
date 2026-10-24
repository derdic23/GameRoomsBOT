module.exports = {
    name: 'ping',
    description: 'Ovo je test komanda!',
    execute(message, args) {
        return message.channel.send('Pong!');
    }
};
