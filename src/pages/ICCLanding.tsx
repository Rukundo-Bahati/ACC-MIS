import React, { useState, useEffect } from "react";
import { ChevronDown, Users, BookOpen, Award, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function ICCLanding() {
  const [applicationNumber, setApplicationNumber] = useState("");

  // Smooth scrolling function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ scrollBehavior: 'smooth' }}>
      {/* Navigation */}
      <Navigation scrollToSection={scrollToSection} />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* About Us Section */}
      <AboutSection />
      
      {/* Registration Instructions */}
      <RegistrationInstructions />
      
      {/* Programs Section */}
      <ProgramsSection />
      
      {/* Track Application */}
      <TrackApplication applicationNumber={applicationNumber} setApplicationNumber={setApplicationNumber} />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

function Navigation({ scrollToSection }: { scrollToSection: (sectionId: string) => void }) {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-white font-bold text-2xl">
            ICC-MIS
            <div className="text-sm font-normal text-white/90 mt-1">
              International Covenant College
            </div>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('home')} className="text-white font-medium hover:text-blue-200 transition-all duration-300 hover:scale-105 relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => scrollToSection('about')} className="text-white font-medium hover:text-blue-200 transition-all duration-300 hover:scale-105 relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => scrollToSection('instructions')} className="text-white font-medium hover:text-blue-200 transition-all duration-300 hover:scale-105 relative group">
            Instructions
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button onClick={() => scrollToSection('programs')} className="text-white font-medium hover:text-blue-200 transition-all duration-300 hover:scale-105 relative group">
            Our Programs
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <a href="/login" className="text-white font-medium px-4 py-2 hover:text-blue-200 transition-all duration-300 hover:scale-105 relative group">
            Login
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="/application" className="bg-gray-800 text-white font-medium px-6 py-3 rounded-full hover:bg-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300 transform"> 
            Apply
          </a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Welcome to ICC",
      description: "Provide Christ-centered wholistic quality education to prepare for service in this world, and in the life to come.",
      buttonText: "Login",
      buttonStyle: "bg-gray-800 text-white hover:bg-gray-800",
      buttonLink: "/login"
    },
    {
      title: "Be a Member of ICC", 
      description: "Join our community of learners committed to academic excellence and Christian values",
      buttonText: "Apply Now",
      buttonStyle: "bg-white text-gray-900 hover:bg-gray-100",
      buttonLink: "/application"
    }
  ];

  // Auto-slide effect - unidirectional (only right)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = prev + 1;
        // Reset to 0 after reaching the last slide
        return nextSlide >= slides.length ? 0 : nextSlide;
      });
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const nextSlide = prev + 1;
      return nextSlide >= slides.length ? 0 : nextSlide;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const prevSlide = prev - 1;
      return prevSlide < 0 ? slides.length - 1 : prevSlide;
    });
  };

  return (
    <div id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/landing.jpg)"
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-5xl px-4">
          {/* Sliding Content */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <h1 className="text-white font-bold text-6xl leading-tight mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-white text-xl mb-8 max-w-3xl mx-auto">
                    {slide.description}
                  </p>
                  <a 
                    href={slide.buttonLink} 
                    className={`${slide.buttonStyle} font-semibold text-lg px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg inline-block`}
                  >
                    {slide.buttonText}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        {/* Previous Button */}
        <button 
          onClick={prevSlide}
          className="w-12 h-12 bg-white/20 hover:bg-white/40 hover:scale-110 rounded-full flex items-center justify-center transition-all duration-300 transform hover:shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        {/* Dots */}
        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                currentSlide === index ? 'bg-white shadow-lg' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        
        {/* Next Button */}
        <button 
          onClick={nextSlide}
          className="w-12 h-12 bg-white/20 hover:bg-white/40 hover:scale-110 rounded-full flex items-center justify-center transition-all duration-300 transform hover:shadow-lg"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl text-gray-900 mb-6">About ICC</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The International Covenant College (ICC) is a Christian institution of higher learning committed to providing quality education founded on biblical principles. We integrate faith and learning to prepare students for leadership and service in their communities and beyond.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Our mission is to transform lives through Christ-centered education, nurturing the mental, spiritual, social and physical capacities of our students. We are dedicated to academic excellence while maintaining our commitment to biblical truth and Christian values.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              At ICC, we believe that true education goes beyond academic achievement - it encompasses character development, spiritual growth, and preparation for meaningful service in God's kingdom.
            </p>
            <a href="/register" className="bg-gray-800 text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300 transform">
              Register Today
            </a>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src="/landing.jpg" 
                alt="ICC Campus"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegistrationInstructions() {
  return (
    <section className="py-16 bg-gray-50" id="instructions">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl text-gray-900 mb-6">Registration Instructions</h2>
          <p className="text-xl text-gray-600">Follow these simple steps to apply to ICC</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-bold text-xl mb-4">Complete Application</h3>
            <p className="text-gray-600 mb-6">Fill out the online application form with your personal information, academic background, and program choice.</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="font-bold text-xl mb-4">Submit Documents</h3>
            <p className="text-gray-600 mb-6">Upload required documents including transcripts, certificates, and identification documents.</p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="font-bold text-xl mb-4">Track Progress</h3>
            <p className="text-gray-600 mb-6">Use your application number to track the status of your application and receive updates via email.</p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a href="/application" className="bg-gray-800 text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300 transform">
            Start Application
          </a>
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  const programs = [
    {
      title: "Digital Media Technology",
      description: "Learn cutting-edge digital media skills including graphic design, video production, web development, and multimedia content creation. This program combines technical expertise with creative expression.",
      duration: "3 Years",
      level: "Diploma",
      icon: <BookOpen className="w-8 h-8" />
    },
    {
      title: "Early Child Development",
      description: "Prepare to work with young children through comprehensive training in child psychology, education methods, health and nutrition, and family engagement strategies.",
      duration: "3 Years", 
      level: "Diploma",
      icon: <Users className="w-8 h-8" />
    }
  ];

  return (
    <section className="py-16 bg-white" id="programs">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl text-gray-900 mb-6">Our Programs</h2>
          <p className="text-xl text-gray-600">Discover our specialized programs designed for your success</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform group">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-all duration-300">
                  <div className="text-blue-600 group-hover:scale-110 transition-transform duration-300">
                    {program.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-gray-900">{program.title}</h3>
                  <div className="flex gap-4 mt-2">
                    <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{program.level}</span>
                    <span className="text-sm bg-gray-200 text-gray-600 px-3 py-1 rounded-full">{program.duration}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">{program.description}</p>
              
              <a href="/application" className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300 transform inline-block">
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrackApplication({ applicationNumber, setApplicationNumber }: { 
  applicationNumber: string; 
  setApplicationNumber: (value: string) => void; 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<string | null>(null);

  const handleTrackApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (applicationNumber.trim()) {
      setIsLoading(true);
      setTrackingResult(null);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Here you would typically make an API call to track the application
        // For now, we'll simulate a response
        setTrackingResult(`Application ${applicationNumber} is currently under review. You will receive an email update within 2-3 business days.`);
      } catch (error) {
        setTrackingResult(`Error tracking application ${applicationNumber}. Please try again later.`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl text-gray-900 mb-6">Track Your Application</h2>
          <p className="text-xl text-gray-600">Enter your application number to check the status of your application</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <form onSubmit={handleTrackApplication} className="space-y-6">
            <div>
              <label htmlFor="applicationNumber" className="block text-lg font-medium text-gray-700 mb-2">
                Application Number
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="applicationNumber"
                  value={applicationNumber}
                  onChange={(e) => setApplicationNumber(e.target.value)}
                  placeholder="Enter your application number (e.g., ICC2024001)"
                  className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Your application number was sent to your email after submitting your application
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-800 text-white font-semibold text-lg py-4 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Tracking...
                </>
              ) : (
                'Track Application'
              )}
            </button>
          </form>
          
          {/* Display tracking result */}
          {trackingResult && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800">{trackingResult}</p>
            </div>
          )}
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-lg mb-4">Application Status Information:</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Submitted:</strong> Your application has been received</li>
              <li><strong>Under Review:</strong> Our admissions team is reviewing your application</li>
              <li><strong>Documents Required:</strong> Additional documents are needed</li>
              <li><strong>Approved:</strong> Congratulations! Your application has been approved</li>
              <li><strong>Rejected:</strong> Unfortunately, your application was not successful</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-xl mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p>Kigali, Rwanda</p>
              <p>Phone: +250 XXX XXX XXX</p>
              <p>Email: admissions@icc.ac.rw</p>
              <p>General: info@icc.ac.rw</p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#home" className="block hover:text-blue-300 transition-colors">Home</a>
              <a href="#about" className="block hover:text-blue-300 transition-colors">About</a>
              <a href="/login" className="block hover:text-blue-300 transition-colors">Login</a>
              <a href="/application" className="block hover:text-blue-300 transition-colors">Apply</a>
            </div>
          </div>
          
          {/* Programs */}
          <div>
            <h3 className="font-bold text-xl mb-4">Programs</h3>
            <div className="space-y-2">
              <p>Digital Media Technology</p>
              <p>Early Child Development</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2024 International Covenant College. Education for Eternity.</p>
        </div>
      </div>
    </footer>
  );
}
