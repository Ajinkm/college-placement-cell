// Mock API functions to simulate backend functionality

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "recruiter" | "admin";
  status: "active" | "pending" | "inactive";
}

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  requirements: string[];
  postedDate: string;
  deadline: string;
  status?: "pending" | "approved" | "rejected";
}

interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: "pending" | "shortlisted" | "rejected" | "interviewed";
  appliedDate: string;
}

// Mock data storage
let users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@university.edu",
    role: "student",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "recruiter",
    status: "active",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@university.edu",
    role: "admin",
    status: "active",
  },
];

let jobs: JobPosting[] = [
  {
    id: "1",
    title: "Software Engineer",
    company: "TechCorp",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹12-18 LPA",
    description:
      "We are looking for a skilled software engineer to join our development team.",
    requirements: [
      "B.Tech/M.Tech in Computer Science or related field",
      "2+ years of experience in software development",
    ],
    postedDate: "2023-06-15",
    deadline: "2023-07-15",
    status: "approved",
  },
  {
    id: "2",
    title: "Data Analyst Intern",
    company: "Analytics Pro",
    location: "Remote",
    type: "Internship",
    salary: "₹25,000/month",
    description: "Join our data team for a 6-month internship program.",
    requirements: [
      "Currently pursuing B.Tech/M.Tech in Computer Science, Statistics or related field",
      "Knowledge of SQL and data visualization tools",
    ],
    postedDate: "2023-06-10",
    deadline: "2023-06-30",
    status: "pending",
  },
];

let applications: Application[] = [
  {
    id: "1",
    jobId: "1",
    userId: "1",
    status: "shortlisted",
    appliedDate: "2023-06-16",
  },
  {
    id: "2",
    jobId: "2",
    userId: "1",
    status: "pending",
    appliedDate: "2023-06-12",
  },
];

// Auth functions
export const login = async (email: string, password: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Find user by email (in a real app, would check password hash)
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
  role: "student" | "recruiter";
}) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check if user already exists
  if (users.some((u) => u.email === userData.email)) {
    throw new Error("User with this email already exists");
  }

  // Create new user
  const newUser = {
    id: (users.length + 1).toString(),
    name: userData.name,
    email: userData.email,
    role: userData.role,
    status: "active" as const,
  };

  users.push(newUser);

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };
};

// Job functions
export const getJobs = async (filters?: {
  type?: string;
  search?: string;
  status?: string;
}) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredJobs = [...jobs];

  if (filters) {
    if (filters.type && filters.type !== "all") {
      filteredJobs = filteredJobs.filter((job) => job.type === filters.type);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower),
      );
    }

    if (filters.status) {
      filteredJobs = filteredJobs.filter(
        (job) => job.status === filters.status,
      );
    }
  }

  return filteredJobs;
};

export const getJobById = async (id: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    throw new Error("Job not found");
  }

  return job;
};

export const createJob = async (
  jobData: Omit<JobPosting, "id" | "postedDate" | "status">,
) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newJob = {
    ...jobData,
    id: (jobs.length + 1).toString(),
    postedDate: new Date().toISOString().split("T")[0],
    status: "pending" as const,
  };

  jobs.push(newJob);

  return newJob;
};

export const updateJobStatus = async (
  id: string,
  status: "approved" | "rejected",
) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const jobIndex = jobs.findIndex((j) => j.id === id);

  if (jobIndex === -1) {
    throw new Error("Job not found");
  }

  jobs[jobIndex] = {
    ...jobs[jobIndex],
    status,
  };

  return jobs[jobIndex];
};

// Application functions
export const applyForJob = async (jobId: string, userId: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check if already applied
  if (applications.some((a) => a.jobId === jobId && a.userId === userId)) {
    throw new Error("Already applied for this job");
  }

  const newApplication = {
    id: (applications.length + 1).toString(),
    jobId,
    userId,
    status: "pending" as const,
    appliedDate: new Date().toISOString().split("T")[0],
  };

  applications.push(newApplication);

  return newApplication;
};

export const getUserApplications = async (userId: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const userApplications = applications.filter((a) => a.userId === userId);

  // Enrich with job details
  const enrichedApplications = await Promise.all(
    userApplications.map(async (application) => {
      const job = await getJobById(application.jobId);
      return {
        ...application,
        job,
      };
    }),
  );

  return enrichedApplications;
};

export const updateApplicationStatus = async (
  id: string,
  status: "pending" | "shortlisted" | "rejected" | "interviewed",
) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const applicationIndex = applications.findIndex((a) => a.id === id);

  if (applicationIndex === -1) {
    throw new Error("Application not found");
  }

  applications[applicationIndex] = {
    ...applications[applicationIndex],
    status,
  };

  return applications[applicationIndex];
};

// User management functions
export const getUsers = async (filters?: {
  role?: string;
  status?: string;
  search?: string;
}) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredUsers = [...users];

  if (filters) {
    if (filters.role && filters.role !== "all") {
      filteredUsers = filteredUsers.filter(
        (user) => user.role === filters.role,
      );
    }

    if (filters.status && filters.status !== "all") {
      filteredUsers = filteredUsers.filter(
        (user) => user.status === filters.status,
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower),
      );
    }
  }

  return filteredUsers;
};

export const getUserById = async (id: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = users.find((u) => u.id === id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateUserStatus = async (
  id: string,
  status: "active" | "pending" | "inactive",
) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    throw new Error("User not found");
  }

  users[userIndex] = {
    ...users[userIndex],
    status,
  };

  return users[userIndex];
};
