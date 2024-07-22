import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const ProgressBar = ({ start, finish }) => {
    useEffect(() => {
        if (start) {
            NProgress.start();
        }
        if (finish) {
            NProgress.done();
        }
    }, [start, finish]);

    return null;
};

export default ProgressBar;
