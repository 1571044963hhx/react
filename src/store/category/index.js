import { createSlice } from '@reduxjs/toolkit'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'

const categoryStore = createSlice({
    name: 'category',
    // 数据状态
    initialState: {
        c1Arr: [],
        c1Id: '',
        c2Arr: [],
        c2Id: '',
        c3Arr: [],
        c3Id: '',
    },
    reducers: {
        getC1(state, action) {
            state.c1Arr = action.payload
        },
        getC2(state, action) {
            state.c2Arr = action.payload
        },
        getC3(state, action) {
            state.c3Arr = action.payload
            console.log(state.c3Arr)
        },
        setC1Id(state, action) {
            state.c1Id = action.payload
        },
        setC2Id(state, action) {
            state.c2Id = action.payload
        },
        setC3Id(state, action) {
            state.c3Id = action.payload
        },
        clearAll(state, action) {
            state.c1Arr = null
            state.c1Id = null
            state.c2Arr = null
            state.c2Id = null
            state.c3Arr = null
            state.c3Id = null
        }
    }
})

// 解构出actionCreater,由于里面的函数执行完是一个action，因此存储在actions里面，最后由dispatch派发(由下面的异步dispatch派发)
const { getC1, getC2, getC3, clearAll, setC1Id, setC2Id, setC3Id } = categoryStore.actions


//fetchC1 是一个 thunk action creator。它返回一个 thunk function,当我在组件中dispatch(fetchC1())时，里面的函数自动执行
const fetchC1 = () => {
    return async (dispatch) => {
        const res = await reqC1()
        dispatch(getC1(res.data))
    }
}

const fetchC2 = (c1Id) => {
    return async (dispatch) => {
        const res = await reqC2(c1Id)
        dispatch(getC2(res.data))
    }
}

const fetchC3 = (c2Id) => {
    return async (dispatch) => {
        const res = await reqC3(c2Id)
        dispatch(getC3(res.data))
    }
}

// 获取reducer函数
const categoryReducer = categoryStore.reducer

export { fetchC1, fetchC2, fetchC3, clearAll, setC1Id, setC2Id, setC3Id }
export default categoryReducer