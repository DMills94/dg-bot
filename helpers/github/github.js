const { USERNAME, TOKEN, REPO_NAME, API_URL } = require('./config.json')

const githubFuncs = module.exports = {}

githubFuncs.createIssue = async (title, body) => {
    const data = JSON.stringify({
        issue: {
            title,
            body,
            assignee: USERNAME
        }
    })

    const response = await fetch(`${API_URL}/repos/${USERNAME}/${REPO_NAME}/issues`, {
        method: 'POST',
        headers: {
            'Authorization': TOKEN,
            "Accept": "application/vnd.github.golden-coment-preview.json"
        },
        body: data
    })

    console.log(response)
}