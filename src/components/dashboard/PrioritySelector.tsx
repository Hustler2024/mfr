import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { InfoIcon } from "lucide-react";

interface PrioritySelectorProps {
  priorities?: {
    category: string;
    options: string[];
    description: string;
    selected?: string;
  }[];
  onPriorityChange?: (category: string, value: string) => void;
}

const PrioritySelector = ({
  priorities = [
    {
      category: "Interest Rate",
      options: [
        "Lowest possible rate",
        "Fixed rate security",
        "Flexible rate options",
      ],
      description: "Select your preference for interest rate structure",
      selected: "Lowest possible rate",
    },
    {
      category: "Loan Term",
      options: [
        "Short term (15 years)",
        "Standard term (30 years)",
        "Custom term",
      ],
      description: "Choose your preferred loan duration",
      selected: "Standard term (30 years)",
    },
    {
      category: "Payment Structure",
      options: [
        "Lower monthly payments",
        "Faster equity building",
        "Balanced approach",
      ],
      description: "Select your payment priority",
      selected: "Balanced approach",
    },
  ],
  onPriorityChange = () => {},
}: PrioritySelectorProps) => {
  const handlePriorityChange = (category: string, value: string) => {
    onPriorityChange(category, value);
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Financial Priorities
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Select your preferences to help us tailor recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {priorities.map((priority, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                {priority.category}
              </label>
              <div className="relative group">
                <InfoIcon className="h-4 w-4 text-gray-400 cursor-help" />
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                  {priority.description}
                </div>
              </div>
            </div>
            <Select
              defaultValue={priority.selected}
              onValueChange={(value) =>
                handlePriorityChange(priority.category, value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {priority.options.map((option, optionIndex) => (
                  <SelectItem key={optionIndex} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PrioritySelector;
