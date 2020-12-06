import { request } from '@/utils/request'
/**
 * 查询品牌下拉
 */
export function getBrand() {
  return request({
    url: 'api/ruoyi/proReview/param',
    // data,
    method: 'post'
  })
}

/**
 * 项目回顾对比数据查询
 */
export function getHeziProReview(data) {
  return request({
    url: 'api/ruoyi/proReview/list',
    data: data,
    method: 'post'
  })
}
