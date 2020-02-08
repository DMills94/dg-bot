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
    
    async run(msg) {
        const { channel, author } = msg
        const userFilter = message => author.id === message.author.id
        const processUserResponse = msgCollection => {
            const userReply = msgCollection.first()
            return userReply.content
        }

        channel.send('Please define an issue `title` - keep it short and to the point')
        const titleReponseMsg = await channel.awaitMessages(userFilter, { max: 1 })
        const title = processUserResponse(titleReponseMsg)

        channel.send('Please enter a description for the issue (in one message), make this as detailed as you need 👍')
        const bodyResponseMsg = await channel.awaitMessages(userFilter, { max: 1})
        const body = processUserResponse(bodyResponseMsg)
        
        const postIssueResponse = await createIssue(title, body)

        if (postIssueResponse.status === 201) {
            channel.send(`Success! You created an issue, take a look here: ${postIssueResponse.data.html_url}`)
        }
        else {
            channel.send('Something went wrong 😒 try again later or contact the bot owner')
        }
    }
}