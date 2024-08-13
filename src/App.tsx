import { RouterProvider } from 'react-router-dom';
import { createAppRouter } from '@/src/Routes';

const App = ({ router = createAppRouter() }) => {
  return <RouterProvider router={router} />;
};

export default App;
