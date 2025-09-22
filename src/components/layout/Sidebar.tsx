import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Group as Users,
  PersonAdd as UserPlus,
  Message as MessageSquare,
  Description as FileText,
  MenuBook as BookOpen,
  CalendarMonth as Calendar,
  School as GraduationCap,
  BarChart as BarChart3,
  Work as Briefcase,
  AttachMoney as DollarSign,
  HowToReg as UserCheck,
  FileCopy as FileIcon,
  Inventory as Package,
  Security as Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  Person as User,
} from "@mui/icons-material";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
    color: "text-blue-500",
  },
  {
    title: "User Management",
    href: "/dashboard/users",
    icon: Users,
    color: "text-emerald-500",
  },
  {
    title: "Admission & Enrollment",
    href: "/dashboard/admissions",
    icon: UserPlus,
    color: "text-purple-500",
  },
  {
    title: "Communications",
    href: "/dashboard/communications",
    icon: MessageSquare,
    color: "text-orange-500",
  },
  {
    title: "Assessments",
    href: "/dashboard/assessments",
    icon: FileText,
    color: "text-red-500",
  },
];

const studentNavigationItems = [
  {
    title: "Dashboard",
    href: "/student",
    icon: Home,
    color: "text-blue-500",
  },
  {
    title: "Assessments",
    href: "/student/assessment",
    icon: FileText,
    color: "text-red-500",
  },
  {
    title: "Communications",
    href: "/student/communications",
    icon: MessageSquare,
    color: "text-orange-500",
  },
  {
    title: "My Courses",
    href: "/student/courses",
    icon: BookOpen,
    color: "text-indigo-500",
  },
  {
    title: "My Grades",
    href: "/student/grades",
    icon: GraduationCap,
    color: "text-pink-500",
  },
  // {
  //   title: "Attendance",
  //   href: "/student/attendance",
  //   icon: Calendar,
  //   color: "text-teal-500",
  // },
  {
    title: "Profile",
    href: "/student/profile",
    icon: User,
    color: "text-purple-500",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const isStudentDashboard = location.pathname.startsWith("/student");
  const currentNavigationItems = isStudentDashboard
    ? studentNavigationItems
    : navigationItems;

  return (
    <div
      className={cn(
        "h-screen bg-primary text-primary-foreground transition-all duration-300 border-r border-primary-dark/20 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary-dark/20">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">ICC MIS</h2>
              <p className="text-xs text-primary-foreground/80">
                {isStudentDashboard ? "Student Portal" : "Admin Portal"}
              </p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-primary-foreground hover:bg-primary-dark/20 h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="h-[calc(100vh-4rem)] px-3 py-4">
        <nav className="space-y-1">
          {currentNavigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/dashboard" || item.href === "/student"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
                    {
                      "bg-primary-foreground text-primary shadow-md": isActive,
                      "text-primary-foreground/90 hover:bg-primary-dark/20 hover:text-primary-foreground":
                        !isActive,
                    }
                  )
                }
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors duration-200",
                    collapsed ? "mx-auto" : "mr-3",
                    { [item.color]: location.pathname === item.href }
                  )}
                />
                {!collapsed && <span className="truncate">{item.title}</span>}
                {collapsed && (
                  <div className="absolute left-16 bg-card text-card-foreground px-2 py-1 rounded-md text-xs font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    {item.title}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        <Separator className="my-4 bg-primary-dark/20" />

        {/* Settings */}
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group",
              {
                "bg-primary-foreground text-primary shadow-md": isActive,
                "text-primary-foreground/90 hover:bg-primary-dark/20 hover:text-primary-foreground":
                  !isActive,
              }
            )
          }
        >
          <Settings
            className={cn(
              "h-5 w-5 transition-colors duration-200",
              collapsed ? "mx-auto" : "mr-3",
              { "text-blue-500": location.pathname === "/dashboard/settings" }
            )}
          />
          {!collapsed && <span className="truncate">Settings</span>}
          {collapsed && (
            <div className="absolute left-16 bg-card text-card-foreground px-2 py-1 rounded-md text-xs font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
              Settings
            </div>
          )}
        </NavLink>
      </ScrollArea>
    </div>
  );
};

export default Sidebar;
