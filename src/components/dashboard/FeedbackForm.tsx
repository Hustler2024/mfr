import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ThumbsDown, Send, X } from "lucide-react";

interface FeedbackFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (feedback: FeedbackData) => void;
  proposalTitle?: string;
}

interface FeedbackData {
  reason: string;
  additionalComments: string;
  contactRequest: boolean;
}

const FeedbackForm = ({
  isOpen = true,
  onClose = () => {},
  onSubmit = () => {},
  proposalTitle = "Mortgage Proposal",
}: FeedbackFormProps) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [additionalComments, setAdditionalComments] = useState<string>("");
  const [contactRequest, setContactRequest] = useState<boolean>(false);

  const reasons = [
    "Rates are too high",
    "Looking for different terms",
    "Found better offer elsewhere",
    "Need more time to decide",
    "Financial situation has changed",
    "Other",
  ];

  const handleSubmit = () => {
    onSubmit({
      reason: selectedReason,
      additionalComments,
      contactRequest,
    });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setSelectedReason("");
    setAdditionalComments("");
    setContactRequest(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ThumbsDown className="h-5 w-5 text-gray-600" />
            Decline Proposal
          </DialogTitle>
          <DialogDescription>
            We're sorry to hear you're declining the {proposalTitle}. Your
            feedback helps us improve our offerings.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Reason for declining</label>
            <div className="grid grid-cols-2 gap-2">
              {reasons.map((reason) => (
                <Button
                  key={reason}
                  type="button"
                  variant={selectedReason === reason ? "default" : "outline"}
                  className="justify-start h-auto py-2 px-3 text-left"
                  onClick={() => setSelectedReason(reason)}
                >
                  {reason}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Additional comments</label>
            <Textarea
              placeholder="Please share any additional feedback that might help us improve our proposal..."
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="contact-request"
              checked={contactRequest}
              onChange={(e) => setContactRequest(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="contact-request" className="text-sm">
              I would like my mortgage broker to contact me to discuss
              alternatives
            </label>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedReason}>
            <Send className="mr-2 h-4 w-4" />
            Submit Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm;
