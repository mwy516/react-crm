// import { DECIMALPLACES } from 'constants/currency'

export const normalizeTradePassword = (value, previousValue) => (value && ((/^\d+$/.test(value) && value.length <= 6) ? value.trim() : previousValue))

export const normalizeVcode = (value, previousValue) => (value && ((/^\d+$/.test(value) && value.length <= 6) ? value.trim() : previousValue))

export const normalizeNickname = (value, previousValue) => (value && (value.length <= 20 ? value.trim() : previousValue))

export const normalizeTitle = (value, previousValue) => (value && (value.length <= 30 ? value.trim() : previousValue))

export const normalizeRecord = (value, previousValue) => (value && (value.length <= 100 ? value.trim() : previousValue))

export const normalizeCaptch = (value, previousValue) => (value && ((/^\w+$/.test(value) && value.length <= 4) ? value.trim() : previousValue))

export const normalizeText = value => (value && value.trim())

export const normalizeIdCard = (value, previousValue) => (value && (/^\d+(x?|X?)$/.test(value) ? value.trim() : previousValue))

export const normalizePhone = (value, previousValue) => (value && (/^\d+$/.test(value) ? value.trim() : previousValue))

export const normalizeBankAccount = (value, previousValue) => (value && (/^\d+$/.test(value.replace(/\s/g, '')) ? value.replace(/\s/g, '').match(/.{1,4}/g).join(' ') : previousValue))

export const normalizeNumber = (value, preValue) => ((/^\d*$/.test(value)) ?  value.trim() : preValue)

export const formatFourNumberAfterDot = (num) => {
    if (!num) return 0
    if (typeof num === 'string') {
        num = Number(num)
    }
    let str = ''
    if( num % 1 ) {
        const arr = num.toString().split('.')
        str = arr[0] + `.${arr[1]}0000`.substring(0,5)
    } else {
        str = num + '.0000'      
    }
    return str
}