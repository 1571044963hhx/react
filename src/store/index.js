import { configureStore } from '@reduxjs/toolkit'

import userReducer from './login/index'
import routesReducer from './routes'

export const store = configureStore({
    reducer: {
        // 注册子模块
        user: userReducer,
        routes: routesReducer
    }
})