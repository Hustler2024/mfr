import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";
import FinancialObjectives from "./FinancialObjectives";
import RiskAnalysis from "./RiskAnalysis";
import FAQSection from "./FAQSection";

interface CollapsibleSectionsProps {
  defaultOpenSection?: string;
  showFinancialObjectives?: boolean;
  showRiskAnalysis?: boolean;
  showFAQs?: boolean;
  className?: string;
}

const CollapsibleSections = ({
  defaultOpenSection = "financial-objectives",
  showFinancialObjectives = true,
  showRiskAnalysis = true,
  showFAQs = true,
  className = "",
}: CollapsibleSectionsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultOpenSection);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card className={`w-full bg-white shadow-sm ${className}`}>
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Detailed Information
            </CardTitle>
            <CardDescription>
              Explore detailed sections about your mortgage proposal
            </CardDescription>
          </div>
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isCollapsed ? "Expand sections" : "Collapse sections"}
          >
            {isCollapsed ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="pt-6">
          <Tabs
            defaultValue={defaultOpenSection}
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-6">
              {showFinancialObjectives && (
                <TabsTrigger
                  value="financial-objectives"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Financial Objectives</span>
                  <span className="sm:hidden">Objectives</span>
                </TabsTrigger>
              )}
              {showRiskAnalysis && (
                <TabsTrigger
                  value="risk-analysis"
                  className="flex items-center gap-2"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span className="hidden sm:inline">Risk Analysis</span>
                  <span className="sm:hidden">Risks</span>
                </TabsTrigger>
              )}
              {showFAQs && (
                <TabsTrigger value="faqs" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span>FAQs</span>
                </TabsTrigger>
              )}
            </TabsList>

            {showFinancialObjectives && (
              <TabsContent value="financial-objectives" className="mt-0">
                <FinancialObjectives />
              </TabsContent>
            )}

            {showRiskAnalysis && (
              <TabsContent value="risk-analysis" className="mt-0">
                <RiskAnalysis />
              </TabsContent>
            )}

            {showFAQs && (
              <TabsContent value="faqs" className="mt-0">
                <FAQSection />
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
};

export default CollapsibleSections;
