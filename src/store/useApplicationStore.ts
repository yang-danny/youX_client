import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { ApplicationCreateState } from "@/schema/applicationSchema";
import { toast } from "sonner";

const applicationAPI=`${import.meta.env.BACKEND_API_URL}/application`;

axios.defaults.withCredentials = true;

type Application = {
    id:string;
    name:string;
    type:string;
    provider:string;
    amount:number;
    income:number;
    expenses:number;
    assets:number;
    liabilities:number;
    description:string;
    status:string
}

type ApplicationState = {
    application: Application[];
    loading: boolean;
    create: (token:string, input:ApplicationCreateState) => Promise<void>;
    getApplications: (token:string,) => Promise<void>;
    getUserApplications: (id:string,token:string) => Promise<void>;
    deleteApplication:(id:string,token:string)=> Promise<void>;
    getApplicationDetails:(id:string,token:string)=> Promise<void>;
    updateApplicationDetails:(id:string,token:string,input:ApplicationCreateState)=> Promise<void>;
}

export const useApplicationStore = create<ApplicationState>()(persist((set) => ({
    application: [],
    loading: false,
 
    create: async (token:string, input: ApplicationCreateState) => {
     
        try {
            set({ loading: true });
            const response = await axios.post(`${applicationAPI}/create`, input, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) {   
                toast.success("Create application successfully...");
                set({ loading: false, application: response.data, });
            }
        } catch (error:any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    getApplications: async (token:string) => {
        try {
            set({ loading: true });
            const response = await axios.get(`${applicationAPI}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) {   
                set({ loading: false, application: response.data, });
            }
        } catch (error:any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    getUserApplications: async (id:string,token:string) => {
     
        try {
            set({ loading: true });
            const response = await axios.get(`${applicationAPI}/user/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) {   
                set({ loading: false, application: response.data, });
            }
        } catch (error:any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    deleteApplication:async(id:string,token:string) => {
        try {
            set({ loading: true });
            const response = await axios.delete(`${applicationAPI}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) {   
                toast.success("Delete application successfully...");
            }
        } catch (error:any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    getApplicationDetails:async(id:string,token:string) => {
        try {
            set({ loading: true });
            const response = await axios.get(`${applicationAPI}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) {   
                set({ loading: false, application: response.data, });
                toast.success(response.data.message);
            }
        } catch (error:any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    updateApplicationDetails:async(id:string,token:string,input: ApplicationCreateState) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${applicationAPI}/${id}`, input, {
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                }
            });
            if (response.data) {   
                toast.success("Update application successfully...");
                set({ loading: false, application: response.data, });
            }
        } catch (error:any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
}),
    {
        name: 'application',
        storage: createJSONStorage(() => localStorage),
    }
))