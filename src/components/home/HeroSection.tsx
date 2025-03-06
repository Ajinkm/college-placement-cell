import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Building } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
}

const HeroSection = ({
  title = "Connect Students with Opportunities",
  subtitle = "A professional platform for college placement departments to streamline recruitment and help students find their dream careers.",
  ctaText = "Get Started",
  ctaLink = "/register",
  secondaryCtaText = "Learn More",
  secondaryCtaLink = "/about",
  backgroundImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
}: HeroSectionProps) => {
  return (
    <div className="relative w-full bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">{subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="rounded-full">
              <Link to={ctaLink}>
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full bg-transparent text-white border-white hover:bg-white/10"
            >
              <Link to={secondaryCtaLink}>{secondaryCtaText}</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary/20 p-3 mr-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-white font-medium">For Students</h3>
                <p className="text-gray-300 text-sm">
                  Find opportunities & build your career
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="rounded-full bg-primary/20 p-3 mr-4">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-white font-medium">For Recruiters</h3>
                <p className="text-gray-300 text-sm">Connect with top talent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
