const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js')

// Skills
const SKILLS = require('../../helpers/skills/skills.js')

// Functions
const prestigeFuncs = require('../../helpers/prestige-info/prestige.js')

// Helpers
const { toLocaleString } = require('../../helpers/helpers.js')
const { NUM_EMOJIS } = require('../../helpers/constants.js')

const skillList = Object.values(SKILLS).map(skill => skill.info.name)

module.exports = class NextPrestige extends Command {
    constructor(client) {
        super(client, {
            name: 'nextprestige',
            aliases: ['np', 'prestige'],
            group: 'blissscape',
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
        const boosts = 'skillBoosts' in info
        const xpRate = prestigeFuncs.xpRate(prestige, skill === 'hunter')
        const xpTillPrestige = 200000000 - +xp
        
        let embed = new RichEmbed()
            .setTitle(info.name)
            .setColor(info.colour)
            .setThumbnail(info.imageUrl)
            .setDescription(
                `You need to gain **${toLocaleString(xpTillPrestige).toLocaleString('en')}xp** to reach P${prestige + 1} in ${info.name}
                ${boosts
                    ? `
                        📈 **__XP Boosts__**
                        ${info.skillBoosts.map((boost, i) => `${NUM_EMOJIS[i]} ${boost.item}: ${boost.boost}x`).join('\n')}
                    `
                    : ''
                }
                💪 **__Training Methods__**
                `
            )
    
        methods.forEach(method => {
            const xpPerAction = prestigeFuncs.xpPerAction(method.xp, xpRate)

            embed.addField(
                `${method.name}`,
                `${toLocaleString(Math.ceil(xpTillPrestige / xpPerAction))} ${method.material} ${boosts ? `- ${info.skillBoosts.map((boost, i) => `${NUM_EMOJIS[i]} ${toLocaleString(Math.ceil(xpTillPrestige / (xpPerAction * boost.boost)))} ${method.material}`).join(' - ')}` : ''}`
            )
        })

        return msg.channel.send({ embed })
    }
}