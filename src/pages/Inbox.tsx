
import React from "react";
import { EmailList } from "@/components/email/EmailList";

const Inbox = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Inbox</h1>
        <p className="text-muted-foreground">View emails sent to you</p>
      </div>
      
      <EmailList type="inbox" />
    </div>
  );
};

export default Inbox;
