import { configureStore } from '@reduxjs/toolkit'

import userReducer from './login'
import categoryReducer from './category'

export const store = configureStore({
    reducer: {
        // 注册子模块
        user: userReducer,
        category: categoryReducer
    }
})