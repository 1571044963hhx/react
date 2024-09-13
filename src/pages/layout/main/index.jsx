import { Outlet, useLocation } from "react-router-dom"
const Main = () => {
    const location = useLocation();
    console.log(location)
    return (
        <div className='main'>
            {/* {location.pathname === '/home' ? (
                <div>
                    <h1>Welcome to Home</h1>
                </div>
            ) : (
                <div>
                    <Outlet />
                </div>
            )} */}
            <Outlet />
        </div>
    )
}
export default Main