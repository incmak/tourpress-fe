import { Spinner } from '@/components/spinner';
import { ProtectedRoute } from '@/utils/protected-route';
import { lazy, Suspense } from 'react';
import Dashboard from './routes/dashboard';
import { MainLayout } from '@/components/layouts/main-layout';

const Login = lazy(() => import('./routes/auth/login'));
const Signup = lazy(() => import('./routes/auth/signup'));
const ForgotPassword = lazy(() => import('./routes/auth/forgot-password'));
const ResetPassword = lazy(() => import('./routes/auth/reset-password'));

const authRoutes = [
  {
    path: '/login',
    element: (
      <Suspense fallback={<Spinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/signup',
    element: (
      <Suspense fallback={<Spinner />}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <Suspense fallback={<Spinner />}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <Suspense fallback={<Spinner />}>
        <ResetPassword />
      </Suspense>
    ),
  },
];

const adminRoutes = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <MainLayout />,
        children: [
          {
            path: 'dashboard',
            element: (
              <Suspense fallback={<Spinner />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: 'users',
            element: (
              <Suspense fallback={<Spinner />}>
                <h1>Users</h1>
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];

export const routes = [
  ...authRoutes,
  ...adminRoutes,
  {
    path: '*',
    element: (
      <Suspense fallback={<Spinner />}>
        <h1>404 - Not Found</h1>
      </Suspense>
    ),
  },
];
