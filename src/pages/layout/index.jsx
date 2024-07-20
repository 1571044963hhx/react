import Main from "./main"
import Menu from "./menu"
import Tabbar from "./tabbar"
import Logo from "./logo"
import './index.scss'

const Layout = () => {
    return (
        <div className='container'>
            <div className="logo">
                <Logo></Logo>
            </div>
            <div className="tabbar">
                <Tabbar></Tabbar>
            </div>
            <div className="menu">
                <Menu></Menu>
            </div>
            <div className="main">
                <Main></Main>
            </div>
        </div>
    )
}
export default Layout