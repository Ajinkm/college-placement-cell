import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserById } from "@/lib/supabase-db";
import { supabase } from "@/lib/supabase";

type UserRole = "student" | "recruiter" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't automatically load user from localStorage
    // This ensures the user needs to log in each time
    setIsLoading(false);
  }, []);

  const loginUser = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Try Supabase authentication first
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If Supabase authentication fails, throw the error
        throw error;
      } else if (data.user) {
        // Get user profile from Supabase
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", data.user.id)
          .single();

        const userData = {
          id: data.user.id,
          name:
            profileData?.full_name ||
            data.user.user_metadata?.full_name ||
            email,
          email: data.user.email || email,
          role:
            profileData?.user_type ||
            data.user.user_metadata?.user_type ||
            "student",
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during login",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      // Try Supabase registration first
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            user_type: role,
          },
        },
      });

      if (error) {
        // If Supabase registration fails, throw the error
        throw error;
      } else if (data.user) {
        // Create profile in Supabase
        await supabase.from("profiles").insert([
          {
            user_id: data.user.id,
            full_name: name,
            email: email,
            user_type: role,
          },
        ]);

        const userData = {
          id: data.user.id,
          name: name,
          email: email,
          role: role,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during registration",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    // Sign out from Supabase
    await supabase.auth.signOut();

    // Clear local state
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login: loginUser,
        register: registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
