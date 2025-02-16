import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import dayjs from 'dayjs'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Bangkok')

export const formatDate = (date: string) => {
  return dayjs(date).format('DD MMM YYYY')
}

export const formatDateTime = (date: string) => {
  return dayjs(date).format('DD MMM YYYY HH:mm')
}

export const fromNow = (date: string) => {
  return dayjs(date).fromNow()
}
