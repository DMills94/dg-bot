const { Command, Argument } = require('discord.js-commando')
const { createIssue } = require('../../helpers/github/github.js')

module.exports = class CreateIssue extends Command {
    constructor(client) {
        super(client, {
            name: 'createissue',
            aliases: ['issue', 'ci'],
            group: 'general',
            description: 'Create an issue on github',
            memberName: 'createissue',
        })
    }
    
    async run(msg, args) {
        const title = new Argument(client, {
            key: 'title',
            label: 'title',
            prompt: 'Please enter a title for the issue',
            type: 'string'
        })

        console.log(title)
        msg.channel.send('yup')
    }
}