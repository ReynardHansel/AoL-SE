"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { VscAccount } from "react-icons/vsc";

import { api } from "~/trpc/react";

export default function AssignUserCombobox({ assigneeId, setAssigneeId }) {
  const users = api.kanban.getUsers.useQuery();
  //   console.log(users.data);

  const [open, setOpen] = React.useState(false);
  // const [id, setId] = React.useState("");
  // React.useEffect(() => {
  //   console.log(id);
  // }, [id]);

  return (
    <>
      {/* <p>Current id: {id}</p> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-fit justify-between"
          >
            <p className="">
              {assigneeId
                ? users.data?.find((user) => user.id === assigneeId)?.name
                : "Select user..."}
            </p>
            <ChevronsUpDown className="ml-4 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <Command>
            <CommandInput placeholder="Search user..." />
            <CommandList>
              <CommandEmpty>No user found.</CommandEmpty>
              <CommandGroup>
                {users.data?.map((user) => (
                  <CommandItem
                    key={user.id}
                    id={user.id}
                    onSelect={() => {
                      setAssigneeId(user.id === assigneeId ? "" : user.id);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        assigneeId === user.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <div className="flex items-center justify-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.image || ""} />
                        <AvatarFallback>
                          <VscAccount />
                        </AvatarFallback>
                      </Avatar>
                      <p>{user.name}</p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
