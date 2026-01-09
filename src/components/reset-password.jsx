import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function ResetPasswordForm({ className, ...props }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log(
    '🚀 ~ ResetPasswordForm ~ searchParams:',
    searchParams.get('token')
  );
  const baseURL = 'http://localhost:3000/api/v1';
  const resetPassword = async (body) =>
    axios.patch(`${baseURL}/users/reset-password/${body.token}`, body);

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Password reset successfully!', {
        description: 'Redirecting to dashboard...',
      });
      navigate('/login');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Reset password Failed.', {
        description: error.response.data.message || 'Please try again.',
      });
      if (error.response.status === 400) {
        navigate('/forgot-password');
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const [password, confirmPassword] = e.target.elements;

    mutate({
      password: password.value,
      passwordConfirm: confirmPassword.value,
      token: searchParams.get('token'),
    });

    // Handle form submission logic here
  };
  return (
    <div className={cn('flex flex-col gap-6 w-full', className)} {...props}>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8' onSubmit={handleSubmit}>
            <FieldGroup>
              <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>Reset your password</h1>
                <p className='text-muted-foreground text-balance'>
                  Enter your new password below
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor='password'>Password</FieldLabel>
                <Input id='password' name='password' type='password' required />
              </Field>
              <Field>
                <FieldLabel htmlFor='confirmPassword'>
                  Confirm Password
                </FieldLabel>
                <Input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  required
                />
              </Field>
              <Field>
                <Button type='submit' disabled={isPending}>
                  {isPending ? 'Resetting...' : 'Reset Password'}
                </Button>
              </Field>

              <FieldDescription className='text-center'>
                Don&apos;t have an account? <a href='#'>Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className='bg-muted relative hidden md:block'>
            <img
              src='/placeholder.svg'
              alt='Image'
              className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className='px-6 text-center'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
