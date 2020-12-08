import { request } from '@/utils/request'

/**
 * 新产品规划查询
 */
export function getHeziNewPro(data) {
  return request({
    url: 'api/ruoyi/heziNewPro/list',
    data: data,
    method: 'post'
  })
}
