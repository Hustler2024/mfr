import React from "react";
import { AlertCircle, TrendingDown, TrendingUp, Info } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface RiskFactor {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  likelihood: "high" | "medium" | "low";
  mitigation: string;
}

interface RiskAnalysisProps {
  loanOption?: string;
  riskFactors?: RiskFactor[];
  overallRiskLevel?: "high" | "medium" | "low";
}

const defaultRiskFactors: RiskFactor[] = [
  {
    id: "1",
    title: "Interest Rate Fluctuation",
    description:
      "Risk of interest rates rising over the loan term, potentially increasing monthly payments for variable rate loans.",
    impact: "high",
    likelihood: "medium",
    mitigation:
      "Consider fixed-rate options or partial fixing strategies to protect against rate increases.",
  },
  {
    id: "2",
    title: "Property Value Decline",
    description:
      "Risk of property market downturn leading to negative equity situation.",
    impact: "high",
    likelihood: "low",
    mitigation:
      "Maintain a buffer of equity by avoiding maximum LTV loans where possible.",
  },
  {
    id: "3",
    title: "Income Reduction",
    description:
      "Risk of income decrease due to job loss, illness, or other factors affecting ability to make payments.",
    impact: "high",
    likelihood: "medium",
    mitigation:
      "Consider income protection insurance and maintain emergency savings fund.",
  },
  {
    id: "4",
    title: "Early Repayment Penalties",
    description:
      "Risk of incurring significant fees if needing to exit the mortgage early.",
    impact: "medium",
    likelihood: "medium",
    mitigation:
      "Choose products with flexible repayment terms if future changes are anticipated.",
  },
];

const getRiskColor = (level: "high" | "medium" | "low") => {
  switch (level) {
    case "high":
      return "text-red-500";
    case "medium":
      return "text-amber-500";
    case "low":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

const getRiskIcon = (level: "high" | "medium" | "low") => {
  switch (level) {
    case "high":
      return <TrendingUp className="h-5 w-5 text-red-500" />;
    case "medium":
      return <Info className="h-5 w-5 text-amber-500" />;
    case "low":
      return <TrendingDown className="h-5 w-5 text-green-500" />;
    default:
      return null;
  }
};

const RiskAnalysis = ({
  loanOption = "Standard Variable Rate Mortgage",
  riskFactors = defaultRiskFactors,
  overallRiskLevel = "medium",
}: RiskAnalysisProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Risk Analysis
        </h2>
        <p className="text-gray-600">
          Understanding the potential risks associated with {loanOption} and how
          they might affect your financial situation.
        </p>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Overall Risk Assessment</CardTitle>
              <div
                className={`flex items-center ${getRiskColor(overallRiskLevel)} font-medium`}
              >
                {getRiskIcon(overallRiskLevel)}
                <span className="ml-2 capitalize">{overallRiskLevel} Risk</span>
              </div>
            </div>
            <CardDescription>
              Based on your financial profile and selected mortgage option
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important to consider</AlertTitle>
              <AlertDescription>
                This risk assessment is based on current market conditions and
                your provided financial information. Actual risks may vary based
                on future economic changes and personal circumstances.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Key Risk Factors
        </h3>
        <Accordion type="single" collapsible className="w-full">
          {riskFactors.map((risk) => (
            <AccordionItem key={risk.id} value={risk.id}>
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full pr-4">
                  <span>{risk.title}</span>
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm ${getRiskColor(risk.impact)}`}>
                      Impact:{" "}
                      <span className="font-medium capitalize">
                        {risk.impact}
                      </span>
                    </span>
                    <span
                      className={`text-sm ${getRiskColor(risk.likelihood)}`}
                    >
                      Likelihood:{" "}
                      <span className="font-medium capitalize">
                        {risk.likelihood}
                      </span>
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <p className="text-gray-700">{risk.description}</p>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <h4 className="text-sm font-medium text-blue-800 mb-1">
                      Mitigation Strategy
                    </h4>
                    <p className="text-sm text-blue-700">{risk.mitigation}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default RiskAnalysis;
