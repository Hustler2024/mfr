import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { ChevronRight, Target, TrendingUp, Shield } from "lucide-react";

interface FinancialGoal {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  progress: number;
  icon: React.ReactNode;
}

interface FinancialObjectivesProps {
  title?: string;
  description?: string;
  goals?: FinancialGoal[];
  recommendations?: string[];
  isExpanded?: boolean;
}

const FinancialObjectives = ({
  title = "Financial Objectives",
  description = "Your personalized financial goals and our recommendations to help you achieve them.",
  goals = [
    {
      id: "goal-1",
      title: "Home Ownership",
      description: "Purchase a primary residence within the next 2 years",
      timeframe: "2 years",
      progress: 65,
      icon: <Target className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "goal-2",
      title: "Debt Reduction",
      description:
        "Reduce existing debt by 50% before taking on a new mortgage",
      timeframe: "1 year",
      progress: 40,
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
    },
    {
      id: "goal-3",
      title: "Emergency Fund",
      description:
        "Build a 6-month emergency fund to ensure financial stability",
      timeframe: "18 months",
      progress: 25,
      icon: <Shield className="h-5 w-5 text-amber-500" />,
    },
  ],
  recommendations = [
    "Based on your income and savings rate, we recommend the fixed-rate 30-year mortgage option",
    "Consider making additional principal payments to reduce the overall interest paid",
    "Maintain your emergency fund even after making the down payment",
    "Review your insurance coverage to ensure adequate protection for your new property",
  ],
  isExpanded = true,
}: FinancialObjectivesProps) => {
  return (
    <Card className="w-full bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Target className="h-6 w-6 text-blue-600" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Financial Goals</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {goal.icon}
                    <h4 className="font-semibold">{goal.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {goal.description}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <span>Timeframe: {goal.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Our Recommendations</h3>
            <Accordion type="single" collapsible defaultValue="recommendations">
              <AccordionItem value="recommendations" className="border-none">
                <AccordionTrigger className="py-2 text-base font-medium">
                  View Personalized Recommendations
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pl-6 list-disc">
                    {recommendations.map((recommendation, index) => (
                      <li key={index} className="text-gray-700">
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" className="flex items-center gap-2">
              <span>View Detailed Analysis</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialObjectives;
