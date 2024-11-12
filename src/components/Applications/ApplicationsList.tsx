import { useApplicationStore } from "@/store/useApplicationStore";
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
import { useUserStore } from "@/store/useUserStore";

const ApplicationsList = () => {
    const {getApplications, getUserApplications, application } =useApplicationStore()
    const {id, role, token}=useUserStore()
    // Check role for loading applications
    useEffect(() => {
     if(role==="Admin")
      // Load all applications
      getApplications(token) 
    else
      // Load user's applications by user ID
     getUserApplications(id,token)
    }, [])

    const arr = Array.from(Object.entries(application), ([key, value]) => value);
  
  return (
    <div className="mx-auto py-10 px-2">
      <div className="flex justify-end px-8">
      <Link className="bg-black text-white p-3 rounded-sm" to="/application/create">New Application</Link>
      </div>
      <Table>
      <TableCaption>Total {arr.length} of application(s) founded.</TableCaption>
      <TableHeader>
        <TableRow>
        <TableHead className="w-[300px] ">Application ID (Click ID for details)</TableHead>
        <TableHead className="w-[200px]">Application Name</TableHead>
          <TableHead className="w-[150px]">Type</TableHead>
          <TableHead className="w-[150px]">Provider</TableHead>
          <TableHead className="text-right w-[150px]">Amount</TableHead>
          <TableHead className="w-[150px]">Status</TableHead>
          <TableHead className="w-[150px]">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {arr.map((app,index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
             <Link className="hover:text-blue-600" to={`/application/${app._id}`} >{app._id}</Link> 
              </TableCell>
            <TableCell>{app.user?.name}</TableCell>
            <TableCell>{app.type}</TableCell>
            <TableCell>{app.provider}</TableCell>
            <TableCell className="text-right">${app.amount}</TableCell>
            <TableCell >{app.status}</TableCell>
            <TableCell className="flex space-x-5">
            <Delete item="application" id={app._id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}

export default ApplicationsList