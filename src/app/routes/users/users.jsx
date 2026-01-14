import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { UsersTable } from './users-table';
import { columns } from './users-column';
import { Spinner } from '@/components/spinner';
import { AddUser } from '@/components/users/add-users';

export default function Users() {
  const getAllUsers = () => api.get('/users');

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: getAllUsers,
    queryKey: ['users'],
  });

  const users = data?.data?.data?.users;

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className='container mx-auto py-10'>
        <AddUser />
        <UsersTable columns={columns} data={users} />
      </div>
      {/* <table className='w-full'>
      <thead className='border-b'>
        <tr className='text-left'>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className='border-b'>
        {users?.map((user) => {
          return (
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.createdAt}</td>
              <td>{user.updatedAt}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table> */}
    </>
  );
}
