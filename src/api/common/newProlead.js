import { request } from '@/utils/request'

/**
 * 查询新产品导入列表
 */
export function getHeziNewProlead(data) {
  return request({
    url: 'api/ruoyi/heziNewProlead/list',
    data: data,
    method: 'post'
  })
}

/**
 * 查询新产品导入列表(主页)
 */
export function getHeziNewProleadIndex(data) {
  return request({
    url: 'api/ruoyi/heziNewProlead/index',
    data: data,
    method: 'post'
  })
}

/**
 * 查询新产品导入车辆品牌
 */
export function getHeziNewProleadParams() {
  return request({
    url: 'api/ruoyi/heziNewProlead/param',
    method: 'post'
  })
}
