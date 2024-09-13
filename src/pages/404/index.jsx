import './index.scss';

const Error = () => {
    return (
        <div className="not-found">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
                <a href="/login" className="not-found-home-link">Go Back Login</a>
            </div>
        </div>
    );
};

export default Error;
