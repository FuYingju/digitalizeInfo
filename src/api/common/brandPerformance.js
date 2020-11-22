import { request } from '@/utils/request'
/**
 * 市场销量数据数据查询
 */
export function getHeziBrandPerformance(data) {
  return request({
    url: 'api/ruoyi/heziBrandPerformance/list',
    data: data,
    method: 'post'
  })
}
