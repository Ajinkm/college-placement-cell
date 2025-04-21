import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CareerPathGuidance = () => {
  const navigate = useNavigate();

  const handleExploreCareers = () => {
    // In a real app, this would navigate to the careers exploration page
    alert("Career exploration tools coming soon!");
  };

  const handleGetGuidance = () => {
    // In a real app, this would navigate to the personalized guidance page
    alert("Personalized career guidance coming soon!");
  };

  const handleFindCourses = () => {
    // In a real app, this would navigate to the courses page
    alert("Skills development courses coming soon!");
  };

  const handleBookCounseling = () => {
    // In a real app, this would navigate to the counseling booking page
    alert("Career counseling booking coming soon!");
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Career Path Guidance</h1>
        <p className="text-muted-foreground">
          Explore career paths and get guidance for your professional journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Career Options</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Explore different career paths based on your interests, skills,
              and educational background.
            </p>
            <Button onClick={handleExploreCareers}>Explore Careers</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Career Guidance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Get personalized guidance to help you identify and pursue the
              right career path.
            </p>
            <Button onClick={handleGetGuidance}>Get Guidance</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills Development</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Discover courses and resources to develop in-demand skills for
              your chosen career.
            </p>
            <Button onClick={handleFindCourses}>Find Courses</Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">
          Want to discuss your career options with an expert?
        </p>
        <Button onClick={handleBookCounseling}>
          Book a Career Counseling Session
        </Button>
      </div>
    </div>
  );
};

export default CareerPathGuidance;
