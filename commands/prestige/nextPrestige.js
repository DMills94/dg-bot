const { Command } = require('discord.js-commando')

module.exports = class NextPrestige extends Command {
    constructor(client) {
        super(client, {
            name: 'nextprestige',
            aliases: ['np', 'prestige'],
            group: 'prestige',
            description: 'Calculates how many actions you need for different skills to reach the next prestige',
            memberName: 'prestige',
            argsType: 'multiple'
        })
    }

    async run(msg, args) {
        return msg.channel.send(args.join(' '))
    }
}