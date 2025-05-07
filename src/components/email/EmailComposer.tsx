
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmail } from "@/contexts/EmailContext";
import { useAI } from "@/contexts/AIContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Wand } from "lucide-react";

interface EmailComposerProps {
  initialTo?: string;
  initialSubject?: string;
  initialBody?: string;
}

export function EmailComposer({ initialTo = "", initialSubject = "", initialBody = "" }: EmailComposerProps) {
  const [to, setTo] = useState(initialTo);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [aiPrompt, setAiPrompt] = useState("");
  
  const { sendEmail, scheduleEmail } = useEmail();
  const { generateSubject, generateBody, isGenerating } = useAI();
  const navigate = useNavigate();

  const handleSendNow = async () => {
    if (!to || !subject || !body) {
      alert("Please fill all fields");
      return;
    }
    
    try {
      await sendEmail({ to, subject, body });
      navigate("/sent");
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  const handleSchedule = async () => {
    if (!to || !subject || !body || !scheduledDate) {
      alert("Please fill all fields and select a date");
      return;
    }
    
    try {
      await scheduleEmail({ to, subject, body }, scheduledDate);
      navigate("/scheduled");
    } catch (error) {
      console.error("Failed to schedule email:", error);
    }
  };

  const handleGenerateSubject = async () => {
    try {
      const generatedSubject = await generateSubject(aiPrompt);
      setSubject(generatedSubject);
    } catch (error) {
      console.error("Failed to generate subject:", error);
    }
  };

  const handleGenerateBody = async () => {
    try {
      const generatedBody = await generateBody(subject, aiPrompt);
      setBody(generatedBody);
    } catch (error) {
      console.error("Failed to generate body:", error);
    }
  };

  return (
    <Card className="p-4 shadow-md">
      <div className="space-y-4">
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="to" className="text-sm font-medium">
            To
          </label>
          <Input
            id="to"
            placeholder="recipient@example.com"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7 px-2"
              onClick={handleGenerateSubject}
              disabled={isGenerating || !aiPrompt}
            >
              <Wand className="h-3 w-3 mr-1" />
              Generate
            </Button>
          </div>
          <Input
            id="subject"
            placeholder="Email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="body" className="text-sm font-medium">
              Body
            </label>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7 px-2"
              onClick={handleGenerateBody}
              disabled={isGenerating || !aiPrompt}
            >
              <Wand className="h-3 w-3 mr-1" />
              Generate
            </Button>
          </div>
          <textarea
            id="body"
            className="w-full min-h-[300px] p-2 border rounded-md"
            placeholder="Write your email here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <div className="bg-accent/50 rounded-md p-4">
          <h3 className="font-medium mb-2 flex items-center">
            <Wand className="h-4 w-4 mr-1" />
            AI Writing Assistant
          </h3>
          <div className="space-y-2">
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Describe what you want to write about..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows={3}
            ></textarea>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={handleGenerateSubject}
                disabled={isGenerating || !aiPrompt}
              >
                Generate Subject
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={handleGenerateBody}
                disabled={isGenerating || !aiPrompt}
              >
                Generate Email
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="send" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="send" onClick={() => setIsScheduling(false)}>
              Send Now
            </TabsTrigger>
            <TabsTrigger value="schedule" onClick={() => setIsScheduling(true)}>
              Schedule
            </TabsTrigger>
          </TabsList>
          <TabsContent value="send" className="pt-4">
            <Button 
              className="w-full" 
              onClick={handleSendNow}
            >
              Send Email
            </Button>
          </TabsContent>
          <TabsContent value="schedule" className="pt-4 space-y-4">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {scheduledDate ? format(scheduledDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={scheduledDate}
                    onSelect={setScheduledDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Clock className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4">
                  <div className="grid gap-2">
                    <div className="text-center text-sm font-medium">
                      Select time (simplified)
                    </div>
                    <div className="flex gap-2">
                      {["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"].map((time) => (
                        <Button
                          key={time}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (scheduledDate) {
                              const newDate = new Date(scheduledDate);
                              // This is simplified - in a real app we would parse the time properly
                              // and set hours/minutes on the date
                              setScheduledDate(newDate);
                            }
                          }}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Button 
              className="w-full" 
              onClick={handleSchedule}
              disabled={!scheduledDate}
            >
              Schedule Email
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}
