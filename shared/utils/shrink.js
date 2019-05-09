export const renderFloat = (originFloat) => {
  const stringOriginFloatArr = String(originFloat).split('.')
  const stringRenderFloat = `${stringOriginFloatArr[0]}.${stringOriginFloatArr[1].slice(0, 2)}`
  return Number(stringRenderFloat)
}

export const renderFloat2 = (originFloat) => {
  const fixedFloat = originFloat.toFixed(3)
  return String(fixedFloat).substring(0, String(fixedFloat).length - 1)
}

// 计算初始整体抽水
export const calcInitAllShrink = (optionInfoList) => {
  const calcRet = optionInfoList.reduce((acc, i) => {
    acc += 1/i.originalOdds
    return acc
  }, 0)
  return renderFloat2((1 - 1/calcRet) * 100)
}

// 计算当前整体抽水
export const calcCurrentAllShrink = (optionInfoList, currencyOptionType, currency) => {
  const currentOddsArr = optionInfoList.reduce((acc, i) => {
    if (i[currencyOptionType].hasOwnProperty(currency)) acc.push(Number(renderFloat2((i.originalOdds -1) * (1 - i[currencyOptionType][currency].shrink) + 1)))
    return acc
  }, [])
  // const currentOddsArr = optionInfoList.map(i => {
  //   if (i[currencyOptionType].hasOwnProperty(currency)) {
  //     return Number(renderFloat2((i.originalOdds -1) * (1 - i[currencyOptionType][currency].shrink) + 1))
  //   }
  // })
  const calcRet2 = currentOddsArr.reduce((acc, k) => {
    acc += 1/k
    return acc
  }, 0)
  return renderFloat2((1 - 1/calcRet2) * 100)
}

// 计算调整后整体抽水
export const calcSettedAllShrink = (currencyPlayIdShrinkObj, optionInfoList, currencyOptionType, currency) => {
  const keys = Object.keys(currencyPlayIdShrinkObj)
  const values = Object.values(currencyPlayIdShrinkObj)
  if (values.includes(null)) {
    return '----'
  } else {
    let originalOddsObj = {}
    optionInfoList.map(eachOption => {
      if (eachOption[currencyOptionType].hasOwnProperty(currency)) {
        originalOddsObj[eachOption[currencyOptionType][currency].id] = eachOption.originalOdds
      }
    })
    const calcRet = keys.reduce((acc, eachKey) => {
      const eachValue = Number(renderFloat2((originalOddsObj[eachKey] - 1) * (1 - currencyPlayIdShrinkObj[eachKey]) + 1))
      acc += 1/eachValue
      return acc
    }, 0)
    return renderFloat2((1 - 1/calcRet) * 100)
  }
}

// 计算动态赔付抽水
export const calcDynamicAllShrink = (optionInfoList, currencyOptionType, currency) => {
  const currentFinalOddsArr = optionInfoList.reduce((acc, i) => {
    if (i[currencyOptionType].hasOwnProperty(currency)) acc.push(i[currencyOptionType][currency].finalOdds)
    return acc
  }, [])
  // const currentFinalOddsArr = optionInfoList.map(i => i[currencyOptionType][currency].finalOdds)
  const calcRet = currentFinalOddsArr.reduce((acc, eachFinalOdds) => {
    acc += 1/eachFinalOdds
    return acc
  }, 0)
  return renderFloat2((1 - 1/calcRet) * 100)
}
