import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

const TestimonialsSection = ({
  title = "Success Stories",
  subtitle = "Hear from students and recruiters who have used our platform",
  testimonials = [
    {
      quote:
        "The placement portal made it incredibly easy to find and apply for jobs that matched my skills. I landed my dream job at a top tech company within weeks of using the platform.",
      name: "Priya Sharma",
      role: "Software Engineer",
      company: "TechCorp Inc.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
      quote:
        "As a recruiter, I've found exceptional talent through this platform. The filtering tools and candidate profiles are comprehensive and help us find the perfect match for our positions.",
      name: "Rajesh Kumar",
      role: "HR Manager",
      company: "Global Solutions",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
    },
    {
      quote:
        "The resume analysis feature provided valuable feedback that helped me improve my CV. The interview preparation resources were also incredibly helpful in landing my internship.",
      name: "Aditya Patel",
      role: "Data Science Intern",
      company: "Analytics Pro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya",
    },
  ],
}: TestimonialsSectionProps) => {
  return (
    <div className="w-full bg-background py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300"
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/40 mb-4" />
                <p className="text-lg mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
