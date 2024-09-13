import { useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { userLogout, fetchUserInfo } from '@/store/login';

const NavigationGuards = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { token, userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        const handleNavigation = () => {
            if (token) {
                if (location.pathname === '/login') {
                    dispatch(userLogout())
                    navigate('/login');
                } else {
                    if (!userInfo) {
                        try {
                            dispatch(fetchUserInfo())
                            navigate(location.pathname);
                        } catch (error) {
                            dispatch(userLogout())
                            navigate('/login', { replace: true, state: { from: location.pathname } });
                        }
                    }
                }
            } else {
                if (location.pathname !== '/login') {
                    navigate('/login', { replace: true, state: { from: location.pathname } });
                }
            }
        };
        handleNavigation();
    }, []);
    return (
        <>
            {children}
        </>
    )
};
export default NavigationGuards;

