import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";

const MobileNavLinks = () => {
  const { _id, logout } = useUserStore();
  return (
    <>
      <Link
        to="/dashboard"
        className="flex bg-white items-center font-bold text-black hover:text-orange-500"
      >
        Dashboard
      </Link>
      <Link
        to={`/user/${_id}`} 
        className="flex bg-white items-center font-bold text-black hover:text-orange-500"
      >
        User Profile
      </Link>
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;