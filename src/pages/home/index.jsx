import { Link, Outlet } from "react-router-dom";
function Home() {
    return (
        <div className="about">
            <Link to='/acl'>acl</Link>
            <Link to='/product'>product</Link>
            <Outlet />
        </div>
    );
}
export default Home;