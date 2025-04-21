import React, { useState } from "react";
import {
  Search,
  Filter,
  UserPlus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "recruiter" | "admin";
  status: "active" | "pending" | "inactive";
  createdAt: string;
}

interface UserManagementProps {
  users?: User[];
  initialUserRoleToAdd?: "student" | "recruiter" | null;
  onAddUserComplete?: () => void;
}

const UserManagement = ({
  users = mockUsers,
  initialUserRoleToAdd = null,
  onAddUserComplete = () => {},
}: UserManagementProps) => {
  // Effect to handle initialUserRoleToAdd changes
  React.useEffect(() => {
    if (initialUserRoleToAdd) {
      setNewUserRole(initialUserRoleToAdd);
      setIsAddUserDialogOpen(true);
    }
  }, [initialUserRoleToAdd]);

  // Listen for custom events from sidebar
  React.useEffect(() => {
    const handleAddUser = (e: CustomEvent) => {
      const { role } = e.detail;
      if (role === "student" || role === "recruiter") {
        setNewUserRole(role);
        setIsAddUserDialogOpen(true);
      }
    };

    window.addEventListener(
      "admin-add-user" as any,
      handleAddUser as EventListener,
    );

    return () => {
      window.removeEventListener(
        "admin-add-user" as any,
        handleAddUser as EventListener,
      );
    };
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUserRole, setNewUserRole] = useState<
    "student" | "recruiter" | "admin"
  >("student");

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleStatusChange = (
    userId: string,
    newStatus: "active" | "pending" | "inactive",
  ) => {
    // In a real implementation, this would update the user's status in the database
    console.log(`Changing status of user ${userId} to ${newStatus}`);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      // In a real implementation, this would delete the user from the database
      console.log(`Deleting user ${selectedUser.id}`);
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleEditUser = () => {
    if (selectedUser) {
      // In a real implementation, this would update the user in the database
      console.log(`Editing user ${selectedUser.id}`);
      setIsEditDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleAddUser = (
    role: "student" | "recruiter" | "admin" = "student",
  ) => {
    // Set the role for the new user and open the dialog
    setNewUserRole(role);
    setIsAddUserDialogOpen(true);
  };

  const createNewUser = async (formData: any) => {
    try {
      // In a real implementation, this would create a new user in the database
      console.log(`Creating new ${newUserRole} with data:`, formData);

      // Create a new user object
      const newUser = {
        id: `user-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: newUserRole,
        status: formData.status || "pending",
        createdAt: new Date().toISOString(),
      };

      // In a real implementation, this would save to the database
      // For now, we'll just close the dialog and show an alert
      alert(`New ${newUserRole} account created successfully!`);
      setIsAddUserDialogOpen(false);
      onAddUserComplete();

      return newUser;
    } catch (error) {
      console.error(`Error creating new ${newUserRole}:`, error);
      alert(`Failed to create new ${newUserRole} account. Please try again.`);
      return null;
    }
  };

  return (
    <div className="w-full h-full p-6 bg-background">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">User Management</h1>
          <div className="flex space-x-2">
            <Button onClick={() => handleAddUser("student")}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
            <Button onClick={() => handleAddUser("recruiter")}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Recruiter
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <UserTable
              users={filteredUsers}
              onEdit={(user) => {
                setSelectedUser(user);
                setIsEditDialogOpen(true);
              }}
              onDelete={(user) => {
                setSelectedUser(user);
                setIsDeleteDialogOpen(true);
              }}
              onStatusChange={handleStatusChange}
            />
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <UserTable
              users={filteredUsers.filter((user) => user.status === "pending")}
              onEdit={(user) => {
                setSelectedUser(user);
                setIsEditDialogOpen(true);
              }}
              onDelete={(user) => {
                setSelectedUser(user);
                setIsDeleteDialogOpen(true);
              }}
              onStatusChange={handleStatusChange}
            />
          </TabsContent>

          <TabsContent value="recent" className="mt-6">
            <UserTable
              users={filteredUsers
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
                )
                .slice(0, 10)}
              onEdit={(user) => {
                setSelectedUser(user);
                setIsEditDialogOpen(true);
              }}
              onDelete={(user) => {
                setSelectedUser(user);
                setIsDeleteDialogOpen(true);
              }}
              onStatusChange={handleStatusChange}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to the user's information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                className="col-span-3"
                defaultValue={selectedUser?.name}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                className="col-span-3"
                defaultValue={selectedUser?.email}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="role" className="text-right text-sm font-medium">
                Role
              </label>
              <Select defaultValue={selectedUser?.role}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="status"
                className="text-right text-sm font-medium"
              >
                Status
              </label>
              <Select defaultValue={selectedUser?.status}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Add New{" "}
              {newUserRole.charAt(0).toUpperCase() + newUserRole.slice(1)}
            </DialogTitle>
            <DialogDescription>
              Fill in the details to create a new {newUserRole} account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="new-name"
                className="text-right text-sm font-medium"
              >
                Name
              </label>
              <Input
                id="new-name"
                className="col-span-3"
                placeholder="John Doe"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="new-email"
                className="text-right text-sm font-medium"
              >
                Email
              </label>
              <Input
                id="new-email"
                className="col-span-3"
                placeholder="john.doe@example.com"
                type="email"
              />
            </div>

            {/* Role-specific fields */}
            {newUserRole === "student" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="department"
                    className="text-right text-sm font-medium"
                  >
                    Department
                  </label>
                  <Select defaultValue="cs">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="ee">Electrical Engineering</SelectItem>
                      <SelectItem value="me">Mechanical Engineering</SelectItem>
                      <SelectItem value="ce">Civil Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="year"
                    className="text-right text-sm font-medium"
                  >
                    Year
                  </label>
                  <Select defaultValue="3">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {newUserRole === "recruiter" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="company"
                    className="text-right text-sm font-medium"
                  >
                    Company
                  </label>
                  <Input
                    id="company"
                    className="col-span-3"
                    placeholder="Company name"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label
                    htmlFor="position"
                    className="text-right text-sm font-medium"
                  >
                    Position
                  </label>
                  <Input
                    id="position"
                    className="col-span-3"
                    placeholder="HR Manager"
                  />
                </div>
              </>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="new-status"
                className="text-right text-sm font-medium"
              >
                Status
              </label>
              <Select defaultValue="pending">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddUserDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Get form data
                const nameInput = document.getElementById(
                  "new-name",
                ) as HTMLInputElement;
                const emailInput = document.getElementById(
                  "new-email",
                ) as HTMLInputElement;

                // Basic validation
                if (!nameInput?.value || !emailInput?.value) {
                  alert("Please fill in all required fields");
                  return;
                }

                // Get additional fields based on role
                let additionalData = {};
                if (newUserRole === "student") {
                  const departmentSelect = document.querySelector(
                    '[placeholder="Select department"]',
                  ) as HTMLElement;
                  const yearSelect = document.querySelector(
                    '[placeholder="Select year"]',
                  ) as HTMLElement;
                  additionalData = {
                    department:
                      departmentSelect?.textContent || "Computer Science",
                    year: yearSelect?.textContent || "3rd Year",
                  };
                } else if (newUserRole === "recruiter") {
                  const companyInput = document.getElementById(
                    "company",
                  ) as HTMLInputElement;
                  const positionInput = document.getElementById(
                    "position",
                  ) as HTMLInputElement;
                  additionalData = {
                    company: companyInput?.value || "",
                    position: positionInput?.value || "",
                  };
                }

                // Create the user
                createNewUser({
                  name: nameInput.value,
                  email: emailInput.value,
                  status: "pending",
                  ...additionalData,
                });
              }}
            >
              Create{" "}
              {newUserRole.charAt(0).toUpperCase() + newUserRole.slice(1)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user account and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onStatusChange: (
    userId: string,
    status: "active" | "pending" | "inactive",
  ) => void;
}

const UserTable = ({
  users,
  onEdit,
  onDelete,
  onStatusChange,
}: UserTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <StatusBadge
                    status={user.status}
                    onChange={(newStatus) => onStatusChange(user.id, newStatus)}
                  />
                </TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(user)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

interface StatusBadgeProps {
  status: "active" | "pending" | "inactive";
  onChange: (status: "active" | "pending" | "inactive") => void;
}

const StatusBadge = ({ status, onChange }: StatusBadgeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "inactive":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "active":
        return <CheckCircle className="mr-1 h-3 w-3" />;
      case "pending":
        return <MoreHorizontal className="mr-1 h-3 w-3" />;
      case "inactive":
        return <XCircle className="mr-1 h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className={`inline-flex cursor-pointer items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor()}`}
        >
          {getStatusIcon()}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Status</DialogTitle>
          <DialogDescription>
            Select a new status for this user.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant={status === "active" ? "default" : "outline"}
              className="flex items-center justify-center"
              onClick={() => {
                onChange("active");
                setIsOpen(false);
              }}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Active
            </Button>
            <Button
              variant={status === "pending" ? "default" : "outline"}
              className="flex items-center justify-center"
              onClick={() => {
                onChange("pending");
                setIsOpen(false);
              }}
            >
              <MoreHorizontal className="mr-2 h-4 w-4" />
              Pending
            </Button>
            <Button
              variant={status === "inactive" ? "default" : "outline"}
              className="flex items-center justify-center"
              onClick={() => {
                onChange("inactive");
                setIsOpen(false);
              }}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Inactive
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper functions
const getRoleBadgeVariant = (
  role: string,
): "default" | "secondary" | "outline" => {
  switch (role) {
    case "admin":
      return "default";
    case "recruiter":
      return "secondary";
    case "student":
      return "outline";
    default:
      return "outline";
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@university.edu",
    role: "student",
    status: "active",
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    role: "recruiter",
    status: "active",
    createdAt: "2023-06-20T14:45:00Z",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@university.edu",
    role: "admin",
    status: "active",
    createdAt: "2023-04-10T09:15:00Z",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@university.edu",
    role: "student",
    status: "pending",
    createdAt: "2023-07-05T11:20:00Z",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.wilson@innovatech.com",
    role: "recruiter",
    status: "pending",
    createdAt: "2023-07-12T16:30:00Z",
  },
  {
    id: "6",
    name: "Jennifer Lee",
    email: "jennifer.lee@university.edu",
    role: "student",
    status: "inactive",
    createdAt: "2023-03-25T13:10:00Z",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.miller@globalfirm.com",
    role: "recruiter",
    status: "inactive",
    createdAt: "2023-02-18T15:40:00Z",
  },
  {
    id: "8",
    name: "Lisa Taylor",
    email: "lisa.taylor@university.edu",
    role: "student",
    status: "active",
    createdAt: "2023-06-30T10:00:00Z",
  },
  {
    id: "9",
    name: "James Anderson",
    email: "james.anderson@techstart.com",
    role: "recruiter",
    status: "active",
    createdAt: "2023-05-28T09:30:00Z",
  },
  {
    id: "10",
    name: "Patricia Martinez",
    email: "patricia.martinez@university.edu",
    role: "admin",
    status: "active",
    createdAt: "2023-04-15T11:45:00Z",
  },
];

export default UserManagement;
