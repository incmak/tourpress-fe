import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

export function ForgotPasswordForm({ className, ...props }) {
  const baseURL = 'http://localhost:3000/api/v1';
  const forgotPassword = async (body) =>
    axios.post(`${baseURL}/users/forgot-password`, body);

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success('Password reset link sent on you email!', {
        description: 'Please check your inbox.',
      });
    },
    onError: (error) => {
      console.log('🚀 ~ LoginForm ~ error:', error);
      toast.error('Forgot password Failed.', {
        description: error.response.data.message || 'Please try again.',
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const [email] = e.target.elements;

    mutate({
      email: email.value,
    });
  };
  return (
    <div className={cn('flex flex-col gap-6 w-full', className)} {...props}>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8' onSubmit={handleSubmit}>
            <FieldGroup>
              <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>Welcome back</h1>
                <p className='text-muted-foreground text-balance'>
                  Reset your TourPress password
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <Input
                  id='email'
                  type='email'
                  name='email'
                  placeholder='m@example.com'
                  required
                />
              </Field>
              <Field>
                <Button type='submit' disabled={isPending}>
                  {isPending ? 'Sending reset link...' : 'Send reset link'}
                </Button>
              </Field>

              <FieldDescription className='text-center'>
                Don&apos;t have an account? <Link to='/signup'>Sign up</Link>
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
