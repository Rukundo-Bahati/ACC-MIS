import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, BookOpen, Award, Target } from "lucide-react";

interface Grade {
  id: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  assessmentType: 'exam' | 'assignment' | 'quiz' | 'project';
  assessmentName: string;
  score: number;
  maxScore: number;
  percentage: number;
  letterGrade: string;
  semester: string;
  date: string;
  feedback?: string;
}

const mockGrades: Grade[] = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Introduction to Computer Science',
    courseCode: 'CS101',
    assessmentType: 'exam',
    assessmentName: 'Midterm Exam',
    score: 85,
    maxScore: 100,
    percentage: 85,
    letterGrade: 'B+',
    semester: 'Fall 2024',
    date: '2024-01-25',
    feedback: 'Good understanding of algorithms, work on optimization techniques.'
  },
  {
    id: '2',
    courseId: '1',
    courseName: 'Introduction to Computer Science',
    courseCode: 'CS101',
    assessmentType: 'assignment',
    assessmentName: 'Programming Assignment 1',
    score: 92,
    maxScore: 100,
    percentage: 92,
    letterGrade: 'A-',
    semester: 'Fall 2024',
    date: '2024-01-20',
    feedback: 'Excellent code structure and documentation.'
  },
  {
    id: '3',
    courseId: '2',
    courseName: 'Calculus I',
    courseCode: 'MATH101',
    assessmentType: 'quiz',
    assessmentName: 'Quiz 1: Limits',
    score: 78,
    maxScore: 80,
    percentage: 97.5,
    letterGrade: 'A',
    semester: 'Fall 2024',
    date: '2024-01-18'
  }
];

const Grades = () => {
  const [grades] = useState<Grade[]>(mockGrades);
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const filteredGrades = grades.filter(grade => {
    if (selectedSemester !== "all" && grade.semester !== selectedSemester) return false;
    if (selectedCourse !== "all" && grade.courseId !== selectedCourse) return false;
    return true;
  });

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800';
    if (percentage >= 60) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getAssessmentIcon = (type: string) => {
    switch (type) {
      case 'exam': return <BookOpen className="h-4 w-4" />;
      case 'assignment': return <Target className="h-4 w-4" />;
      case 'quiz': return <Award className="h-4 w-4" />;
      case 'project': return <TrendingUp className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const calculateGPA = () => {
    if (filteredGrades.length === 0) return 0;
    const totalPoints = filteredGrades.reduce((sum, grade) => sum + grade.percentage, 0);
    return (totalPoints / filteredGrades.length / 25).toFixed(2); // Convert to 4.0 scale
  };

  const uniqueCourses = Array.from(new Set(grades.map(g => ({ id: g.courseId, name: g.courseName }))));
  const uniqueSemesters = Array.from(new Set(grades.map(g => g.semester)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Grades</h1>
          <p className="text-muted-foreground">Track your academic performance</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Current GPA</p>
          <p className="text-2xl font-bold text-foreground">{calculateGPA()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Semesters</SelectItem>
            {uniqueSemesters.map(semester => (
              <SelectItem key={semester} value={semester}>{semester}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {uniqueCourses.map(course => (
              <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Assessments</p>
                <p className="text-2xl font-bold text-foreground">{filteredGrades.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

       <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold text-foreground">
                  {filteredGrades.length > 0 
                    ? Math.round(filteredGrades.reduce((sum, g) => sum + g.percentage, 0) / filteredGrades.length)
                    : 0}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

       <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Highest Score</p>
                <p className="text-2xl font-bold text-foreground">
                  {filteredGrades.length > 0 
                    ? Math.max(...filteredGrades.map(g => g.percentage))
                    : 0}%
                </p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current GPA</p>
                <p className="text-2xl font-bold text-foreground">{calculateGPA()}</p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grades List */}
     <Card className="rounded-2xl">
        <CardHeader>
          <h3 className="text-lg font-semibold text-foreground">Grade Details</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredGrades.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No grades found for selected filters</p>
            ) : (
              filteredGrades.map((grade) => (
                <div key={grade.id} className="p-4 border rounded-3xl">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getAssessmentIcon(grade.assessmentType)}
                        <div>
                          <h4 className="font-medium text-foreground">{grade.assessmentName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {grade.courseName} ({grade.courseCode})
                          </p>
                        </div>
                      </div>
                      
                      {grade.feedback && (
                        <p className="text-sm text-muted-foreground mt-2 italic">
                          Feedback: {grade.feedback}
                        </p>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getGradeColor(grade.percentage)}>
                          {grade.letterGrade}
                        </Badge>
                        <div>
                          <p className="text-lg font-bold text-foreground">
                            {grade.score}/{grade.maxScore}
                          </p>
                          <p className="text-sm text-muted-foreground">{grade.percentage}%</p>
                        </div>
                      </div>
                      
                      <Progress value={grade.percentage} className="w-24 mb-1" />
                      <p className="text-xs text-muted-foreground">
                        {new Date(grade.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Grades;