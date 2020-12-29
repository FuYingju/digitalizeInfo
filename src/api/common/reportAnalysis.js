import { request } from '@/utils/request'

/**
 * 查询报表分析列表
 */
export function getHeziReportAnalysis(data) {
  return request({
    url: 'api/ruoyi/heziReportAnalysis/list',
    data: data,
    method: 'post'
  })
}

/**
 * 存货状态
 */
export function getInventoryStatus(data) {
  return request({
    url: 'api/ruoyi/heziReportAnalysis/inventoryStatus',
    data: data,
    method: 'post'
  })
} 

/**
 * 现金流状态
 */
export function getCashFlowStatus(data) {
  return request({
    url: 'api/ruoyi/heziReportAnalysis/cashFlowStatus',
    data: data,
    method: 'post'
  })
} 

/**
 * 查询本年度所有的报表
 */
export function getHeziReportAnalysisByYear(data) {
  return request({
    url: 'api/ruoyi/heziReportAnalysis/listReportByYear',
    data: data,
    method: 'post'
  })
} 

/**
 * 根据报表、年月、企业查询报表信息
 */
export function getHeziReportAnalysisDetail(data) {
  return request({
    url: 'api/ruoyi/heziReportAnalysis/detail',
    data: data,
    method: 'post'
  })
} 