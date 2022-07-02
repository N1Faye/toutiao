/* eslint-disable camelcase */
import request from '@/utiles/request'
/**
 *获取搜索建议
 * @param {*} q
 * @returns
 */
export const getSuggestList = (q) => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}
/**
 *获取搜索结果
 * @param
 * @returns
 */
export const getSearchResult = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: {
      page, per_page, q
    }
  })
}
