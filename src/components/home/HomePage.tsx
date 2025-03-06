import React from "react";
import HeroSection from "./HeroSection";
import FeatureHighlights from "./FeatureHighlights";
import StatisticsSection from "./StatisticsSection";
import TestimonialsSection from "./TestimonialsSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full bg-background">
      <HeroSection />
      <FeatureHighlights />
      <StatisticsSection />
      <TestimonialsSection />

      {/* Call to Action Section */}
      <div className="w-full bg-primary text-primary-foreground py-16 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Join thousands of students and recruiters already using our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link
                to="/register?type=student"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/register?type=student";
                }}
              >
                Register as Student
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link
                to="/register?type=recruiter"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/register?type=recruiter";
                }}
              >
                Register as Recruiter
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
