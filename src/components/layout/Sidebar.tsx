
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Inbox, Send, Calendar, Settings, Mail, MailPlus } from "lucide-react";

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      title: "Compose",
      to: "/compose",
      icon: <MailPlus className="h-5 w-5" />,
    },
    {
      title: "Inbox",
      to: "/inbox",
      icon: <Inbox className="h-5 w-5" />,
    },
    {
      title: "Sent",
      to: "/sent",
      icon: <Send className="h-5 w-5" />,
    },
    {
      title: "Scheduled",
      to: "/scheduled",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Settings",
      to: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  // Get initials from user name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <SidebarContainer>
      <SidebarHeader className="px-4 py-2 border-b">
        <div className="flex items-center">
          <Mail className="h-6 w-6 text-primary mr-2" />
          <h1 className="text-xl font-bold text-foreground">MailEase</h1>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <div className="mb-4 px-4 py-2">
          <Button 
            variant="default" 
            className="w-full flex gap-2 items-center" 
            asChild
          >
            <Link to="/compose">
              <MailPlus className="h-4 w-4" />
              <span>Compose Email</span>
            </Link>
          </Button>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={cn(
                      location.pathname === item.to ? "bg-accent text-accent-foreground" : ""
                    )}
                  >
                    <Link to={item.to} className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-3 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback className="bg-primary text-white">
                {user ? getInitials(user.name) : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm flex-1 truncate">
              <p className="font-medium">{user?.name}</p>
              <p className="text-muted-foreground text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </SidebarContainer>
  );
}
