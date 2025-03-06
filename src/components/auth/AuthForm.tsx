import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  UserPlus,
  Building,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  userType: z.enum(["student", "recruiter", "admin"]),
});

// Default admin credentials
const ADMIN_EMAIL = "admin@university.edu";
const ADMIN_PASSWORD = "admin123";

const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    userType: z.enum(["student", "recruiter"]),
    companyName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.userType === "recruiter") {
        return !!data.companyName && data.companyName.length >= 2;
      }
      return true;
    },
    {
      message: "Company name is required for recruiters",
      path: ["companyName"],
    },
  );

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface AuthFormProps {
  defaultTab?: "login" | "register";
  onLogin?: (data: LoginFormValues) => void;
  onRegister?: (data: RegisterFormValues) => void;
}

const AuthForm = ({
  defaultTab = "login",
  onLogin = (data) => console.log("Login data:", data),
  onRegister = (data) => console.log("Register data:", data),
}: AuthFormProps) => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  // Removed auto-redirect effect to prevent automatic login
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "student",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "student",
      companyName: "",
    },
  });

  const {
    login: authLogin,
    register: authRegister,
    error: authError,
  } = useAuth();

  const handleLoginSubmit = async (data: LoginFormValues) => {
    try {
      // Check for admin credentials
      if (
        data.userType === "admin" &&
        data.email === ADMIN_EMAIL &&
        data.password === ADMIN_PASSWORD
      ) {
        const userData = {
          id: "3",
          name: "Admin User",
          email: data.email,
          role: "admin",
        };
        localStorage.setItem("user", JSON.stringify(userData));
        window.location.href = "/admin-dashboard";
        return;
      }

      // Create mock user data directly
      let userData;
      if (data.userType === "student") {
        userData = {
          id: "1",
          name: "Student User",
          email: data.email,
          role: "student",
        };
      } else if (data.userType === "recruiter") {
        userData = {
          id: "2",
          name: "Recruiter User",
          email: data.email,
          role: "recruiter",
        };
      }

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect based on user type - always go directly to dashboard
      if (userData.role === "recruiter") {
        // Set hasCompanyProfile to true to skip company profile creation
        localStorage.setItem("hasCompanyProfile", "true");
        window.location.href = "/recruiter-dashboard";
      } else if (userData.role === "student") {
        // Set hasProfile to true to skip profile creation
        localStorage.setItem("hasProfile", "true");
        window.location.href = "/student-dashboard";
      }

      onLogin(data);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  const handleRegisterSubmit = async (data: RegisterFormValues) => {
    try {
      // Create user data directly without API calls
      const userData = {
        id: Math.random().toString(36).substring(2, 15),
        name: data.name,
        email: data.email,
        role: data.userType,
      };

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // For students, redirect to create profile page
      if (data.userType === "student") {
        // Don't set hasProfile to true so they go to profile creation
        window.location.href = "/create-profile";
      } else {
        // Don't set hasCompanyProfile to true so they go to company profile creation
        window.location.href = "/recruiter-dashboard";
      }

      onRegister(data);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-background">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          College Placement Portal
        </CardTitle>
        <CardDescription className="text-center">
          {activeTab === "login"
            ? "Sign in to your account"
            : "Create a new account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "register")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="login">
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
                className="space-y-4"
              >
                <div className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="userType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>I am a</FormLabel>
                        <div className="flex space-x-2">
                          <Button
                            type="button"
                            variant={
                              field.value === "student" ? "default" : "outline"
                            }
                            className="flex-1"
                            onClick={() => {
                              loginForm.setValue("userType", "student");
                              loginForm.setValue(
                                "email",
                                "student@university.edu",
                              );
                              loginForm.setValue("password", "password123");
                            }}
                          >
                            Student
                          </Button>
                          <Button
                            type="button"
                            variant={
                              field.value === "recruiter"
                                ? "default"
                                : "outline"
                            }
                            className="flex-1"
                            onClick={() => {
                              loginForm.setValue("userType", "recruiter");
                              loginForm.setValue(
                                "email",
                                "recruiter@company.com",
                              );
                              loginForm.setValue("password", "password123");
                            }}
                          >
                            Recruiter
                          </Button>
                          <Button
                            type="button"
                            variant={
                              field.value === "admin" ? "default" : "outline"
                            }
                            className="flex-1"
                            onClick={() => {
                              loginForm.setValue("userType", "admin");
                              loginForm.setValue("email", ADMIN_EMAIL);
                              loginForm.setValue("password", ADMIN_PASSWORD);
                            }}
                          >
                            Admin
                          </Button>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Enter your email"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="pl-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-9 w-9"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-end">
                  <Button variant="link" className="text-sm" type="button">
                    Forgot password?
                  </Button>
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => handleLoginSubmit(loginForm.getValues())}
                >
                  Sign In
                </Button>
              </form>
            </Form>
          </TabsContent>

          {/* Register Form */}
          <TabsContent value="register">
            <Form {...registerForm}>
              <form
                onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
                className="space-y-4"
              >
                <div className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="userType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>I want to register as</FormLabel>
                        <div className="flex space-x-2">
                          <Button
                            type="button"
                            variant={
                              field.value === "student" ? "default" : "outline"
                            }
                            className="flex-1"
                            onClick={() =>
                              registerForm.setValue("userType", "student")
                            }
                          >
                            Student
                          </Button>
                          <Button
                            type="button"
                            variant={
                              field.value === "recruiter"
                                ? "default"
                                : "outline"
                            }
                            className="flex-1"
                            onClick={() =>
                              registerForm.setValue("userType", "recruiter")
                            }
                          >
                            Recruiter
                          </Button>
                        </div>
                        <FormDescription>
                          Admin accounts can only be created by existing admins.
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {registerForm.watch("userType") === "recruiter"
                            ? "HR/Recruiter Name"
                            : "Full Name"}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder={
                                registerForm.watch("userType") === "recruiter"
                                  ? "Enter recruiter name"
                                  : "Enter your full name"
                              }
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {registerForm.watch("userType") === "recruiter" && (
                    <FormField
                      control={registerForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Enter company name"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Enter your email"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a password"
                              className="pl-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-9 w-9"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              className="pl-10"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-9 w-9"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => handleRegisterSubmit(registerForm.getValues())}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {activeTab === "login"
                ? "New to the platform?"
                : "Already have an account?"}
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() =>
            setActiveTab(activeTab === "login" ? "register" : "login")
          }
        >
          {activeTab === "login" ? "Create an account" : "Sign in"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
