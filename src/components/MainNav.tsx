
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
const MainNav = () => {
 const { isAuthenticated } = useUserStore();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <UsernameMenu />
        </>
      ) : (
        <Link to="/login" className="font-bold hover:text-orange-500 hover:bg-white">
            Login
        </Link>
      )}
      
    </span>
  );
};

export default MainNav;