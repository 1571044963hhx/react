import { MyIcon } from '@/assets/icons/myIcon';
import "./index.scss"
import { useSelector, useDispatch } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { userLogout } from '@/store/login';
import { useNavigate } from 'react-router-dom';


const Setting = () => {
    //刷新功能
    const refreshPage = () => {
        window.location.reload();
    };
    //全屏功能
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
    

    //退出登录
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userlogout = async () => {
        await dispatch(userLogout())
        navigate('/login')
    }

    const { name, avatar } = useSelector((state) => state.user.userInfo)
    const a = useSelector((state) => state.user.userInfo)
    console.log(a,'jgh')

    const menu = (
        <Menu>
            <Menu.Item key="logout" onClick={userlogout}>
                退出登录
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="tabbar_right">
            <div className='refresh' onClick={refreshPage}>
                <MyIcon className="icon" type="icon-shuaxin1" style={{ fontSize: '15px' }} />
            </div>
            <div className='fullScreen' onClick={toggleFullscreen}>
                <MyIcon className="icon" type="icon-quanping" style={{ fontSize: '12px' }} />
            </div>
            <div className='fullScreen'>
                <MyIcon className="icon" type="icon-shezhi" style={{ fontSize: '12px' }} />
            </div>
            <div className='avatar'>
                <img src={avatar} alt="Avatar" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
            </div>
            <div className='name'>
                <Dropdown overlay={menu}>
                    <span>{name}
                        <DownOutlined />
                    </span>
                </Dropdown>
            </div>
        </div>
    )
};
export default Setting;
