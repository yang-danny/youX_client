import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [input, setInput] = useState<SignupInputState>({
        name:"",
        email:"",
        password:"", 
        phone:"", 
        role:"User"
    });
    const [errors, setErrors] = useState<Partial<SignupInputState>>({});
    const {signup, loading } = useUserStore();
    const navigate = useNavigate();
    const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInput({...input, [name]:value});
    }
    //Handle signup event
    const loginSubmitHandler = async (e:FormEvent) => {
        e.preventDefault();
        // form validation check start
        const result = userSignupSchema.safeParse(input);
        if(!result.success){
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<SignupInputState>);
            return;
        }
        // Signup api implementation start here
        try {
          await signup(input);
          navigate("/dashboard");
        } catch (error) {
          console.log(error);
        }
    }
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
        <div className="mb-4">
          <h1 className="font-bold text-2xl">youX Singup</h1>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            { errors && <span className="text-xs text-red-500">{errors.name}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            { errors && <span className="text-xs text-red-500">{errors.email}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            { errors && <span className="text-xs text-red-500">{errors.password}</span>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter your phone number "
              name="phone"
              value={input.phone}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1"
            />
            <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            { errors && <span className="text-xs text-red-500">{errors.phone}</span>}
          </div>
        </div>
        <div className="mb-10">
          {loading ? (
            <Button disabled className="w-full bg-black text-white hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-black text-white hover:bg-hoverOrange">
              Signup
            </Button>
          )}
        </div>
        <Separator/>
        <p className="mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;