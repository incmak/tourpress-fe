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
import { useMutation } from '@tanstack/react-query';

export function AddUser() {
  const createNewUser = async (body) => {
    return await api.post(`/users`, body);
  };

  const { mutate } = useMutation({
    mutationFn: createNewUser,
  });

  const handleSubmit = (e) => {};
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant='outline' className='mb-5 '>
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-106.25'>
          <DialogHeader>
            <DialogTitle>Add new user</DialogTitle>
            <DialogDescription>Create a new user</DialogDescription>
          </DialogHeader>
          <div className={cn('flex flex-col gap-6 w-full')}>
            <Card className='overflow-hidden p-0'>
              <CardContent className='p-0'>
                <form className='p-6 md:p-8' onSubmit={handleSubmit}>
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
                      <Input
                        id='password'
                        name='password'
                        type='password'
                        required
                      />
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
                </form>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
