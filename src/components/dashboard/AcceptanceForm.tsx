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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { CheckCircle, FileText, Info } from "lucide-react";

interface LoanOption {
  id: string;
  name: string;
  rate: number;
  term: number;
  monthlyPayment: number;
  features: string[];
}

interface AcceptanceFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (data: AcceptanceFormData) => void;
  selectedLoan?: LoanOption;
}

interface AcceptanceFormData {
  fullName: string;
  email: string;
  phone: string;
  preferredContactMethod: string;
  agreeToTerms: boolean;
  requestCallBack: boolean;
  additionalNotes: string;
}

const AcceptanceForm: React.FC<AcceptanceFormProps> = ({
  isOpen = true,
  onClose = () => {},
  onSubmit = () => {},
  selectedLoan = {
    id: "loan-1",
    name: "5-Year Fixed Rate Mortgage",
    rate: 3.49,
    term: 5,
    monthlyPayment: 1578.42,
    features: [
      "Fixed monthly payments for 5 years",
      "No prepayment penalties",
      "Option to convert to variable rate",
      "Portable to a new property",
    ],
  },
}) => {
  const [formData, setFormData] = useState<AcceptanceFormData>({
    fullName: "",
    email: "",
    phone: "",
    preferredContactMethod: "email",
    agreeToTerms: false,
    requestCallBack: false,
    additionalNotes: "",
  });

  const [formStep, setFormStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRadioChange = (value: string) => {
    setFormData({
      ...formData,
      preferredContactMethod: value,
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      additionalNotes: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formStep === 1) {
      setFormStep(2);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800">
                {formStep === 1
                  ? "Accept Mortgage Offer"
                  : "Complete Your Acceptance"}
              </DialogTitle>
              <DialogDescription>
                {formStep === 1
                  ? "Please review the details of your selected mortgage option below."
                  : "Please provide your contact information to finalize your acceptance."}
              </DialogDescription>
            </DialogHeader>

            {formStep === 1 ? (
              <div className="py-6 space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Selected Mortgage Option
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Product:</span>
                      <span className="font-medium">{selectedLoan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate:</span>
                      <span className="font-medium">{selectedLoan.rate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Term:</span>
                      <span className="font-medium">
                        {selectedLoan.term} years
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Payment:</span>
                      <span className="font-medium text-blue-700">
                        {formatCurrency(selectedLoan.monthlyPayment)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {selectedLoan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 p-3 rounded-md flex items-start">
                  <Info className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    By proceeding, you're expressing interest in this mortgage
                    option. Your broker will contact you to complete the formal
                    application process.
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-6 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Contact Method</Label>
                    <div className="flex space-x-4 mt-1">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="email-contact"
                          name="preferredContactMethod"
                          className="mr-2"
                          checked={formData.preferredContactMethod === "email"}
                          onChange={() => handleRadioChange("email")}
                        />
                        <Label htmlFor="email-contact">Email</Label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="phone-contact"
                          name="preferredContactMethod"
                          className="mr-2"
                          checked={formData.preferredContactMethod === "phone"}
                          onChange={() => handleRadioChange("phone")}
                        />
                        <Label htmlFor="phone-contact">Phone</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">
                      Additional Notes (Optional)
                    </Label>
                    <textarea
                      id="additionalNotes"
                      name="additionalNotes"
                      rows={3}
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      value={formData.additionalNotes}
                      onChange={handleTextareaChange}
                    />
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                      id="requestCallBack"
                      name="requestCallBack"
                      checked={formData.requestCallBack}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          requestCallBack: checked as boolean,
                        })
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="requestCallBack"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Request a callback from my broker
                      </Label>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          agreeToTerms: checked as boolean,
                        })
                      }
                      required
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="agreeToTerms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-blue-600 hover:underline"
                          onClick={(e) => e.preventDefault()}
                        >
                          terms and conditions
                        </a>
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              {formStep === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormStep(1)}
                  className="mr-auto"
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                disabled={
                  formStep === 2 && (!formData.agreeToTerms || isSubmitting)
                }
              >
                {formStep === 1
                  ? "Continue"
                  : isSubmitting
                    ? "Submitting..."
                    : "Submit Acceptance"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-800">
                Acceptance Submitted Successfully!
              </h2>
              <p className="text-gray-600">
                Thank you for accepting our mortgage proposal. Your broker will
                contact you within 24 hours to discuss next steps.
              </p>
            </div>
            <Button onClick={onClose}>Close</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AcceptanceForm;
