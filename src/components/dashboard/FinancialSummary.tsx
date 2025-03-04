import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Percent,
  AlertCircle,
  Info,
} from "lucide-react";

interface FinancialMetric {
  label: string;
  value: string | number;
  previousValue?: string | number;
  change?: number;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
  tooltip?: string;
}

interface FinancialSummaryProps {
  clientName?: string;
  metrics?: FinancialMetric[];
  creditScore?: {
    score: number;
    maxScore: number;
    rating: string;
  };
  affordabilityRatio?: number;
  alerts?: string[];
}

const FinancialSummary = ({
  clientName = "Sarah Johnson",
  metrics = [
    {
      label: "Monthly Income",
      value: "$8,500",
      previousValue: "$8,200",
      change: 3.7,
      changeType: "positive",
      icon: <DollarSign className="h-4 w-4" />,
      tooltip: "Total household monthly income before taxes",
    },
    {
      label: "Monthly Expenses",
      value: "$4,200",
      previousValue: "$4,350",
      change: 3.4,
      changeType: "positive",
      icon: <DollarSign className="h-4 w-4" />,
      tooltip: "Total monthly expenses including existing debt payments",
    },
    {
      label: "Debt-to-Income Ratio",
      value: "32%",
      previousValue: "35%",
      change: 8.6,
      changeType: "positive",
      icon: <Percent className="h-4 w-4" />,
      tooltip:
        "Percentage of gross monthly income that goes toward paying debts",
    },
    {
      label: "Savings",
      value: "$42,500",
      previousValue: "$38,000",
      change: 11.8,
      changeType: "positive",
      icon: <DollarSign className="h-4 w-4" />,
      tooltip:
        "Total liquid assets available for down payment and closing costs",
    },
  ],
  creditScore = {
    score: 745,
    maxScore: 850,
    rating: "Very Good",
  },
  affordabilityRatio = 28,
  alerts = [
    "Your credit score qualifies you for preferred interest rates",
    "Consider reducing credit card balances to improve debt-to-income ratio",
  ],
}: FinancialSummaryProps) => {
  // Helper function to determine change indicator color
  const getChangeColor = (type: "positive" | "negative" | "neutral") => {
    switch (type) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  // Helper function to determine change indicator icon
  const getChangeIcon = (type: "positive" | "negative" | "neutral") => {
    switch (type) {
      case "positive":
        return <ArrowUpRight className="h-3 w-3" />;
      case "negative":
        return <ArrowDownRight className="h-3 w-3" />;
      default:
        return null;
    }
  };

  // Calculate credit score percentage for progress bar
  const creditScorePercentage =
    (creditScore.score / creditScore.maxScore) * 100;

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold text-gray-800">
              Financial Summary
            </CardTitle>
            <CardDescription>
              Current financial position for {clientName}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200"
          >
            Updated: {new Date().toLocaleDateString()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                  {metric.icon}
                  {metric.label}
                  {metric.tooltip && (
                    <div className="relative group">
                      <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                      <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                        {metric.tooltip}
                      </div>
                    </div>
                  )}
                </div>
                {metric.change && (
                  <div
                    className={`flex items-center text-xs font-medium ${getChangeColor(metric.changeType || "neutral")}`}
                  >
                    {getChangeIcon(metric.changeType || "neutral")}
                    <span className="ml-0.5">{metric.change}%</span>
                  </div>
                )}
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {metric.value}
              </div>
              {metric.previousValue && (
                <div className="text-xs text-gray-500 mt-1">
                  Previous: {metric.previousValue}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Credit Score Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Credit Score
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold text-gray-800">
                {creditScore.score}
              </span>
              <Badge
                className={`${
                  creditScorePercentage >= 70
                    ? "bg-green-100 text-green-800 border-green-200"
                    : creditScorePercentage >= 50
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                      : "bg-red-100 text-red-800 border-red-200"
                }`}
              >
                {creditScore.rating}
              </Badge>
            </div>
            <Progress value={creditScorePercentage} className="h-2 mb-1" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>300</span>
              <span>{creditScore.maxScore}</span>
            </div>
          </div>

          {/* Affordability Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Mortgage Affordability
            </h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold text-gray-800">
                {affordabilityRatio}%
              </span>
              <Badge
                className={`${
                  affordabilityRatio <= 28
                    ? "bg-green-100 text-green-800 border-green-200"
                    : affordabilityRatio <= 36
                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                      : "bg-red-100 text-red-800 border-red-200"
                }`}
              >
                {affordabilityRatio <= 28
                  ? "Excellent"
                  : affordabilityRatio <= 36
                    ? "Good"
                    : "High"}
              </Badge>
            </div>
            <Progress
              value={(affordabilityRatio / 43) * 100}
              className="h-2 mb-1"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span className="text-center">28%</span>
              <span className="text-center">36%</span>
              <span>43%+</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Housing costs as percentage of gross monthly income
            </p>
          </div>
        </div>

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <h3 className="text-sm font-medium text-amber-800">
                Financial Insights
              </h3>
            </div>
            <ul className="space-y-1 pl-6 list-disc">
              {alerts.map((alert, index) => (
                <li key={index} className="text-sm text-amber-700">
                  {alert}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialSummary;
