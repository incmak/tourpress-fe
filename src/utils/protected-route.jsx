import { Spinner } from '@/components/spinner';
import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const getMyProfile = () => api.get('/users/me');

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: getMyProfile,
    queryKey: ['user', 'me'],
    refetchOnMount: false,
    // refetchOnWindowFocus: true
  });

  console.log(data);

  if (isLoading) return <Spinner />;

  if (!isSuccess) {
    return <Navigate to='/login' />;
  }
  return <Outlet />;
}
