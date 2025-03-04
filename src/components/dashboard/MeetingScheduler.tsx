import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Clock, Users } from "lucide-react";
import { format } from "date-fns";

interface MeetingSchedulerProps {
  brokerName?: string;
  availableDates?: Date[];
  availableTimeSlots?: string[];
  onSchedule?: (
    date: Date,
    time: string,
    participants: number,
    notes: string,
  ) => void;
}

const MeetingScheduler = ({
  brokerName = "John Smith",
  availableDates = [
    new Date(Date.now() + 86400000), // tomorrow
    new Date(Date.now() + 86400000 * 2), // day after tomorrow
    new Date(Date.now() + 86400000 * 3),
    new Date(Date.now() + 86400000 * 4),
    new Date(Date.now() + 86400000 * 7),
  ],
  availableTimeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
  ],
  onSchedule = () => {},
}: MeetingSchedulerProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [participants, setParticipants] = useState<string>("1");
  const [notes, setNotes] = useState<string>("");

  const handleScheduleMeeting = () => {
    if (date && timeSlot) {
      onSchedule(date, timeSlot, parseInt(participants), notes);
      // Reset form after scheduling
      setDate(undefined);
      setTimeSlot("");
      setParticipants("1");
      setNotes("");
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Schedule a Meeting
        </CardTitle>
        <CardDescription>
          Book a consultation with {brokerName} to discuss your mortgage options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => {
                  // Disable dates that are not in availableDates
                  return !availableDates.some(
                    (availableDate) =>
                      availableDate.getDate() === date.getDate() &&
                      availableDate.getMonth() === date.getMonth() &&
                      availableDate.getFullYear() === date.getFullYear(),
                  );
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Time</label>
          <Select value={timeSlot} onValueChange={setTimeSlot}>
            <SelectTrigger>
              <SelectValue placeholder="Select time slot" />
            </SelectTrigger>
            <SelectContent>
              {availableTimeSlots.map((time) => (
                <SelectItem key={time} value={time}>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {time}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Number of Participants</label>
          <Select value={participants} onValueChange={setParticipants}>
            <SelectTrigger>
              <SelectValue placeholder="Select number of participants" />
            </SelectTrigger>
            <SelectContent>
              {["1", "2", "3", "4"].map((num) => (
                <SelectItem key={num} value={num}>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    {num} {parseInt(num) === 1 ? "Person" : "People"}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Additional Notes</label>
          <Input
            placeholder="Any specific topics you'd like to discuss?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleScheduleMeeting}
          disabled={!date || !timeSlot}
        >
          Schedule Meeting
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MeetingScheduler;
