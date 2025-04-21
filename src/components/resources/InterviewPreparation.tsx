import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const InterviewPreparation = () => {
  const navigate = useNavigate();

  const handleStartPractice = () => {
    // In a real app, this would navigate to the practice page
    alert("Mock interview practice feature coming soon!");
  };

  const handleViewQuestions = () => {
    // In a real app, this would navigate to the questions page
    alert("Interview questions database coming soon!");
  };

  const handleReadTips = () => {
    // In a real app, this would navigate to the tips page
    alert("Interview tips and resources coming soon!");
  };

  const handleScheduleCoaching = () => {
    // In a real app, this would navigate to the coaching scheduling page
    alert("Coaching session scheduling coming soon!");
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Interview Preparation</h1>
        <p className="text-muted-foreground">
          Resources to help you prepare for your interviews
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mock Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Practice with our AI-powered interview simulator or schedule a
              session with a career advisor.
            </p>
            <Button onClick={handleStartPractice}>Start Practice</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interview Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Browse our database of common interview questions for various
              roles and industries.
            </p>
            <Button onClick={handleViewQuestions}>View Questions</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interview Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Learn essential strategies and best practices to excel in your
              interviews.
            </p>
            <Button onClick={handleReadTips}>Read Tips</Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">
          Need more personalized help with your interview preparation?
        </p>
        <Button onClick={handleScheduleCoaching}>
          Schedule a Coaching Session
        </Button>
      </div>
    </div>
  );
};

export default InterviewPreparation;
