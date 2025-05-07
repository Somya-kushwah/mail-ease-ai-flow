
import React from "react";
import { useParams } from "react-router-dom";
import { EmailDetail } from "@/components/email/EmailDetail";

const EmailView = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div>Email ID not provided</div>;
  }

  return (
    <div className="space-y-6">
      <EmailDetail emailId={id} />
    </div>
  );
};

export default EmailView;
