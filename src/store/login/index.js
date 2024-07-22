import { createSlice } from '@reduxjs/toolkit'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/login'
import { setToken, getToken, removeToken } from '@/utils/token'

const userStore = createSlice({
    name: 'user',
    // 数据状态
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    // 同步修改方法
    reducers: {
        //存储token
        settoken(state, action) {
            state.token = action.payload
            console.log(state.token)
            setToken(action.payload)
        },
        //将用户信息存储
        setUserInfo(state, action) {
            state.userInfo = action.payload
            console.log(action.payload)
        },
        //退出登录，清除用户信息
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = ''
            removeToken()
            console.log(state.token, state.userInfo)
        }
    }
})
// 解构出actionCreater,由于里面的函数执行完是一个action，因此存储在actions里面，最后由dispatch派发
const { settoken, setUserInfo, clearUserInfo } = userStore.actions

// 异步方法封装
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await reqLogin(loginForm)
        console.log(res)
        dispatch(settoken(res.data))
    }
}

// 获取个人用户信息异步方法
const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await reqUserInfo()
        dispatch(setUserInfo(res.data))
    }
}
const userLogout = () => {
    return async (dispatch) => {
        const res = await reqLogout()
        dispatch(clearUserInfo())
    }
}

// 获取reducer函数
const userReducer = userStore.reducer

export { fetchLogin, fetchUserInfo }
export default userReducer