/**
 * Created by Jackie on 2017/2/22.
 */

// 导入 filterAll
import list from './filterAll'
import Date from './date'

function install(Vue) {
    //日期转换
    Vue.filter('date', Date);

    list.forEach((item)=> {
        Object.keys(item).forEach((key)=> {
            Vue.filter(key, item[key])
        })
    })

}
export default install
