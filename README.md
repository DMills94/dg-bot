If you want to run this yourself clone it and make a `config.json` in the root of the project.

Structure it as
```
{
    "ownerID": "YOUR ID",
    "token": "YOUR TOKEN"
}
```

Run `node bot.js` and you're good

If you want the create issue command you need to make another `config.json` at `/helpers/github` with the structure of
```
{
    "USERNAME": "YOUR GITHUB USERNAME",
    "TOKEN": "YOUR GITHUB PERSONAL ACCESS TOKEN",
    "REPO_NAME": "YOUR REPO NAME"
}
```