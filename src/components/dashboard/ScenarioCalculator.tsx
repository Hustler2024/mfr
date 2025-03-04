import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Calculator, DollarSign, Percent, RefreshCw } from "lucide-react";

interface ScenarioCalculatorProps {
  initialLoanAmount?: number;
  initialInterestRate?: number;
  initialLoanTerm?: number;
  onCalculate?: (results: CalculationResults) => void;
}

interface CalculationResults {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

const ScenarioCalculator: React.FC<ScenarioCalculatorProps> = ({
  initialLoanAmount = 350000,
  initialInterestRate = 4.5,
  initialLoanTerm = 30,
  onCalculate = () => {},
}) => {
  const [loanAmount, setLoanAmount] = useState<number>(initialLoanAmount);
  const [interestRate, setInterestRate] = useState<number>(initialInterestRate);
  const [loanTerm, setLoanTerm] = useState<number>(initialLoanTerm);
  const [results, setResults] = useState<CalculationResults>({
    monthlyPayment: 0,
    totalInterest: 0,
    totalCost: 0,
  });

  const handleLoanAmountChange = (value: number[]) => {
    setLoanAmount(value[0]);
  };

  const handleLoanAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setLoanAmount(value);
    }
  };

  const handleInterestRateChange = (value: number[]) => {
    setInterestRate(value[0]);
  };

  const handleInterestRateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setInterestRate(value);
    }
  };

  const handleLoanTermChange = (value: number[]) => {
    setLoanTerm(value[0]);
  };

  const calculateMortgage = () => {
    // Convert annual interest rate to monthly and decimal form
    const monthlyRate = interestRate / 100 / 12;
    const termInMonths = loanTerm * 12;

    // Calculate monthly payment using mortgage formula
    const monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termInMonths))) /
      (Math.pow(1 + monthlyRate, termInMonths) - 1);

    const totalCost = monthlyPayment * termInMonths;
    const totalInterest = totalCost - loanAmount;

    const newResults = {
      monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
    };

    setResults(newResults);
    onCalculate(newResults);
  };

  const resetCalculator = () => {
    setLoanAmount(initialLoanAmount);
    setInterestRate(initialInterestRate);
    setLoanTerm(initialLoanTerm);
    setResults({
      monthlyPayment: 0,
      totalInterest: 0,
      totalCost: 0,
    });
  };

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          What-If Scenario Calculator
        </CardTitle>
        <CardDescription>
          Adjust the parameters below to see how different loan scenarios affect
          your payments.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="loan-amount">Loan Amount</Label>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
              <Input
                id="loan-amount-input"
                type="number"
                value={loanAmount}
                onChange={handleLoanAmountInput}
                className="w-24"
              />
            </div>
          </div>
          <Slider
            id="loan-amount"
            min={100000}
            max={1000000}
            step={5000}
            value={[loanAmount]}
            onValueChange={handleLoanAmountChange}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(100000)}</span>
            <span>{formatCurrency(1000000)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="interest-rate">Interest Rate</Label>
            <div className="flex items-center">
              <Input
                id="interest-rate-input"
                type="number"
                value={interestRate}
                onChange={handleInterestRateInput}
                className="w-20"
                step="0.1"
              />
              <Percent className="h-4 w-4 text-muted-foreground ml-1" />
            </div>
          </div>
          <Slider
            id="interest-rate"
            min={1}
            max={10}
            step={0.1}
            value={[interestRate]}
            onValueChange={handleInterestRateChange}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1%</span>
            <span>10%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="loan-term">Loan Term (Years)</Label>
            <Input
              id="loan-term-input"
              type="number"
              value={loanTerm}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) setLoanTerm(value);
              }}
              className="w-20"
            />
          </div>
          <Slider
            id="loan-term"
            min={5}
            max={30}
            step={5}
            value={[loanTerm]}
            onValueChange={handleLoanTermChange}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5 years</span>
            <span>30 years</span>
          </div>
        </div>

        {results.monthlyPayment > 0 && (
          <div className="mt-6 p-4 bg-slate-50 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Monthly Payment:</span>
              <span className="font-bold text-primary">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(results.monthlyPayment)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Interest:</span>
              <span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(results.totalInterest)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Cost:</span>
              <span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(results.totalCost)}
              </span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetCalculator}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button onClick={calculateMortgage}>
          <Calculator className="mr-2 h-4 w-4" />
          Calculate
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScenarioCalculator;
