import { request } from '@/utils/request'

/**
 * 查询品牌
 */
export function listBrandName() {
  return request({
    url: 'api/ruoyi/partnerNews/listBrandName',
    // data: data,
    method: 'post'
  })
}

/**
 * 主页查询全部合作伙伴动态
 */
export function selectAllHeziPartnerNewsLogin() {
  return request({
    url: 'api/loginPartnerNews/list',
    // data: data,
    method: 'post'
  })
}

/**
 * 查询全部合作伙伴动态
 */
export function selectAllHeziPartnerNews() {
  return request({
    url: 'api/ruoyi/partnerNews/list',
    // data: data,
    method: 'post'
  })
}

/**
 * 根据品牌查标题
 */
export function getTitleByBrandName(data) {
  return request({
    url: 'api/ruoyi/partnerNews/listByBrandName',
    data: data,
    method: 'post'
  })
}

/**
 * 根据标题ID查内容
 */
export function listById(data) {
  return request({
    url: 'api/ruoyi/partnerNews/listById',
    data: data,
    method: 'post'
  })
}
