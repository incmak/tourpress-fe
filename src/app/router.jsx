import { Spinner } from '@/components/spinner';
import { lazy, Suspense } from 'react';

const Login = lazy(() => import('./routes/auth/login'));
const Signup = lazy(() => import('./routes/auth/signup'));
const ForgotPassword = lazy(() => import('./routes/auth/forgot-password'));
const ResetPassword = lazy(() => import('./routes/auth/reset-password'));

export const routes = [
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
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<Spinner />}>
        <h1>Dashboard</h1>
      </Suspense>
    ),
  },
];
