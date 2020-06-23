const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js')
const { stripIndents } = require('common-tags')
const { isEmpty } = require('lodash') 
const { toLocaleString } = require('../../helpers/helpers.js')
const NPCS = require('../../helpers/npcs/npcs.js')

const npcList = Object.values(NPCS).map(npc => npc.info.name)

module.exports = class KillNPC extends Command {
  constructor(client) {
    super(client, {
      name: 'kill',
      aliases: ['kb', 'kill'],
      memberName: 'kill',
      group: 'blissscape',
      description: 'Simulate killing an npc `x` times',
      args: [
        {
          key: 'npc',
          label: 'NPC',
          prompt: 'Which NPC do you want to kill?',
          type: 'string',
          error: `
            I haven't got drop records for that NPC yet, please enter one of:
            \`${npcList.join(', ')}\`
          `,
          oneOf: npcList.map(npc => npc.toLowerCase()),
          parse: val => val.toLowerCase()
        },
        {
          key: 'amount',
          label: 'Number of kills',
          prompt: 'How many do you want to kill?',
          type: 'integer',
          min: 1,
        }
      ]
    })
  }

  async run(msg, args) {
    const { npc = npc.toLowerCase, amount } = args

    const { info, dropTable } = NPCS[npc]
    const loot = {}
    
    for (let i = 0; i < amount; i++) {
      const roll = Math.random()
      let baseline = 0

      for (let [j, item] of dropTable.entries()) {
        const dropRate = 1 / item.dropRate

        // Hit item
        if (baseline <= roll && roll <= (baseline + dropRate)) {
          loot[item.name]
            ? loot[item.name]++
            : loot[item.name] = 1
          break
        }
        else {
          baseline += dropRate
        }
      }
    }
    
    const descriptionText = `**__You killed ${toLocaleString(amount)} ${info.fullName}${amount > 1 ? "'s" : ''} and received__**`

    let embed = new RichEmbed()
      .setTitle('Boss kill simulator')
      .setColor('#fff417')
      .setURL('http://www.blissscape.com/forums/m/33734747/viewthread/32288082-drop-table-bosses')
      .setThumbnail(info.imageURL)
      .setDescription(descriptionText)
      .setFooter(info.examine)

    isEmpty(loot) // If no drops acquired
      ? embed.setDescription(
        stripIndents`${descriptionText}
        
        Nothing 😂👌💯`)
      : Object.entries(loot).length > 25 // If there's more than 25 drops (Max RichEmbed field count)
        ? embed.setDescription(
          stripIndents`${descriptionText}

          ${Object.entries(loot).map(item => `**${toLocaleString(item[1])}x** ${item[0]}**`).join('\n')}`
        )
      : Object.entries(loot).forEach(item => {
        embed.addField(item[0], toLocaleString(item[1]), true)
      })

    msg.channel.send({ embed })
  }
}