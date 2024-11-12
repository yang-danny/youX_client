import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {ApplicationCreateState,applicationSchema} from "@/schema/applicationSchema"
import { Input } from '../ui/input';
import { useApplicationStore } from "@/store/useApplicationStore";
import { useUserStore } from "@/store/useUserStore";
import { Loader2 } from "lucide-react";

const API=import.meta.env.BACKEND_API_URL
const ApplicationDetails = () => {
    const { id } = useParams();
    const {token, isAuthenticated }=useUserStore()
    const {loading, updateApplicationDetails}=useApplicationStore()
    const [application, setApplication] = useState({})
    const [edit, setEdit] = useState(false)
    const [input, setInput] = useState<ApplicationCreateState>({
      user:'',
      type:"",
      provider:"", 
      amount:0,
      income:0,
      expenses:0,
      assets:0,
      liabilities:0,
      description: "",
      status:"pending", 
  });
    const [errors, setErrors] = useState<Partial<ApplicationCreateState>>({});
    // Load application by ID
    const getApplication=async()=>{
        try {
            const response = await axios.get(`${API}/application/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) {   
             setApplication(response.data);
            }
        } catch (error:any) {
        console.log(error)
        }
    }
    // Set edited values
    const setEditValues =()=>{
      setEdit(true)
      setInput({
      user:application.user?._id,
      type:application.type,
      provider:application.provider, 
      amount:application.amount,
      income:application.income,
      expenses:application.expenses,
      assets:application.assets,
      liabilities:application.liabilities,
      description: application.description,
      status:application.status, 
    })
    }
    // Handle fields value change
    const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setInput({...input, [name]:value});
    }

    useEffect(() => {
        getApplication()
    }, [])
    // Submit application edit
    const applicationSubmitHandler = async (e:FormEvent) => {
      e.preventDefault();
      // form validation
      const result = applicationSchema.safeParse(input);
      if(!result.success){
          const fieldErrors = result.error.formErrors.fieldErrors;
          setErrors(fieldErrors as Partial<ApplicationCreateState>);
          return;
      }
      // Update application API 
      try {
        await updateApplicationDetails(id!,token,input);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
  }

    return (
      <>
      {isAuthenticated?(
      <div className="mb-4 mt-4">
        <div className="mb-4 mt-4">
          <h1 className="font-bold text-2xl">Finance Application Details:</h1>
        </div>
      <form onSubmit={applicationSubmitHandler} className="md:p-8 w-full  rounded-lg border border-gray-200 my-4">
      <Label className="font-bold text-xl">Customer Details </Label>
       <div className="grid rounded-lg my-4 px-4 py-4 grid-cols-1 gap-4 md:grid-cols-4 bg-slate-200" >
        <div className="mb-4">
          <div className="relative">
          <Label className="font-bold ">Application Name: </Label>
          <Label htmlFor="name">{application.user?.name}</Label>
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
          <Label className="font-bold ">Email: </Label>
          <Label htmlFor="name">{application.user?.email}</Label>
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Label className="font-bold ">Phone: </Label>
            <Label htmlFor="name">{application.user?.phone}</Label>
        </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Label className="font-bold ">Role: </Label>
            <Label htmlFor="name">{application.user?.role}</Label>
          </div>
        </div>
       </div>
      <Label className="font-bold text-xl">Finance Details </Label>
      {edit ? (
      <div>
       <div className="grid grid-cols-1 gap-4 md:grid-cols-4 ">
          <div className="mb-4">
            <div className="relative">
              <Label htmlFor="type">Type*</Label>
              <Select 
                onValueChange={value=>setInput({...input, type:value})}
                 defaultValue={input.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" defaultValue={input.type}/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                      "Business Loan",
                      "Car Loan",
                      "Home Loan",
                      "Personal Loan",
                      "Others",
                    ].map((loans: string, index: number) => (
                      <SelectItem key={index} value={loans}>
                        {loans}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
          { errors && <span className="text-xs text-red-500">{errors.type}</span>}
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
              <Label htmlFor="provider">Provider*</Label>
                <Select
                onValueChange={value=>setInput({...input, provider:value})}
                 defaultValue={input.provider}
                >
                <SelectTrigger>
                  <SelectValue placeholder="Select Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                      "ANZ",
                      "CBA",
                      "NAB",
                      "Westpac",
                      "Others",
                    ].map((providers: string, index: number) => (
                      <SelectItem key={index} value={providers}>
                        {providers}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
                </Select>
              { errors && <span className="text-xs text-red-500">{errors.provider}</span>}
            </div>
          </div>
          <div className="mb-4">
           <div className="relative">
            <Label htmlFor="amount">Amount*</Label>
            <Input
            type="number"
            placeholder="Please enter amount"
            name="amount"
            id="amount"
            value={input.amount}
            onChange={changeEventHandler}
            className="focus-visible:ring-1"
            />
            { errors && <span className="text-xs text-red-500">{errors.amount}</span>}
          </div>
          </div>
          <div className="mb-4">
            <div className="relative">
            <Label htmlFor="income">Income*</Label>
            <Input
            type="number"
            placeholder="Please enter income"
            name="income"
            id="income"
            value={input.income}
            onChange={changeEventHandler}
            className="focus-visible:ring-1"
            />
          { errors && <span className="text-xs text-red-500">{errors.income}</span>}
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
            <Label htmlFor="expenses">Expenses*</Label>
            <Input
            type="number"
            placeholder="Please enter expenses"
            name="expenses"
            id="expenses"
            value={input.expenses}
            onChange={changeEventHandler}
            className="focus-visible:ring-1"
            />
          { errors && <span className="text-xs text-red-500">{errors.expenses}</span>}
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
            <Label htmlFor="assets">Assets*</Label>
            <Input
            type="number"
            placeholder="Please enter expenses"
            name="assets"
            id="assets"
            value={input.assets}
            onChange={changeEventHandler}
            className="focus-visible:ring-1"
            />
          { errors && <span className="text-xs text-red-500">{errors.assets}</span>}
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
          <Label htmlFor="liabilities">Liabilities*</Label>
          <Input
            type="number"
            placeholder="Please enter expenses"
            name="liabilities"
            id="liabilities"
            value={input.liabilities}
            onChange={changeEventHandler}
            className="focus-visible:ring-1"
          />
          { errors && <span className="text-xs text-red-500">{errors.liabilities}</span>}
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
            <Label htmlFor="type">Status</Label>
            <Select 
                 onValueChange={value=>setInput({...input, status:value})}
                 defaultValue={input.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {[
                     "pending" , "auditing" , "approved" , "reject", "withdraw"
                    ].map((status: string, index: number) => (
                      <SelectItem key={index} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
            </Select>
          { errors && <span className="text-xs text-red-500">{errors.type}</span>}
            </div>
          </div>
          <div className="mb-4">
            <div className="relative">
            <Label htmlFor="description">Description</Label>
            <Input
            type="text"
            placeholder="Please enter comment or description"
            name="description"
            id="description"
            value={input.description}
            onChange={changeEventHandler}
            className="focus-visible:ring-1"
          />
            </div>
          <p className="mt-4">Fields marked with an asterisk* are required.</p>
      </div>
      </div>
      <div className="mb-4 space-x-4">
          <div className=" space-x-4 flex justify-center">
            {loading?(
              <Button disabled className="bg-black text-white hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ):(
              <Button type="submit" className=" bg-black text-white hover:bg-hoverOrange">
              Update Application
              </Button>
            )}
          
          <Button onClick={()=>setEdit(false)} className=" bg-black text-white hover:bg-hoverOrange">
            Cancel
          </Button>
          </div>
      </div>
      </div>
      ):(
      <>
      <div className="my-2 px-4 py-4 rounded-lg grid grid-cols-1 gap-4 md:grid-cols-4 bg-slate-100" >
      <div className="mb-4">
        <div className="relative">
        <Label htmlFor="type">Type: </Label>
        <Label htmlFor="name">{application.type}</Label>
        </div>
      </div>
      <div className="mb-4">
        <div className="relative">
        <Label htmlFor="provider">Provider: </Label>
        <Label htmlFor="name">{application.provider}</Label>
        </div>
      </div>
      <div className="mb-4">
        <div className="relative">
        <Label htmlFor="amount">Amount: $</Label>
        <Label htmlFor="name">{application.amount}</Label>
    </div>
      </div>
      <div className="mb-4">
        <div className="relative">
        <Label htmlFor="income">Income: $</Label>
        <Label htmlFor="name">{application.income}</Label>
        </div>
      </div>
      <div className="mb-4">
        <div className="relative">
        <Label htmlFor="expenses">Expenses: $</Label>
        <Label htmlFor="name">{application.expenses}</Label>
        </div>
      </div>
      <div className="mb-4">
        <div className="relative">
        <Label htmlFor="assets">Assets: $</Label>
        <Label htmlFor="name">{application.assets}</Label>
        </div>
      </div>
      <div className="mb-4">
        <div className="relative">
        <Label htmlFor="liabilities">Liabilities: $</Label>
        <Label htmlFor="name">{application.liabilities}</Label>
        </div>
      </div>
      <div className="mb-4">
        <div className="relative">
        <Label htmlFor="liabilities">Status: </Label>
        <Label htmlFor="name">{application.status}</Label>
        </div>
      </div>
      <div className="mb-4">
        <div className="relative">
        <Label htmlFor="description">Description: </Label>
        <Label htmlFor="name">{application.description}</Label>
    </div>

      </div>
      </div>
      <div className="mb-10 flex justify-center">
        <Button className=" bg-black text-white "
          onClick={setEditValues}>
            Edit
        </Button>
      </div>
      </>
      )}
      </form>
      </div>
      ):(
      <>
        <p className="mt-2">
            Not an authorized user, please {" "}
            <Link to="/login" className="text-blue-500">Login </Link>
            OR 
            <Link to="/signup" className="text-blue-500"> Signup</Link>
        </p>
        </>
      )}
      </>
    
  )
}

export default ApplicationDetails