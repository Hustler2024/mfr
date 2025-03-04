import React, { useState } from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import FinancialSummary from "./dashboard/FinancialSummary";
import LoanComparisonTable from "./dashboard/LoanComparisonTable";
import InteractiveTools from "./dashboard/InteractiveTools";
import CollapsibleSections from "./dashboard/CollapsibleSections";
import DecisionActions from "./dashboard/DecisionActions";
import AcceptanceForm from "./dashboard/AcceptanceForm";
import FeedbackForm from "./dashboard/FeedbackForm";

const Home = () => {
  const [selectedLoanId, setSelectedLoanId] = useState<string>("loan-1");
  const [showAcceptanceForm, setShowAcceptanceForm] = useState<boolean>(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState<boolean>(false);

  // Handler for loan selection
  const handleLoanSelection = (loanId: string) => {
    setSelectedLoanId(loanId);
  };

  // Handler for accepting proposal
  const handleAcceptProposal = () => {
    setShowAcceptanceForm(true);
  };

  // Handler for declining proposal
  const handleDeclineProposal = () => {
    setShowFeedbackForm(true);
  };

  // Handler for requesting more information
  const handleRequestInfo = () => {
    // This would typically trigger a form or notification system
    console.log("More information requested");
  };

  // Handler for priority changes in the interactive tools
  const handlePriorityChange = (category: string, value: string) => {
    console.log(`Priority changed: ${category} - ${value}`);
    // This would typically update state or trigger API calls
  };

  // Handler for scenario calculator results
  const handleCalculationResults = (results: {
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
  }) => {
    console.log("Calculation results:", results);
    // This would typically update state or trigger API calls
  };

  // Handler for scheduling meetings
  const handleScheduleMeeting = (
    date: Date,
    time: string,
    participants: number,
    notes: string,
  ) => {
    console.log(
      `Meeting scheduled: ${date.toDateString()} at ${time} with ${participants} participants`,
    );
    console.log(`Notes: ${notes}`);
    // This would typically send data to an API
  };

  // Handler for acceptance form submission
  const handleAcceptanceSubmit = (data: any) => {
    console.log("Acceptance form submitted:", data);
    setShowAcceptanceForm(false);
    // This would typically send data to an API
  };

  // Handler for feedback form submission
  const handleFeedbackSubmit = (data: any) => {
    console.log("Feedback form submitted:", data);
    setShowFeedbackForm(false);
    // This would typically send data to an API
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        clientName="Sarah Johnson"
        proposalDate="April 15, 2023"
        logoUrl="/vite.svg"
        notifications={2}
      />

      <main className="container mx-auto px-4 py-6 space-y-8">
        <FinancialSummary
          clientName="Sarah Johnson"
          creditScore={{
            score: 745,
            maxScore: 850,
            rating: "Very Good",
          }}
          affordabilityRatio={28}
        />

        <LoanComparisonTable
          onSelectOption={handleLoanSelection}
          selectedOptionId={selectedLoanId}
        />

        <InteractiveTools
          onPriorityChange={handlePriorityChange}
          onCalculate={handleCalculationResults}
          onScheduleMeeting={handleScheduleMeeting}
          brokerName="John Smith"
        />

        <CollapsibleSections
          defaultOpenSection="financial-objectives"
          showFinancialObjectives={true}
          showRiskAnalysis={true}
          showFAQs={true}
        />

        <DecisionActions
          onAccept={handleAcceptProposal}
          onDecline={handleDeclineProposal}
          onRequestInfo={handleRequestInfo}
          selectedLoanOption="30-Year Fixed Rate Mortgage"
          showAcceptanceForm={showAcceptanceForm}
          showFeedbackForm={showFeedbackForm}
        />
      </main>

      {/* Modal Forms */}
      <AcceptanceForm
        isOpen={showAcceptanceForm}
        onClose={() => setShowAcceptanceForm(false)}
        onSubmit={handleAcceptanceSubmit}
      />

      <FeedbackForm
        isOpen={showFeedbackForm}
        onClose={() => setShowFeedbackForm(false)}
        onSubmit={handleFeedbackSubmit}
        proposalTitle="30-Year Fixed Rate Mortgage"
      />
    </div>
  );
};

export default Home;
