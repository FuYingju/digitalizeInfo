import { request } from '@/utils/request'
/**
 * 品牌折扣数据查询
 */
export function getHeziBrandDiscount(data) {
  return request({
    url: 'api/ruoyi/heziBrandDiscount/list',
    data: data,
    method: 'post'
  })
}
