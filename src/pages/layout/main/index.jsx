import { useDispatch } from "react-redux"
import { fetchUserInfo } from "@/store/login"
import { Outlet } from "react-router-dom"
const Main = () => {
    const dispatch = useDispatch()
    const handler = async()=>{
        await dispatch(fetchUserInfo())
        console.log(1)
    }
    return (
        <div className='main'>
            <button onClick={handler}></button>
            <Outlet/>
        </div>
    )
}
export default Main