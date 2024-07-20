import logo from '../../../assets/icons/logo.png'
import './index.scss'
const Logo = () => {
    return (
        <div className='logo'>
            <img src={logo} />
            <span>后台管理系统</span>
        </div>
    )
}
export default Logo