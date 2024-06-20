"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
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
import DeadlineDatePicker from "./DeadlineDatePicker";
import { Button } from "~/components/ui/button";

export default function AddTaskModal() {
  //?????? Input values ????????
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [assigneeId, setAssigneeId] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [priority, setPriority] = useState("normal");

  //*** Event handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setDescription(event.target.value);
  // };

  const handlePriorityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPriority(event.target.value);
  };

  //*** Console logging form values
  useEffect(() => {
    console.log('Title:', title);
  }, [title]);

  useEffect(() => {
    console.log('Description:', description);
  }, [description]);

  useEffect(() => {
    console.log('Assignee:', assigneeId);
  }, [assigneeId]);

  useEffect(() => {
    console.log('Date:', date);
  }, [date]);
  
  useEffect(() => {
    console.log('Priority:', priority);
  }, [priority]);

  return (
    <Dialog>
      <DialogTrigger>
        <p className="-mt-1 w-fit cursor-pointer px-1 text-sm text-gray-400 hover:text-gray-200">
          + Add Task
        </p>
      </DialogTrigger>
      <form>
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
              <Input id="title" placeholder="Task Title" required value={title} onChange={handleTitleChange}></Input>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="desc">Description</Label>
              <ModalTextArea textAreaId="desc" description={description} setDescription={setDescription} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="assign">Assign to:</Label>
              <AssignUserCombobox assigneeId={assigneeId} setAssigneeId={setAssigneeId} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="deadline">Deadline:</Label>
              <DeadlineDatePicker date={date} setDate={setDate} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="priority">Priority:</Label>
              <select
                id="priority-select"
                value={priority}
                onChange={handlePriorityChange}
                className="h-fit w-fit rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="normal">Normal</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

type ModalTextAreaProps = {
  textAreaId: string;
  description: string;
  setDescription?: (value: string) => void;
};
function ModalTextArea({ textAreaId, description, setDescription }: ModalTextAreaProps) {
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
    setDescription?.(event.target.value);
  };

  // Adjust height on mount for initial content
  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  return (
    <textarea
      ref={textareaRef}
      id={textAreaId}
      value={description}
      className="h-fit w-full resize-none overflow-hidden rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
      onChange={handleTextareaChange}
    ></textarea>
  );
}
