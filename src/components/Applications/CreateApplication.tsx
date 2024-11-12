import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApplicationStore } from "@/store/useApplicationStore";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import {ApplicationCreateState,applicationSchema} from "@/schema/applicationSchema"
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Label } from "../ui/label";
const CreateApplication = () => {
    const {id,isAuthenticated,token}=useUserStore()
    const [input, setInput] = useState<ApplicationCreateState>({
        user:id,
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
    const {create, loading } = useApplicationStore();
    const navigate = useNavigate();

    //Event handler for input values
    const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInput({...input, [name]:value});
    }
    // Handle form submit
    const applicationSubmitHandler = async (e:FormEvent) => {
        e.preventDefault();
        // form validation
        const result = applicationSchema.safeParse(input);
        if(!result.success){
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<ApplicationCreateState>);
            return;
        }
        // Create application API
        try {
          await create(token, input);
          navigate("/dashboard");
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 ">

      <div className="mb-4">
        <div className="relative">
        <Label htmlFor="type">Type*</Label>
            <Select 
                onValueChange={value=>setInput({...input, type:value})}
                 defaultValue={""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
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
                 defaultValue={""}
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
      <div className="mb-10 flex justify-center">
        {loading ? (
          <Button disabled className="bg-black text-white hover:bg-hoverOrange">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button type="submit" className=" bg-black text-white hover:bg-hoverOrange">
            Create Application
          </Button>
        )}
      </div>
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

export default CreateApplication