const baseXp = 76

let prestigeFuncs = module.exports = {}

prestigeFuncs.xpRate = prestige => baseXp / Math.pow(2, prestige)