import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { ThumbsUp, ThumbsDown, HelpCircle, Check, X } from "lucide-react";

interface DecisionActionsProps {
  onAccept?: () => void;
  onDecline?: () => void;
  onRequestInfo?: () => void;
  selectedLoanOption?: string;
  showAcceptanceForm?: boolean;
  showFeedbackForm?: boolean;
}

const DecisionActions = ({
  onAccept = () => {},
  onDecline = () => {},
  onRequestInfo = () => {},
  selectedLoanOption = "30-Year Fixed Rate Mortgage",
  showAcceptanceForm = false,
  showFeedbackForm = false,
}: DecisionActionsProps) => {
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(true);
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  const handleAccept = () => {
    setIsAcceptDialogOpen(true);
    onAccept();
  };

  const handleDecline = () => {
    setIsDeclineDialogOpen(true);
    onDecline();
  };

  const handleRequestInfo = () => {
    setIsInfoDialogOpen(true);
    onRequestInfo();
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Ready to Decide?</CardTitle>
        <CardDescription>
          Review your options and make a decision on your mortgage proposal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-blue-50 rounded-lg mb-6">
          <p className="text-blue-800 font-medium">
            Your selected option:{" "}
            <span className="font-bold">{selectedLoanOption}</span>
          </p>
          <p className="text-sm text-blue-700 mt-1">
            You can change your selection in the loan comparison table above
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <Button
            onClick={handleAccept}
            className="flex-1 py-6 bg-green-600 hover:bg-green-700"
          >
            <ThumbsUp className="mr-2 h-5 w-5" />
            Accept Proposal
          </Button>

          <Button
            onClick={handleRequestInfo}
            variant="outline"
            className="flex-1 py-6 border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <HelpCircle className="mr-2 h-5 w-5" />
            Request More Information
          </Button>

          <Button
            onClick={handleDecline}
            variant="outline"
            className="flex-1 py-6 border-red-300 text-red-700 hover:bg-red-50"
          >
            <ThumbsDown className="mr-2 h-5 w-5" />
            Decline Proposal
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-gray-500 italic">
        Your decision is not final until you complete the acceptance or feedback
        form
      </CardFooter>

      {/* Accept Dialog */}
      <Dialog
        open={isAcceptDialogOpen && showAcceptanceForm}
        onOpenChange={setIsAcceptDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-700">
              <Check className="mr-2 h-5 w-5" />
              Confirm Acceptance
            </DialogTitle>
            <DialogDescription>
              You're accepting the {selectedLoanOption} proposal. Please
              complete the acceptance form to proceed.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              The acceptance form will be displayed here. After completing this
              form, your mortgage broker will be notified and will contact you
              to proceed with the next steps.
            </p>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAcceptDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setIsAcceptDialogOpen(false)}
            >
              Proceed to Form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Decline Dialog */}
      <Dialog
        open={isDeclineDialogOpen && showFeedbackForm}
        onOpenChange={setIsDeclineDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-700">
              <X className="mr-2 h-5 w-5" />
              Confirm Decline
            </DialogTitle>
            <DialogDescription>
              You're declining the mortgage proposal. Your feedback will help us
              improve our recommendations.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              The feedback form will be displayed here. Your feedback is
              valuable and will help your mortgage broker understand your needs
              better.
            </p>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeclineDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-red-600 hover:bg-red-700"
              onClick={() => setIsDeclineDialogOpen(false)}
            >
              Proceed to Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Info Dialog */}
      <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-blue-700">
              <HelpCircle className="mr-2 h-5 w-5" />
              Request More Information
            </DialogTitle>
            <DialogDescription>
              What additional information would you like about your mortgage
              proposal?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Common Questions:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Button
                    variant="ghost"
                    className="h-auto p-2 justify-start text-left"
                  >
                    Can you explain the prepayment penalties in more detail?
                  </Button>
                </li>
                <li className="flex items-start">
                  <Button
                    variant="ghost"
                    className="h-auto p-2 justify-start text-left"
                  >
                    What are the exact closing costs I should expect?
                  </Button>
                </li>
                <li className="flex items-start">
                  <Button
                    variant="ghost"
                    className="h-auto p-2 justify-start text-left"
                  >
                    How does the interest rate compare to current market rates?
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsInfoDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsInfoDialogOpen(false)}
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DecisionActions;
