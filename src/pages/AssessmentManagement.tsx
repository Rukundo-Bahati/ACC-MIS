import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

import {
  Plus,
  BookOpen,
  Clock,
  Users,
  Target,
  Settings,
  Trash2,
  Edit,
  Eye,
} from "lucide-react";
import {
  mockAssessments,
  mockQuestions,
  type Assessment,
  type Question,
} from "@/data/mockData";

const AssessmentManagement = () => {
  const [assessments, setAssessments] = useState<Assessment[]>(mockAssessments);
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [isCreating, setIsCreating] = useState(false);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [selectedAssessment, setSelectedAssessment] =
    useState<Assessment | null>(null);
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editAssessment, setEditAssessment] =
    useState<Partial<Assessment> | null>(null);
  const [filter, setFilter] = useState("all");
  // Handle opening view modal
  const handleViewAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setIsViewing(true);
  };

  // Handle opening edit modal
  const handleEditAssessment = (assessment: Assessment) => {
    setEditAssessment({ ...assessment });
    setSelectedAssessment(assessment);
    setIsEditing(true);
  };

  // Handle saving edited assessment
  const handleSaveEditAssessment = () => {
    if (
      editAssessment &&
      editAssessment.title &&
      editAssessment.subject &&
      editAssessment.duration
    ) {
      setAssessments(
        assessments.map((a) =>
          a.id === editAssessment.id
            ? {
                ...a,
                ...editAssessment,
                totalPoints:
                  editAssessment.questions?.reduce(
                    (sum, q) => sum + q.points,
                    0
                  ) || 0,
              }
            : a
        )
      );
      setIsEditing(false);
      setEditAssessment(null);
      toast({
        title: "Assessment Updated",
        description: "Assessment details have been updated successfully.",
      });
    }
  };

  const [newAssessment, setNewAssessment] = useState<Partial<Assessment>>({
    questions: [],
    status: "draft",
    shuffleQuestions: true,
    shuffleOptions: true,
    timeLimit: true,
    preventCheating: false,
    allowedAttempts: 1,
  });

  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    type: "multiple-choice",
    options: ["", "", "", ""],
    points: 1,
    difficulty: "medium",
  });

  const handleCreateAssessment = () => {
    if (
      newAssessment.title &&
      newAssessment.subject &&
      newAssessment.duration
    ) {
      const assessment: Assessment = {
        id: Date.now().toString(),
        title: newAssessment.title,
        description: newAssessment.description || "",
        subject: newAssessment.subject,
        duration: newAssessment.duration,
        totalPoints:
          newAssessment.questions?.reduce((sum, q) => sum + q.points, 0) || 0,
        questions: newAssessment.questions || [],
        status: newAssessment.status as Assessment["status"],
        createdBy: "Current Admin",
        createdAt: new Date().toISOString(),
        scheduledDate: newAssessment.scheduledDate,
        allowedAttempts: newAssessment.allowedAttempts || 1,
        shuffleQuestions: newAssessment.shuffleQuestions || false,
        shuffleOptions: newAssessment.shuffleOptions || false,
        timeLimit: newAssessment.timeLimit || false,
        preventCheating: newAssessment.preventCheating || false,
      };

      setAssessments([assessment, ...assessments]);
      setNewAssessment({
        questions: [],
        status: "draft",
        shuffleQuestions: true,
        shuffleOptions: true,
        timeLimit: true,
        preventCheating: false,
        allowedAttempts: 1,
      });
      setIsCreating(false);
      toast({
        title: "Assessment Created",
        description: "New assessment has been created successfully.",
      });
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.questionText && newQuestion.subject && newQuestion.topic) {
      const question: Question = {
        id: Date.now().toString(),
        questionText: newQuestion.questionText,
        type: newQuestion.type as Question["type"],
        options:
          newQuestion.type === "multiple-choice"
            ? newQuestion.options?.filter((opt) => opt.trim() !== "")
            : undefined,
        correctAnswer: newQuestion.correctAnswer,
        points: newQuestion.points || 1,
        difficulty: newQuestion.difficulty as Question["difficulty"],
        subject: newQuestion.subject,
        topic: newQuestion.topic,
      };

      setQuestions([question, ...questions]);

      // Add to current assessment if creating one
      if (isCreating) {
        setNewAssessment({
          ...newAssessment,
          questions: [...(newAssessment.questions || []), question],
          totalPoints: (newAssessment.totalPoints || 0) + question.points,
        });
      }

      setNewQuestion({
        type: "multiple-choice",
        options: ["", "", "", ""],
        points: 1,
        difficulty: "medium",
      });
      setIsAddingQuestion(false);

      toast({
        title: "Question Added",
        description: "New question has been added to the question bank.",
      });
    }
  };

  const handleDeleteAssessment = (id: string) => {
    setAssessments(assessments.filter((a) => a.id !== id));
    toast({
      title: "Assessment Deleted",
      description: "Assessment has been deleted successfully.",
    });
  };

  const handlePublishAssessment = (id: string) => {
    setAssessments(
      assessments.map((a) =>
        a.id === id ? { ...a, status: "published" as Assessment["status"] } : a
      )
    );
    toast({
      title: "Assessment Published",
      description: "Assessment is now available to students.",
    });
  };

  const filteredAssessments = assessments.filter((assessment) => {
    if (filter === "all") return true;
    return assessment.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Assessment Management
          </h1>
          <p className="text-muted-foreground">
            Create and manage assessments for students
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddingQuestion} onOpenChange={setIsAddingQuestion}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Question
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Question</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Textarea
                  placeholder="Question text rounded-xl"
                  value={newQuestion.questionText || ""}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      questionText: e.target.value,
                    })
                  }
                  rows={3}
                />

                <div className="grid grid-cols-2 gap-4">
                  <Select
                    value={newQuestion.type}
                    onValueChange={(value) =>
                      setNewQuestion({
                        ...newQuestion,
                        type: value as Question["type"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Question Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple-choice">
                        Multiple Choice
                      </SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="essay">Essay</SelectItem>
                      <SelectItem value="fill-blank">
                        Fill in the Blank
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={newQuestion.difficulty}
                    onValueChange={(value) =>
                      setNewQuestion({
                        ...newQuestion,
                        difficulty: value as Question["difficulty"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Subject"
                    value={newQuestion.subject || ""}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        subject: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Topic"
                    value={newQuestion.topic || ""}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, topic: e.target.value })
                    }
                  />
                </div>

                <Input
                  placeholder="Points"
                  type="number"
                  value={newQuestion.points || ""}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      points: parseInt(e.target.value),
                    })
                  }
                />

                {/* Multiple Choice Options */}
                {newQuestion.type === "multiple-choice" && (
                  <div className="space-y-2">
                    <Label>Answer Options</Label>
                    {newQuestion.options?.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(newQuestion.options || [])];
                            newOptions[index] = e.target.value;
                            setNewQuestion({
                              ...newQuestion,
                              options: newOptions,
                            });
                          }}
                        />
                        <Checkbox
                          checked={newQuestion.correctAnswer === index}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewQuestion({
                                ...newQuestion,
                                correctAnswer: index,
                              });
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* True/False Answer */}
                {newQuestion.type === "true-false" && (
                  <div className="space-y-2">
                    <Label>Correct Answer</Label>
                    <RadioGroup
                      value={newQuestion.correctAnswer as string}
                      onValueChange={(value) =>
                        setNewQuestion({ ...newQuestion, correctAnswer: value })
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="true-answer" />
                        <Label htmlFor="true-answer">True</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="false-answer" />
                        <Label htmlFor="false-answer">False</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
              <Button onClick={handleAddQuestion} className="w-full">
                Add Question
              </Button>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Assessment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Assessment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Assessment Title"
                    value={newAssessment.title || ""}
                    onChange={(e) =>
                      setNewAssessment({
                        ...newAssessment,
                        title: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Subject"
                    value={newAssessment.subject || ""}
                    onChange={(e) =>
                      setNewAssessment({
                        ...newAssessment,
                        subject: e.target.value,
                      })
                    }
                  />
                </div>

                <Textarea
                  placeholder="Description"
                  value={newAssessment.description || ""}
                  onChange={(e) =>
                    setNewAssessment({
                      ...newAssessment,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />

                <div className="grid grid-cols-3 gap-4">
                  <Input
                    placeholder="Duration (minutes)"
                    type="number"
                    value={newAssessment.duration || ""}
                    onChange={(e) =>
                      setNewAssessment({
                        ...newAssessment,
                        duration: parseInt(e.target.value),
                      })
                    }
                  />
                  <Input
                    placeholder="Allowed Attempts"
                    type="number"
                    value={newAssessment.allowedAttempts || ""}
                    onChange={(e) =>
                      setNewAssessment({
                        ...newAssessment,
                        allowedAttempts: parseInt(e.target.value),
                      })
                    }
                  />
                  <Input
                    placeholder="Scheduled Date"
                    type="datetime-local"
                    value={newAssessment.scheduledDate || ""}
                    onChange={(e) =>
                      setNewAssessment({
                        ...newAssessment,
                        scheduledDate: e.target.value,
                      })
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Assessment Settings
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="shuffle-questions"
                        checked={newAssessment.shuffleQuestions}
                        onCheckedChange={(checked) =>
                          setNewAssessment({
                            ...newAssessment,
                            shuffleQuestions: checked as boolean,
                          })
                        }
                      />
                      <Label htmlFor="shuffle-questions">
                        Shuffle Questions
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="shuffle-options"
                        checked={newAssessment.shuffleOptions}
                        onCheckedChange={(checked) =>
                          setNewAssessment({
                            ...newAssessment,
                            shuffleOptions: checked as boolean,
                          })
                        }
                      />
                      <Label htmlFor="shuffle-options">
                        Shuffle Answer Options
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="time-limit"
                        checked={newAssessment.timeLimit}
                        onCheckedChange={(checked) =>
                          setNewAssessment({
                            ...newAssessment,
                            timeLimit: checked as boolean,
                          })
                        }
                      />
                      <Label htmlFor="time-limit">Enable Time Limit</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="prevent-cheating"
                        checked={newAssessment.preventCheating}
                        onCheckedChange={(checked) =>
                          setNewAssessment({
                            ...newAssessment,
                            preventCheating: checked as boolean,
                          })
                        }
                      />
                      <Label htmlFor="prevent-cheating">
                        Enable Proctoring
                      </Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">
                      Questions ({newAssessment.questions?.length || 0})
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Total Points: {newAssessment.totalPoints || 0}
                    </p>
                  </div>

                  <div className="max-h-40 overflow-y-auto space-y-2 border rounded p-3">
                    {newAssessment.questions?.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">
                        No questions added yet
                      </p>
                    ) : (
                      newAssessment.questions?.map((question, index) => (
                        <div
                          key={question.id}
                          className="flex items-center justify-between p-2 bg-muted rounded"
                        >
                          <div>
                            <p className="font-medium text-sm">
                              {question.questionText}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {question.type} • {question.points} points •{" "}
                              {question.difficulty}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const updatedQuestions =
                                newAssessment.questions?.filter(
                                  (_, i) => i !== index
                                ) || [];
                              setNewAssessment({
                                ...newAssessment,
                                questions: updatedQuestions,
                                totalPoints: updatedQuestions.reduce(
                                  (sum, q) => sum + q.points,
                                  0
                                ),
                              });
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">
                      Add Questions from Question Bank
                    </Label>
                    <Select
                      onValueChange={(questionId) => {
                        const question = questions.find(
                          (q) => q.id === questionId
                        );
                        if (
                          question &&
                          !newAssessment.questions?.some(
                            (q) => q.id === questionId
                          )
                        ) {
                          setNewAssessment({
                            ...newAssessment,
                            questions: [
                              ...(newAssessment.questions || []),
                              question,
                            ],
                            totalPoints:
                              (newAssessment.totalPoints || 0) +
                              question.points,
                          });
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a question to add" />
                      </SelectTrigger>
                      <SelectContent>
                        {questions
                          .filter(
                            (q) =>
                              !newAssessment.questions?.some(
                                (aq) => aq.id === q.id
                              )
                          )
                          .map((question) => (
                            <SelectItem key={question.id} value={question.id}>
                              {question.questionText} ({question.points} pts)
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Button onClick={handleCreateAssessment} className="w-full">
                Create Assessment
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Assessments
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {assessments.length}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Published
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {assessments.filter((a) => a.status === "published").length}
                </p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Questions
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {questions.length}
                </p>
              </div>
              <Settings className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg Duration
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {assessments.length > 0
                    ? Math.round(
                        assessments.reduce((sum, a) => sum + a.duration, 0) /
                          assessments.length
                      )
                    : 0}{" "}
                  min
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assessments</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Assessments List */}
      <div className="space-y-4">
        {filteredAssessments.length === 0 ? (
          <Card className="rounded-2xl">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No assessments found</p>
            </CardContent>
          </Card>
        ) : (
          filteredAssessments.map((assessment) => (
            <Card key={assessment.id} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">
                        {assessment.title}
                      </h3>
                      <Badge className={getStatusColor(assessment.status)}>
                        {assessment.status}
                      </Badge>
                      {assessment.preventCheating && (
                        <Badge variant="outline">Proctored</Badge>
                      )}
                    </div>

                    <p className="text-muted-foreground mb-3">
                      {assessment.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Subject</p>
                        <p className="font-medium text-foreground">
                          {assessment.subject}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium text-foreground">
                          {assessment.duration} minutes
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Questions</p>
                        <p className="font-medium text-foreground">
                          {assessment.questions.length}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Points</p>
                        <p className="font-medium text-foreground">
                          {assessment.totalPoints}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 text-sm text-muted-foreground">
                      Created by {assessment.createdBy} •{" "}
                      {new Date(assessment.createdAt).toLocaleDateString()}
                      {assessment.scheduledDate && (
                        <span>
                          {" "}
                          • Scheduled:{" "}
                          {new Date(
                            assessment.scheduledDate
                          ).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewAssessment(assessment)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditAssessment(assessment)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {assessment.status === "draft" && (
                      <Button
                        size="sm"
                        onClick={() => handlePublishAssessment(assessment.id)}
                      >
                        Publish
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAssessment(assessment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* View Assessment Modal */}
                  <Dialog open={isViewing} onOpenChange={setIsViewing}>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Assessment Details</DialogTitle>
                      </DialogHeader>
                      {selectedAssessment && (
                        <div className="space-y-2">
                          <h2 className="text-xl font-bold">
                            {selectedAssessment.title}
                          </h2>
                          <p>{selectedAssessment.description}</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <b>Subject:</b> {selectedAssessment.subject}
                            </div>
                            <div>
                              <b>Duration:</b> {selectedAssessment.duration} min
                            </div>
                            <div>
                              <b>Status:</b> {selectedAssessment.status}
                            </div>
                            <div>
                              <b>Created By:</b> {selectedAssessment.createdBy}
                            </div>
                            <div>
                              <b>Scheduled:</b>{" "}
                              {selectedAssessment.scheduledDate
                                ? new Date(
                                    selectedAssessment.scheduledDate
                                  ).toLocaleString()
                                : "N/A"}
                            </div>
                            <div>
                              <b>Allowed Attempts:</b>{" "}
                              {selectedAssessment.allowedAttempts}
                            </div>
                          </div>
                          <div>
                            <b>Questions:</b>
                            <ul className="list-disc ml-6">
                              {selectedAssessment.questions.map((q) => (
                                <li key={q.id}>
                                  <span className="font-medium">
                                    {q.questionText}
                                  </span>{" "}
                                  <span className="text-xs text-muted-foreground">
                                    ({q.type}, {q.points} pts, {q.difficulty})
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>

                  {/* Edit Assessment Modal */}
                  <Dialog open={isEditing} onOpenChange={setIsEditing}>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Assessment</DialogTitle>
                      </DialogHeader>
                      {editAssessment && (
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              placeholder="Assessment Title"
                              value={editAssessment.title || ""}
                              onChange={(e) =>
                                setEditAssessment({
                                  ...editAssessment,
                                  title: e.target.value,
                                })
                              }
                            />
                            <Input
                              placeholder="Subject"
                              value={editAssessment.subject || ""}
                              onChange={(e) =>
                                setEditAssessment({
                                  ...editAssessment,
                                  subject: e.target.value,
                                })
                              }
                            />
                          </div>
                          <Textarea
                            placeholder="Description"
                            value={editAssessment.description || ""}
                            onChange={(e) =>
                              setEditAssessment({
                                ...editAssessment,
                                description: e.target.value,
                              })
                            }
                            rows={3}
                          />
                          <div className="grid grid-cols-3 gap-4">
                            <Input
                              placeholder="Duration (minutes)"
                              type="number"
                              value={editAssessment.duration || ""}
                              onChange={(e) =>
                                setEditAssessment({
                                  ...editAssessment,
                                  duration: parseInt(e.target.value),
                                })
                              }
                            />
                            <Input
                              placeholder="Allowed Attempts"
                              type="number"
                              value={editAssessment.allowedAttempts || ""}
                              onChange={(e) =>
                                setEditAssessment({
                                  ...editAssessment,
                                  allowedAttempts: parseInt(e.target.value),
                                })
                              }
                            />
                            <Input
                              placeholder="Scheduled Date"
                              type="datetime-local"
                              value={editAssessment.scheduledDate || ""}
                              onChange={(e) =>
                                setEditAssessment({
                                  ...editAssessment,
                                  scheduledDate: e.target.value,
                                })
                              }
                            />
                          </div>
                          <Separator />
                          <div className="space-y-3">
                            <Label className="text-base font-semibold">
                              Assessment Settings
                            </Label>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="edit-shuffle-questions"
                                  checked={editAssessment.shuffleQuestions}
                                  onCheckedChange={(checked) =>
                                    setEditAssessment({
                                      ...editAssessment,
                                      shuffleQuestions: checked as boolean,
                                    })
                                  }
                                />
                                <Label htmlFor="edit-shuffle-questions">
                                  Shuffle Questions
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="edit-shuffle-options"
                                  checked={editAssessment.shuffleOptions}
                                  onCheckedChange={(checked) =>
                                    setEditAssessment({
                                      ...editAssessment,
                                      shuffleOptions: checked as boolean,
                                    })
                                  }
                                />
                                <Label htmlFor="edit-shuffle-options">
                                  Shuffle Answer Options
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="edit-time-limit"
                                  checked={editAssessment.timeLimit}
                                  onCheckedChange={(checked) =>
                                    setEditAssessment({
                                      ...editAssessment,
                                      timeLimit: checked as boolean,
                                    })
                                  }
                                />
                                <Label htmlFor="edit-time-limit">
                                  Enable Time Limit
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="edit-prevent-cheating"
                                  checked={editAssessment.preventCheating}
                                  onCheckedChange={(checked) =>
                                    setEditAssessment({
                                      ...editAssessment,
                                      preventCheating: checked as boolean,
                                    })
                                  }
                                />
                                <Label htmlFor="edit-prevent-cheating">
                                  Enable Proctoring
                                </Label>
                              </div>
                            </div>
                          </div>
                          <Separator />
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label className="text-base font-semibold">
                                Questions (
                                {editAssessment.questions?.length || 0})
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Total Points:{" "}
                                {editAssessment.questions?.reduce(
                                  (sum, q) => sum + q.points,
                                  0
                                ) || 0}
                              </p>
                            </div>
                            <div className="max-h-40 overflow-y-auto space-y-2 border rounded p-3">
                              {editAssessment.questions?.length === 0 ? (
                                <p className="text-center text-muted-foreground py-4">
                                  No questions added yet
                                </p>
                              ) : (
                                editAssessment.questions?.map(
                                  (question, index) => (
                                    <div
                                      key={question.id}
                                      className="flex items-center justify-between p-2 bg-muted rounded"
                                    >
                                      <div>
                                        <p className="font-medium text-sm">
                                          {question.questionText}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {question.type} • {question.points}{" "}
                                          points • {question.difficulty}
                                        </p>
                                      </div>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          const updatedQuestions =
                                            editAssessment.questions?.filter(
                                              (_, i) => i !== index
                                            ) || [];
                                          setEditAssessment({
                                            ...editAssessment,
                                            questions: updatedQuestions,
                                          });
                                        }}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  )
                                )
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm">
                                Add Questions from Question Bank
                              </Label>
                              <Select
                                onValueChange={(questionId) => {
                                  const question = questions.find(
                                    (q) => q.id === questionId
                                  );
                                  if (
                                    question &&
                                    !editAssessment.questions?.some(
                                      (q) => q.id === questionId
                                    )
                                  ) {
                                    setEditAssessment({
                                      ...editAssessment,
                                      questions: [
                                        ...(editAssessment.questions || []),
                                        question,
                                      ],
                                    });
                                  }
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a question to add" />
                                </SelectTrigger>
                                <SelectContent>
                                  {questions
                                    .filter(
                                      (q) =>
                                        !editAssessment.questions?.some(
                                          (aq) => aq.id === q.id
                                        )
                                    )
                                    .map((question) => (
                                      <SelectItem
                                        key={question.id}
                                        value={question.id}
                                      >
                                        {question.questionText} (
                                        {question.points} pts)
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button
                            onClick={handleSaveEditAssessment}
                            className="w-full"
                          >
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AssessmentManagement;
