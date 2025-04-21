import { supabase } from "./supabase";

// SQL definitions for creating tables
const createTables = async () => {
  // Create users table
  await supabase.rpc("create_users_table", {
    sql: `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('student', 'recruiter', 'admin')),
        status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'inactive'))
      );
    `,
  });

  // Create jobs table
  await supabase.rpc("create_jobs_table", {
    sql: `
      CREATE TABLE IF NOT EXISTS jobs (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        location TEXT NOT NULL,
        type TEXT NOT NULL,
        salary TEXT,
        description TEXT NOT NULL,
        requirements JSONB NOT NULL,
        postedDate DATE NOT NULL,
        deadline DATE NOT NULL,
        status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
      );
    `,
  });

  // Create applications table
  await supabase.rpc("create_applications_table", {
    sql: `
      CREATE TABLE IF NOT EXISTS applications (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        jobId UUID NOT NULL REFERENCES jobs(id),
        userId UUID NOT NULL REFERENCES users(id),
        status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'shortlisted', 'rejected', 'interviewed')),
        appliedDate DATE NOT NULL,
        UNIQUE(jobId, userId)
      );
    `,
  });
};

// Function to migrate mock data to Supabase
export const migrateDataToSupabase = async () => {
  try {
    // First create tables if they don't exist
    await createTables();

    // Import mock data from api.ts
    const { default: apiModule } = await import("./api");

    // Check if users table is empty
    const { count: userCount, error: userCountError } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    if (userCountError) throw userCountError;

    // If users table is empty, insert mock data
    if (userCount === 0) {
      const { error: usersError } = await supabase
        .from("users")
        .insert(apiModule.users || []);

      if (usersError) throw usersError;
    }

    // Check if jobs table is empty
    const { count: jobCount, error: jobCountError } = await supabase
      .from("jobs")
      .select("*", { count: "exact", head: true });

    if (jobCountError) throw jobCountError;

    // If jobs table is empty, insert mock data
    if (jobCount === 0) {
      const { error: jobsError } = await supabase
        .from("jobs")
        .insert(apiModule.jobs || []);

      if (jobsError) throw jobsError;
    }

    // Check if applications table is empty
    const { count: appCount, error: appCountError } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true });

    if (appCountError) throw appCountError;

    // If applications table is empty, insert mock data
    if (appCount === 0) {
      const { error: appsError } = await supabase
        .from("applications")
        .insert(apiModule.applications || []);

      if (appsError) throw appsError;
    }

    console.log("Data migration to Supabase completed successfully");
    return true;
  } catch (error) {
    console.error("Error migrating data to Supabase:", error);
    return false;
  }
};
