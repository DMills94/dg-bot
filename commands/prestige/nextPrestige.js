const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js')
const SKILLS = require('../../skills/skills/skills.js')
const prestigeFuncs = require('../../skills/prestige-info/prestige.js')

const { stripIndent } = require('common-tags')

const skillList = Object.values(SKILLS).map(skill => skill.info.name)

module.exports = class NextPrestige extends Command {
    constructor(client) {
        super(client, {
            name: 'nextprestige',
            aliases: ['np', 'prestige'],
            group: 'prestige',
            description: 'Calculates how many actions you need for different skills to reach the next prestige',
            memberName: 'prestige',
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
            ],
            argsType: 'multiple',
            examples: ['nextprestige agility 0 13m']
        })
    }

    async run(msg, args) {
        let { skill = skill.toLowerCase(), prestige, xp } = args
        if (['m', 'k'].some(char => xp.toLowerCase().includes(char))) {
            if (xp.includes('m')) xp = xp.replace('m', '000000')
            if (xp.includes('k')) xp = xp.replace('k', '000')
        }

        const { info, methods } = SKILLS[skill]
        const xpRate = prestigeFuncs.xpRate(prestige)
        const xpTillPrestige = 200000000 - +xp
        
        let embed = new RichEmbed()
            .setTitle(info.name)
            .setColor(info.colour)
            .setThumbnail(info.imageUrl)
            .setDescription(`You need to gain ${xpTillPrestige.toLocaleString('en')} to reach P${prestige + 1} in ${info.name}`)
    
        methods.forEach(method => {
            const xpPerAction = prestigeFuncs.xpPerAction(method.xp, xpRate)
            embed.addField(
                method.name,
                `XP per action: ${xpPerAction}
                Actions for prestige: ${Math.ceil(xpTillPrestige / xpPerAction).toLocaleString('en')}`
            )
        })

        return msg.channel.send({ embed })
    }
}