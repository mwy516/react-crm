import moment from 'moment'

export const dateStringToTimeStamp = (dateString) => new Date(dateString).getTime()

export const timeStringToTimeStamp = (timeString) => {
  const timeArr = timeString.split(':')
  return (Number(timeArr[0]) * 3600 + Number(timeArr[1]) * 60 + Number(timeArr[2])) * 1000
}

export const formatTimestamp = (timestamp) => moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
