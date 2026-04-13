import { Layout } from '@app/layout/Layout';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { ScrollToTop } from './ScrollToTop';

export const router = createHashRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollToTop />
        <Layout />
        {/* <ScrollRestoration /> */}
      </>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
]);

export const RouterHash = () => <RouterProvider router={router} />;
