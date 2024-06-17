import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/hooks";
import { addList } from "@/redux/list/list";
import { useState } from "react";

interface CreateDialogProps {
  open: boolean;
  toggleDialog: () => void;
}

export function CreateDialog({ open, toggleDialog }: CreateDialogProps) {
  const [title, setTitle] = useState("");

  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toggleDialog();
    setTitle("");
    if (title.length > 0) dispatch(addList({ title }));
  };

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new list</DialogTitle>
          <DialogDescription>
            don't worry you can change the title whenever you want
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="items-center">
              <Input
                id="title"
                value={title}
                placeholder="title..."
                className="col-span-3 focus-visible:border-none border-0 border-[#121212]"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="me-auto"
              disabled={title.length === 0}
            >
              create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
