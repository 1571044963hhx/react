//获取登录时间
export const getTime = () => {
    let message = "";
    let hours = new Date().getHours();//获取当前小时时间
    console.log(hours)
    if (hours <= 9) {
        message = '登录成功，早上好!'
    } else if (hours <= 12) {
        message = '登录成功，上午好!'
    } else if (hours <= 18) {
        message = '登录成功，下午好!'
    } else {
        message = '登录成功，晚上好！'
    }
    return message
}