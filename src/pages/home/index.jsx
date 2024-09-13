import { getTime } from '../../utils/time';
import { useSelector } from 'react-redux';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import './index.scss'

const Home = () => {
    const { name, avatar } = useSelector((state) => state.user.userInfo)
    const [time, setTime] = useState(moment().format('YYYY年MM月DD日 hh:mm:ss'));
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(moment().format('YYYY年MM月DD日 hh:mm:ss'));
        }, 1000);
        // 清除定时器，避免内存泄漏
        return () => clearInterval(timer);
    }, []);
    return (
        <div className="home-container">
            <div className='card'>
                <img src={avatar} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '60px 30px 60px 60px' }} />
                <span className="title" style={{ marginRight: '880px' }}>{getTime()}</span>
                {time}
            </div>
        </div>
    );
};
export default Home;

