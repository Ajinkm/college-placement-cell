import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, Building, Award } from "lucide-react";

interface StatisticProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface StatisticsSectionProps {
  title?: string;
  subtitle?: string;
  statistics?: StatisticProps[];
}

const StatisticsSection = ({
  title = "Placement Success",
  subtitle = "Our platform has helped thousands of students find their dream jobs",
  statistics = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      value: "5,000+",
      label: "Students Placed",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      value: "1,200+",
      label: "Job Opportunities",
    },
    {
      icon: <Building className="h-8 w-8 text-primary" />,
      value: "300+",
      label: "Partner Companies",
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      value: "95%",
      label: "Placement Rate",
    },
  ],
}: StatisticsSectionProps) => {
  return (
    <div className="w-full bg-muted/30 py-16 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <Card
              key={index}
              className="border-none shadow-md hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-primary/10 p-4">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
