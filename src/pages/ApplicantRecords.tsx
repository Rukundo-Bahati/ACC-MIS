import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Search, 
  Download, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  FileText,
  GraduationCap 
} from "lucide-react";
import { CSVLink } from "react-csv";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  program: string;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  submittedAt: string;
  previousEducation: string;
  gpa: string;
  nationality: string;
  city: string;
}

const ApplicantRecords = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [programFilter, setProgramFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Load applications from localStorage and mock data
  useEffect(() => {
    const storedApplications = JSON.parse(localStorage.getItem('applications') || '[]');
    
    // Add mock data if no stored applications
    const mockApplications: Application[] = [
      {
        id: "app-1",
        firstName: "Emily",
        lastName: "Johnson",
        email: "emily.johnson@email.com",
        phone: "+250788123456",
        program: "computer-science",
        status: "pending",
        submittedAt: "2024-01-15T10:30:00Z",
        previousEducation: "high-school",
        gpa: "3.8",
        nationality: "Rwanda",
        city: "Kigali"
      },
      {
        id: "app-2",
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.brown@email.com",
        phone: "+250788987654",
        program: "business-admin",
        status: "approved",
        submittedAt: "2024-01-14T14:20:00Z",
        previousEducation: "diploma",
        gpa: "3.6",
        nationality: "Uganda",
        city: "Kampala"
      },
      {
        id: "app-3",
        firstName: "Sarah",
        lastName: "Davis",
        email: "sarah.davis@email.com",
        phone: "+250788456789",
        program: "engineering",
        status: "under-review",
        submittedAt: "2024-01-13T16:45:00Z",
        previousEducation: "high-school",
        gpa: "4.0",
        nationality: "Kenya",
        city: "Nairobi"
      },
      {
        id: "app-4",
        firstName: "David",
        lastName: "Wilson",
        email: "david.wilson@email.com",
        phone: "+250788654321",
        program: "medicine",
        status: "rejected",
        submittedAt: "2024-01-12T08:15:00Z",
        previousEducation: "bachelor",
        gpa: "3.2",
        nationality: "Tanzania",
        city: "Dar es Salaam"
      }
    ];

    const allApplications = [...mockApplications, ...storedApplications];
    setApplications(allApplications);
    setFilteredApplications(allApplications);
  }, []);

  // Filter applications
  useEffect(() => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone.includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    if (programFilter !== "all") {
      filtered = filtered.filter(app => app.program === programFilter);
    }

    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter, programFilter]);

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { ...app, status: newStatus as Application['status'] }
        : app
    ));
    
    toast({
      title: "Status Updated",
      description: `Application status changed to ${newStatus}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      case 'under-review':
        return <Badge variant="outline"><Eye className="w-3 h-3 mr-1" />Under Review</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getProgramName = (program: string) => {
    const programs: Record<string, string> = {
      'computer-science': 'Computer Science',
      'business-admin': 'Business Administration',
      'engineering': 'Engineering',
      'medicine': 'Medicine',
      'law': 'Law',
      'education': 'Education'
    };
    return programs[program] || program;
  };

  const getEducationLevel = (level: string) => {
    const levels: Record<string, string> = {
      'high-school': 'High School',
      'diploma': 'Diploma',
      'bachelor': "Bachelor's Degree",
      'master': "Master's Degree"
    };
    return levels[level] || level;
  };

  const exportToExcel = () => {
    const excelData = filteredApplications.map(app => ({
      'Application ID': app.id,
      'Full Name': `${app.firstName} ${app.lastName}`,
      'Email': app.email,
      'Phone': app.phone,
      'Program': getProgramName(app.program),
      'Status': app.status,
      'Submitted Date': new Date(app.submittedAt).toLocaleDateString(),
      'Previous Education': getEducationLevel(app.previousEducation),
      'GPA': app.gpa || 'N/A',
      'Nationality': app.nationality,
      'City': app.city
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
    XLSX.writeFile(workbook, "applicant_records.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Applicant Records Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Total Applications: ${filteredApplications.length}`, 20, 40);
    
    const tableData = filteredApplications.map(app => [
      app.id,
      `${app.firstName} ${app.lastName}`,
      app.email,
      getProgramName(app.program),
      app.status,
      new Date(app.submittedAt).toLocaleDateString()
    ]);

    (doc as unknown as { autoTable: (config: unknown) => void }).autoTable({
      head: [['ID', 'Name', 'Email', 'Program', 'Status', 'Submitted']],
      body: tableData,
      startY: 50,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [0, 123, 255] }
    });

    doc.save('applicant_records.pdf');
  };

  const csvData = filteredApplications.map(app => ({
    'Application ID': app.id,
    'Full Name': `${app.firstName} ${app.lastName}`,
    'Email': app.email,
    'Phone': app.phone,
    'Program': getProgramName(app.program),
    'Status': app.status,
    'Submitted Date': new Date(app.submittedAt).toLocaleDateString(),
    'Previous Education': getEducationLevel(app.previousEducation),
    'GPA': app.gpa || 'N/A',
    'Nationality': app.nationality,
    'City': app.city
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Applicant Records</h1>
          <p className="text-muted-foreground">Manage and review student applications</p>
        </div>
      </div>

      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Applications ({filteredApplications.length})
          </CardTitle>
          <CardDescription>
            Review, manage, and export applicant records
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search applicants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="business-admin">Business Admin</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="medicine">Medicine</SelectItem>
                <SelectItem value="law">Law</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Buttons */}
          <div className="flex flex-wrap gap-2">
            <CSVLink data={csvData} filename="applicant_records.csv">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </CSVLink>
            <Button variant="outline" size="sm" onClick={exportToExcel}>
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="outline" size="sm" onClick={exportToPDF}>
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>

          {/* Applications Table */}
          <div className="border rounded-3xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-mono text-sm">
                      {application.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {application.firstName} {application.lastName}
                    </TableCell>
                    <TableCell>{application.email}</TableCell>
                    <TableCell>{getProgramName(application.program)}</TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>
                      {new Date(application.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedApplication(application)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Application Details</DialogTitle>
                              <DialogDescription>
                                Review complete application information
                              </DialogDescription>
                            </DialogHeader>
                            {selectedApplication && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="font-semibold">Full Name</Label>
                                    <p>{selectedApplication.firstName} {selectedApplication.lastName}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Email</Label>
                                    <p>{selectedApplication.email}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Phone</Label>
                                    <p>{selectedApplication.phone}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Nationality</Label>
                                    <p>{selectedApplication.nationality}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">City</Label>
                                    <p>{selectedApplication.city}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Program</Label>
                                    <p>{getProgramName(selectedApplication.program)}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">Previous Education</Label>
                                    <p>{getEducationLevel(selectedApplication.previousEducation)}</p>
                                  </div>
                                  <div>
                                    <Label className="font-semibold">GPA</Label>
                                    <p>{selectedApplication.gpa || 'N/A'}</p>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label className="font-semibold">Change Status</Label>
                                  <Select 
                                    value={selectedApplication.status} 
                                    onValueChange={(value) => handleStatusChange(selectedApplication.id, value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">Pending</SelectItem>
                                      <SelectItem value="under-review">Under Review</SelectItem>
                                      <SelectItem value="approved">Approved</SelectItem>
                                      <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Select 
                          value={application.status} 
                          onValueChange={(value) => handleStatusChange(application.id, value)}
                        >
                          <SelectTrigger className="w-[130px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="under-review">Under Review</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicantRecords;