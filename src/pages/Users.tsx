import UsersList from '@/components/Users/UsersList'

const Users = () => {
  return (
     <div className='my-4 bg-slate-100 rounded-lg'>
            <h1 className='m-4 p-2 font-bold text-2xl'>User List</h1>
            <UsersList />
    </div>
  )
}

export default Users