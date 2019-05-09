import { currencyPlayTypes } from 'constants/forecast'

export const calcSelectedGamesLength = (selectGames) => {
  return currencyPlayTypes.reduce((acc, currencyPlayType) => {
    const eachPlayTypeGames = selectGames[currencyPlayType]
    const eachPlayGamesLength = Object.values(eachPlayTypeGames).reduce((innerAcc, eachArr) => innerAcc + eachArr.length, 0)
    return acc + eachPlayGamesLength
  }, 0)
}
