const version = 'v1.0.1beta';

module.exports = {
    name: 'info',
    description: 'Informacije o botu. Upotreba: GRinfo version',
    execute(message, args) {
        if (args[0] === 'version') {
            return message.channel.send(version);
        }
        return message.channel.send('Invalid Arguments');
    }
};
