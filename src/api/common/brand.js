import { request } from '@/utils/request'
/**
 * 查询品牌下拉
 */
export function getBrand() {
  return request({
    url: 'api/ruoyi/heziMarketRanking/paramsList',
    // data,
    method: 'post'
  })
}

/**
 * 市场排名数据查询
 */
export function getHeziMarketRanking(data) {
  return request({
    url: 'api/ruoyi/heziMarketRanking/list',
    data: data,
    method: 'post'
  })
}
