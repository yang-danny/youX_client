
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Link } from "react-router-dom";
import Delete from "../Delete";

const UsersList = () => {
    const {users,getUsers, token}=useUserStore()
    useEffect(() => {
        getUsers(token)
    }, [])

    const arr = Array.from(Object.entries(users), ([key,value]) => value);
  return (
    <div className="mx-auto py-10 px-2">
    <Table>
    <TableCaption>Total {arr.length} of user(s) founded.</TableCaption>
    <TableHeader>
      <TableRow>
      <TableHead className="w-[300px] ">User ID (Click ID for details)</TableHead>
      <TableHead className="w-[200px]">Name</TableHead>
        <TableHead className="w-[150px]">Email</TableHead>
        <TableHead className="w-[150px]">Phone</TableHead>
        <TableHead className="w-[150px]">Role</TableHead>
        <TableHead className="w-[150px]">Delete</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {arr.map((user,index) => (
        <TableRow key={index}>
          <TableCell className="font-medium">
           <Link className="hover:text-blue-600" to={`/user/${user._id}`} >{user._id}</Link> 
            </TableCell>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.phone}</TableCell>
          <TableCell >{user.role}</TableCell>
          <TableCell ><Delete item="user" id={user._id} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  </div>
  )
}

export default UsersList