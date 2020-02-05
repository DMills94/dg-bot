const commando = require('discord.js-commando')
const path = require('path')
const oneLine = require('common-tags').oneLine
const sqlite = require('sqlite')
const keys = require('./config.json')

const client = new commando.Client({
    owner: keys.ownerID
})

client
    .on('ready', () => console.log(`Client ready logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`))
    .on('commandError', (cmd, err) => {
		if(err instanceof commando.FriendlyError) return
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err)
	})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked ${reason}
		`)
	})
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`)
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`)
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`)
    })
    
client.setProvider(
    sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new commando.SQLiteProvider(db))
).catch(console.error)

client.registry
    .registerGroups([
        ['prestige', 'Prestige commands'],
        ['general', 'General use commands']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'))

client.login(keys.token)