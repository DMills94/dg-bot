# DgBot (For BlissScape)

## Requirements:
[Yarn](https://classic.yarnpkg.com/en/docs/getting-started)  
[Node](https://nodejs.org/en/)

--- 

## Configs
### config.json @ `/`
Structure
```json
{
    "ownerID": "YOUR ID",
    "token": "YOUR TOKEN"
}
```

### github @ `/helpers/github`
```json
{
    "USERNAME": "YOUR GITHUB USERNAME",
    "TOKEN": "YOUR GITHUB PERSONAL ACCESS TOKEN",
    "REPO_NAME": "YOUR REPO NAME"
}
```

---

## Running the bot (Basic)
### Clone the repo
SSH
```bash
git clone git@github.com:DMills94/dg-bot.git
```

HTTPS
```bash
git clone https://github.com/DMills94/dg-bot.git
```

### Install packages
```bash
yarn install
```

### Run the bot
#### Basic
```bash
node bot.js
```

#### Advanced (auto refresh - good for development / background process)
Install [pm2](https://pm2.keymetrics.io/) then run
```bash
pm2 start pm2-process.json
```

pm2-process.json is an [ecosystem file](https://pm2.keymetrics.io/docs/usage/application-declaration/) in the root with custom properties, you can customise it further if you wish

---

## Credits

BlissScape is a server made by Tim, you can play it [here](http://www.blissscape.com/)  
Written by [DMills94](https://github.com/DMills94)