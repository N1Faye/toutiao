import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
/**
 *时间格式化
 * @param {*} time
 * @returns
 */
export const dateformate = (time) => {
  return dayjs(time).fromNow()
}
