import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, User, Mail, Phone, MapPin, Upload, ChevronLeft, ChevronRight, FileText, Languages } from "lucide-react";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    address: "",
    city: "",
    isInternationalStudent: false,
    
    // Academic Information
    program: "",
    previousEducation: "",
    previousSchool: "",
    graduationYear: "",
    gpa: "",
    
    // Required Documents
    seniorSixCertificate: null as File | null,
    nationalIdOrPassport: null as File | null,
    criminalRecord: null as File | null,
    passportPhotos: [] as File[],
    
    // Legacy Documents (keeping for compatibility)
    transcript: null as File | null,
    certificates: null as File | null,
    idDocument: null as File | null,
    
    // English Proficiency
    englishProficiency: "",
    englishTestScore: "",
    
    // Additional Information
    personalStatement: "",
    agreeToTerms: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleMultipleFileChange = (field: string, files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({ ...prev, [field]: fileArray }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation checks
    if (!formData.agreeToTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    if (!formData.seniorSixCertificate) {
      toast({
        title: "Error",
        description: "Please upload your Senior Six Certificate (notarized copy)",
        variant: "destructive",
      });
      return;
    }

    if (!formData.nationalIdOrPassport) {
      toast({
        title: "Error",
        description: "Please upload a copy of your National ID or Passport",
        variant: "destructive",
      });
      return;
    }

    if (formData.isInternationalStudent && !formData.criminalRecord) {
      toast({
        title: "Error",
        description: "Criminal Record is required for international students",
        variant: "destructive",
      });
      return;
    }

    if (formData.passportPhotos.length !== 2) {
      toast({
        title: "Error",
        description: "Please upload exactly 2 passport-size photos",
        variant: "destructive",
      });
      return;
    }

    if (!formData.englishProficiency) {
      toast({
        title: "Error",
        description: "Please select your English proficiency level",
        variant: "destructive",
      });
      return;
    }

    // Simulate application submission
    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully. You will receive a confirmation email shortly.",
    });

    // Store application data (mock)
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const newApplication = {
      id: Date.now().toString(),
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };
    applications.push(newApplication);
    localStorage.setItem('applications', JSON.stringify(applications));

    navigate('/');
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: // Personal Information
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
            !formData.dateOfBirth || !formData.gender || !formData.nationality || !formData.address || !formData.city) {
          toast({
            title: "Error",
            description: "Please fill in all required personal information fields",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 2: // Academic Information
        if (!formData.program || !formData.previousEducation || !formData.previousSchool || !formData.graduationYear) {
          toast({
            title: "Error",
            description: "Please fill in all required academic information fields",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 3: // Required Documents
        if (!formData.seniorSixCertificate || !formData.nationalIdOrPassport || formData.passportPhotos.length !== 2) {
          toast({
            title: "Error",
            description: "Please upload all required documents",
            variant: "destructive",
          });
          return false;
        }
        if (formData.isInternationalStudent && !formData.criminalRecord) {
          toast({
            title: "Error",
            description: "Criminal Record is required for international students",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 4: // English Proficiency
        if (!formData.englishProficiency) {
          toast({
            title: "Error",
            description: "Please select your English proficiency level",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Personal Information";
      case 2: return "Academic Information";
      case 3: return "Required Documents";
      case 4: return "English Proficiency";
      case 5: return "Personal Statement";
      default: return "";
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 1: return <User className="w-5 h-5" />;
      case 2: return <GraduationCap className="w-5 h-5" />;
      case 3: return <Upload className="w-5 h-5" />;
      case 4: return <Languages className="w-5 h-5" />;
      case 5: return <FileText className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-lg rounded-3xl">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-primary rounded-lg flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold text-foreground">
              International Covenant College
            </CardTitle>
            <CardDescription className="text-lg">
              Application Form - Academic Year 2025/2026
            </CardDescription>
            
            {/* Progress Indicator */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-muted rounded-lg h-2">
                <div 
                  className="bg-primary h-2 rounded-lg transition-all duration-300" 
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Current Step Title */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="text-primary">
                {getStepIcon()}
              </div>
              <h3 className="text-xl font-semibold text-foreground">{getStepTitle()}</h3>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) => {
                        handleInputChange('nationality', e.target.value);
                        // Auto-detect if international student
                        handleInputChange('isInternationalStudent', e.target.value.toLowerCase() !== 'rwandan');
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Textarea
                        id="address"
                        className="pl-10"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
   
                  </div>
                </div>
              </div>
              )}

              {/* Step 2: Academic Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-border pb-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">Academic Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="program">Desired Program *</Label>
                    <Select onValueChange={(value) => handleInputChange('program', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="business-admin">Business Administration</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="medicine">Medicine</SelectItem>
                        <SelectItem value="law">Law</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="previousEducation">Previous Education Level *</Label>
                    <Select onValueChange={(value) => handleInputChange('previousEducation', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                        <SelectItem value="master">Master's Degree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="previousSchool">Previous School/Institution *</Label>
                    <Input
                      id="previousSchool"
                      value={formData.previousSchool}
                      onChange={(e) => handleInputChange('previousSchool', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year *</Label>
                    <Input
                      id="graduationYear"
                      type="number"
                      min="1990"
                      max="2025"
                      value={formData.graduationYear}
                      onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gpa">GPA/Grade Average</Label>
                    <Input
                      id="gpa"
                      type="number"
                      step="0.1"
                      min="0"
                      max="4"
                      value={formData.gpa}
                      onChange={(e) => handleInputChange('gpa', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              )}

              {/* Step 3: Required Documents */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <Upload className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold">Required Documents</h3>
                  </div>
                
                <div className="space-y-6">
                  {/* Senior Six Certificate */}
                  <div className="space-y-2">
                    <Label htmlFor="seniorSixCertificate">
                      Senior Six Certificate (Notarized Copy) *
                      {formData.isInternationalStudent && (
                        <span className="text-sm text-muted-foreground block">
                          For international students: An equivalence certificate granted by Rwanda Education Board must be submitted
                        </span>
                      )}
                    </Label>
                    <Input
                      id="seniorSixCertificate"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('seniorSixCertificate', e.target.files?.[0] || null)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Please upload a notarized copy of your Senior Six Certificate
                    </p>
                  </div>

                  {/* National ID or Passport */}
                  <div className="space-y-2">
                    <Label htmlFor="nationalIdOrPassport">Copy of National ID or Passport *</Label>
                    <Input
                      id="nationalIdOrPassport"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange('nationalIdOrPassport', e.target.files?.[0] || null)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload a clear copy of your National ID or Passport
                    </p>
                  </div>

                  {/* Criminal Record - Only for International Students */}
                  {formData.isInternationalStudent && (
                    <div className="space-y-2">
                      <Label htmlFor="criminalRecord">Criminal Record (International Students Only) *</Label>
                      <Input
                        id="criminalRecord"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange('criminalRecord', e.target.files?.[0] || null)}
                        required={formData.isInternationalStudent}
                      />
                      <p className="text-xs text-muted-foreground">
                        Required for international students only
                      </p>
                    </div>
                  )}

                  {/* Passport-size Photos */}
                  <div className="space-y-2">
                    <Label htmlFor="passportPhotos">Passport-size Photos (2 photos) *</Label>
                    <Input
                      id="passportPhotos"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleMultipleFileChange('passportPhotos', e.target.files)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Please upload exactly 2 passport-size photos (JPEG or PNG format)
                    </p>
                    {formData.passportPhotos.length > 0 && (
                      <p className="text-xs text-primary">
                        {formData.passportPhotos.length} photo(s) selected
                      </p>
                    )}
                  </div>
                </div>
              </div>
              )}

              {/* Step 4: English Proficiency */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <Languages className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold">English Proficiency</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="englishProficiency">English Proficiency Level *</Label>
                      <Select onValueChange={(value) => handleInputChange('englishProficiency', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your English proficiency level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="native">Native Speaker</SelectItem>
                          <SelectItem value="fluent">Fluent</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="basic">Basic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="englishTestScore">English Test Score (if applicable)</Label>
                      <Input
                        id="englishTestScore"
                        placeholder="e.g., IELTS 7.0, TOEFL 90, etc."
                        value={formData.englishTestScore}
                        onChange={(e) => handleInputChange('englishTestScore', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        If you have taken any English proficiency tests (IELTS, TOEFL, etc.), please specify your score
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Personal Statement and Submit */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-border pb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold">Personal Statement</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="personalStatement">Why do you want to join International Covenant College? (Optional)</Label>
                    <Textarea
                      id="personalStatement"
                      rows={6}
                      placeholder="Share your motivation, goals, and what you hope to achieve..."
                      value={formData.personalStatement}
                      onChange={(e) => handleInputChange('personalStatement', e.target.value)}
                    />
                  </div>

                  {/* Terms and Submit */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <span className="text-primary hover:underline cursor-pointer">
                          Terms and Conditions
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline cursor-pointer">
                          Privacy Policy
                        </span>
                      </Label>
                    </div>

                    <Button type="submit" className="w-full h-12 text-lg font-semibold rounded-full">
                      Submit Application
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 rounded-full"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 rounded-full"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : null}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationForm;