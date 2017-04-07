/**
 * Created by Jackie on 2017/2/22.
 */

// 导入 filterAll
import list from './filterAll'

function install(Vue) {
    list.forEach((item)=> {
        Object.keys(item).forEach((key)=> {
            Vue.filter(key, item[key])
        })
    })

}
export default install
