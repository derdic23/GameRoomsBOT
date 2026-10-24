const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Briše poruke iz kanala. Upotreba: GRclear <1-100>',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return message.reply('nemaš dozvolu za brisanje poruka.');
        }
        if (!args[0]) {
            return message.reply('greška! Molim te da redefinišeš drugi argument.');
        }

        const amount = Number(args[0]);
        if (!Number.isInteger(amount) || amount < 1 || amount > 100) {
            return message.reply('unesi broj između 1 i 100.');
        }

        // true = preskače poruke starije od 14 dana umesto da baci grešku
        const deleted = await message.channel.bulkDelete(amount, true);
        if (deleted.size < amount) {
            const notice = await message.channel.send(`Obrisano ${deleted.size} poruka (starije od 14 dana ne mogu da se brišu).`);
            setTimeout(() => notice.delete().catch(() => {}), 5000);
        }
    }
};
