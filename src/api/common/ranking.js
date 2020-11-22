import { request } from '@/utils/request'
/**
 * 厂商排名查询
 */
export function getHeziMarketRanking(data) {
  return request({
    url: 'api/ruoyi/heziManufacturerRanking/list',
    data: data,
    method: 'post'
  })
}
