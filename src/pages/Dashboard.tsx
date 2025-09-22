import React from "react";
import {
  Group as Users,
  PersonAdd as UserPlus,
  School as GraduationCap,
  AttachMoney as DollarSign,
  TrendingUp,
  CalendarMonth as Calendar,
  MenuBook as BookOpen,
  Warning as AlertCircle,
  CheckCircle,
  AccessTime as Clock,
  EmojiEvents as Award,
  TrackChanges as Target,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12%",
      icon: GraduationCap,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Faculty",
      value: "186",
      change: "+3%",
      icon: Users,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      title: "New Enrollments",
      value: "284",
      change: "+18%",
      icon: UserPlus,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Revenue (Monthly)",
      value: "$847,290",
      change: "+7%",
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "enrollment",
      title: "New Student Enrollment",
      description: "Sarah Johnson enrolled in Computer Science",
      time: "2 minutes ago",
      icon: UserPlus,
      color: "text-blue-500",
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Received",
      description: "Tuition payment of $2,500 from Michael Brown",
      time: "15 minutes ago",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      id: 3,
      type: "assignment",
      title: "Assignment Submission",
      description: "Database Design assignment submitted by 25 students",
      time: "1 hour ago",
      icon: BookOpen,
      color: "text-purple-500",
    },
    {
      id: 4,
      type: "alert",
      title: "System Maintenance",
      description: "Scheduled maintenance tonight from 11 PM to 2 AM",
      time: "2 hours ago",
      icon: AlertCircle,
      color: "text-orange-500",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Final Examinations",
      date: "Dec 15-22, 2024",
      type: "Academic",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Spring Semester Registration",
      date: "Jan 8-15, 2025",
      type: "Registration",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Faculty Development Workshop",
      date: "Dec 20, 2024",
      type: "Professional",
      status: "upcoming",
    },
  ];

  const departmentPerformance = [
    { name: "Computer Science", students: 485, completion: 92 },
    { name: "Business Administration", students: 523, completion: 88 },
    { name: "Engineering", students: 412, completion: 90 },
    { name: "Liberal Arts", students: 367, completion: 85 },
    { name: "Health Sciences", students: 298, completion: 94 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening at International Covenant
            College.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="px-3 py-1">
            <Clock className="w-3 h-3 mr-1" />
            Real-time data
          </Badge>
          <Button variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover-lift rounded-3xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground mt-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600 font-medium mt-1">
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-3xl ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest events and updates from the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-3 rounded-3xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className={`p-2 rounded-3xl bg-secondary`}>
                      <Icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="outline" className="w-full">
                View All Activities
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Important dates and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-3xl border border-border hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-foreground">
                      {event.title}
                    </h4>
                    <Badge variant="secondary" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="outline" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                View Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Department Performance
          </CardTitle>
          <CardDescription>
            Student enrollment and completion rates by department
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {departmentPerformance.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">
                      {dept.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {dept.students} students enrolled
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {dept.completion}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      completion rate
                    </p>
                  </div>
                </div>
                <Progress value={dept.completion} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
