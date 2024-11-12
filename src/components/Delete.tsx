import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useApplicationStore } from "@/store/useApplicationStore";
import { useUserStore } from "@/store/useUserStore";
interface DeleteProps {
  item: string;
  id: string;
}
const Delete: React.FC<DeleteProps> = ({ item, id }) => {
    const {deleteApplication}=useApplicationStore()
    const {token,deleteUser}=useUserStore()
    const onDelete = async () => {
    try {
      const itemType =
        item === "user"
          ? "user"
          : "application";
          if(itemType==="application"){
            await deleteApplication(id,token);
          } else {
            await deleteUser(id,token);
          }
       
        window.location.reload();
        toast.success(`${itemType} deleted`);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong! Please try again.");
    }
  };
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-black text-white">
          <Trash className="h-8 w-8 "/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-grey-1">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            {item}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-black text-white" onClick={onDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;