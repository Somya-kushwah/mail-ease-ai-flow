
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "./AuthContext";
import { Email } from "@/types/email";

interface EmailContextType {
  emails: Email[];
  isLoading: boolean;
  sendEmail: (email: Partial<Email>) => Promise<Email>;
  scheduleEmail: (email: Partial<Email>, scheduledFor: Date) => Promise<Email>;
  getSentEmails: () => Email[];
  getScheduledEmails: () => Email[];
  getInboxEmails: () => Email[];
  getEmailById: (id: string) => Email | undefined;
  markAsRead: (id: string) => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

// Generate some sample emails
const generateSampleEmails = (userEmail: string): Email[] => {
  return [
    {
      id: "email-1",
      subject: "Welcome to MailEase",
      to: userEmail,
      from: "welcome@mail-ease.example.com",
      body: "<p>Thank you for joining MailEase! We're excited to have you on board.</p><p>With MailEase, you can automate your email workflows, schedule messages for later, and use AI to help draft the perfect email.</p><p>Let us know if you have any questions!</p>",
      sentAt: new Date(Date.now() - 3600000), // 1 hour ago
      status: 'sent',
      read: false,
    },
    {
      id: "email-2",
      subject: "Your account has been created",
      to: userEmail,
      from: "accounts@mail-ease.example.com",
      body: "<p>Your MailEase account has been successfully created.</p><p>You can now start using all the features of our platform.</p>",
      sentAt: new Date(Date.now() - 86400000), // 1 day ago
      status: 'sent',
      read: true,
    },
    {
      id: "email-3",
      subject: "Weekly newsletter",
      from: userEmail,
      to: "subscribers@example.com",
      body: "<p>Hello everyone,</p><p>Here's our weekly newsletter with the latest updates...</p>",
      scheduledFor: new Date(Date.now() + 86400000), // 1 day from now
      status: 'scheduled',
      read: true,
    },
  ];
};

export function EmailProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // In a real app, this would fetch emails from an API
      const storedEmails = localStorage.getItem(`mailease_emails_${user.id}`);
      if (storedEmails) {
        try {
          setEmails(JSON.parse(storedEmails));
        } catch (error) {
          console.error("Failed to parse emails from localStorage");
          // Generate sample emails if parsing fails
          const sampleEmails = generateSampleEmails(user.email);
          setEmails(sampleEmails);
          localStorage.setItem(`mailease_emails_${user.id}`, JSON.stringify(sampleEmails));
        }
      } else {
        // Generate sample emails if none exist
        const sampleEmails = generateSampleEmails(user.email);
        setEmails(sampleEmails);
        localStorage.setItem(`mailease_emails_${user.id}`, JSON.stringify(sampleEmails));
      }
      setIsLoading(false);
    }
  }, [user]);

  // Save emails to localStorage whenever they change
  useEffect(() => {
    if (user && emails.length > 0) {
      localStorage.setItem(`mailease_emails_${user.id}`, JSON.stringify(emails));
    }
  }, [emails, user]);

  const sendEmail = async (email: Partial<Email>): Promise<Email> => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEmail: Email = {
        id: `email-${Date.now()}`,
        subject: email.subject || "(No subject)",
        to: email.to || "",
        from: user?.email || "",
        body: email.body || "",
        sentAt: new Date(),
        status: 'sent',
        read: true,
      };
      
      setEmails(prev => [newEmail, ...prev]);
      toast.success("Email sent successfully!");
      return newEmail;
    } catch (error) {
      toast.error("Failed to send email");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const scheduleEmail = async (email: Partial<Email>, scheduledFor: Date): Promise<Email> => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newEmail: Email = {
        id: `email-${Date.now()}`,
        subject: email.subject || "(No subject)",
        to: email.to || "",
        from: user?.email || "",
        body: email.body || "",
        scheduledFor,
        status: 'scheduled',
        read: true,
      };
      
      setEmails(prev => [newEmail, ...prev]);
      toast.success("Email scheduled successfully!");
      return newEmail;
    } catch (error) {
      toast.error("Failed to schedule email");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getSentEmails = (): Email[] => {
    return emails.filter(email => email.status === 'sent' && email.from === user?.email);
  };

  const getScheduledEmails = (): Email[] => {
    return emails.filter(email => email.status === 'scheduled');
  };

  const getInboxEmails = (): Email[] => {
    return emails.filter(email => email.to === user?.email);
  };

  const getEmailById = (id: string): Email | undefined => {
    return emails.find(email => email.id === id);
  };

  const markAsRead = (id: string) => {
    setEmails(prev => 
      prev.map(email => 
        email.id === id ? { ...email, read: true } : email
      )
    );
  };

  const value = {
    emails,
    isLoading,
    sendEmail,
    scheduleEmail,
    getSentEmails,
    getScheduledEmails,
    getInboxEmails,
    getEmailById,
    markAsRead,
  };

  return <EmailContext.Provider value={value}>{children}</EmailContext.Provider>;
}

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error("useEmail must be used within an EmailProvider");
  }
  return context;
};
