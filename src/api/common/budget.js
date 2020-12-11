import { request } from '@/utils/request'

/**
 * 市场排名数据查询
 */
export function getHeziBudget(data) {
  return request({
    url: 'api/ruoyi/heziBudgetManage/list',
    data: data,
    method: 'post'
  })
}
