import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@/app/router';

const routesList = createBrowserRouter(routes);
export default function App() {
  return (
    <>
      <div className='h-dvh flex items-center justify-center w-full px-4'>
        <RouterProvider router={routesList} />
      </div>
    </>
  );
}
