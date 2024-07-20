import { configureStore } from '@reduxjs/toolkit'

import userReducer from './login/index'

export const store =  configureStore({
    reducer: {
        // 注册子模块
        user: userReducer
    }
})