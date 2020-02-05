const helperFuncs = module.exports = {}

/**
 * Global function to save space
 * 
 * @param {number} number The number to convert to a formatted string
 * @param {number} decimalPlaces How many decimal places to format to 
 */
helperFuncs.toLocaleString = (number, decimalPlaces = undefined) => number.toLocaleString('en', { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces })