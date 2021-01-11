import { request } from '@/utils/request'

/**
 * 查询品牌下拉
 */
export function getBrand() {
  return request({
    url: 'api/ruoyi/heziBudgetManage/param',
    // data,
    method: 'post'
  })
}

/**
 * 查询预算管理年度预算
 */
export function getHeziBudgetListYear(data) {
  return request({
    url: 'api/ruoyi/heziBudgetManage/listYear',
    data: data,
    method: 'post'
  })
}

/**
 * 查询预算管理
 */
export function getHeziBudget(data) {
  return request({
    url: 'api/ruoyi/heziBudgetManage/list',
    data: data,
    method: 'post'
  })
}
