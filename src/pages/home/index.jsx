import { Link, Outlet } from "react-router-dom";
import { fetchLogin } from "@/store/login";
import { useSelector } from 'react-redux'


function Home() {
    const { token } = useSelector((state) => state.user)
    const { userInfo } = useSelector((state) => state.user)
    console.log(userInfo)

    return (
        <div className="about">
            <Link to='/acl'>acl</Link>
            <Link to='/product'>product</Link>
            <Outlet />
        </div>
    );
}
export default Home;