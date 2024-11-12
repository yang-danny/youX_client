import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";
import MobileNavLinks from "./MobileNavLinks";
import { useNavigate } from "react-router-dom";

const MobileNav = () => {
  const { user, isAuthenticated } = useUserStore();
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-black" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {isAuthenticated ? (
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className="text-black" />
              {user!}
            </span>
          ) : (
            <span> Welcome to youX.com!</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="flex-1 font-bold bg-black"
            >
              Log In
            </Button>
           
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;