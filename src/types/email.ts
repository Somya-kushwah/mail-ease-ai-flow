
export interface Email {
  id: string;
  subject: string;
  to: string;
  from: string;
  body: string;
  sentAt?: Date;
  scheduledFor?: Date;
  status: 'draft' | 'sent' | 'scheduled';
  read: boolean;
}
