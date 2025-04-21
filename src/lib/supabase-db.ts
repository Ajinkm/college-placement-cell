import { supabase } from "./supabase";
import type { Database } from "@/types/supabase";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "recruiter" | "admin";
  status: "active" | "pending" | "inactive";
}

export interface JobPosting {
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

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: "pending" | "shortlisted" | "rejected" | "interviewed" | "placed";
  appliedDate: string;
}

// Realtime channels
export const REALTIME_CHANNELS = {
  JOBS: "jobs-channel",
  APPLICATIONS: "applications-channel",
  INTERVIEWS: "interviews-channel",
  PLACEMENTS: "placements-channel",
  EVENTS: "events-channel",
};

// Subscribe to realtime changes
export const subscribeToChannel = (
  channel: string,
  callback: (payload: any) => void,
) => {
  return supabase
    .channel(channel)
    .on("broadcast", { event: "all" }, (payload) => {
      callback(payload);
    })
    .subscribe();
};

// Broadcast a message to a channel
export const broadcastToChannel = async (
  channel: string,
  event: string,
  payload: any,
) => {
  return supabase.channel(channel).send({
    type: "broadcast",
    event: event,
    payload: payload,
  });
};

// User functions
export const getUsers = async (filters?: {
  role?: string;
  status?: string;
  search?: string;
}) => {
  let query = supabase.from("users").select("*");

  if (filters) {
    if (filters.role && filters.role !== "all") {
      query = query.eq("role", filters.role);
    }

    if (filters.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    if (filters.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`,
      );
    }
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as User[];
};

export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as User;
};

export const updateUserStatus = async (
  id: string,
  status: "active" | "pending" | "inactive",
) => {
  const { data, error } = await supabase
    .from("users")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as User;
};

// Job functions
export const getJobs = async (filters?: {
  type?: string;
  search?: string;
  status?: string;
}) => {
  let query = supabase.from("jobs").select("*");

  if (filters) {
    if (filters.type && filters.type !== "all") {
      query = query.eq("type", filters.type);
    }

    if (filters.status) {
      query = query.eq("status", filters.status);
    }

    if (filters.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,company.ilike.%${filters.search}%,description.ilike.%${filters.search}%`,
      );
    }
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as JobPosting[];
};

export const getJobById = async (id: string) => {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as JobPosting;
};

export const createJob = async (
  jobData: Omit<JobPosting, "id" | "postedDate" | "status">,
) => {
  const newJob = {
    ...jobData,
    postedDate: new Date().toISOString().split("T")[0],
    status: "pending",
  };

  const { data, error } = await supabase
    .from("jobs")
    .insert([newJob])
    .select()
    .single();

  if (error) throw error;
  return data as JobPosting;
};

export const updateJobStatus = async (
  id: string,
  status: "approved" | "rejected",
) => {
  const { data, error } = await supabase
    .from("jobs")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as JobPosting;
};

// Application functions
export const applyForJob = async (jobId: string, userId: string) => {
  // Check if already applied
  const { data: existingApplication } = await supabase
    .from("applications")
    .select("*")
    .eq("jobId", jobId)
    .eq("userId", userId);

  if (existingApplication && existingApplication.length > 0) {
    throw new Error("Already applied for this job");
  }

  const newApplication = {
    jobId,
    userId,
    status: "pending",
    appliedDate: new Date().toISOString().split("T")[0],
  };

  const { data, error } = await supabase
    .from("applications")
    .insert([newApplication])
    .select()
    .single();

  if (error) throw error;
  return data as Application;
};

export const getUserApplications = async (userId: string) => {
  const { data, error } = await supabase
    .from("applications")
    .select(`*, job:jobId(*)`) // Join with jobs table
    .eq("userId", userId);

  if (error) throw error;
  return data as (Application & { job: JobPosting })[];
};

export const updateApplicationStatus = async (
  id: string,
  status: "pending" | "shortlisted" | "rejected" | "interviewed",
) => {
  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Application;
};

// Database initialization function
export const initializeDatabase = async () => {
  // Check if tables exist, if not create them
  const { error: usersError } = await supabase
    .from("users")
    .select("count")
    .limit(1);
  const { error: jobsError } = await supabase
    .from("jobs")
    .select("count")
    .limit(1);
  const { error: applicationsError } = await supabase
    .from("applications")
    .select("count")
    .limit(1);

  // If tables don't exist, create them
  if (usersError || jobsError || applicationsError) {
    console.log("Initializing database tables...");

    // Import mock data from api.ts
    const { default: apiModule } = await import("./api");

    // Create users table and insert mock data
    if (usersError) {
      await supabase.from("users").insert(apiModule.users || []);
    }

    // Create jobs table and insert mock data
    if (jobsError) {
      await supabase.from("jobs").insert(apiModule.jobs || []);
    }

    // Create applications table and insert mock data
    if (applicationsError) {
      await supabase.from("applications").insert(apiModule.applications || []);
    }
  }
};
