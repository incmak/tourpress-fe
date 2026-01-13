import { Button } from '@/components/ui/button';
import { api } from '@/lib/api-client';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Dashboard() {
  const navigate = useNavigate();
  const logout = () => api.get('/users/logout');

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate('/login');
      toast.success('Logged out successfully!');
    },
    onError: (error) => {
      console.error('🚀 ~ Dashboard ~ error:', error);
      toast.error('Logout failed.', {
        description: error?.response?.data.message || 'Please try again.',
      });
    },
  });

  console.log('inside dashboard');

  const handleLogout = () => {
    // ....
    mutate();
  };

  return (
    <div>
      <nav>
        <Button onClick={handleLogout} disabled={isPending}>
          {isPending ? 'Logging out...' : 'Logout'}
        </Button>
      </nav>
      <main>Dashboard</main>
    </div>
  );
}
