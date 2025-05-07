
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEmail } from "@/contexts/EmailContext";
import { useAI } from "@/contexts/AIContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowLeft, MailPlus, Send, Wand } from "lucide-react";

interface EmailDetailProps {
  emailId: string;
}

export function EmailDetail({ emailId }: EmailDetailProps) {
  const { getEmailById } = useEmail();
  const { generateReply, isGenerating } = useAI();
  const navigate = useNavigate();
  
  const email = getEmailById(emailId);
  
  if (!email) {
    return (
      <div className="text-center p-8">
        <p>Email not found.</p>
        <Button className="mt-4" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return format(new Date(date), "PPP p");
  };

  const handleReply = () => {
    navigate("/compose", {
      state: {
        to: email.from,
        subject: `Re: ${email.subject}`,
        body: `<p>In reply to:</p><blockquote style="padding-left: 1rem; border-left: 2px solid #ccc; margin: 1rem 0;">${email.body}</blockquote><p></p>`
      }
    });
  };

  const handleGenerateReply = async () => {
    try {
      const reply = await generateReply(email.body);
      navigate("/compose", {
        state: {
          to: email.from,
          subject: `Re: ${email.subject}`,
          body: `${reply}<p>In reply to:</p><blockquote style="padding-left: 1rem; border-left: 2px solid #ccc; margin: 1rem 0;">${email.body}</blockquote>`
        }
      });
    } catch (error) {
      console.error("Failed to generate reply:", error);
    }
  };

  const handleCompose = () => {
    navigate("/compose");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button 
            size="sm"
            variant="outline"
            onClick={handleGenerateReply}
            disabled={isGenerating}
          >
            <Wand className="mr-2 h-4 w-4" />
            AI Reply
          </Button>
          <Button 
            size="sm"
            onClick={handleReply}
          >
            <Send className="mr-2 h-4 w-4" />
            Reply
          </Button>
          <Button 
            size="sm"
            variant="outline"
            onClick={handleCompose}
          >
            <MailPlus className="mr-2 h-4 w-4" />
            New Email
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{email.subject}</h2>
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-muted-foreground">
              <div>
                <span className="font-medium">From: </span>
                {email.from}
              </div>
              <div>
                <span className="font-medium">To: </span>
                {email.to}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {email.sentAt ? (
                <div>
                  <span className="font-medium">Sent: </span>
                  {formatDate(email.sentAt)}
                </div>
              ) : (
                <div>
                  <span className="font-medium">Scheduled for: </span>
                  {formatDate(email.scheduledFor)}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: email.body }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
