import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Wrench, BarChart3, Calendar } from "lucide-react";
import PrioritySelector from "./PrioritySelector";
import ScenarioCalculator from "./ScenarioCalculator";
import MeetingScheduler from "./MeetingScheduler";

interface InteractiveToolsProps {
  onPriorityChange?: (category: string, value: string) => void;
  onCalculate?: (results: {
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
  }) => void;
  onScheduleMeeting?: (
    date: Date,
    time: string,
    participants: number,
    notes: string,
  ) => void;
  brokerName?: string;
}

const InteractiveTools = ({
  onPriorityChange = () => {},
  onCalculate = () => {},
  onScheduleMeeting = () => {},
  brokerName = "John Smith",
}: InteractiveToolsProps) => {
  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          Interactive Decision Tools
        </CardTitle>
        <CardDescription className="text-gray-600">
          Use these tools to help you make informed decisions about your
          mortgage options
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="priorities" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="priorities" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              <span>Financial Priorities</span>
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Scenario Calculator</span>
            </TabsTrigger>
            <TabsTrigger value="meeting" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Schedule Meeting</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="priorities" className="mt-4">
            <div className="max-w-3xl mx-auto">
              <PrioritySelector onPriorityChange={onPriorityChange} />
            </div>
          </TabsContent>

          <TabsContent value="calculator" className="mt-4">
            <div className="max-w-3xl mx-auto">
              <ScenarioCalculator
                initialLoanAmount={350000}
                initialInterestRate={4.5}
                initialLoanTerm={30}
                onCalculate={onCalculate}
              />
            </div>
          </TabsContent>

          <TabsContent value="meeting" className="mt-4">
            <div className="max-w-3xl mx-auto">
              <MeetingScheduler
                brokerName={brokerName}
                availableDates={[
                  new Date(Date.now() + 86400000), // tomorrow
                  new Date(Date.now() + 86400000 * 2), // day after tomorrow
                  new Date(Date.now() + 86400000 * 3),
                  new Date(Date.now() + 86400000 * 4),
                  new Date(Date.now() + 86400000 * 7),
                ]}
                availableTimeSlots={[
                  "9:00 AM",
                  "10:00 AM",
                  "11:00 AM",
                  "1:00 PM",
                  "2:00 PM",
                  "3:00 PM",
                ]}
                onSchedule={onScheduleMeeting}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InteractiveTools;
