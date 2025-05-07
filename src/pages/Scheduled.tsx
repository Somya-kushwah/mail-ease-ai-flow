
import React from "react";
import { EmailList } from "@/components/email/EmailList";

const Scheduled = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Scheduled</h1>
        <p className="text-muted-foreground">Emails scheduled to be sent later</p>
      </div>
      
      <EmailList type="scheduled" />
    </div>
  );
};

export default Scheduled;
