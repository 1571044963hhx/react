import { router } from './router/index'
import { RouterProvider } from 'react-router-dom';

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
