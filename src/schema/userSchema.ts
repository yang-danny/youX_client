import {z} from "zod";

export const userSignupSchema = z.object({
    name:z.string().min(1,"Fullname is required"),
    email:z.string().email("Invalid email address"),
    password:z.string().min(6, "Password must be at least 6 characters."),
    phone:z.string().min(10,{message:"Contact number at least 10 digit"}).max(10,"Contact number at most 10 digit"),
    role:z.string().min(1,"Role should be select"),
});

export type SignupInputState = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({ 
    email:z.string().email("Invalid email address"),
    password:z.string().min(6, "Password must be at least 6 characters.") 
});

export type LoginInputState = z.infer<typeof userLoginSchema>;