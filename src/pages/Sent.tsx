
import React from "react";
import { EmailList } from "@/components/email/EmailList";

const Sent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sent</h1>
        <p className="text-muted-foreground">Emails you've sent</p>
      </div>
      
      <EmailList type="sent" />
    </div>
  );
};

export default Sent;
