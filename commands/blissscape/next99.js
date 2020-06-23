const { Command } = require('discord.js-commando')
const SKILLS = require('../../helpers/skills/skills.js')
const { RichEmbed } = require('discord.js')

const skillList = Object.values(SKILLS).map(skill => skill.info.name)

module.exports = class Next99 extends Command {
    constructor(client) {
        super(client, {
            name: '99',
            aliases: ['n99', '99'],
            group: 'blissscape',
            description: 'Calculates how many actions you need for different skills to reach level 99 in the next prestige',
            memberName: '99',
            args: [
                {
                    key: 'skill',
                    label: 'skill',
                    prompt: 'What skill you would like to calculate for?',
                    type: 'string',
                    error: `
                        The skill you entered is invalid! Please type one of:
                        \`${skillList.join(', ')}\`
                    `,
                    oneOf: skillList.map(skill => skill.toLowerCase()),
                    parse: val => val.toLowerCase()
                },
                {
                    key: 'prestige',
                    label: 'current prestige',
                    prompt: 'What is your current prestige?',
                    type: 'integer',
                    min: 0,
                    max: 8
                },
                {
                    key: 'xp',
                    label: 'current xp',
                    prompt: 'What is your current xp in your prestige?',
                    type: 'string'
                }
            ]
        })
    }

    async run(msg, args) {
        msg.channel.send('yes boss')
    }
}