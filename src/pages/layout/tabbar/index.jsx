import Bread from './bread';
import Setting from './setting';
import './index.scss'

const Tabbar = () => {
    return (
        <div className='tabbar'>
            <div className="tabbar_left">
                <Bread></Bread>
            </div>
            <div className="tabbar_right">
                <Setting></Setting>
            </div>
        </div>
    )
};
export default Tabbar;
