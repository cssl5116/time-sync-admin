import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formateTime(
  time: Date | string,
  formate = 'YYYY-MM-DD'
) {
  return dayjs.utc(time).format(formate)
}

// 根据时间计算年龄
export function getAgeByBirthday(birthday: Date | string) {
  const birth = dayjs.utc(birthday).utcOffset(8)
  const now = dayjs()
  const age = now.diff(birth, 'year')
  return age
}