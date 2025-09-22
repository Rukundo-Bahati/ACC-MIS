import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MessageCircle, HelpCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Support = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-blue-800 p-4">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-white hover:text-blue-200 transition-colors flex items-center gap-2 z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="max-w-4xl mx-auto pt-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Support Center</h1>
          <p className="text-blue-200 text-lg">How can we help you today?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Contact Information
              </CardTitle>
              <CardDescription>
                Get in touch with our support team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@icc.edu</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Support Hours</p>
                  <p className="text-sm text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common support options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/forgot-password">
                <Button variant="outline" className="w-full justify-start">
                  Reset Password
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="w-full justify-start">
                  Create New Account
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="w-full justify-start">
                  Login Issues
                </Button>
              </Link>
              <Link to="/application">
                <Button variant="outline" className="w-full justify-start">
                  Application Support
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mt-6 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Quick answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">How do I reset my password?</h4>
              <p className="text-sm text-muted-foreground">
                Click on "Forgot Password" on the login page and follow the instructions sent to your email.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">How do I create a new account?</h4>
              <p className="text-sm text-muted-foreground">
                Click on "Register here" on the login page and fill out the registration form.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">I'm having trouble logging in</h4>
              <p className="text-sm text-muted-foreground">
                Make sure you're using the correct email and password. If you continue to have issues, contact our support team.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;
