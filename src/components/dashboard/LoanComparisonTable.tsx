import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ArrowUpDown, Check, HelpCircle, Star } from "lucide-react";

interface LoanOption {
  id: string;
  name: string;
  lender: string;
  interestRate: number;
  term: number;
  monthlyPayment: number;
  totalCost: number;
  features: string[];
  recommended: boolean;
}

interface LoanComparisonTableProps {
  loanOptions?: LoanOption[];
  onSelectOption?: (optionId: string) => void;
  selectedOptionId?: string;
}

const LoanComparisonTable = ({
  loanOptions = [
    {
      id: "loan-1",
      name: "Fixed Rate Mortgage",
      lender: "First National Bank",
      interestRate: 4.25,
      term: 30,
      monthlyPayment: 1968.11,
      totalCost: 708519.6,
      features: [
        "No prepayment penalties",
        "Rate lock guarantee",
        "Online payment portal",
      ],
      recommended: true,
    },
    {
      id: "loan-2",
      name: "Adjustable Rate Mortgage",
      lender: "Homestead Lending",
      interestRate: 3.75,
      term: 30,
      monthlyPayment: 1852.46,
      totalCost: 666885.6,
      features: ["Lower initial rate", "Rate caps", "Convertible to fixed"],
      recommended: false,
    },
    {
      id: "loan-3",
      name: "15-Year Fixed",
      lender: "Community Credit Union",
      interestRate: 3.85,
      term: 15,
      monthlyPayment: 2936.26,
      totalCost: 528526.8,
      features: [
        "Faster equity building",
        "Lower total interest",
        "Quicker payoff",
      ],
      recommended: false,
    },
    {
      id: "loan-4",
      name: "FHA Loan",
      lender: "Federal Housing Partners",
      interestRate: 4.0,
      term: 30,
      monthlyPayment: 1909.66,
      totalCost: 687478.6,
      features: [
        "Lower down payment",
        "More flexible credit requirements",
        "Government backed",
      ],
      recommended: false,
    },
  ],
  onSelectOption = () => {},
  selectedOptionId = "",
}: LoanComparisonTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof LoanOption;
    direction: "ascending" | "descending";
  } | null>(null);

  const sortedLoanOptions = React.useMemo(() => {
    let sortableOptions = [...loanOptions];
    if (sortConfig !== null) {
      sortableOptions.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOptions;
  }, [loanOptions, sortConfig]);

  const requestSort = (key: keyof LoanOption) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Loan Options Comparison</h2>
      <p className="text-gray-600 mb-6">
        Compare different mortgage options to find the best fit for your needs.
        Click on column headers to sort.
      </p>

      <div className="overflow-x-auto">
        <TooltipProvider>
          <Table>
            <TableCaption>
              Personalized loan options based on your financial profile
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    Loan Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => requestSort("lender")}
                  >
                    Lender
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => requestSort("interestRate")}
                  >
                    Interest Rate
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => requestSort("term")}
                  >
                    Term (Years)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => requestSort("monthlyPayment")}
                  >
                    Monthly Payment
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => requestSort("totalCost")}
                  >
                    Total Cost
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Key Features</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLoanOptions.map((option) => (
                <TableRow
                  key={option.id}
                  className={selectedOptionId === option.id ? "bg-blue-50" : ""}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {option.name}
                      {option.recommended && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span>
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Recommended option based on your profile</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{option.lender}</TableCell>
                  <TableCell>{option.interestRate}%</TableCell>
                  <TableCell>{option.term}</TableCell>
                  <TableCell>{formatCurrency(option.monthlyPayment)}</TableCell>
                  <TableCell>{formatCurrency(option.totalCost)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {option.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            View detailed information about this loan option
                          </p>
                        </TooltipContent>
                      </Tooltip>
                      <Button
                        variant={
                          selectedOptionId === option.id ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => onSelectOption(option.id)}
                      >
                        {selectedOptionId === option.id ? (
                          <>
                            <Check className="mr-1 h-4 w-4" /> Selected
                          </>
                        ) : (
                          "Select"
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default LoanComparisonTable;
