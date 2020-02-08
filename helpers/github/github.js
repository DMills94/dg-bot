const { USERNAME, TOKEN, REPO_NAME } = require('./config.json')
const { Octokit } = require('@octokit/rest')

const octokit = new Octokit({
    auth: TOKEN
})

const githubFuncs = module.exports = {}

githubFuncs.createIssue = async (title, body) => {
    const response = octokit.issues.create({
        owner: USERNAME,
        repo: REPO_NAME,
        title,
        body,
        assignees: [USERNAME]
    })

    return response
}