"use client";

import { useEffect, useRef, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import AssignUserCombobox from "./AssignUserCombobox";

export default function AddTaskModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <p className="-mt-1 w-fit cursor-pointer px-1 text-sm text-gray-400 hover:text-gray-200">
          + Add Task
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Please fill in the details for the new task
          </DialogDescription>
        </DialogHeader>

        {/* Main form */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Task Title"></Input>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="desc">Description</Label>
            <ModalTextArea textAreaId="desc"></ModalTextArea>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="desc">Assign to:</Label>
            <AssignUserCombobox></AssignUserCombobox>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


type ModalTextAreaProps = {
  textAreaId: string;
}
function ModalTextArea({textAreaId}: ModalTextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to recalculate
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Adjust height on content change
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    adjustTextareaHeight();
  };

  // Adjust height on mount for initial content
  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  return (
    <textarea
      ref={textareaRef}
      id={textAreaId}
      className="h-fit w-full resize-none rounded-md border border-zinc-200 bg-transparent px-3 py-2 overflow-hidden text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
      onChange={handleTextareaChange}
    ></textarea>
  );
}
