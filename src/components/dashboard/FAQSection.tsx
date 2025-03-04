import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  description?: string;
  faqs?: FAQItem[];
  className?: string;
}

const FAQSection = ({
  title = "Frequently Asked Questions",
  description = "Find answers to common questions about your mortgage proposal.",
  faqs = [
    {
      question: "What is the difference between fixed and variable rates?",
      answer:
        "A fixed rate mortgage has the same interest rate for the entire term of the loan. A variable rate mortgage has an interest rate that can change periodically based on market conditions. Fixed rates provide stability in payments, while variable rates may offer lower initial rates but come with the risk of rate increases.",
    },
    {
      question: "How much down payment do I need?",
      answer:
        "The minimum down payment required depends on the purchase price of the home. For homes under $500,000, the minimum is 5%. For homes between $500,000 and $999,999, it's 5% on the first $500,000 and 10% on the remainder. For homes $1 million or more, the minimum is 20%.",
    },
    {
      question: "What closing costs should I expect?",
      answer:
        "Common closing costs include legal fees, land transfer taxes, title insurance, home inspection fees, appraisal fees, and mortgage default insurance if your down payment is less than 20%. These typically range from 1.5% to 4% of the purchase price.",
    },
    {
      question: "Can I pay off my mortgage early?",
      answer:
        "Yes, most mortgages allow for prepayment options, but there may be penalties for paying off the entire mortgage before the term ends. Many lenders allow you to make lump sum payments up to a certain percentage of the original principal each year, and/or increase your regular payments without penalty.",
    },
    {
      question: "What is mortgage default insurance?",
      answer:
        "Mortgage default insurance (sometimes called CMHC insurance) is required for mortgages with down payments less than 20%. It protects the lender if you default on your mortgage. The premium is typically 2.8% to 4% of the mortgage amount and can be added to your mortgage or paid upfront.",
    },
  ],
  className = "",
}: FAQSectionProps) => {
  return (
    <div className={`w-full bg-white p-6 rounded-lg shadow-sm ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium text-gray-700">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              <p>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Still have questions?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Contact your mortgage broker
          </a>{" "}
          for personalized assistance.
        </p>
      </div>
    </div>
  );
};

export default FAQSection;
