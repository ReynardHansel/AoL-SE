'use client'
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Dispatch, SetStateAction } from "react"

type DeadlineDatePickerProps = {
  date: Date | undefined
  setDate: Dispatch<SetStateAction<Date | undefined>>
}

export default function DeadlineDatePicker({date, setDate}: DeadlineDatePickerProps) {
    // const [date, setDate] = React.useState<Date>()
    // if(!date || !setDate) return
 
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-fit justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => setDate(selectedDate ?? undefined)}
          />
        </PopoverContent>
      </Popover>
    )
}
