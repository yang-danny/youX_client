import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const userAPI=`${import.meta.env.BACKEND_API_URL}/user`;

axios.defaults.withCredentials = true;

type User = {
    _id:string;
    name:string;
    email:string;
    phone:number;
    role:string;
    token:string;
    isVerified:boolean;
}

type UserState = {
    _id:string;
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    role:string;
    token:string;
    users:User[];
    signup: (input:SignupInputState) => Promise<void>;
    login: (input:LoginInputState) => Promise<void>;
    logout:()=> Promise<void>;
    getUsers:(token:string)=> Promise<void>;
    getUserDetails:(id:string,token:string) => Promise<void>;
    deleteUser:(id:string,token:string) => Promise<void>;
    updateUserDetails:(id:string,token:string,input:SignupInputState) => Promise<void>;
}

export const useUserStore = create<UserState>()(persist((set) => ({
    _id: '',
    user: null,
    isAuthenticated: false,
    loading: false,
    role:'User',
    token:'',
    users:[],
    signup: async (input: SignupInputState) => {
     
        try {
            set({ loading: true });
            const response = await axios.post(`${userAPI}/signup`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data) {   
                toast.success("Signup successfully...");
                set({ _id:response.data._id,loading: false, user: response.data.name, isAuthenticated: true, role: response.data.role });
            }
        } catch (error:any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    login: async (input: LoginInputState) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${userAPI}/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data) { 
                toast.success("Login successfully...");
                set({ _id:response.data._id, loading: false, user: response.data.name, isAuthenticated: true, role: response.data.role, token:response.data.token });
            }
        } catch (error: any) {
            set({ loading: false });
            toast.error(error.response.data.message);  
        }
    },
    getUsers: async (token:string) => {
        try {
            set({ loading: true });
            const response = await axios.get(`${userAPI}/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) { 
               
                set({ loading: false, users:response.data });
            }
        } catch (error: any) {
            set({ loading: false });
            toast.error(error.response.data.message);  
        }
    },
    getUserDetails: async (id:string, token:string)=>{
        try {
            set({ loading: true });
            const response = await axios.get(`${userAPI}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) { 
               
                set({ loading: false, users:response.data });
            }
        } catch (error: any) {
            set({ loading: false });
            toast.error(error.response.data.message);  
        }
    },
    deleteUser: async (id:string, token:string)=>{
        try {
            set({ loading: true });
            const response = await axios.delete(`${userAPI}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) { 
                toast.success(response.data.message);
            }
        } catch (error: any) {
            set({ loading: false });
            toast.error(error.response.data.message);  
        }
    },
    updateUserDetails: async (id:string, token:string,input: SignupInputState) => {

        try {
            set({ loading: true });
            const response = await axios.put(`${userAPI}/update/${id}`, input, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) {   
                toast.success("Update user successfully...");
                set({ loading: false, users:response.data});
            }
        } catch (error:any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    logout: async () => {
    try {
    set({   _id:'',
            user: null,
            isAuthenticated: false,
            loading: false,
            role:'',
            token:'',
            users:[] })
            localStorage.clear();
            toast.success("Logout successfully...");    
    } catch (error:any) {
        toast.error(error);
    }
           
    },
}),
    {
        name: 'user',
        storage: createJSONStorage(() => localStorage),
    }
))