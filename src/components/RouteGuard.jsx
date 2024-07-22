import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import ProgressBar from './ProgressBar'; // 进度条组件

const RouteGuard = ({ children }) => {
    const { userInfo } = useSelector((state) => state.user)

    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleNavigation = async () => {
            setLoading(true);
            if (userInfo) {
                if (location.pathname === '/login') {
                    userLogout(); // 用户已登录且试图访问登录页，执行登出
                } else {
                    if (!user.username) {
                        try {
                            await userInfo();
                            setLoading(false);
                        } catch (error) {
                            await userLogout();
                            navigate('/login', { replace: true });
                        }
                    } else {
                        setLoading(false);
                    }
                }
            } else {
                if (location.pathname !== '/login') {
                    navigate('/login', { replace: true });
                }
                setLoading(false);
            }
        };

        handleNavigation();
    }, [user, location, userLogout, userInfo, navigate]);

    return (
        <>
            <ProgressBar start={loading} finish={!loading} />
            {loading ? <div>Loading...</div> : children}
        </>
    );
};

export default RouteGuard;
