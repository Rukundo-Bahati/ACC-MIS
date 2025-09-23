import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import AssessmentManagement from "./pages/AssessmentManagement";
import StudentDashboard from "./pages/StudentDashboard";
import ApplicationForm from "./pages/ApplicationForm";
import UserManagement from "./pages/UserManagement";
import ApplicantRecords from "./pages/ApplicantRecords";
import Communications from "./pages/Communications";
import Support from "./pages/Support";
import MainLayout from "./components/layout/MainLayout";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";
import Grades from "./pages/Grades";
// import LandingPage from "./pages/LandingPage";
import ICCLanding from "./pages/ICCLanding";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<ICCLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/application" element={<ApplicationForm />} />
          <Route path="/support" element={<Support />} />
          <Route path="/dashboard" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="admissions" element={<ApplicantRecords />} />
            <Route path="communications" element={<Communications />} />
            <Route path="assessments" element={<AssessmentManagement />} />
            {/* <Route path="courses" element={<div>Courses</div>} />
            <Route path="attendance" element={<div>Attendance</div>} />
            <Route path="records" element={<div>Student Records</div>} />
            <Route path="analytics" element={<div>Analytics</div>} />
            <Route path="hr" element={<div>Human Resources</div>} />
            <Route path="finance" element={<div>Finance</div>} />
            <Route path="alumni" element={<div>Alumni</div>} />
            <Route path="contracts" element={<div>Contracts</div>} />
            <Route path="inventory" element={<div>Inventory</div>} />
            <Route path="governance" element={<div>Governance</div>} /> */}
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/student" element={<MainLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="assessment" element={<Assessment />} />
            <Route path="communications" element={<Communications />} />
            <Route path="courses" element={<Courses />} />
            <Route path="grades" element={<Grades />} />
            <Route path="attendance" element={<div>My Attendance</div>} />
            <Route path="profile" element={<Profile />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
