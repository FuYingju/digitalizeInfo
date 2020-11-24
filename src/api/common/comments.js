import { request } from '@/utils/request'
import user from '../../store/modules/user'

/**
 * 留言查询
 */
export function getHeziComments(data) {
  return request({
    url: 'api/ruoyi/heziComments/list',
    data: data,
    method: 'post'
  })
}

/**
 * 增加留言
 */
export function addComments(data) {
  //获取请求参数
  data.createTime = getNowFormatDate()
  data.userName = user.state.name
  return request({
    url: 'api/ruoyi/heziComments/addComments',
    data: data,
    method: 'post'
  })
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}
