import { request } from '@/utils/request'

/**
 * 查询项目开发进度车辆品牌
 */
export function getHeziProjectScheduleParams() {
  return request({
    url: 'api/ruoyi/projectSchedule/param',
    method: 'post'
  })
}

/**
 * 项目开发进度查询
 */
export function getHeziProjectSchedule(data) {
  return request({
    url: 'api/ruoyi/projectSchedule/list',
    data: data,
    method: 'post'
  })
}
