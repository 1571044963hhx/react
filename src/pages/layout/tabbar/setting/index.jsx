import { MyIcon } from '@/assets/icons/myIcon';
import React from 'react';
import "./index.scss"
import { useSelector } from 'react-redux';

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
    const { name, avatar, buttons } = useSelector((state) => state.user.userInfo)
    console.log(name)

    return (
        <div className="tabbar_right">
            <div className='refresh' onClick={refreshPage}>
                <MyIcon type="icon-shuaxin1" style={{ fontSize: '15px' }} />
            </div>
            <div className='fullScreen' onClick={toggleFullscreen}>
                <MyIcon type="icon-quanping" style={{ fontSize: '12px' }} />
            </div>
            <div className='fullScreen' onClick={toggleFullscreen}>
                <MyIcon type="icon-shezhi" style={{ fontSize: '12px' }} />
            </div>
            <div className='avatar'>
                <img src={avatar} alt="Avatar" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
            </div>
            <div className='name'>
                <span>{name}</span>
            </div>
        </div>
    )
};
export default Setting;
