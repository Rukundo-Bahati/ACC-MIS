import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  AccessTime as Clock,
  MenuBook as BookOpen,
  Warning as AlertCircle,
  CalendarMonth as Calendar,
  TrendingUp,
} from "@mui/icons-material";
import {
  mockAssessments,
  mockCommunications,
  mockStudentResponses,
} from "@/data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const StudentDashboard = () => {
  const [currentTime] = useState(new Date());

  // Student-specific data
  const studentId = "1"; // Mock current student ID
  const upcomingAssessments = mockAssessments.filter(
    (assessment) =>
      assessment.status === "published" &&
      new Date(assessment.scheduledDate || "") > currentTime
  );

  const recentCommunications = mockCommunications
    .filter((comm) => comm.audience === "all" || comm.audience === "students")
    .slice(0, 3);

  const studentResponses = mockStudentResponses.filter(
    (response) => response.studentId === studentId
  );

  const completedAssessments = studentResponses.filter(
    (response) => response.status === "completed"
  );

  // Performance data
  const performanceData = [
    { subject: "Computer Science", score: 85 },
    { subject: "Mathematics", score: 92 },
    { subject: "Physics", score: 78 },
    { subject: "English", score: 88 },
  ];

  const attendanceData = [
    { name: "Present", value: 85, color: "#10b981" },
    { name: "Absent", value: 15, color: "#ef4444" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "high":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-dm-sans text-foreground">
            Student Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your academic overview.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today</p>
          <p className="text-lg font-semibold text-foreground">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Upcoming Tests
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {upcomingAssessments.length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completed Tests
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {completedAssessments.length}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Average Score
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {studentResponses.length > 0
                    ? Math.round(
                        studentResponses.reduce(
                          (acc, r) => acc + (r.score || 0),
                          0
                        ) / studentResponses.length
                      )
                    : 0}
                  %
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Attendance
                </p>
                <p className="text-2xl font-bold text-foreground">85%</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Assessments */}
        <Card className="rounded-3xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Upcoming Assessments
              </h3>
              <Link to="/dashboard/assessment">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAssessments.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No upcoming assessments
                </p>
              ) : (
                upcomingAssessments.slice(0, 3).map((assessment) => (
                  <div
                    key={assessment.id}
                    className="flex items-center justify-between p-4 border rounded-3xl"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">
                        {assessment.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {assessment.subject}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {assessment.duration} minutes
                        </span>
                        <Badge className={getStatusColor(assessment.status)}>
                          {assessment.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {assessment.scheduledDate
                          ? new Date(
                              assessment.scheduledDate
                            ).toLocaleDateString()
                          : "TBD"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {assessment.scheduledDate
                          ? new Date(
                              assessment.scheduledDate
                            ).toLocaleTimeString()
                          : ""}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Communications */}
        <Card className="rounded-3xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Recent Announcements
              </h3>
              <Link to="/student/communications">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCommunications.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No recent announcements
                </p>
              ) : (
                recentCommunications.map((comm) => (
                  <div key={comm.id} className="p-4 border rounded-3xl">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getPriorityIcon(comm.priority)}
                        <h4 className="font-medium text-foreground">
                          {comm.title}
                        </h4>
                      </div>
                      <Badge className={getStatusColor(comm.priority)}>
                        {comm.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {comm.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(comm.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card className="rounded-3xl">
          <CardHeader>
            <h3 className="text-lg font-semibold text-foreground">
              Subject Performance
            </h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Overview */}
        <Card className="rounded-3xl">
          <CardHeader>
            <h3 className="text-lg font-semibold text-foreground">
              Attendance Overview
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Test Results */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-foreground">
            Recent Test Results
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedAssessments.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No completed assessments yet
              </p>
            ) : (
              completedAssessments.map((response) => {
                const assessment = mockAssessments.find(
                  (a) => a.id === response.assessmentId
                );
                return (
                  <div
                    key={response.id}
                    className="flex items-center justify-between p-4 border rounded-3xl"
                  >
                    <div>
                      <h4 className="font-medium text-foreground">
                        {assessment?.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {assessment?.subject}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Completed on{" "}
                        {new Date(response.endTime!).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-foreground">
                            {response.score}%
                          </p>
                          <Progress value={response.score} className="w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
