import { createBrowserRouter } from 'react-router';
import { VideogamePage } from '../../features/users/presentation/pages/videogamePages';
import { CollectablePage } from '../../features/users/presentation/pages/collectablePages';

export const navigationWrapper = createBrowserRouter([
  { path: '/', element: <VideogamePage /> },
  { path: '/collectables', element: <CollectablePage /> }
]);