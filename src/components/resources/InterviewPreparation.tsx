import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  Code,
  FileText,
  Lightbulb,
  MessageSquare,
  Video,
  BookOpen,
  CheckCircle,
  Clock,
  Users,
  Building,
  GraduationCap,
  Brain,
  PenTool,
} from "lucide-react";

const InterviewPreparation = () => {
  const [activeTab, setActiveTab] = useState("technical");

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Interview Preparation</h1>
        <p className="text-muted-foreground">
          Comprehensive resources to help you ace your interviews
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Interview Resources</CardTitle>
              <CardDescription>
                Prepare for different types of interviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="hr">HR & Behavioral</TabsTrigger>
                  <TabsTrigger value="case">Case Studies</TabsTrigger>
                  <TabsTrigger value="group">Group Discussion</TabsTrigger>
                </TabsList>

                {/* Technical Interview Content */}
                <TabsContent value="technical" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      Technical Interviews
                    </h3>
                    <p>
                      Technical interviews assess your problem-solving abilities
                      and domain knowledge. Prepare for coding challenges,
                      system design questions, and technical discussions.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            Data Structures & Algorithms
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>Arrays, Linked Lists, Stacks & Queues</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>Trees, Graphs, Hash Tables</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>Sorting & Searching Algorithms</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>Dynamic Programming</span>
                            </li>
                          </ul>
                          <Button variant="link" className="px-0 mt-2">
                            View Practice Problems
                          </Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">
                            System Design
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>Scalability & Performance</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>Database Design</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>API Design</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                              <span>Microservices Architecture</span>
                            </li>
                          </ul>
                          <Button variant="link" className="px-0 mt-2">
                            View Case Studies
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium mb-3">
                        Recommended Practice Platforms
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">LeetCode</Badge>
                        <Badge variant="secondary">HackerRank</Badge>
                        <Badge variant="secondary">CodeSignal</Badge>
                        <Badge variant="secondary">Pramp</Badge>
                        <Badge variant="secondary">InterviewBit</Badge>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium mb-3">
                        Mock Interview Sessions
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Practice with peers or mentors to simulate real
                        interview conditions
                      </p>
                      <Button>
                        <Users className="mr-2 h-4 w-4" /> Schedule Mock
                        Interview
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* HR & Behavioral Interview Content */}
                <TabsContent value="hr" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      HR & Behavioral Interviews
                    </h3>
                    <p>
                      HR and behavioral interviews assess your soft skills,
                      cultural fit, and past experiences. Prepare to discuss
                      your background, achievements, and how you handle various
                      workplace situations.
                    </p>

                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Common Questions</h4>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-md">
                          <h5 className="font-medium mb-2">
                            Tell me about yourself
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            Prepare a concise 2-minute summary of your
                            education, experience, and career goals relevant to
                            the position.
                          </p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h5 className="font-medium mb-2">
                            What are your strengths and weaknesses?
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            Highlight strengths relevant to the job and discuss
                            weaknesses you're actively working to improve.
                          </p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h5 className="font-medium mb-2">
                            Tell me about a challenging situation and how you
                            handled it
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            Use the STAR method (Situation, Task, Action,
                            Result) to structure your response with a positive
                            outcome.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium mb-3">STAR Method</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-md">
                          <h5 className="font-medium mb-1">Situation & Task</h5>
                          <p className="text-sm text-muted-foreground">
                            Describe the context and challenge you faced
                          </p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h5 className="font-medium mb-1">Action</h5>
                          <p className="text-sm text-muted-foreground">
                            Explain what you did and why
                          </p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h5 className="font-medium mb-1">Result</h5>
                          <p className="text-sm text-muted-foreground">
                            Share the outcome and what you learned
                          </p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h5 className="font-medium mb-1">Quantify</h5>
                          <p className="text-sm text-muted-foreground">
                            Use metrics when possible to demonstrate impact
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button>
                        <Video className="mr-2 h-4 w-4" /> Watch Interview Tips
                        Video
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Case Study Interview Content */}
                <TabsContent value="case" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      Case Study Interviews
                    </h3>
                    <p>
                      Case study interviews assess your analytical thinking,
                      problem-solving, and business acumen. You'll be presented
                      with a business scenario and asked to analyze and provide
                      recommendations.
                    </p>

                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Case Study Framework</h4>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-md">
                          <h5 className="font-medium mb-2">
                            1. Understand the Problem
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            Clarify the objective, ask questions, and identify
                            key constraints
                          </p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h5 className="font-medium mb-2">
                            2. Structure Your Approach
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            Create a framework to analyze the problem
                            systematically
                          </p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h5 className="font-medium mb-2">3. Analyze Data</h5>
                          <p className="text-sm text-muted-foreground">
                            Examine information, identify patterns, and draw
                            insights
                          </p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h5 className="font-medium mb-2">
                            4. Recommend Solutions
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            Provide actionable recommendations with clear
                            reasoning
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium mb-3">
                        Practice Case Studies
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">
                              Market Entry Strategy
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                              Analyze whether a company should enter a new
                              market
                            </p>
                            <Button variant="outline" size="sm">
                              View Case
                            </Button>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">
                              Product Launch
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                              Develop a strategy for launching a new product
                            </p>
                            <Button variant="outline" size="sm">
                              View Case
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Group Discussion Content */}
                <TabsContent value="group" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Group Discussion</h3>
                    <p>
                      Group discussions assess your communication, leadership,
                      and teamwork skills. You'll discuss a topic with other
                      candidates while being evaluated on your contributions and
                      behavior.
                    </p>

                    <div className="mt-6">
                      <h4 className="font-medium mb-3">
                        Key Skills to Demonstrate
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-md">
                          <h5 className="font-medium mb-1">Communication</h5>
                          <p className="text-sm text-muted-foreground">
                            Speak clearly, listen actively, and articulate ideas
                            concisely
                          </p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h5 className="font-medium mb-1">Leadership</h5>
                          <p className="text-sm text-muted-foreground">
                            Guide discussion, involve others, and help reach
                            conclusions
                          </p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h5 className="font-medium mb-1">Teamwork</h5>
                          <p className="text-sm text-muted-foreground">
                            Respect others' views, build on ideas, and
                            collaborate
                          </p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <h5 className="font-medium mb-1">
                            Critical Thinking
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            Analyze topics logically and provide reasoned
                            arguments
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium mb-3">
                        Common Group Discussion Topics
                      </h4>
                      <div className="space-y-2">
                        <Badge className="mr-2 mb-2">Current Affairs</Badge>
                        <Badge className="mr-2 mb-2">Social Issues</Badge>
                        <Badge className="mr-2 mb-2">Business Cases</Badge>
                        <Badge className="mr-2 mb-2">Technology Trends</Badge>
                        <Badge className="mr-2 mb-2">Abstract Concepts</Badge>
                        <Badge className="mr-2 mb-2">Ethical Dilemmas</Badge>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button>
                        <Users className="mr-2 h-4 w-4" /> Join Practice Group
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Workshops</CardTitle>
                <CardDescription>
                  Interactive sessions to boost your interview skills
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">
                      Technical Interview Masterclass
                    </h3>
                    <Badge>Online</Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Tomorrow, 3:00 PM - 5:00 PM</span>
                  </div>
                  <Button size="sm" className="w-full">
                    Register
                  </Button>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">HR Interview Strategies</h3>
                    <Badge>Online</Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>June 15, 2:00 PM - 3:30 PM</span>
                  </div>
                  <Button size="sm" className="w-full">
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
                <CardDescription>
                  Helpful materials for interview preparation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <h3 className="font-medium text-sm">
                      Interview Question Bank
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      500+ questions across different roles
                    </p>
                    <Button variant="link" className="px-0 py-1 h-auto text-xs">
                      Download PDF
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <Video className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <h3 className="font-medium text-sm">
                      Mock Interview Videos
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Watch successful interviews with analysis
                    </p>
                    <Button variant="link" className="px-0 py-1 h-auto text-xs">
                      View Library
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start">
                  <BookOpen className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <h3 className="font-medium text-sm">Interview Guides</h3>
                    <p className="text-xs text-muted-foreground">
                      Comprehensive preparation guides by role
                    </p>
                    <Button variant="link" className="px-0 py-1 h-auto text-xs">
                      Browse Guides
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interview Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>
                      Research the company thoroughly before the interview
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>Prepare questions to ask the interviewer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>
                      Practice with mock interviews to build confidence
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>Dress professionally and arrive early</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary font-medium mr-2">•</span>
                    <span>
                      Follow up with a thank-you email after the interview
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPreparation;
