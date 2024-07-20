import { createSlice } from '@reduxjs/toolkit'
import { reqLogin, reqUserInfo } from '@/api/login'
import { setToken, getToken } from '@/utils/token'

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
        setUserInfo(state, action) {
            state.userInfo = action.payload
        }
    }
})
// 解构出actionCreater,由于里面的函数执行完是一个action，因此存储在actions里面，最后由dispatch派发
const { settoken, setUserInfo } = userStore.actions

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

// 获取reducer函数
const userReducer = userStore.reducer

export { fetchLogin, fetchUserInfo }
export default userReducer