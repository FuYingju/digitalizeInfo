import { request } from '@/utils/request'

/**
 * 查询报表分析列表
 */
export function getHeziCompanyManage(data) {
  return request({
    url: 'api/ruoyi/heziCompanyManage/list',
    data: data,
    method: 'post'
  })
}