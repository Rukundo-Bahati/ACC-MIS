import { useState, useEffect } from "react";
import { Star, Users, Search, MessageCircle, Trophy, BookOpen, ArrowUp, ChevronDown } from "lucide-react";

// CSS to hide scrollbars
import "./styles.css";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
    {/* Features Bar */}
      <FeaturesBar />
      
      {/* Top Categories */}
      <TopCategories />
      
      {/* Popular Courses */}
      <PopularCourses />
      
      {/* Expert Learning Institution */}
      <ExpertSection />
      
      {/* Online Examination */}
      <ExaminationSection />
      
      {/* Featured Competition */}
      <FeaturedCompetition />
      
      {/* Publications Section */}
      <PublicationsSection />
      
      {/* Recent Publications */}
      <RecentPublications />
      
      {/* Reviews */}
      <ReviewsSection />
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

function Navigation() {
  return (
    <nav className="relative w-full h-24 bg-transparent z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-white font-dm-sans text-3xl font-bold">
            ICC-MIS
            <div className="text-sm font-normal text-white/80 mt-1">
              International Covenant College
            </div>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#hero" className="text-white font-dm-sans font-medium text-base hover:text-primary-light transition-colors">Home</a>
          <a href="#academics" className="text-white font-dm-sans font-medium text-base hover:text-primary-light transition-colors">Academics</a>
          <a href="#community" className="text-white font-dm-sans font-medium text-base hover:text-primary-light transition-colors">Community</a>
          <a href="#events" className="text-white font-dm-sans font-medium text-base hover:text-primary-light transition-colors">Events</a>
          <a href="#testimonials" className="text-white font-dm-sans font-medium text-base hover:text-primary-light transition-colors">Testimonials</a>
          <a href="#contact" className="text-white font-dm-sans font-medium text-base hover:text-primary-light transition-colors">Contact</a>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <a href="/login" className="text-white font-dm-sans font-medium text-base px-4 py-2 hover:text-primary-light transition-colors">
            Login
          </a>
          <a href="/register" className="bg-primary text-white font-dm-sans font-medium text-base px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"> 
            Apply Now
          </a>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(../landing.jpg)"
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-white font-dm-sans font-bold text-6xl leading-tight mb-6">
            International Covenant College
            <span className="block text-primary-light">Transforming Lives Through Education</span>
          </h1>
          <p className="text-white font-dm-sans text-2xl leading-9 mb-12 max-w-2xl mx-auto">
            A Christian Institution Committed to Academic Excellence, Biblical Truth, and Servant Leadership
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/login" className="bg-primary text-white font-dm-sans font-semibold text-lg px-8 py-4 rounded-full hover:bg-primary-dark hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Access Portal
            </a>
            <a href="/application" className="bg-white text-primary font-dm-sans font-semibold text-lg px-8 py-4 rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturesBar() {
  return (
    <div className="relative -mt-16 z-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex justify-between items-center gap-12">
            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="w-15 h-15 bg-primary-light rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                <MessageCircle className="w-9 h-9 text-primary group-hover:text-fountain-orange transition-colors" />
              </div>
              <span className="font-dm-sans text-2xl text-foreground group-hover:text-primary transition-colors">Biblical Truth</span>
            </div>
            
            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="w-15 h-15 bg-primary-light rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                <BookOpen className="w-9 h-9 text-primary group-hover:text-fountain-orange transition-colors" />
              </div>
              <span className="font-dm-sans text-2xl text-foreground group-hover:text-primary transition-colors">Academic Excellence</span>
            </div>
            
            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="w-15 h-15 bg-primary-light rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                <Trophy className="w-9 h-9 text-primary group-hover:text-fountain-orange transition-colors" />
              </div>
              <span className="font-dm-sans text-2xl text-foreground group-hover:text-primary transition-colors">Servant Leadership</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopCategories() {
  const categories = [
    { title: "Theology", image: "https://api.builder.io/api/v1/image/assets/TEMP/ad5a8994ff1ecff5ee2e6af6e3bb305ca55b9b0c?width=1298" },
    { title: "Education", image: "https://api.builder.io/api/v1/image/assets/TEMP/20119b5d598c87fbbc8f74013ee3b377ee96fe02?width=782" },
    { title: "Business", image: "https://api.builder.io/api/v1/image/assets/TEMP/4fbdce70d2827703e9bc663f60362bd26ba6504d?width=782" },
    { title: "Ministry", image: "https://api.builder.io/api/v1/image/assets/TEMP/cf49d3e7eb63c658e7e7f4cdca90e68028f6de9d?width=782" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-dm-sans font-bold text-5xl text-foreground mb-6">Academic Faculties</h2>
          <p className="font-dm-sans text-xl text-muted-foreground max-w-3xl mx-auto">Explore our diverse range of academic programs designed to equip students with knowledge, skills, and Christian values</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer">
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="font-dm-sans font-bold text-3xl text-white">{category.title}</h3>
                {index === 0 && (
                  <p className="font-dm-sans text-base text-white mt-2 max-w-64">
                    Biblical studies and theological education grounded in Scripture.
                  </p>
                )}
                {index === 1 && (
                  <p className="font-dm-sans text-base text-white mt-2 max-w-64">
                    Training Christian educators to impact the next generation.
                  </p>
                )}
                {index === 2 && (
                  <p className="font-dm-sans text-base text-white mt-2 max-w-64">
                    Developing ethical business leaders with Christian principles.
                  </p>
                )}
                {index === 3 && (
                  <p className="font-dm-sans text-base text-white mt-2 max-w-64">
                    Preparing servant leaders for effective Christian ministry.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center items-center mt-8">
          <div className="flex gap-8">
            <button className="w-15 h-15 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-dark transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="w-15 h-15 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-dark transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PopularCourses() {
  const courses = [
    {
      title: "Bachelor of Theology",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/7ebf0fbe77188c5f505104b9a0f5da522376f64b?width=782",
      duration: "4 years",
      students: "250+ Students",
      rating: "4.9"
    },
    {
      title: "Bachelor of Education",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/20119b5d598c87fbbc8f74013ee3b377ee96fe02?width=782",
      duration: "4 years",
      students: "300+ Students",
      rating: "4.8"
    },
    {
      title: "Bachelor of Business Administration",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/4fbdce70d2827703e9bc663f60362bd26ba6504d?width=782",
      duration: "4 years",
      students: "280+ Students",
      rating: "4.7"
    },
    {
      title: "Diploma in Biblical Studies",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/cf49d3e7eb63c658e7e7f4cdca90e68028f6de9d?width=782",
      duration: "2 years",
      students: "150+ Students",
      rating: "4.6"
    },
    {
      title: "Certificate in Christian Ministry",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/e5a268b1ffdbf88309931536de6f0dfe341ef125?width=782",
      duration: "1 year",
      students: "100+ Students",
      rating: "4.5"
    },
    {
      title: "Master of Divinity",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/7fe607a4a10dfb1e3e35f0fb91ecff1377e5b76e?width=782",
      duration: "3 years",
      students: "75+ Students",
      rating: "4.9"
    }
  ];

  // For continuous scrolling effect
  const duplicatedCourses = [...courses, ...courses];

  // Animation for continuous scrolling
  useEffect(() => {
    const scrollContainer = document.getElementById('courses-scroll-container');
    if (!scrollContainer) return;
    
    const scrollAnimation = () => {
      if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth / 2)) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };
    
    const animationId = setInterval(scrollAnimation, 30);
    return () => clearInterval(animationId);
  }, []);

  return (
    <section id="academics" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-dm-sans font-bold text-5xl text-foreground capitalize">Academic Programs</h2>
          <p className="font-dm-sans text-xl text-muted-foreground mt-4">Discover our range of programs designed to equip you for ministry and leadership</p>
        </div>
        
        <div id="courses-scroll-container" className="flex overflow-x-auto hide-scrollbar pb-4" style={{ scrollBehavior: 'smooth' }}>
          <div className="flex gap-6 min-w-max">
            {duplicatedCourses.map((course, index) => (
              <div key={index} className="w-80 flex-shrink-0">
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseCard({ title, image, duration, students, rating }: any) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-dm-sans text-xl text-foreground leading-tight flex-1 pr-4">{title}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-primary fill-current" />
            <span className="font-dm-sans text-base text-foreground">{rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-muted-foreground mb-4">
          <span className="font-dm-sans text-base">{duration}</span>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="font-dm-sans text-base">{students}</span>
          </div>
        </div>
        
        <div className="text-right mt-auto">
          <button className="font-dm-sans font-medium text-base text-white bg-primary px-4 py-2 rounded-full hover:bg-primary-dark transition-colors hover:scale-105 transition-transform">Learn More</button>
        </div>
      </div>
    </div>
  );
}

function ExpertSection() {
  return (
    <section id="community" className="py-16 bg-white relative overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-6 w-80 h-80 bg-primary rounded-full opacity-10"></div>
        <div className="absolute right-80 top-6 w-48 h-48 bg-primary rounded-full opacity-15"></div>
        <div className="absolute right-64 bottom-32 w-48 h-48 bg-primary rounded-full opacity-12"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="w-96 h-96 mx-auto border-4 border-dashed border-primary rounded-full p-4">
              <div className="w-full h-full bg-primary-light rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="ICC Rwanda Campus"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-3xl shadow-lg p-4 w-42">
              <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <p className="text-center font-dm-sans text-sm">
                <span className="font-bold text-primary">Excellence</span><br />
                in<br />
                Education
              </p>
            </div>
          </div>
          
          {/* Content Section */}
          <div>
            <h2 className="font-dm-sans font-bold text-5xl mb-6">
              International Covenant College - <span className="text-primary">Transforming</span> Lives Through Biblical Education
            </h2>
            <p className="font-dm-sans text-2xl text-muted-foreground mb-8 leading-normal">
              Dedicated to biblical truth and academic excellence, we integrate faith and learning to prepare students for leadership and service in their communities and beyond.
            </p>
            <button className="bg-primary text-white font-dm-sans font-semibold text-base px-10 py-5 rounded-full hover:bg-primary-dark transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExaminationSection() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute left-20 top-20 w-48 h-48 bg-primary rounded-full"></div>
        <div className="absolute right-32 bottom-20 w-32 h-32 bg-primary rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Section */}
          <div>
            <h2 className="font-dm-sans font-bold text-5xl mb-6">
              Our <span className="text-primary">Christian Community</span> is Vibrant
            </h2>
            <p className="font-dm-sans text-2xl text-muted-foreground mb-8">
              Experience spiritual growth, academic excellence, and meaningful relationships in our Christ-centered learning environment.
            </p>
            <button className="bg-primary text-white font-dm-sans font-semibold text-base px-10 py-5 rounded-full hover:bg-primary-dark transition-colors">
              Learn More
            </button>
          </div>
          
          {/* Image Section */}
          <div className="relative">
            <div className="w-96 h-96 mx-auto border-4 border-dashed border-primary rounded-full p-4">
              <div className="w-full h-full bg-primary-light rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
                  alt="ICC Rwanda Students"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            {/* Floating card */}
            <div className="absolute bottom-4 -right-8 bg-white rounded-3xl shadow-lg p-4 w-42">
              <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <p className="text-center font-dm-sans text-sm">
                <span className="font-bold text-primary">Community</span><br />
                of<br />
                Scholars
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCompetition() {
  // For continuous scrolling effect
  useEffect(() => {
    const scrollContainer = document.getElementById('events-scroll-container');
    if (!scrollContainer) return;
    
    const scrollAnimation = () => {
      if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth / 2)) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };
    
    const animationId = setInterval(scrollAnimation, 30);
    return () => clearInterval(animationId);
  }, []);

  const competitions = [
    {
      title: "Biblical Research Symposium",
      subtitle: "Faith and Scholarship",
      details: "Eligibility: All students\nDeadline: Coming Soon",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
    },
    {
      title: "Christian Leadership Conference",
      subtitle: "Servant Leadership in Action",
      details: "Eligibility: All students\nDeadline: Coming Soon",
      image: "https://images.unsplash.com/photo-1475721027785-f74ec9c7180a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Theological Debate Forum",
      subtitle: "Exploring Biblical Truth",
      details: "Eligibility: Theology students\nDeadline: Coming Soon",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Community Outreach Day",
      subtitle: "Serving Kigali Together",
      details: "Eligibility: All students\nDeadline: Coming Soon",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  return (
    <section id="events" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-dm-sans font-bold text-5xl text-foreground">Academic Events</h2>
          <p className="font-dm-sans text-xl text-muted-foreground mt-4">Engage in scholarly activities that integrate faith and learning</p>
        </div>
        
        <div id="events-scroll-container" className="flex overflow-x-auto hide-scrollbar pb-4" style={{ scrollBehavior: 'smooth' }}>
          <div className="flex gap-6 min-w-max">
            {[...competitions, ...competitions].map((competition, index) => (
              <div key={index} className="relative h-96 w-80 flex-shrink-0 rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-full h-full">
                  <img 
                    src={competition.image} 
                    alt={competition.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-poppins font-bold text-3xl text-white mb-2">{competition.title}</h3>
                  <h4 className="font-poppins font-bold text-xl text-white mb-3">{competition.subtitle}</h4>
                  <p className="font-poppins text-base text-white whitespace-pre-line">
                    {competition.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <div className="flex gap-8">
            <button className="w-15 h-15 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-dark transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="w-15 h-15 bg-fountain-orange rounded-full flex items-center justify-center text-white">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

function PublicationsSection() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Section */}
          <div>
            <h2 className="font-open-sans font-bold text-5xl mb-6">
              Access <span className="text-fountain-orange">Christian</span> Publications and Resources
            </h2>
            <p className="font-open-sans text-2xl text-gray-600 mb-8 leading-9">
              Stay informed with the latest theological research, Christian education resources, and ministry insights from ICC Rwanda and global Christian scholars.
            </p>
            <button className="bg-fountain-orange text-white font-source-sans-pro font-bold text-base px-10 py-5 rounded-full hover:bg-orange-600 transition-colors">
              Register
            </button>
          </div>
          
          {/* Registration Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="text-center mb-8">
              <p className="font-open-sans font-bold text-base text-gray-800">
                Register to receive updates about new publications, events, and resources from ICC Rwanda.
              </p>
            </div>
            
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Full name"
                className="w-full p-4 border border-gray-300 rounded-3xl bg-gray-50 font-open-sans text-base"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 border border-gray-300 rounded-3xl bg-gray-50 font-open-sans text-base"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full p-4 border border-gray-300 rounded-3xl bg-gray-50 font-open-sans text-base"
              />
              <div className="relative">
                <select className="w-full p-4 border border-gray-300 rounded-3xl bg-gray-50 font-open-sans text-base appearance-none">
                  <option value="">Select your area of interest</option>
                  <option value="theology">Theology</option>
                  <option value="education">Education</option>
                  <option value="business">Business</option>
                  <option value="ministry">Ministry</option>
                </select>
                <ChevronDown className="w-6 h-6 absolute right-4 top-4 text-gray-600" />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white font-open-sans font-bold text-base py-4 rounded-full hover:bg-orange-600 transition-colors"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecentPublications() {
  const publications = [
    {
      title: "Biblical Studies Journal",
      image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Christian Education Today",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Theology & Leadership",
      image: "https://images.unsplash.com/photo-1529158062015-cad636e205a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
    },
    {
      title: "Ministry in Africa",
      image: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="font-open-sans font-bold text-5xl text-black">Recent Publications</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {publications.map((publication, index) => (
            <div key={index} className="relative h-72 rounded-3xl overflow-hidden group cursor-pointer">
              <img 
                src={publication.image} 
                alt={publication.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="font-poppins font-medium text-xl text-white">
                  {publication.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const [currentReview, setCurrentReview] = useState(0);
  
  const reviews = [
    {
      name: "Pastor Emmanuel",
      role: "Theology Graduate",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      content: "ICC Rwanda provided me with a strong theological foundation and practical ministry skills. The professors are dedicated to excellence and the community is supportive and Christ-centered."
    },
    {
      name: "Sarah Mutoni",
      role: "Education Student",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      content: "The Christian education program at ICC Rwanda has transformed my approach to teaching. I've learned to integrate biblical principles into curriculum development while maintaining academic excellence."
    },
    {
      name: "Jean Paul",
      role: "Business Administration Graduate",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      content: "The business program at ICC Rwanda taught me how to lead with integrity and apply Christian ethics to business decisions. The mentorship I received has been invaluable to my career development."
    },
    {
      name: "Grace Uwimana",
      role: "Ministry Leadership Student",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      content: "ICC Rwanda has equipped me with both spiritual formation and practical leadership skills. The servant leadership model they teach has deeply influenced how I approach ministry in my community."
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Section */}
          <div>
            <h3 className="font-poppins font-bold text-3xl text-black mb-6">Testimonials</h3>
            <h2 className="font-open-sans font-bold text-5xl mb-8">
              What our <span className="text-fountain-orange">Community</span> says about ICC Rwanda
            </h2>
            
            <div className="flex gap-12">
              <button 
                onClick={() => {
                  const newIndex = currentReview - 1;
                  setCurrentReview(newIndex < 0 ? reviews.length - 1 : newIndex);
                }}
                className="w-15 h-15 border-2 border-fountain-orange rounded-full flex items-center justify-center text-fountain-orange hover:bg-fountain-orange hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={() => {
                  const newIndex = currentReview + 1;
                  setCurrentReview(newIndex >= reviews.length ? 0 : newIndex);
                }}
                className="w-15 h-15 border-2 border-fountain-orange rounded-full flex items-center justify-center text-fountain-orange hover:bg-fountain-orange hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Reviews Cards */}
          <div className="relative h-96 overflow-hidden">
            {reviews.map((review, index) => (
              <div 
                key={index}
                className={`bg-white rounded-3xl shadow-lg p-12 absolute inset-0 transition-transform duration-300 ${
                  index === currentReview ? 'translate-x-0' : 
                  index < currentReview ? '-translate-x-full' : 'translate-x-full'
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={review.image} 
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover shadow-md hover:scale-105 transition-transform duration-300"
                  />
                  <div>
                    <h4 className="font-open-sans font-bold text-xl text-black">{review.name}</h4>
                    <p className="font-open-sans font-bold text-lg text-fountain-orange">{review.role}</p>
                  </div>
                </div>
                <p className="font-open-sans text-lg text-gray-600 leading-8">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-blue-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="text-white font-source-sans-pro text-3xl font-bold">
                ICC Rwanda
                <div className="flex gap-1 mt-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                </div>
              </div>
            </div>
            <p className="text-white font-poppins text-base mb-8 max-w-md">
              International Covenant College - Excellence in Christian Education, Biblical Truth, and Servant Leadership.
            </p>
          
          </div>
          
          {/* Company Links */}
          <div>
            <h4 className="text-white font-poppins font-bold text-base mb-6">Quick Links</h4>
            <div className="space-y-3">
              <a href="#" className="block text-white font-poppins text-base hover:text-black transition-colors">About Us</a>
              <a href="#" className="block text-white font-poppins text-base hover:text-black transition-colors">Academic Programs</a>
              <a href="#" className="block text-white font-poppins text-base hover:text-black transition-colors">Admissions</a>
              <a href="#" className="block text-white font-poppins text-base hover:text-black transition-colors">Student Life</a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <div className="space-y-4">
              <div>
                <span className="text-white font-poppins font-bold text-base">Address: </span>
                <span className="text-white font-poppins text-base">P.O. Box 6558, Kigali, RWANDA</span>
              </div>
              <div>
                <span className="text-white font-poppins font-bold text-base">Location: </span>
                <span className="text-white font-poppins text-base">Masoro, Ndera Sector, Gasabo District, Kigali</span>
              </div>
              <div>
                <span className="text-white font-poppins font-bold text-base">Hours: </span>
                <span className="text-white font-poppins text-base">Monday to Sunday 8:00A.M. to 8:00P.M.</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="mt-16 text-center">
          <h4 className="text-white font-poppins text-2xl mb-6">Subscribe to our Newsletter</h4>
          <div className="flex max-w-md mx-auto overflow-hidden rounded-full">
            <input
              type="email"
              placeholder="Your Email address"
              className="flex-1 px-4 py-3 text-fountain-orange font-poppins text-sm border-none outline-none"
            />
            <button className="bg-primary text-white font-poppins text-sm px-8 py-3 hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
        
       
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-12 h-12 bg-fountain-orange text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors z-50"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}
