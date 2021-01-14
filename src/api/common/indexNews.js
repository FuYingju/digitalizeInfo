import { request } from '@/utils/request'

/**
 * 主页查询全部合作伙伴动态
 */
export function selectHeziIndexNews() {
  return request({
    url: 'api/heziIndexNews/list',
    // data: data,
    method: 'post'
  })
}
