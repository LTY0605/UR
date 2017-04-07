/**
 * Created by Jackie on 2017/2/22.
 */
function demo(value) {
    try{

    } catch(e){
        throw Error(e)
    }
    return value
}
function toFixed(value, digits = 2) {
    try {
        value = parseInt(value, 10)
    } catch (e) {
        throw Error(e)
    }
    return value.toFixed(digits)
}
export default [
    {toFixed},
]
