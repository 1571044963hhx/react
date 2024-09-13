import { useSelector } from 'react-redux';

const PermissionButton = ({ permission, onClick, children, ...props }) => {
    const { buttons } = useSelector((state) => state.user.userInfo)
    // 判断用户是否有该权限
    console.log(buttons)
    if (!buttons.includes(permission)) {
        return null; // 没有权限则返回 null，不渲染该按钮
    }
    return (
        <button onClick={onClick} {...props}>
            {children}
        </button>
    );
};

export default PermissionButton
