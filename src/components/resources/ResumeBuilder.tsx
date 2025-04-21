import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ResumeBuilder = () => {
  const openCanva = () => {
    window.open("https://www.canva.com/en_in/", "_blank");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Resume Builder</h1>
        <p className="text-muted-foreground">
          Create professional resumes with Canva's resume builder
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resume Builder with Canva</CardTitle>
          <CardDescription>
            Click the button below to open Canva's resume builder in a new tab.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={openCanva} className="w-full">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Canva Resume Builder
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeBuilder;
