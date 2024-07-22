import { createSlice } from '@reduxjs/toolkit'
import { routes } from '@/router'

const routesStore = createSlice({
    name: 'routes',
    // 数据状态
    initialState: {
        routes: [],
    },
    // 同步修改方法
    reducers: {
        setRoutes(state, action) {
            state.routes = action.payload
        },
    }
})
// 解构出actionCreater,由于里面的函数执行完是一个action，因此存储在actions里面，最后由dispatch派发
const { setRoutes } = routesStore.actions

// 获取reducer函数
const routesReducer = routesStore.reducer

export {setRoutes}
export default routesReducer