import Main from "./main"
import Menu1 from "./menu"
import Tabbar from "./tabbar"
import Logo from "./logo"
import { useEffect } from "react"
import { fetchUserInfo } from "@/store/login"
import { useDispatch } from "react-redux"
import './index.scss'


const Layout = () => {
    const dispatch = useDispatch()
    //里面不能直接进行异步操作，
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dispatch(fetchUserInfo());
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        };
        fetchData();
    }, [dispatch]);
    return (
        <div className='container'>
            <div className="logo">
                <Logo></Logo>
            </div>
            <div className="tabbar">
                <Tabbar></Tabbar>
            </div>
            <div className="menu">
                <Menu1></Menu1>
            </div>
            <div className="main">
                <Main></Main>
            </div>
        </div>
    )
}
export default Layout