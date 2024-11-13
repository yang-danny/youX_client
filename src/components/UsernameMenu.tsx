import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";
const UsernameMenu = () => {
  const { _id, user, logout } = useUserStore();
  const navigate=useNavigate()
const logoutUser = () => {
  logout()
navigate("/")
}
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold gap-2 hover:text-orange-500">
        <CircleUserRound className="text-black hover:text-orange-500" />
        {user || ''}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            to="/dashboard"
            className="font-bold hover:text-orange-500"
          >
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={`/user/${_id}`} className="font-bold hover:text-orange-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={logoutUser}
            className="flex flex-1 font-bold bg-black"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;