import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Plus, BookOpen, Users, Clock, Calendar } from "lucide-react";
import { useLocation } from "react-router-dom";

interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  instructor: string;
  credits: number;
  semester: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  status: 'active' | 'inactive' | 'completed';
}

const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Computer Science',
    code: 'CS101',
    description: 'Fundamental concepts of computer science including programming, algorithms, and data structures.',
    instructor: 'Prof. Jane Smith',
    credits: 4,
    semester: 'Fall 2024',
    schedule: 'MWF 10:00-11:00 AM',
    capacity: 30,
    enrolled: 25,
    status: 'active'
  },
  {
    id: '2',
    name: 'Calculus I',
    code: 'MATH101',
    description: 'Introduction to differential and integral calculus.',
    instructor: 'Prof. John Doe',
    credits: 3,
    semester: 'Fall 2024',
    schedule: 'TTh 2:00-3:30 PM',
    capacity: 40,
    enrolled: 35,
    status: 'active'
  }
];

const Courses = () => {
  const location = useLocation();
  const isStudentView = location.pathname.includes('/student');
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [isCreating, setIsCreating] = useState(false);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({});

  const handleCreateCourse = () => {
    if (newCourse.name && newCourse.code && newCourse.instructor) {
      const course: Course = {
        id: Date.now().toString(),
        name: newCourse.name,
        code: newCourse.code,
        description: newCourse.description || '',
        instructor: newCourse.instructor,
        credits: newCourse.credits || 3,
        semester: newCourse.semester || 'Fall 2024',
        schedule: newCourse.schedule || 'TBD',
        capacity: newCourse.capacity || 30,
        enrolled: 0,
        status: 'active'
      };
      
      setCourses([...courses, course]);
      setNewCourse({});
      setIsCreating(false);
      toast({
        title: "Course Created",
        description: "New course has been added successfully."
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isStudentView ? "My Courses" : "Course Management"}
          </h1>
          <p className="text-muted-foreground">
            {isStudentView ? "View your enrolled courses" : "Manage courses and enrollment"}
          </p>
        </div>
        {!isStudentView && (
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <Input
                  placeholder="Course Name"
                  value={newCourse.name || ''}
                  onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                />
                <Input
                  placeholder="Course Code"
                  value={newCourse.code || ''}
                  onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                />
                <Input
                  placeholder="Instructor"
                  value={newCourse.instructor || ''}
                  onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                />
                <Input
                  placeholder="Credits"
                  type="number"
                  value={newCourse.credits || ''}
                  onChange={(e) => setNewCourse({...newCourse, credits: parseInt(e.target.value)})}
                />
                <Input
                  placeholder="Schedule"
                  value={newCourse.schedule || ''}
                  onChange={(e) => setNewCourse({...newCourse, schedule: e.target.value})}
                />
                <Input
                  placeholder="Capacity"
                  type="number"
                  value={newCourse.capacity || ''}
                  onChange={(e) => setNewCourse({...newCourse, capacity: parseInt(e.target.value)})}
                />
              </div>
              <Button onClick={handleCreateCourse} className="w-full">
                Create Course
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="rounded-2xl">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{course.name}</h3>
                  <p className="text-sm text-muted-foreground">{course.code}</p>
                </div>
                <Badge className={getStatusColor(course.status)}>
                  {course.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Instructor: {course.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.credits} Credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.semester}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.enrolled}/{course.capacity} Students</span>
                </div>
              </div>

              <div className="mt-4">
                {isStudentView ? (
                  <Button variant="outline" className="w-full">
                    View Course Details
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;