import React from "react";
import { Link } from "react-router-dom";
import {
  NotificationsOutlined as Bell,
  SearchOutlined as Search,
  PersonOutline as User,
  LogoutOutlined as LogOut,
  SettingsOutlined as Settings,
  HelpOutline as HelpCircle,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface TopHeaderProps {
  userRole?: string;
  userName?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({
  userRole = "Administrator",
  userName = "John Smith",
}) => {
  return (
    <header className="bg-card border-b border-border/50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search students, courses, records..."
              className="pl-10 bg-secondary/50 border-border/50 focus:bg-background transition-colors"
            />
          </div>
        </div>

        {/* Right Section - Notifications & User */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Badge variant="secondary" className="text-xs">
                  3 new
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="flex-col items-start p-4 space-y-1">
                  <div className="font-medium text-sm">
                    New student enrollment
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Sarah Johnson has completed her enrollment for Computer
                    Science
                  </div>
                  <div className="text-xs text-muted-foreground">
                    2 minutes ago
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex-col items-start p-4 space-y-1">
                  <div className="font-medium text-sm">
                    Assignment submission
                  </div>
                  <div className="text-xs text-muted-foreground">
                    25 students submitted their Database Design assignment
                  </div>
                  <div className="text-xs text-muted-foreground">
                    15 minutes ago
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex-col items-start p-4 space-y-1">
                  <div className="font-medium text-sm">Payment received</div>
                  <div className="text-xs text-muted-foreground">
                    Tuition payment of $2,500 received from Michael Brown
                  </div>
                  <div className="text-xs text-muted-foreground">
                    1 hour ago
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center">
                <a
                  href="/dashboard/communications"
                  className="text-sm text-primary"
                >
                  View all notifications
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-3 px-3 py-2 h-auto"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt={userName} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="text-sm font-medium text-foreground">
                    {userName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {userRole}
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  to="/student/profile"
                  className="flex items-center w-full"
                >
                  <User className="mr-2 h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="flex items-center w-full">
                  <Settings className="mr-2 h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-5 w-5" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-5 w-5" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
