import { createBrowserRouter } from 'react-router-dom';
import { VideogamePage } from '../../features/users/presentation/pages/videogamePages';
import { CollectablePage } from '../../features/users/presentation/pages/collectablePages';
import { ErrorPage } from './ErrorPage';
import App from '../../App';

export const navigationWrapper = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <VideogamePage />
      },
      {
        path: '/collectables',
        element: <CollectablePage />
      }
    ]
  }
]);