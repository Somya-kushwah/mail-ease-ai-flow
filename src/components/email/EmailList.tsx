
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEmail } from "@/contexts/EmailContext";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface EmailListProps {
  type: 'inbox' | 'sent' | 'scheduled';
}

export function EmailList({ type }: EmailListProps) {
  const navigate = useNavigate();
  const { getInboxEmails, getSentEmails, getScheduledEmails, markAsRead } = useEmail();
  
  const getEmails = () => {
    switch (type) {
      case 'inbox':
        return getInboxEmails();
      case 'sent':
        return getSentEmails();
      case 'scheduled':
        return getScheduledEmails();
      default:
        return [];
    }
  };

  const emails = getEmails();

  const handleEmailClick = (emailId: string) => {
    markAsRead(emailId);
    navigate(`/email/${emailId}`);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return format(new Date(date), "MMM d, h:mm a");
  };

  return (
    <div className="space-y-1">
      {emails.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No emails to display</p>
        </div>
      ) : (
        emails.map((email) => (
          <div
            key={email.id}
            className={cn(
              "p-3 rounded-md cursor-pointer transition-colors",
              email.read ? "bg-white hover:bg-gray-50" : "bg-blue-50 hover:bg-blue-100",
              "border-b"
            )}
            onClick={() => handleEmailClick(email.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-medium truncate",
                  !email.read && "font-semibold"
                )}>
                  {type === 'inbox' ? email.from : email.to}
                </p>
                <p className="text-base truncate">
                  {email.subject}
                </p>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="truncate">
                    {email.body.replace(/<[^>]*>/g, '').substring(0, 50)}
                    {email.body.length > 50 ? '...' : ''}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end ml-2">
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDate(email.sentAt || email.scheduledFor)}
                </span>
                {type === 'scheduled' && (
                  <Badge variant="outline" className="mt-1">Scheduled</Badge>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
