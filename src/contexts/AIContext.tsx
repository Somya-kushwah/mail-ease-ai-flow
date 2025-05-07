
import React, { createContext, useState, useContext } from "react";
import { toast } from "@/components/ui/sonner";

interface AIContextType {
  isGenerating: boolean;
  generateSubject: (context: string) => Promise<string>;
  generateBody: (subject: string, context: string) => Promise<string>;
  generateReply: (originalEmail: string) => Promise<string>;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

// Mock responses for demonstration
const mockSubjects = [
  "Meeting Follow-up: Next Steps and Action Items",
  "Your Request for Information: Details Enclosed",
  "Important Update: Changes to Project Timeline",
  "Opportunity for Collaboration on Upcoming Project",
  "Confirming Our Appointment for Next Week",
];

const mockBodies = [
  `<p>Dear [Recipient],</p>
   <p>I hope this email finds you well. I'm writing to follow up on our recent meeting regarding [Project Name].</p>
   <p>As discussed, here are the key action items we agreed on:</p>
   <ul>
     <li>Complete the initial research phase by [Date]</li>
     <li>Schedule a follow-up meeting with stakeholders</li>
     <li>Prepare a draft proposal for review</li>
   </ul>
   <p>Please let me know if you have any questions or need additional information.</p>
   <p>Best regards,</p>
   <p>[Your Name]</p>`,
  `<p>Hello [Recipient],</p>
   <p>Thank you for your interest in our services. I'm pleased to provide the information you requested about [Topic].</p>
   <p>Based on your requirements, I believe our [Product/Service] would be an excellent fit for your needs. It offers the following benefits:</p>
   <ul>
     <li>Feature 1: Brief description</li>
     <li>Feature 2: Brief description</li>
     <li>Feature 3: Brief description</li>
   </ul>
   <p>I've attached additional documentation for your review. Please don't hesitate to reach out if you need any clarification.</p>
   <p>Warm regards,</p>
   <p>[Your Name]</p>`,
];

const mockReplies = [
  `<p>Thank you for your email. I appreciate you taking the time to share this information with me.</p>
   <p>I've reviewed the details you've provided and would like to discuss this further. Would you be available for a quick call tomorrow afternoon?</p>
   <p>Looking forward to your response.</p>
   <p>Best regards,</p>`,
  `<p>I appreciate your prompt response to my inquiry.</p>
   <p>The information you've provided is exactly what I needed. Based on this, I would like to proceed with the next steps as outlined in your email.</p>
   <p>Thank you for your assistance with this matter.</p>
   <p>Kind regards,</p>`,
];

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const getRandomItem = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const simulateAPICall = async <T,>(result: T): Promise<T> => {
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 2000));
    return result;
  };

  const generateSubject = async (context: string): Promise<string> => {
    setIsGenerating(true);
    try {
      // In a real app, this would call the OpenAI API
      const subject = await simulateAPICall(getRandomItem(mockSubjects));
      return subject;
    } catch (error) {
      toast.error("Failed to generate subject");
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const generateBody = async (subject: string, context: string): Promise<string> => {
    setIsGenerating(true);
    try {
      // In a real app, this would call the OpenAI API
      const body = await simulateAPICall(getRandomItem(mockBodies));
      return body;
    } catch (error) {
      toast.error("Failed to generate email body");
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const generateReply = async (originalEmail: string): Promise<string> => {
    setIsGenerating(true);
    try {
      // In a real app, this would call the OpenAI API
      const reply = await simulateAPICall(getRandomItem(mockReplies));
      return reply;
    } catch (error) {
      toast.error("Failed to generate reply");
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const value = {
    isGenerating,
    generateSubject,
    generateBody,
    generateReply,
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider");
  }
  return context;
};
