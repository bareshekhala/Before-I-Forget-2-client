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
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

//we send these as props => so this delete alart can be used in different components and we can tailor this according to our needs
type DeleteAlartProps = {
  triggerButtonName?: string;
  onDelete: () => Promise<void>;
};

function DeleteAlart({onDelete,triggerButtonName="Delete"} : DeleteAlartProps) {

const [open, setOpen] = useState(false);
const [busy, setBusy] = useState(false);

const handleDelete = async()=>{
  setBusy(true)

  try{
    await onDelete()
    setBusy(false)
    setOpen(false)

  }catch(error){
    console.log(error)
    setBusy(false)
  }
}
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="destructive" className="btn-card btn-card-danger">
            <Trash2Icon />
            {triggerButtonName}
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Are You Sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This Action is permanent
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={busy}>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={handleDelete} disabled={busy} >
            {busy ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAlart;
