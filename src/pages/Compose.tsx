
import React from "react";
import { useLocation } from "react-router-dom";
import { EmailComposer } from "@/components/email/EmailComposer";

const Compose = () => {
  const location = useLocation();
  const state = location.state as { to?: string; subject?: string; body?: string } | undefined;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Compose Email</h1>
        <p className="text-muted-foreground">Create a new email message</p>
      </div>
      
      <EmailComposer 
        initialTo={state?.to || ""}
        initialSubject={state?.subject || ""}
        initialBody={state?.body || ""}
      />
    </div>
  );
};

export default Compose;
