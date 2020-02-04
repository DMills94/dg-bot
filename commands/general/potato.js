const { Command } = require('discord.js-commando')

module.exports = class PotatoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'potato',
            aliases: ['janne', 'potate'],
            group: 'general',
            description: '\:potato:',
            memberName: 'potato'
        })
    }

    async run(msg, args) {
        return msg.channel.send('\:potato:')
    }
}