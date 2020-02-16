const { toLocaleString } = require('../helpers')

let prestigeFuncs = module.exports = {}

const baseXp = 76
const hunterXp = 38

/**
 * Calculates xp rate for the given prestige
 * 
 * @param {number} prestige The prestige to calculate xp rates for
 * @param {Boolean} hunter Is the asked skill hunter? If true xp rate is 38x
 */
prestigeFuncs.xpRate = (prestige, hunter) => {
    const xpRate = hunter ? hunterXp : baseXp
    return xpRate / Math.pow(2, prestige)
}

/**
 * Calculates the xp per action, given the xp rate
 * 
 * @param {number} actionXp
 * @param {number} xpRate
 * @returns {number}
 */
prestigeFuncs.xpPerAction = (actionXp, xpRate) => +((actionXp * xpRate).toFixed(1))

/**
 * 
 */
prestigeFuncs.lampsForPrestige = (prestige, currentXp) => {
    const xpRequired = 200000000 - currentXp
    const xpPerLamp = prestigeFuncs.xpPerAction(8602, prestigeFuncs.xpRate(prestige, true))
    const numLamps = xpRequired / xpPerLamp

    return toLocaleString(Math.ceil(numLamps))
}