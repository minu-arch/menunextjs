"use client";

import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Bell,
  Lock,
  User,
  Mail,
  Smartphone,
  Globe,
  Shield,
} from "lucide-react";

export default function Settings() {
  const [email, setEmail] = useState("john.doe@example.com");
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [newsletterSubscription, setNewsletterSubscription] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [dataSharing, setDataSharing] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [autoplayVideos, setAutoplayVideos] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  const handleSaveAccountSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated settings to your backend
    console.log("Saving account settings:", { email, language, darkMode });
  };

  const handleSaveNotificationSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated settings to your backend
    console.log("Saving notification settings:", {
      emailNotifications,
      pushNotifications,
      newsletterSubscription,
    });
  };

  const handleSavePrivacySettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated settings to your backend
    console.log("Saving privacy settings:", {
      profileVisibility,
      dataSharing,
      twoFactorAuth,
    });
  };

  const handleSaveAccessibilitySettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated settings to your backend
    console.log("Saving accessibility settings:", { autoplayVideos, fontSize });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Support</h1>
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account details and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAccountSettings}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
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
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="darkMode"
                      className="flex items-center gap-2"
                    >
                      <Globe className="size-4" />
                      Dark Mode
                    </Label>
                    <Switch
                      id="darkMode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAccountSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveNotificationSettings}>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="emailNotifications"
                      className="flex items-center gap-2"
                    >
                      <Mail className="size-4" />
                      Email Notifications
                    </Label>
                    <Switch
                      id="emailNotifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="pushNotifications"
                      className="flex items-center gap-2"
                    >
                      <Smartphone className="size-4" />
                      Push Notifications
                    </Label>
                    <Switch
                      id="pushNotifications"
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletterSubscription"
                      checked={newsletterSubscription}
                      onCheckedChange={(checked) =>
                        setNewsletterSubscription(checked as boolean)
                      }
                    />
                    <Label htmlFor="newsletterSubscription">
                      Subscribe to newsletter
                    </Label>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotificationSettings}>
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Manage your privacy and security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSavePrivacySettings}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="profileVisibility">
                      Profile Visibility
                    </Label>
                    <Select
                      value={profileVisibility}
                      onValueChange={setProfileVisibility}
                    >
                      <SelectTrigger id="profileVisibility">
                        <SelectValue placeholder="Select Visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="friends">Friends Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="dataSharing"
                      className="flex items-center gap-2"
                    >
                      <Shield className="size-4" />
                      Data Sharing
                    </Label>
                    <Switch
                      id="dataSharing"
                      checked={dataSharing}
                      onCheckedChange={setDataSharing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="twoFactorAuth"
                      className="flex items-center gap-2"
                    >
                      <Lock className="size-4" />
                      Two-Factor Authentication
                    </Label>
                    <Switch
                      id="twoFactorAuth"
                      checked={twoFactorAuth}
                      onCheckedChange={setTwoFactorAuth}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePrivacySettings}>
                Update Privacy Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="accessibility">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Settings</CardTitle>
              <CardDescription>
                Customize your experience for better accessibility.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAccessibilitySettings}>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="autoplayVideos"
                      className="flex items-center gap-2"
                    >
                      <User className="size-4" />
                      Autoplay Videos
                    </Label>
                    <Switch
                      id="autoplayVideos"
                      checked={autoplayVideos}
                      onCheckedChange={setAutoplayVideos}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Slider
                      id="fontSize"
                      min={12}
                      max={24}
                      step={1}
                      value={[fontSize]}
                      onValueChange={(value) => setFontSize(value[0])}
                    />
                    <div className="text-center">{fontSize}px</div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAccessibilitySettings}>
                Save Accessibility Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
