
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

const Settings = () => {
  const { user } = useAuth();
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      
      <form onSubmit={handleSave}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your account information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    defaultValue={user?.name}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    New Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm New Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Preferences</CardTitle>
              <CardDescription>
                Customize your email sending options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Signature</p>
                  <p className="text-sm text-muted-foreground">
                    Add a signature to all outgoing emails
                  </p>
                </div>
                <Switch defaultChecked id="signature-enabled" />
              </div>
              <Separator />
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Signature Content
                </label>
                <textarea
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  defaultValue={`${user?.name}\nMailEase User\nwww.mailease.example.com`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Connections</CardTitle>
              <CardDescription>
                Connect MailEase with external services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Gmail API</p>
                  <p className="text-sm text-muted-foreground">
                    Connect your Gmail account
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">OpenAI API</p>
                  <p className="text-sm text-muted-foreground">
                    Configure AI-powered email suggestions
                  </p>
                </div>
                <div className="flex space-x-2 items-center">
                  <Input 
                    type="password" 
                    placeholder="API Key" 
                    className="max-w-[200px]" 
                    defaultValue="••••••••••••••••••••••••••"
                  />
                  <Button variant="outline" size="sm">
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        
          <div className="flex justify-end">
            <Button type="submit">Save Settings</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
