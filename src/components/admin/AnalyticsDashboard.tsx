import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  Users,
  Briefcase,
  Calendar,
  TrendingUp,
  Award,
} from "lucide-react";

interface AnalyticsDashboardProps {
  placementStats?: {
    totalPlacements: number;
    averageSalary: number;
    topCompanies: { name: string; placements: number }[];
  };
  applicationStats?: {
    totalApplications: number;
    pendingApplications: number;
    successfulApplications: number;
    rejectedApplications: number;
    applicationsByMonth: { month: string; count: number }[];
  };
  userStats?: {
    totalStudents: number;
    totalRecruiters: number;
    activeUsers: number;
    newUsersThisMonth: number;
  };
}

const AnalyticsDashboard = ({
  placementStats = {
    totalPlacements: 342,
    averageSalary: 75000,
    topCompanies: [
      { name: "Tech Solutions Inc.", placements: 42 },
      { name: "Global Innovations", placements: 38 },
      { name: "Future Systems", placements: 29 },
      { name: "Data Analytics Pro", placements: 25 },
      { name: "Cloud Services Ltd", placements: 21 },
    ],
  },
  applicationStats = {
    totalApplications: 1245,
    pendingApplications: 328,
    successfulApplications: 567,
    rejectedApplications: 350,
    applicationsByMonth: [
      { month: "Jan", count: 78 },
      { month: "Feb", count: 92 },
      { month: "Mar", count: 145 },
      { month: "Apr", count: 168 },
      { month: "May", count: 213 },
      { month: "Jun", count: 187 },
      { month: "Jul", count: 142 },
      { month: "Aug", count: 98 },
      { month: "Sep", count: 122 },
    ],
  },
  userStats = {
    totalStudents: 1850,
    totalRecruiters: 124,
    activeUsers: 876,
    newUsersThisMonth: 68,
  },
}: AnalyticsDashboardProps) => {
  return (
    <div className="w-full h-full p-6 bg-background">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <div className="flex items-center space-x-2">
            <select className="p-2 border rounded-md bg-background">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Export Data
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Placements
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {placementStats.totalPlacements}
              </div>
              <p className="text-xs text-muted-foreground">
                +12% from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Average Salary
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${placementStats.averageSalary.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                +5% from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Applications
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applicationStats.totalApplications}
              </div>
              <p className="text-xs text-muted-foreground">
                +18% from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                +8% from previous period
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different analytics views */}
        <Tabs defaultValue="placements" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="placements">
              <BarChart className="h-4 w-4 mr-2" />
              Placements
            </TabsTrigger>
            <TabsTrigger value="applications">
              <LineChart className="h-4 w-4 mr-2" />
              Applications
            </TabsTrigger>
          </TabsList>

          {/* Placements Tab Content */}
          <TabsContent value="placements" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Placement Trends</CardTitle>
                  <CardDescription>
                    Monthly placement statistics
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full flex items-end justify-between p-4">
                    {[
                      { month: "Jan", value: 65 },
                      { month: "Feb", value: 72 },
                      { month: "Mar", value: 84 },
                      { month: "Apr", value: 78 },
                      { month: "May", value: 92 },
                      { month: "Jun", value: 86 },
                      { month: "Jul", value: 94 },
                      { month: "Aug", value: 88 },
                      { month: "Sep", value: 96 },
                      { month: "Oct", value: 90 },
                      { month: "Nov", value: 98 },
                      { month: "Dec", value: 92 },
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="w-8 bg-primary rounded-t-md"
                          style={{ height: `${item.value * 2}px` }}
                        ></div>
                        <span className="text-xs mt-2">{item.month}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Recruiting Companies</CardTitle>
                  <CardDescription>
                    Companies with most placements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {placementStats.topCompanies.map((company, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Briefcase className="h-4 w-4 text-primary" />
                          </div>
                          <span>{company.name}</span>
                        </div>
                        <span className="font-medium">
                          {company.placements} placements
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Applications Tab Content */}
          <TabsContent value="applications" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Application Status</CardTitle>
                  <CardDescription>
                    Overview of application statuses
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full flex flex-col justify-center space-y-6 p-4">
                    {[
                      { status: "Applied", count: 450, color: "#4338ca" },
                      { status: "Shortlisted", count: 280, color: "#0891b2" },
                      { status: "Interviewed", count: 180, color: "#059669" },
                      { status: "Offered", count: 120, color: "#65a30d" },
                      { status: "Rejected", count: 150, color: "#dc2626" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{item.status}</span>
                          <span className="font-medium">{item.count}</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(item.count / 450) * 100}%`,
                              backgroundColor: item.color,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Applications</CardTitle>
                  <CardDescription>
                    Application trends over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="h-full flex items-end justify-between p-4">
                    {applicationStats.applicationsByMonth.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="w-8 bg-primary rounded-t-md"
                          style={{ height: `${(item.count / 220) * 250}px` }}
                        ></div>
                        <span className="text-xs mt-2">{item.month}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Scheduled interviews and campus drives
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-muted/20 rounded-md">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">
                    Tech Solutions Inc. Campus Drive
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    May 15, 2023 • 10:00 AM - 4:00 PM
                  </p>
                </div>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Confirmed
                </span>
              </div>
              <div className="flex items-center p-3 bg-muted/20 rounded-md">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">
                    Global Innovations Interview Day
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    May 18, 2023 • 9:00 AM - 5:00 PM
                  </p>
                </div>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  Upcoming
                </span>
              </div>
              <div className="flex items-center p-3 bg-muted/20 rounded-md">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">
                    Data Analytics Pro Pre-Placement Talk
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    May 22, 2023 • 2:00 PM - 3:30 PM
                  </p>
                </div>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  Upcoming
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
