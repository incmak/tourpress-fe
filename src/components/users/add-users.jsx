import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { useState } from 'react';
import { toast } from 'sonner';

export function AddUser() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const createNewUser = async (body) => {
    return await api.post(`/users`, body);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNewUser,
    onSuccess: () => {
      toast.success('User created successfully!');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setOpen(false);
    },
    onError: (error) => {
      console.error('🚀 ~ AddUser ~ error:', error);
      if (error?.response?.data.message === typeof string) {
        toast.error('User creation failed', {
          description: error?.response?.data.message || 'Please try again.',
        });
      }
    },
  });

  const handleSubmit = (e) => {
    console.log('e', e);
    e.preventDefault();
    const [name, email, password, passwordConfirm] = e.target.elements;

    // signup({
    //   email: email.value,
    //   password: password.value,
    // })
    mutate({
      email: email.value,
      password: password.value,
      name: name.value,
      passwordConfirm: passwordConfirm.value,
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='mb-5 '>
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-106.25'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add new user</DialogTitle>
            <DialogDescription>Create a new user</DialogDescription>
          </DialogHeader>
          <div className={cn('flex flex-col gap-2 w-full')}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor='name'>Name</FieldLabel>
                <Input
                  id='name'
                  type='text'
                  placeholder='Your Name'
                  name='name'
                  required
                />
              </Field>
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
            </FieldGroup>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Creating...' : 'Create User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
