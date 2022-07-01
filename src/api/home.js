/* eslint-disable camelcase */
import request from '@/utiles/request'
/**
 * 获取我的频道
 */
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}
/**
 * 获取文章列表
 */

export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: {
      channel_id,
      timestamp
    }
  })
}
/**
 *获取全部文章列表
 * @returns
 */
export const getAllArticleList = () => {
  return request({
    url: 'channels'
  })
}

export const saveChannels = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data: { channels }
  })
}
