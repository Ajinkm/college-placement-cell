import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Send, Calendar, Users, Bell } from "lucide-react";

interface AnnouncementFormData {
  title: string;
  content: string;
  audience: string;
  priority: string;
  scheduledDate?: string;
}

const defaultAnnouncements = [
  {
    id: "1",
    title: "Campus Recruitment Drive",
    content:
      "Google will be conducting a recruitment drive on campus next week. All eligible students are encouraged to apply.",
    audience: "students",
    priority: "high",
    createdAt: "2023-05-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Resume Workshop",
    content:
      "A resume building workshop will be held in the auditorium on Friday at 3 PM. Bring your laptops!",
    audience: "students",
    priority: "medium",
    createdAt: "2023-05-10T14:30:00Z",
  },
  {
    id: "3",
    title: "New Company Registration Guidelines",
    content:
      "We have updated our company registration process. Please review the new guidelines before submitting your profile.",
    audience: "recruiters",
    priority: "medium",
    createdAt: "2023-05-08T09:15:00Z",
  },
];

const AnnouncementCreator = ({ announcements = defaultAnnouncements }) => {
  const [activeTab, setActiveTab] = useState("create");
  const [isScheduled, setIsScheduled] = useState(false);
  const { toast } = useToast();

  const form = useForm<AnnouncementFormData>({
    defaultValues: {
      title: "",
      content: "",
      audience: "all",
      priority: "medium",
    },
  });

  const onSubmit = (data: AnnouncementFormData) => {
    // In a real implementation, this would send the data to an API
    console.log("Announcement data:", data);

    toast({
      title: "Announcement Created",
      description: `Your announcement "${data.title}" has been ${isScheduled ? "scheduled" : "published"}.`,
    });

    form.reset();
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Announcement Management</CardTitle>
          <CardDescription>
            Create and manage announcements for students, recruiters, or all
            users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="create">
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  <span>Create Announcement</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="manage">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Manage Announcements</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Announcement Title</FormLabel>
                        <FormControl>
                          <input
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            placeholder="Enter announcement title"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Keep the title concise and descriptive.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Announcement Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter the announcement details here..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="audience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Audience</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select audience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="all">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  <span>All Users</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="students">
                                Students Only
                              </SelectItem>
                              <SelectItem value="recruiters">
                                Recruiters Only
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority Level</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="schedule"
                      className="rounded border-gray-300"
                      checked={isScheduled}
                      onChange={() => setIsScheduled(!isScheduled)}
                    />
                    <label htmlFor="schedule" className="text-sm font-medium">
                      Schedule for later
                    </label>
                  </div>

                  {isScheduled && (
                    <FormField
                      control={form.control}
                      name="scheduledDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Schedule Date</FormLabel>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <FormControl>
                              <input
                                type="datetime-local"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => form.reset()}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {isScheduled ? "Schedule" : "Publish"} Announcement
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="manage" className="space-y-4">
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <Card key={announcement.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {announcement.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Target:{" "}
                            {announcement.audience.charAt(0).toUpperCase() +
                              announcement.audience.slice(1)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${announcement.priority === "high" ? "bg-red-100 text-red-800" : announcement.priority === "medium" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                          >
                            {announcement.priority.charAt(0).toUpperCase() +
                              announcement.priority.slice(1)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(
                              announcement.createdAt,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm mt-2">{announcement.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 p-4 pt-0">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementCreator;
