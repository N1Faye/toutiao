import request from '@/utiles/request'
/**
 *评论列表
 * @param type 评论类型
 * @param source 源
 * @returns
 */
export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: {
      type, source, offset, limit
    }
  })
}
/** 点赞
 * @param {*} target
 * @returns
 */
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: 'comment/likings',
    data: {
      target
    }
  })
}
/**
 *取消点赞
 * @param {*} target
 * @returns
 */
export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `comment/likings/${target}`
  })
}

/**
 *对文章或评论回复
 art_id 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
 * @param {*} data
 * @returns
 */
export const addComment = (data) => {
  return request({
    method: 'POST',
    url: 'comments',
    data
  })
}
