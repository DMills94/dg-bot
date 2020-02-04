const baseXp = 76

let prestigeFuncs = module.exports = {}

/**
 * Calculates xp rate for the given prestige
 * 
 * @param {number} prestige The prestige to calculate xp rates for
 */
prestigeFuncs.xpRate = prestige => baseXp / Math.pow(2, prestige)

/**
 * Calculates the xp per action, given the xp rate
 * 
 * @param {number} actionXp
 * @param {number} xpRate
 * @returns {string}
 */
prestigeFuncs.xpPerAction = (actionXp, xpRate) => (actionXp * xpRate).toFixed(1).toLocaleString('en')