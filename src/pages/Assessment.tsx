import  { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertTriangle, Settings, BarChart, Shuffle, BarChart3 } from "lucide-react";
import { 
  Play, 
  Pause, 
  Square, 
  View, 
  Hide, 
  Clock, 
  Shield, 
  Alert, 
  Checkmark, 
  Close,
  User
} from "grommet-icons";
import { mockAssessments, mockQuestions, mockStudentResponses, Assessment, Question, StudentResponse } from "@/data/mockData";

const AssessmentPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("manage");
  const [assessments, setAssessments] = useState<Assessment[]>(mockAssessments);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [isExamMode, setIsExamMode] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState<{ [key: string]: string | number | boolean }>({});
  const [violations, setViolations] = useState<string[]>([]);
  const [isBlurred, setIsBlurred] = useState(false);
  const [showTerminationDialog, setShowTerminationDialog] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [completedExams, setCompletedExams] = useState<Set<string>>(new Set());
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const examContainerRef = useRef<HTMLDivElement>(null);

  // Anti-cheating detection
  useEffect(() => {
    if (!examStarted || !selectedAssessment?.preventCheating) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabVisible(false);
        setViolations(prev => [...prev, `Tab switched at ${new Date().toLocaleTimeString()}`]);
        setIsBlurred(true);
        
        toast({
          title: "Warning",
          description: "Switching tabs is not allowed during the exam",
          variant: "destructive"
        });

        // Auto-terminate after 3 violations
        if (violations.length >= 2) {
          setShowTerminationDialog(true);
        }
      } else {
        setTabVisible(true);
        setTimeout(() => setIsBlurred(false), 2000); // Blur for 2 seconds as penalty
      }
    };

    const handleMouseLeave = () => {
      if (examStarted) {
        setViolations(prev => [...prev, `Mouse left browser at ${new Date().toLocaleTimeString()}`]);
        toast({
          title: "Warning", 
          description: "Moving cursor outside browser is not allowed",
          variant: "destructive"
        });
      }
    };

    const handleContextMenu = (e: Event) => {
      e.preventDefault();
      setViolations(prev => [...prev, `Right-click attempted at ${new Date().toLocaleTimeString()}`]);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+U, etc.
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.key === 'u') ||
          (e.ctrlKey && e.shiftKey && e.key === 'J')) {
        e.preventDefault();
        setViolations(prev => [...prev, `Developer tools attempt at ${new Date().toLocaleTimeString()}`]);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [examStarted, selectedAssessment, violations.length, toast]);

  const calculateScore = useCallback(() => {
    if (!selectedAssessment) return 0;
    
    let correctAnswers = 0;
    selectedAssessment.questions.forEach(question => {
      const answer = studentAnswers[question.id];
      if (answer === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    return Math.round((correctAnswers / selectedAssessment.questions.length) * 100);
  }, [selectedAssessment, studentAnswers]);

  const handleExamSubmit = useCallback(() => {
    setExamStarted(false);
    setIsExamMode(false);
    
    // Mark exam as completed
    if (selectedAssessment) {
      setCompletedExams(prev => new Set([...prev, selectedAssessment.id]));
    }
    
    // Exit fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    const score = calculateScore();
    
    toast({
      title: "Exam Submitted",
      description: `Your score: ${score}%. This exam cannot be retaken.`
    });
  }, [toast, calculateScore, selectedAssessment]);

  // Timer effect
  useEffect(() => {
    if (!examStarted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleExamSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, timeRemaining, handleExamSubmit]);

  const startExam = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setIsExamMode(true);
    setExamStarted(true);
    setTimeRemaining(assessment.duration * 60);
    setCurrentQuestionIndex(0);
    setStudentAnswers({});
    setViolations([]);
    setIsBlurred(false);
    
    // Set shuffled questions once at the start and keep them stable
    const questionsToUse = assessment.shuffleQuestions ? 
      shuffleArray(assessment.questions) : assessment.questions;
    setShuffledQuestions(questionsToUse);
    
    // Enter fullscreen if possible
    if (examContainerRef.current && examContainerRef.current.requestFullscreen) {
      examContainerRef.current.requestFullscreen().catch(console.error);
    }

    toast({
      title: "Exam Started",
      description: "Anti-cheating measures are now active"
    });
  };

  const terminateExam = () => {
    setExamStarted(false);
    setIsExamMode(false);
    setShowTerminationDialog(false);
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }

    toast({
      title: "Exam Terminated",
      description: "The exam was terminated due to violations",
      variant: "destructive"
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const renderQuestion = (question: Question, index: number) => {
    const options = selectedAssessment?.shuffleOptions ? shuffleArray(question.options || []) : question.options;
    
    return (
      <Card key={question.id} className="mb-6 rounded-3xl">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">
              Question {index + 1} ({question.points} points)
            </CardTitle>
            <Badge variant={question.difficulty === 'easy' ? 'default' : question.difficulty === 'medium' ? 'secondary' : 'destructive'}>
              {question.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-lg">{question.questionText}</p>
          
          {question.type === 'multiple-choice' && options && (
            <div className="space-y-3">
              {options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={optionIndex}
                    checked={studentAnswers[question.id] === optionIndex}
                    onChange={(e) => setStudentAnswers(prev => ({
                      ...prev,
                      [question.id]: parseInt(e.target.value)
                    }))}
                    className="w-4 h-4"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
          
          {question.type === 'true-false' && (
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value="true"
                  checked={studentAnswers[question.id] === 'true'}
                  onChange={(e) => setStudentAnswers(prev => ({
                    ...prev,
                    [question.id]: e.target.value
                  }))}
                  className="w-4 h-4"
                />
                <span>True</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value="false"
                  checked={studentAnswers[question.id] === 'false'}
                  onChange={(e) => setStudentAnswers(prev => ({
                    ...prev,
                    [question.id]: e.target.value
                  }))}
                  className="w-4 h-4"
                />
                <span>False</span>
              </label>
            </div>
          )}
          
          {question.type === 'essay' && (
            <div className="space-y-3">
              <Textarea
                placeholder="Enter your answer here..."
                value={(studentAnswers[question.id] as string) || ''}
                onChange={(e) => setStudentAnswers(prev => ({
                  ...prev,
                  [question.id]: e.target.value
                }))}
                rows={8}
                className="min-h-[200px] resize-y"
              />
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Word count: {((studentAnswers[question.id] as string) || '').split(/\s+/).filter(word => word.length > 0).length}</span>
                <span>Characters: {((studentAnswers[question.id] as string) || '').length}</span>
              </div>
            </div>
          )}
          
        </CardContent>
      </Card>
    );
  };

  // Exam Mode Render
  if (isExamMode && selectedAssessment) {
    const questionsToShow = shuffledQuestions.length > 0 ? shuffledQuestions : selectedAssessment.questions;

    return (
      <div 
        ref={examContainerRef}
        className={`min-h-screen bg-background p-6 ${isBlurred ? 'blur-sm' : ''} ${!tabVisible ? 'brightness-50' : ''}`}
      >
        {/* Exam Header */}
        <div className="bg-card border rounded-3xl p-4 mb-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-primary">{selectedAssessment.title}</h1>
              <p className="text-muted-foreground">Duration: {selectedAssessment.duration} minutes</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-2 text-lg font-mono">
                  <Clock color="hsl(var(--primary))" />
                  <span className={timeRemaining < 300 ? 'text-red-500' : 'text-primary'}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Time Remaining</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <Shield color={violations.length > 0 ? "red" : "green"} />
                  <span className={violations.length > 0 ? 'text-red-500' : 'text-green-500'}>
                    {violations.length}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Violations</p>
              </div>
            </div>
          </div>
          
          <Progress 
            value={(selectedAssessment.duration * 60 - timeRemaining) / (selectedAssessment.duration * 60) * 100} 
            className="mt-3" 
          />
        </div>

        {/* Questions */}
        <div className="max-w-4xl mx-auto">
          {questionsToShow.map((question, index) => renderQuestion(question, index))}
          
          <div className="flex justify-end gap-4 mt-8">
            <Button onClick={handleExamSubmit} size="lg" className="px-8">
              Submit Exam
            </Button>
          </div>
        </div>

        {/* Termination Dialog */}
        <AlertDialog open={showTerminationDialog} onOpenChange={setShowTerminationDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Exam Termination Warning
              </AlertDialogTitle>
              <AlertDialogDescription>
                Multiple violations have been detected. The exam will be terminated automatically.
                Violations detected: {violations.length}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={terminateExam}>
                Terminate Exam
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  // Management Interface
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Randomized Assessment System</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage secure examinations with anti-cheating measures
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="manage">Manage Assessments</TabsTrigger>
          <TabsTrigger value="take">Take Assessment</TabsTrigger>
          <TabsTrigger value="results">Results & Analytics</TabsTrigger>
          <TabsTrigger value="security">Security Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Assessment Management
              </CardTitle>
              <CardDescription>Create, edit, and manage assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {assessments.map((assessment) => (
                  <Card key={assessment.id} className="border rounded-2xl">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{assessment.title}</h3>
                          <p className="text-muted-foreground mt-1">{assessment.description}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <Badge variant="outline">{assessment.subject}</Badge>
                            <span className="text-sm text-muted-foreground">
                              <Clock className="inline mr-1 w-4 h-4" />
                              {assessment.duration} minutes
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {assessment.questions.length} questions
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {assessment.totalPoints} points
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {assessment.shuffleQuestions && (
                              <Badge variant="secondary">
                                <Shuffle className="w-3 h-3 mr-1" />
                                Shuffled
                              </Badge>
                            )}
                            {assessment.preventCheating && (
                              <Badge variant="secondary">
                                <Shield className="mr-1 w-3 h-3" />
                                Secure
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={assessment.status === 'published' ? 'default' : 'secondary'}>
                            {assessment.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="take" className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play color="hsl(var(--primary))" />
                Available Assessments
              </CardTitle>
              <CardDescription>Select an assessment to begin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {assessments.filter(a => a.status === 'published').map((assessment) => (
                  <Card key={assessment.id} className="border rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-xl">{assessment.title}</h3>
                          <p className="text-muted-foreground mt-2">{assessment.description}</p>
                          <div className="flex items-center gap-4 mt-4">
                            <span className="text-sm text-muted-foreground">
                              <Clock className="inline mr-1 w-4 h-4" />
                              {assessment.duration} minutes
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {assessment.questions.length} questions
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {assessment.totalPoints} total points
                            </span>
                          </div>
                          {assessment.preventCheating && (
                            <div className="flex items-center gap-2 mt-2 text-amber-600">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-sm">Anti-cheating measures enabled</span>
                            </div>
                          )}
                        </div>
                        <Button 
                          onClick={() => startExam(assessment)}
                          size="lg"
                          className="px-8"
                          disabled={completedExams.has(assessment.id)}
                        >
                          <Play className="mr-2 w-4 h-4" />
                          {completedExams.has(assessment.id) ? 'Completed' : 'Start Exam'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Results & Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Results and analytics will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield color="hsl(var(--primary))" />
                Security Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Security monitoring and violation reports will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssessmentPage;