module.exports = {
    name: 'pozdrav',
    description: 'Bot te pozdravlja.',
    execute(message, args) {
        return message.reply('pozdrav druže!');
    }
};
