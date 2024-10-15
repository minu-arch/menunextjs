"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, Lock, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function MyAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Parsed user:", parsedUser);
      setUser({
        firstName: parsedUser.firstName,
        lastName: parsedUser.lastName,
        email: parsedUser.email,
      });
    } else {
      // Dacă nu există utilizator în localStorage, redirecționează la login
      router.push("/login");
    }
    setLoading(false);
  }, [router]);

  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated info to your backend
    console.log("Saving personal info:", { name, email, phone });
  };

  const handleSaveAccountSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated settings to your backend
    console.log("Saving account settings:", { notifications });
  };

  const handleSaveSecuritySettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated security settings to your backend
    console.log("Saving security settings:", { twoFactor });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>
      <div className="mb-6 flex items-center space-x-4">
        {loading ? (
          <Skeleton className="size-20 rounded-full" />
        ) : (
          <Avatar className="size-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt={name} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        )}
        <div>
          <h2 className="text-2xl font-semibold">
            {loading ? (
              <Skeleton className="h-6 w-48" />
            ) : user ? (
              `${user.firstName} ${user.lastName}`
            ) : (
              ""
            )}
          </h2>
          <p className="mt-1 text-muted-foreground">
            {loading ? <Skeleton className="h-4 w-64" /> : user?.email}
          </p>
        </div>
      </div>
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="account">Account Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSavePersonalInfo}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={user?.firstName || ""}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ""}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePersonalInfo}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAccountSettings}>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="notifications"
                      className="flex items-center gap-2"
                    >
                      <Bell className="size-4" />
                      Email Notifications
                    </Label>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAccountSettings}>
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveSecuritySettings}>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="2fa" className="flex items-center gap-2">
                      <Lock className="size-4" />
                      Two-Factor Authentication
                    </Label>
                    <Switch
                      id="2fa"
                      checked={twoFactor}
                      onCheckedChange={setTwoFactor}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex s:flex-col s:items-start s:gap-2 xs:flex-row xs:justify-between">
              <Button
                variant="outline"
                onClick={() => console.log("Password reset requested")}
              >
                Reset Password
              </Button>
              <Button onClick={handleSaveSecuritySettings}>
                Update Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <Alert className="mt-6">
        <User className="size-4" />
        <AlertTitle>Tip</AlertTitle>
        <AlertDescription>
          Keep your personal information up to date to ensure you don`t miss any
          important notifications.
        </AlertDescription>
      </Alert>
    </div>
  );
}
