import { request } from '@/utils/request'

/**
 * 查询品牌表现数据
 */
export function getHeziSalesPlan(data) {
  return request({
    url: 'api/ruoyi/HeziSalesPlan/list',
    data: data,
    method: 'post'
  })
}

/**
 * 查询车型表现车辆品牌
 */
export function getHeziSalesPlanParams() {
  return request({
    url: 'api/ruoyi/HeziSalesPlan/param',
    method: 'post'
  })
}
