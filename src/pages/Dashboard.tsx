import { useUserStore } from "@/store/useUserStore";
import { Link } from "react-router-dom";
import Applications from "./Applications";
import Users from "./Users";

const Dashboard = () => {

    const {isAuthenticated, role}=useUserStore()

    return (
    <> 
    {isAuthenticated?(
        <>
        <section className='heading'>
        <h2 >Welcome to youX <span className="font-bold">{role}</span> Dashboard</h2> 
        {role.toLowerCase()==="admin"?(
        <>
        <Users />
        <Applications />
        </>
        ):(
        <>
        <Applications />
        </>  
        )}
        </section>
        </>
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

export default Dashboard